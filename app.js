const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// CJo69St1HiQ8KteJ
// Michael
// mongodb+srv://Michael:<password>@cluster0.zihwyhj.mongodb.net/
mongoose.connect('mongodb+srv://cluster0.zihwyhj.mongodb.net/', {
    dbName: 'RestApi_tutorial',
    user: 'Michael',
    pass: 'CJo69St1HiQ8KteJ',
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
  .then(() => {
    console.log('MongoDB connected ....');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
  });

const productRoute = require('./routes/product.route');
app.use('/products', productRoute);


// 404 error and pass error 
app.use((req, res, next) => {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
next(createError(404, "Not found"));
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000...');
});
 