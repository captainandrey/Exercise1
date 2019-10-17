const express = require('express');

const app = express();

const {Datastore} = require('@google-cloud/datastore');
const ds = new Datastore();
const kind = 'Customer';

app.get('/', (req, res) => {
res.send('Hello World!!!!');

});



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


app.use(express.json());
//routes
app.use('/api/customers', require('./routes/api/customers'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

