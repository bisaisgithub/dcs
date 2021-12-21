
exports.up = function(knex) {
    return knex.schema.createTable('payment', table=>{
        table.string('id').notNullable().primary();
        table.string('appointment_id').notNullable();
        table.string('patient_id').notNullable();
        table.double('payment').notNullable();
        table.double('change');
        table.double('balance');
        table.timestamps(true, true);
        table.foreign('patient_id').references('id').inTable('patient');
        table.foreign('appointment_id').references('id').inTable('appointment');
    });
};

exports.down = function(knex) {
  
};
