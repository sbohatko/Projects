const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello middleware');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Get Tours
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Route handlers
const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestAt: req.requestTime,
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};
const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tours: tour,
    },
  });
};
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};
const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length || req.params.id * 1 < 0) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length || req.params.id * 1 < 0) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updater tour object here...>',
    },
  });
};
const getAllUsers = (req,res)=>{
    res.status(500).json({
        status: 'error',
        message:'This route not yet defined'
    })
}
const createUser = (req,res)=>{
    res.status(500).json({
        status: 'error',
        message:'This route not yet defined'
    })
}
const getUser = (req,res)=>{
    res.status(500).json({
        status: 'error',
        message:'This route not yet defined'
    })
}
const updateUser = (req,res)=>{
    res.status(500).json({
        status: 'error',
        message:'This route not yet defined'
    })
}
const deleteUser = (req,res)=>{
    res.status(500).json({
        status: 'error',
        message:'This route not yet defined'
    })
}

// Routes
const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(createTour);

tourRouter
  .route('/:id')
  .get(getTour)
  .delete(deleteTour)
  .patch(updateTour);

  userRouter.route('/')
  .get(getAllUsers)
  .post(createUser);

  userRouter
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

  app.use('/api/v1/tours',tourRouter);
  app.use('/api/v1/users',userRouter);


// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
