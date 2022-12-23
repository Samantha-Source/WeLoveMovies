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
};

function read(movieId){
  return knex("movies")
    .select("*")
    .where({ movie_id: movieId })
    .first()
  };

function readTheaters(movieId){
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .where({ "m.movie_id": movieId })
    .select("t.theater_id", "name", "address_line_1", "address_line_2", "city", "state", "zip", "t.created_at", "t.updated_at", "is_showing", "m.movie_id")

}








module.exports = {
  list,
  read,
  isShowing,
  readTheaters,
}