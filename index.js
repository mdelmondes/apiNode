const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./config/routes');
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(3000, () => {
    console.log(`Server iniciado na url http://localhost:3000`);
})