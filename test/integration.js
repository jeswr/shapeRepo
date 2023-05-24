const app = require('..');
const { Store, Parser, DataFactory: DF } = require('n3');

async function main() {
  const parser = new Parser({ format: 'text/turtle' });
  const response = await (await fetch('http://localhost:3000/example', {
    headers: new Headers([["Accept", "text/turtle" ]])
  })).text();
  const store = new Store(parser.parse(response));

  if (store.size !== 7) {
    throw new Error(`Expected 1 triple, got ${store.size}`);
  }

  if (!store.has(
    DF.quad(
      DF.namedNode('http://localhost:3000/example'),
      DF.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      DF.namedNode('http://www.w3.org/ns/shacl#NodeShape'),
    )
  )) {
    throw new Error('Expected triple not found');
  }

  app.close();
}

main();
