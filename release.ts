// @ts-expect-error
import { analyzeCommits } from '@semantic-release/commit-analyzer';
import { DefaultLogFields, simpleGit } from 'simple-git';
import path from 'path';
import { copyFileSync, mkdirSync, readJSONSync, writeJSONSync, readdirSync } from 'fs-extra';

const SHAPE_ROOT = path.join(__dirname, 'shapes');
const DIST_ROOT = path.join(__dirname, 'dist');
const VERSION_ROOT = path.join(__dirname, 'versions.json');
const git = simpleGit(__dirname);

function gitLog(config: { file?: string; from?: string; maxCount?: number; }): Promise<readonly DefaultLogFields[]> {
  return new Promise((resolve) => git.log(config, (_, { all }) => resolve(all)));
}

async function analyze(options: { file: string; from: string; }): Promise<null | 'minor' | 'major' | 'patch'> {
  return analyzeCommits({}, {
    commits: await gitLog(options),
    logger: { log: () => {} },
  });
}

// TODO: Handle the creation of a new shape
async function nextVersion(options: { file: string; version: string; commit?: string; }): Promise<string | null> {
  // @ts-ignore
  const analysis = await analyze({ file: path.join(SHAPE_ROOT, `${options.file}.shaclc`), from: options.commit });
  if (analysis === null)
    return null;

  const versions: number[] = options.version.split('.').map((v) => parseInt(v, 10));
  versions[{ 'patch': 0, 'minor': 1, 'major': 2 }[analysis]] += 1;
  return versions.join('.');
}

interface VersionInfo {
  version: string,
  commit: string,
  file: string,
}

function copyFiles(versionConfig: VersionInfo, newVersionNumber: string) {
  for (const dir of [
    ...Array(3).fill(0).map((_, i) => [ ...newVersionNumber.split('.').slice(0, i), 'latest' ]),
    newVersionNumber.split('.')
  ]) {
    // Set up the directory for release
    mkdirSync(path.join(DIST_ROOT, ...dir), { recursive: true });
    copyFileSync(
      path.join(SHAPE_ROOT, `${versionConfig.file}.shaclc`),
      path.join(DIST_ROOT, ...dir, `${versionConfig.file}.shaclc`));
  }
}

async function updateVersion(versionConfig: VersionInfo, newVersionNumber: string) {
  copyFiles(versionConfig, newVersionNumber);

  // Update the version number
  versionConfig.version = newVersionNumber;
  // Update the last commit
  versionConfig.commit = (await gitLog({ maxCount: 1 }))[0].hash;
}

async function main() {
  const versionConfigs: VersionInfo[] = await readJSONSync(VERSION_ROOT);
  const files = new Set<string>(readdirSync(SHAPE_ROOT).map((f) => f.replace(/\.shaclc$/, '')));
  
  for (const versionConfig of versionConfigs) {
    const newVersionNumber = await nextVersion(versionConfig);

    if (newVersionNumber)
      await updateVersion(versionConfig, newVersionNumber);

    files.delete(versionConfig.file);
  }

  for (const file of files) {
    const config = {
      file,
      version: '0.0.0',
      commit: (await gitLog({ maxCount: 1 }))[0].hash,
    }
    versionConfigs.push(config);
    copyFiles(config, '0.0.0')
  }

  writeJSONSync(VERSION_ROOT, versionConfigs, { spaces: 2 });
}

main();
