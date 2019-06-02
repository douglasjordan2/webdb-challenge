
exports.seed = function(knex, Promise) {
  return knex('actions').insert([
    { 
      description: 'first project action',
      notes: 'notes 1',
      project_id: 1
    },
    { 
      description: 'another project action',
      notes: 'notes 2',
      project_id: 1
    },
    { 
      description: 'second project action',
      notes: 'notes 1',
      project_id: 2
    },
    { 
      description: 'another project action',
      notes: 'notes 2',
      project_id: 2
    },
  ]);
};
