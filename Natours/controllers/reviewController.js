const Review = require('../models/reviewModel');
const factory = require('./handleFactory');

const setTourUserIds = (req, res, next) => {
  //Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

module.exports = {
  setTourUserIds,
  getAllReviews: factory.getAll(Review),
  getReview: factory.getOne(Review),
  createReview: factory.createOne(Review),
  updateReview: factory.updateOne(Review),
  deleteReview: factory.deleteOne(Review),
};
