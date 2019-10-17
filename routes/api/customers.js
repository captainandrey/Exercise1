const express = require('express');
const router = express.Router();
const uuid = require('uuid');

const {Datastore} = require('@google-cloud/datastore');
const ds = new Datastore();
const kind = 'Customer';

/*const customers = [
    {
        id: 1,
        name: 'Homer Simpson',
        gender: 'male'
    },
    {
        id: 2,
        name: 'Marge Simpson',
        gender: 'female'
    }

];*/


/*
async function listCustomers() {
    const query = ds.createQuery([kind]).order('FirstName');
  
    const [customers] = await ds.runQuery(query);
    console.log('Tasks:');
    customers.forEach(customer => {
      const key = customer[ds.KEY];
      console.log(key.id, customer.FirstName);
    });
  }

 listCustomers();
*/

function fromDatastore(obj) {
    obj.id = obj[ds.KEY].id;
    return obj;
  }

router.get('/', async (req, res) => {
    const query = ds.createQuery([kind]).order('FirstName');
    const [customers] = await ds.runQuery(query);
    res.json(customers.map(fromDatastore));
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
            res.status(404).json({msg: `Customer with id = ${req.params.id} not found`});
        }
    });
});

router.post('/', (req, res)=>{
    const newCustomer = {
        id: uuid.v4(),
        name: req.body.name,
        gender: req.body.gender
    };
    customers.push(newCustomer);

    res.json(customers);
});

module.exports = router;