
exports.up = function(knex) {
    return knex.schema.createTable('user', table=>{
        table.string('id').notNullable().primary();
        table.string('name').notNullable();
        table.string('email').unique();
        table.string('password');
        table.string('mobile').notNullable();
        table.string('gender').notNullable();
        table.string('type').notNullable();
        table.date('dob').notNullable();
        
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
  
};
