const { response } = require("express");
const service = require("./theaters.service");
//const asyncErrorBoundary needed?????

const reduceProperties = require("../utils/reduce-properties");



async function list(req, res, next) {
  const data = await service.list()
  console.log(JSON.stringify(data))
  res.json({  data })
};








module.exports = {
  list
}