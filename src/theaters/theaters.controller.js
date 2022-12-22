const { response } = require("express");
const service = require("./theaters.service");

const reduceProperties = require("../utils/reduce-properties");


async function list(req, res, next) {
  const data = await service.list()
  res.json({ data })
};


module.exports = {
  list
}