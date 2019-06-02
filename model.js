const db = require('./dbConfig');

module.exports = {
  find,
  findById,
  findAction,
  insert,
  update,
  remove
};

async function find() {
  return await db('projects')
    .map(project => ({
      name: project.name,
      description: project.description
    }))
}

async function findById(id) {
  const project = await db('projects')
    .where('projects.id', id)
    .first();
  
  const actions = await db('actions')
    .where('actions.project_id', id)

  if(project) {
    return {
      ...project,
      actions: actions
    }
  }
}

async function findAction(id, act_id) {
  const project = await this.findById(id);
  const action = project.actions.find(action => action.id === parseInt(act_id))

  if(action) {
    return action;
  } else {
    return 'not found'
  }
}

async function insert(data, type) {
  if(type === 'p') {
    return await db.insert(data)
      .into('projects')
      .then(([id]) => this.findById(id));
  } else {
    return await db.insert(data)
      .into('actions')
      .then((() => this.findById(data.project_id)))
  }
}

async function update(id, changes, type) {
  if(type === 'p') {
    return await db('projects')
      .where({ 'projects.id': id })
      .update(changes)
      .then(count => count > 0 ? this.findById(id) : { error: 'not found' })
  } else {
    const { project_id } = changes
    console.log(changes)
    return await db('actions')
      .where({
        'project_id': project_id,
        'id': id
      })
      .update(changes)
      .then(() => this.findById(project_id))
  }
}

async function remove(data, type) {
  if(type === 'p') {
    return await db('projects')
      .where('projects.id', data)
      .del()
      .then(count => count > 0 ? 'deleted successfully' : 'not successful')
  } else {
    console.log(data)
    return await db('actions')
      .where({
        'project_id': data.id,
        'id': data.act_id
      })
      .del()
      .then(count => count > 0 ? 'deleted successfully' : 'not successful')
  }
}