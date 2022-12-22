const { response } = require("express");
const service = require("./movies.service");
 const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next){
  const data = await service.list()
  res.json({ data })
}

async function movieExists(req, res, next){
  const movie = await service.read(req.params.movieId);
  if(movie){
    res.locals.movie = movie;
    return next()
  }
  next({status:404, message:`Movie cannot be found.`})
}

async function read(req, res, next){
  const { movieId } = req.params
  const data = await service.read(movieId);
  res.json({ data })
}


module.exports = {
  list,
  read: [asyncErrorBoundary(movieExists), read],
}