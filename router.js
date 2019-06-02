const router = require('express').Router();

const Model = require('./model');

router.get('/projects', (req, res) => {
  Model.find()
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch(err => {
    res.status(500).json({message: 'not found'})
    })
});

router.get('/projects/:id', (req, res) => {
  Model.findById(req.params.id)
    .then(project => {
      res.status(200).json({
        name: project.name,
        description: project.description,
        actions: project.actions.map(action => ({
          description: action.description,
          notes: action.notes
        }))
      })
    })
    .catch(err => {
      res.status(500).json({message: 'not found'})
    })
})

router.get('/projects/:id/actions', (req, res) => {
  Model.findById(req.params.id)
    .then(project => {
      res.status(200).json(project.actions)
    })
});

router.get('/projects/:id/actions/:act_id', (req, res) => {
  const { id, act_id } = req.params;
  console.log(id, act_id)
  Model.findAction(id, act_id)
    .then(action => {
      res.status(200).json({
        description: action.description,
        notes: action.notes
      })
    })
    .catch(err => {
      res.status(500).json({message: 'not found'})
    })
})

router.post('/projects', (req, res) => {
  const project = req.body;

  Model.insert(project, 'p')
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post('/projects/:id/actions', (req, res) => {
  const action = {
    ...req.body,
    project_id: parseInt(req.params.id)
  }

  Model.insert(action, 'a')
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json(err);
    });
})

router.put('/projects/:id', (req, res) => {
  const changes = req.body
  console.log(changes)
  const { id } = req.params;

  Model.update(id, changes, 'p')
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put('/projects/:id/actions/:act_id', (req, res) => {
  const { id, act_id } = req.params;
  const changes = {
    ...req.body,
    project_id: id
  }

  Model.update(act_id, changes, 'a')
    .then(project => {
      res.status(200).json(project)
    })
    .catch(() => {
      res.status(500).json({ message: 'not found' })
    })
})

router.delete('/projects/:id', (req, res) => {
  const { id } = req.params;
  
  Model.remove(id, 'p')
    .then(msg => {
      res.status(200).json(msg);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete('/projects/:id/actions/:act_id', (req, res) => {
  const { id, act_id } = req.params
  const data = {
    id: id,
    act_id: act_id
  }
  console.log('step 1')
  Model.remove(data, 'a')
    .then(msg => {
      res.status(200).json(msg);
    })
    .catch(err => {
      res.status(500).json(err);
    });
})

module.exports = router;