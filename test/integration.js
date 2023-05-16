const app = require('..');
const { Store, Parser } = require('n3');

async function main() {
  const parser = new Parser({ format: 'text/turtle' });
  const response = await (await fetch('http://localhost:3000/example', {
    headers: new Headers([["Accept", "text/turtle" ]])
  })).text();
  const store = new Store(parser.parse(response));

  if (store.size !== 7) {
    throw new Error(`Expected 1 triple, got ${store.size}`);
  }

  app.close();
}

main();
