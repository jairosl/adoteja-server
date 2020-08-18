const { onUpdateTrigger } = require('../../../knexfile');

exports.up = async (knex) =>
  knex.schema
    .createTable('pets', (table) => {
      table.text('uuid').unique();
      table.text('image').notNullable();
      table.date('age').notNullable();
      table.text('name').notNullable();
      table.text('category').notNullable();
      table.text('size').notNullable();
      table
        .text('uuid_user')
        .references('users.uuid')
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .then(() => knex.raw(onUpdateTrigger('pets')));

exports.down = async (knex) => knex.schema.dropTable('pets');
