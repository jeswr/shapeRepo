const app = require('rdf-serve').default(require('path').join(__dirname, 'shapes'));
module.exports = app.listen(process.env.PORT || 3000);
