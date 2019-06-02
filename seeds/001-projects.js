
exports.seed = function(knex, Promise) {
  return knex('projects').insert([
    { 
      name: 'Finish this sprint',
      description: 'almost done'
    },
    {
      name: 'Another project',
      description: 'and description'
    }
  ])
};
