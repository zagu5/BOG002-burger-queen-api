const { createProducts } = require('../services/products');

exports.create = (req, res) => {
    console.log('productos', req.body)
    const category = new createProducts({
        name: req.body.name,
        description: req.body.description
    })
    category.save().then(
        data => {
            res.send(data)
            console.log('createProduct', res);
        }
    ).cath(
        error => {
            return res.status(400).send({
                message: error.message,
            })
        }
    )
}