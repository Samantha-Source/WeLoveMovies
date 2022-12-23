const { response } = require("express");
const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next){
    const review = await service.read(req.params.reviewId);
    if(review){
        res.locals.review = review;
        return next();
    }
    next({ status: 404, message:`Review with id: ${req.params.reviewId} not found`})
}

async function destroy(req, res, next){
    // await service.delete(res.locals.review.review_id)
    await service.delete(req.params.reviewId);
    res.sendStatus(204)
}






module.exports = {
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
}