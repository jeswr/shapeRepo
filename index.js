const serve = require('rdf-serve');
const path = require('path');

serve.default(path.join(__dirname, 'public'))


// const express = require('express');
// const app = express();
// const path = require('path');

// app.use(express.static('public'))

// app.get('/', (req, res) => {
//     res.sendFile('index.html', {root: path.join(__dirname, 'public')});
// })

// app.listen(process.env.PORT || 3000);

// module.exports = app;
