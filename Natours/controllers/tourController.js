const fs = require('fs');

// Get Tours
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
  );

  
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

  module.exports = {
    getAllTours,
    getTour,
    createTour,
    deleteTour,
    updateTour
  }