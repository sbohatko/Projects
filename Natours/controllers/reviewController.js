const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');

const getAllReviews = catchAsync(async (req, res, next) => {
  // EXECUTE QUERY
  const features = new APIFeatures(Review.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const reviews = await features.query;
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: { reviews },
  });
});
const createReview = catchAsync(async (req, res, next) => {
  //Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});

module.exports = {
  getAllReviews,
  createReview,
};
