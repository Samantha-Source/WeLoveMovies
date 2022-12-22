const knex = require("../db/connection");
// import utility that is needed

function list(){
  return knex("movies").select("*");
};

module.exports = {
  list
}