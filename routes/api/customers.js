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
    console.log(key);
    ds.get(key, (err, customer) => {
        if(!err && customer){
            customer.id = key.id;
            res.json(customer);
        }
        else{
            return res.status(404).json({msg: `Customer with id = ${req.params.id} not found`});
        }
    });
});

router.post('/', (req, res) => {
    const key = ds.key(kind);

    const entity = {
        key: key,
        data: req.body
      };
    ds.save(entity, (err) => {
        if(err){
            res.status(400).json({msg: err});
        }
        else{
            const customer = entity.data;
            customer.id = key.id;
            res.json(customer)
        }
    });
});

module.exports = router;