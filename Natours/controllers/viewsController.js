const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

const getOverview = catchAsync(async (req, res) => {
  // 1) Get tour data from colelction
  const tours = await Tour.find();
  // 2) Build template

  // 3) Render that template using tour data from 1)
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});
const getTour = catchAsync(async (req, res) => {
  res.status(200).render('tour', {
    title: 'The Forest Hiker Tour',
  });
});
module.exports = {
  getOverview,
  getTour,
};
