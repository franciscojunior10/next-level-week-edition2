import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('users', tatble => {
    tatble.increments('id').primary();
    tatble.string('name').notNullable();
    tatble.string('avatar').notNullable();
    tatble.string('whatsapp').notNullable();
    tatble.string('bio').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('users');
}
