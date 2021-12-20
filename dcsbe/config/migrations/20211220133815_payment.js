
exports.up = function(knex) {
    return knex.schema.createTable('payment', table=>{
        table.string('id').notNullable().primary();
        table.string('patient_id').notNullable();
        table.double('payment').notNullable();
        table.timestamps(true, true);
        table.foreign('patient_id').references('id').inTable('patient');
    });
};

exports.down = function(knex) {
  
};
