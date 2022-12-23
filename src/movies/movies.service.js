const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");
// const reduceReview = require("../reviews/reviews.service")


function list(){
  return knex("movies").select("*");
};

// "/:movieId?is_showing=true"
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

//"/:movieId/theaters"
function readTheaters(movieId){
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .where({ "m.movie_id": movieId })
    .select("t.theater_id", "name", "address_line_1", "address_line_2", "city", "state", "zip", "t.created_at", "t.updated_at", "is_showing", "m.movie_id")
}

// "/:movieId/reviews"
function readReviews(movieId){
    return knex("reviews as r")
      .join("critics as c", "r.critic_id", "c.critic_id")
      .select(
        "r.review_id", 
        "r.content",
        "r.score", 
        "r.created_at",
        "r.updated_at",
        "r.critic_id",
        "r.movie_id",
        "c.critic_id",
        "c.preferred_name",
        "c.surname", 
        "c.organization_name", 
        "c.created_at", 
        "c.updated_at")
      .groupBy("r.review_id", "c.critic_id")
      .where({ "r.movie_id": movieId})
      .then(reduceReview)
}

// Helper function for readReviews - Formats review properties for prettier output
const reduceReview = reduceProperties("critic_id", {
  preferred_name: ["critic", "preferred_name"],
  surname: ["critic", "surname"],
  organization_name: ["critic", "organization_name"],
})



module.exports = {
  list,
  read,
  isShowing,
  readTheaters,
  readReviews,
}