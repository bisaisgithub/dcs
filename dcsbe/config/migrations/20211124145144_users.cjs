
exports.up = function(knex) {
  return knex.schema.createTable('users', table=>{
      table.string('id').notNullable().unique();
      table.string('name');
      table.string('email');
      table.integer('contact');
      table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
