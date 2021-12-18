
exports.up = function(knex) {
    return knex.schema.createTable('appointment', table=>{
        table.string('id').notNullable().primary();
        table.string('appointment_id').notNullable();
        
    
        table.datetime('start_time').notNullable();
        table.datetime('end_time').notNullable();
        table.string('status_').notNullable(); // On Schedule
        table.string('type').notNullable();       //scheduled, walk-in
        table.timestamps(true, true);
        table.foreign('patient_id').references('id').inTable('patient');
        table.foreign('doctor_id').references('id').inTable('user');
    });
};

exports.down = function(knex) {
  
};
