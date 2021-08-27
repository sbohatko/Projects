const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handleFactory');

const getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };

  const reviews = await Review.find(filter);

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: { reviews },
  });
});
const setTourUserIds = (req, res, next) => {
  //Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

module.exports = {
  getAllReviews,
  setTourUserIds,
  createReview: factory.createOne(Review),
  updateReview: factory.updateOne(Review),
  deleteReview: factory.deleteOne(Review),
};
