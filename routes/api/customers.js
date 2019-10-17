const express = require('express');
const router = express.Router();
const uuid = require('uuid');


const customers = [
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

];



router.get('/', (req, res) => {
    res.json(customers);
});

router.get('/:id', (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    if(customer){    
    res.json(customer);
    }
    else{
        res.status(404).json({msg: `Customer with id = ${req.params.id} not found`});
    }
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