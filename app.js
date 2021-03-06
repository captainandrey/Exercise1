const express = require('express');

const app = express();

app.use(express.json());
//routes
app.use('/api/customers', require('./routes/api/customers'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

