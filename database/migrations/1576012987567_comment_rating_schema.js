/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CommentRatingSchema extends Schema {
  up() {
    this.create('comment_ratings', table => {
      table.increments();
      table.integer('plus_minus_one').notNullable();
      table
        .integer('comment_id')
        .unsigned()
        .references('id')
        .inTable('comments')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('comment_ratings');
  }
}

module.exports = CommentRatingSchema;
