/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CommentSchema extends Schema {
  up() {
    this.create('comments', table => {
      table.increments();
      table
        .integer('ticket_id')
        .unsigned()
        .references('id')
        .inTable('tickets')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table.text('text').notNullable();
      table
        .integer('comment_user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table
        .integer('moderation_user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.boolean('is_deleted');
      table.timestamps();
    });
  }

  down() {
    this.drop('comments');
  }
}

module.exports = CommentSchema;
