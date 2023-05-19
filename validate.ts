import { parse } from 'shaclc-parse';
import fs from 'fs';
import path from 'path';
import { DataFactory as DF, Store } from 'n3';
// @ts-ignore

// https://github.com/rdf-ext/shacl-engine

// Make sure the file can be parsed
// parse(fs.readFileSync(path.join(__dirname, '..', 'shapes', 'example.shaclc')).toString());


// import rdfDataModel from '@rdfjs/data-model'
// import rdfDataset from '@rdfjs/dataset'
// import toNT from '@rdfjs/to-ntriples'
// import fromFile from 'rdf-utils-fs/fromFile.js'
// import Validator from 'shacl-engine/Validator.js'

async function main () {
  // @ts-ignore
  const { Validator } = await import('shacl-engine');

  const dataset = new Store(parse(fs.readFileSync(path.join(__dirname, 'shapes', 'example.shaclc')).toString()));

  // create a validator instance for the shapes in the given dataset
  const validator = new Validator(dataset, { factory: DF })

  // run the validation process
  const report = await validator.validate({ dataset })

  // check if the data conforms to the given shape
  console.log(`conforms: ${report.conforms}`)
}

main()

