// eslint-disable-next-line quotes
const { onUpdateTrigger } = require('../../../knexfile');

exports.up = async (knex) =>
  knex.schema
    .createTable('users', (table) => {
      table.text('uuid').unique();
      table.text('name').notNullable();
      table.date('age').notNullable();
      table.text('email').notNullable();
      table.text('password').notNullable();
      table.integer('whatsapp').notNullable();
      table.text('city').notNullable();
      table.text('uf').notNullable();

      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .then(() => knex.raw(onUpdateTrigger('users')));

exports.down = async (knex) => knex.schema.dropTable('users');
