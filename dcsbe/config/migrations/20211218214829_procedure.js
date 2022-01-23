
exports.up = function(knex) {
    return knex.schema.createTable('procedure', table=>{
        table.string('proc_id').notNullable().primary();
        table.string('proc_appointment_id').notNullable();
        table.string('proc_name').notNullable();
        table.integer('proc_duration_minutes').notNullable();
        table.double('proc_cost').notNullable();
        table.timestamps(true, true);
        table.foreign('proc_appointment_id').references('app_id').inTable('appointment');
    });
};

exports.down = function(knex) {
  
};
