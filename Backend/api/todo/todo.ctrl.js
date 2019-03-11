const models = require('../../models');

const index = (req, res) => {
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10);
    
    if(Number.isNaN(limit))
        return res.status(400).end();
        
    models.Todo
        .findAll({
            limit:limit
        })
        .then(todos => {
            console.log(todos.length);
            res.json(todos);
        });
}

const show = (req, res) => {
    const id = parseInt(req.params.id, 10)
    
    if(Number.isNaN(id))
        return res.status(400).end();
        
    models.Todo
        .findOne({ 
            where: { id }
        }).then(todo => {
            if(!todo)
                return res.status(404).end();
            res.json(todo);
        })
}

const create = (req, res) => {
    const text = req.body.text;
    const checked = 0;
    
    if(!text)
        return res.status(400).end();
        
    models.Todo.create({text, checked})
        .then(todo => {
            console.log(text);
            res.status(201).json(todo);
        })
        .catch(err => {
           if(err.name === 'SequelizeUniqueConstraintError') {
               return res.status(409).end();
           }
           res.status(500).end();
        });
}

const update = (req, res) => {
    const id = parseInt(req.params.id, 10);
    
    if(Number.isNaN(id))
        return res.status(400).end();
        
    const { text, checked } = req.body;
    
    models.Todo.findOne({where:{id}})
        .then(todo => {
            if(!todo)
                return res.status(404).end();
            
            todo.text = text;
            todo.checked = checked;
            todo.lastModifiedDate = new Date().toISOString();
            
            todo.save()
                .then(_ => {
                    res.json(todo);
                })
        })
}

const destroy = (req, res) => {
    const id = parseInt(req.params.id, 10);
    
    if(Number.isNaN(id))
        return res.status(400).end();
        
    models.Todo.destroy({
        where:{id}
    }).then(() => {
        res.status(204).end();
    });
}

module.exports = {
    index,
    show,
    destroy,
    create,
    update
};