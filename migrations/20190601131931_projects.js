
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('projects', tbl => {
      tbl.increments();
      
      tbl
        .string('name')
        .unique('uq_project_name')
        .notNullable();

      tbl
        .string('description', 255)
        .notNullable();

      tbl
        .boolean('isComplete')
        .defaultTo(false);

      tbl
        .timestamp('createdAt')
        .defaultTo(knex.fn.now());
    })
    .createTable('actions', tbl => {
        tbl.increments();
        tbl
          .integer('project_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('projects')
          .onDelete('CASCADE')
          .onUpdate('CASCADE')
        tbl
          .string('description')
          .notNullable();
        tbl
          .string('notes')
          .notNullable();
        tbl
          .timestamp('createdAt')
          .defaultTo(knex.fn.now());
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('actions')
    .dropTableIfExists('projects');
};
