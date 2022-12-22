const knex = require("../db/connection");
// import utility that is needed

function list(){
  return knex("movies").select("*");
};


function read(movieId){
  return knex("movies")
  .select("*")
  .where({movie_id:movieId})
  .first()
}










module.exports = {
  list,
  read,
}