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
    const color = req.body.color;
    
    if(!text || !color)
        return res.status(400).end();
        
    models.Todo.create({text, color})
        .then(todo => {
            res.status(201).json(todo)
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
        
    const { text, color } = req.body;
    
    models.Todo.findOne({where:{id}})
        .then(todo => {
            if(!todo)
                return res.status(404).end();
            
            todo.text = text;
            todo.color = color;
            
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