
exports.up = function(knex) {
    return knex.schema.createTable('user', table=>{
        table.string('user_id').notNullable().primary();
        table.string('user_name').notNullable().unique();
        table.string('user_email').unique();
        table.string('user_password');
        table.string('user_mobile').notNullable();
        table.string('user_gender').notNullable();
        table.string('user_type').notNullable();
        table.date('user_dob').notNullable();
        table.string('user_status').notNullable(); //Active, Deleted
        
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
  
};
