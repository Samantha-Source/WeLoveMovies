const knex = require("../db/connection");


function list(){
  return knex("movies").select("*");
};


function isShowing(){
  return knex("movies")
    .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
    .select("movies.*")
    .where({"movies_theaters.is_showing":true})
    .groupBy("movies.movie_id")
}




function read(movieId){
  return knex("movies")
    .select("*")
    .where({ movie_id: movieId })
    .first()
  };










module.exports = {
  list,
  read,
  isShowing,
}