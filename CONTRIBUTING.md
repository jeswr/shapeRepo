# Contributing Guidelines

## Basics

To submit or modify a shape, please create a pull request to the main branch that satisfies the following requirements:
 - The shape must be in the `shapes` directory.
 - The shape must be written in [SHACL Compact Syntax](https://w3c.github.io/shacl/shacl-compact-syntax/) or [Extended SHACL Compact Syntax](https://github.com/jeswr/shaclcjs/). Almost all use-cases should be able to expressed in [SHACL Compact Syntax](https://w3c.github.io/shacl/shacl-compact-syntax/).
 - The shape must refer to itself using *relative IRIs*. This is so it can be published to versioned URLs as different instances of the shape.

## Recommended Practises

We recommend the following practises to make your shape work with as many applications as possible. Shapes that violates these practises without good reason are likely to not be accepted into this repository.
 - Shapes should only have constraint violations. [`sh:Info` and `sh:Warning` severities](https://www.w3.org/TR/shacl/#severity) should not be used.
 - [SPARQL-based constraints](https://www.w3.org/TR/shacl/#sparql-constraints) should not be used.
 - [SHACL Advanced Features](https://www.w3.org/TR/shacl-af/) should not be used.
 - Extend and re-use shapes within the same shape repository wherever possible. This can be achieved using [`sh:property`](https://www.w3.org/TR/shacl/#PropertyConstraintComponent) and [`sh:node`](https://www.w3.org/TR/shacl/#NodeConstraintComponent).

## Testing

Shapes can be tested by providing sample data that the shape is expected to pass and fail on.


For now we don't have many guard rails in place, but we will be adding more as we go. In particular this means that the above requirements will be checked by a manual human review rather than running CI on your PR.

If you have any questions, please feel free to open an issue or discussion!

## Tooling

 - [SHACLC Language Server](https://marketplace.visualstudio.com/items?itemName=jeswr.shaclc-language-server) for syntax highlighting SHACLC in vscode.
 - [RDF Transform](https://www.npmjs.com/package/rdf-transform) can be used if you want to generate SHACLC from other SHACL serializations.
