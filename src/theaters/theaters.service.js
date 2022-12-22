const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");
const mapProperties = require("../utils/map-properties");

// const reduceTheaterAndMovies = reduceProperties("theater_id", {
// //   theater_id: ["theater", "theater_id"],
// //   name: ["theater", "name"],
// //   address_line_1:["theater", "address_line_1"],
// //   address_line_2:["theater", "address_line_2"],
// //   city:["theater", "city"],
// //   state:["theater", "state"],
// //   zip:["theater", "zip"],
// //   created_at:["theater", "created_at"],
// //   updated_at:["theater", "updated_at"],
  
//   movie_id: ["movies", null, "movie_id"],
//   title: ["movies", null, "title"],
//   runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
//   rating: ["movies", null, "rating"],
//   description: ["movies", null, "description"],
//   image_url:["movies", null, "image_url"],
//   created_at:["movies", null, "created_at"],
//   updated_at:["movies", null, "updated_at"],
//   is_showing:["movies", null, "is_showing"],
//   theater_id:["movies", null, "theater_id"]
// })

const reduceMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title:["movies", null, "title"],
  rating: ["movies", null, "rating"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"]
})

function list(){
  return knex("theaters")
   .join("movies_theaters", "theaters.theater_id", "movies_theaters.theater_id")
   .join("movies", "movies.movie_id", "movies_theaters.movie_id")
//    .select("theaters.theater_id", "theaters.name", "theaters.address_line_1", "theaters.address_line_2", "theaters.city", "theaters.state", "theaters.zip", "theaters.created_at", "theaters.updated_at" "movies.movie_id", "movies.title", "movies.runtime_in_minutes", "movies.rating", "movies.description", "movies.image_url", "movies.created_at", "movies.updated_at", "movies.is_showing", "movies.theater_id")
  .where({theater_id: theater_id})
  .select("*")
  .groupBy("theaters.theater_id")
//   .orderBy("theaters.theater_id")
//   .then(reduceTheaterAndMovies)
  .then(reduceMovies)
};






module.exports = {
  list,
}