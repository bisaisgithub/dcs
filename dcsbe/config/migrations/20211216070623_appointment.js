
exports.up = function(knex) {
    return knex.schema.createTable('appointment', table=>{
        table.string('id').notNullable().primary();
        table.string('patient_id').notNullable();
        table.string('doctor_id').notNullable();
        table.date('date').notNullable();
        table.datetime('start').notNullable();
        table.datetime('end').notNullable();
        table.string('Treatment').notNullable();
        table.string('type').notNullable();        
        table.timestamps(true, true);
        table.foreign('patient_id').references('id').inTable('patient');
        table.foreign('doctor_id').references('id').inTable('user');
    });
};

exports.down = function(knex) {
  
};
