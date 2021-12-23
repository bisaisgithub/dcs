
exports.up = function(knex) {
    return knex.schema.createTable('appointment', table=>{
        table.string('app_id').notNullable().primary();
        table.string('app_patient_id').notNullable();
        table.string('app_user_doctor_id').notNullable();
        table.date('app_date').notNullable();
        table.datetime('app_start_time').notNullable();
        table.datetime('app_end_time').notNullable();
        table.string('app_status').notNullable(); // On Schedule
        table.string('app_type').notNullable();      //scheduled, walk-in
        table.datetime('app_closed_date');
        table.timestamps(true, true);
        table.foreign('app_patient_id').references('patient_id').inTable('patient');
        table.foreign('app_user_doctor_id').references('user_id').inTable('user');
    });
};

exports.down = function(knex) {
  
};
