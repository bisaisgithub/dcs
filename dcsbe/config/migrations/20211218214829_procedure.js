
exports.up = function(knex) {
    return knex.schema.createTable('procedure', table=>{
        table.string('id').notNullable().primary();
        table.string('appointment_id').notNullable();
        table.string('procedure_name').notNullable();
        table.integer('duration_minutes').notNullable();
        table.timestamps(true, true);
        table.foreign('appointment_id').references('id').inTable('appointment');
    });
};

exports.down = function(knex) {
  
};
