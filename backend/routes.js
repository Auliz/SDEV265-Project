const express = require('express');
const Sale = require('./models/sales.js');
const app = express();

// Get 177 Sales -- currently 177 due to .limit(177) There are like 5000 total.
app.get('/api/sales', async (req, res) => {
  try {
    const sales = await Sale.find({}).limit(177);
    // console.log('Sales:', sales);
    res.setHeader('Content-Type', 'application/json');
    res.json(sales);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Get a single Course
app.post('/api/sale', (req, res) => {
	// console.log('req.body ' + req.body.data);
	// console.log('courseName ' + req.body.courseName);
	Sale.findById(req.body.saleID)
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			console.log(err);
		});
});

// // Edit Course in DB

// app.patch('/api/sale/edit', (req, res) => {
// 	Sale.findById(req.body.saleID)
// 		.then((resp) => {
// 			resp.saleDate = req.body.saleDate
// 			resp.title = req.body.courseTitle
// 			resp.save()
// 		})
// })

// Add Course to DB
app.post('/api/course/add', function (req, res, next) {
	 course = new Course({
		name: req.body.name,
		title: req.body.title,
	});
  console.log(course);
	course.save(function (err, course) {
		if (err) {
			return next(err);
		}
		res.status(201).json(course);
	});
});

// Deletes Course from DB

app.post('/api/course/delete', function (req, res) {
	Course.findByIdAndDelete(req.body.courseID, function (err) {
		if (err) console.log(err);
		console.log('Successful deletion');
	});
});

module.exports = app;
