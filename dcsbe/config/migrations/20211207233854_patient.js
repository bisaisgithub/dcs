
exports.up = function(knex) {
    return knex.schema.createTable('patient', table=>{
        table.string('patient_id').notNullable().primary();
        table.string('patient_name').notNullable().unique();
        table.string('patient_mobile').notNullable();
        table.string('patient_gender').notNullable();
        table.date('patient_dob').notNullable();
        table.string('patient_allergen');
        table.string('patient_status');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
  
};
