const { response } = require("express");
const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next){
    const review = await service.read(req.params.reviewId);
    if(review){
        res.locals.review = review;
        return next();
    };
    next({ status: 404, message:`Review with id: ${req.params.reviewId} cannot be found`})
};

async function destroy(req, res, next){
    await service.delete(res.locals.review.review_id)
    res.sendStatus(204)
};

async function update(req, res, next){
    
    const updatedReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id,
    };
  
    await service.update(updatedReview)
    const updated = await service.readWithCritic(res.locals.review.review_id)
    res.json({ data: updated[0] })
};

async function read(req, res, next){
    const data = await service.read(req.params.reviewId);
    res.json({ data })
};


module.exports = {
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    read: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(read)]
}