const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Router = require('./routes');
// Model Imports
// const Sale = require('./models/sales');

const port = 3000;
const uri =
	'mongodb+srv://admin-265:265joecalebjoe@sdev265.kywd08q.mongodb.net/sample_supplies?retryWrites=true&w=majority';

const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
	res.locals.path = req.path;
	next();
});

// Connect to the MongoDB cluster
try {
	mongoose.connect(
		uri,
		{ useNewUrlParser: true, useUnifiedTopology: true },
		() => console.log(' Mongoose is connected')
	);
} catch (e) {
	console.log('could not connect');
}

// app.get('/sales', async (request, response) => {
//   try {
//     const sales = await Sale.find({});
//     console.log('Sales:', sales);
//     response.send(sales);
//   } catch (error) {
//     console.error(error);
//     response.status(500).send(error);
//   }
// });

app.use(Router)

app.listen(port, () => console.log('server running at port ' + port));
