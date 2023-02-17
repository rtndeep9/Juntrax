const express = require('express');
const cors = require('cors')
const port = 3000;

const app = express();

app.use(express.json());
app.use(cors())

app.use(`/`, require('./src/routes'));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
