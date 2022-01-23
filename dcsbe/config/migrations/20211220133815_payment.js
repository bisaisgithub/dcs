
exports.up = function(knex) {
    return knex.schema.createTable('payment', table=>{
        table.string('pay_id').notNullable().primary();
        table.string('pay_appointment_id').notNullable();
        table.double('pay_amount').notNullable();
        table.datetime('pay_date').notNullable();
        table.double('pay_change');
        table.double('pay_balance');
        table.boolean('is_deleted');
        table.timestamps(true, true);
        table.foreign('pay_appointment_id').references('app_id').inTable('appointment');
    });
};

exports.down = function(knex) {
  
};
