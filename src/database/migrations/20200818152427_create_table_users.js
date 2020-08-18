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
    })
    .then(() => knex.raw(onUpdateTrigger('users')));

exports.down = async (knex) => knex.schema.dropTable('users');
