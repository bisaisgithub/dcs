
exports.up = function(knex) {
    return knex.schema.createTable('patient', table=>{
        table.string('id').notNullable().primary();
        table.string('name').notNullable();
        table.string('mobile').notNullable();
        table.string('gender').notNullable();
        table.date('dob').notNullable();
        table.string('allergen');
        table.string('status_');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
  
};
