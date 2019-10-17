const express = require('express');
const router = express.Router();

const {Datastore} = require('@google-cloud/datastore');
const ds = new Datastore();
const kind = 'Customer';

function mapper(obj) {
    obj.id = obj[ds.KEY].id;
    return obj;
  }

router.get('/', async (req, res) => {
    const query = ds.createQuery([kind]);
    const [customers] = await ds.runQuery(query);
    res.json(customers.map(mapper));
});

router.get('/:id', (req, res) => {
    const key = ds.key([kind, parseInt(req.params.id, 10)]);
    ds.get(key, (err, customer) => {
        if(!err && customer){
            customer.id = key.id;
            res.json(customer);
        }
        else{
            res.status(404).json({msg: `Customer with id = ${req.params.id} not found`});
        }
    });
});

module.exports = router;