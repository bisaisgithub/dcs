
exports.up = function(knex) {
    return knex.schema.createTable('exam', table=>{
        table.string('exam_id').notNullable().primary();
        table.string('exam_appointment_id').notNullable();
        table.json('exam_remark').notNullable();
        table.json('exam_check_box').notNullable();
        table.timestamps(true, true);
        table.foreign('exam_appointment_id').references('app_id').inTable('appointment');
    });
};

exports.down = function(knex) {
  
};
