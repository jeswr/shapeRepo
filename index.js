const app = require('rdf-serve').default(require('path').join(__dirname, 'shapes'));
app.listen(process.env.PORT || 3000);

module.exports = app;
