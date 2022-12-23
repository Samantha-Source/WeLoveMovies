const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

function read(review_id) {
    return knex("reviews").select("*").where({ review_id }).first()
}

function destroy(review_id){
    return knex("reviews").where({ review_id }).del()
}

function update(updatedReview){
    return knex("reviews")
        .join("critics", "reviews.critic_id", "critics.critic_id")
        .select("*")
        .where({ review_id: updatedReview.review_id })
        .update(updatedReview, "*")
        .then((updatedRecord) => updatedRecord[0])
}

function readWithCritic(review_id){
  return knex("reviews")
        .join("critics", "reviews.critic_id", "critics.critic_id")
        .select("*")
        .where({ review_id })
        .then(reduceReview)
}


const reduceReview = reduceProperties("critic_id", {
  preferred_name: ["critic", "preferred_name"],
  surname: ["critic", "surname"],
  organization_name: ["critic", "organization_name"],
})




module.exports = {
    read,
    readWithCritic,
    update,
    delete:destroy,
}