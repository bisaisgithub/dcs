
exports.up = function(knex) {
    return knex.schema.createTable('procedure', table=>{
        table.string('id').notNullable().primary();
        table.string('patient_id').notNullable();
        table.string('doctor_id').notNullable();
        table.string('appointment_id').notNullable();
        table.string('procedure_name').notNullable();
        table.integer('duration_minutes').notNullable();
        table.double('procedure_cost').notNullable();
        table.timestamps(true, true);
        table.foreign('appointment_id').references('id').inTable('appointment');
        table.foreign('patient_id').references('id').inTable('patient');
        table.foreign('doctor_id').references('id').inTable('user');
    });
};

exports.down = function(knex) {
  
};
