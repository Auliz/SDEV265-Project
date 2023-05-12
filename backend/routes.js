const express = require('express');
const Sale = require('./models/sales.js');
const Item = require('./models/items.js');
const app = express();

// INVENTORY BELOW

// Get current Inventory of items
app.get('/api/inventory', async (req, res) => {
	try {
		const items = await Item.find({});
		res.setHeader('Content-Type', 'application/json');
		res.json(items);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});

// Edit Item in DB
app.patch('/api/inventory/edit', (req, res) => {
	Item.findById(req.body.itemID)
		.then((resp) => {
			resp.itemName = req.body.itemName;
			resp.quantity = req.body.quantity;
			resp.price = req.body.price;
			resp.save();
		})
		.catch((err) => {
			console.log(err);
		});
});

// SALES BELOW
// Get all sales from DB
app.get('/api/sales', async (req, res) => {
	try {
		const sales = await Sale.find({});
		res.setHeader('Content-Type', 'application/json');
		res.json(sales);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});

// Get a single Sale
app.get('/api/sale', (req, res) => {
	Sale.findById(req.body.saleID)
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			console.log(err);
		});
});

// Edit Sale in DB
app.patch('/api/sale/edit', (req, res) => {
	Sale.findById(req.body.saleID)
		.then((resp) => {
			resp.saleDate = req.body.saleDate;
			resp.storeLocation = req.body.saleLocation;
			resp.purchaseMethod = req.body.purchaseMethod;
			resp.couponUsed = req.body.couponUsed;
			resp.save();
		})
		.catch((err) => {
			console.log(err);
		});
});

// Add Sale to DB
app.post('/api/sale/add', function (req, res, next) {
	sale = new Sale({
		saleDate: req.body.saleDate,
		items: req.body.items,
		storeLocation: req.body.storeLocation,
		customer: req.body.customer,
		couponUsed: req.body.couponUsed,
		purchaseMethod: req.body.purchaseMethod,
	});
	sale.save(function (err, sale) {
		if (err) {
			return next(err);
		}
		res.status(201).json(sale);
	});
});

// Deletes Sale from DB
app.post('/api/sale/delete', function (req, res) {
	Sale.findByIdAndDelete(req.body.saleID, function (err) {
		if (err) console.log(err);
	});
});


module.exports = app;