const express = require('express');
const app = express();
const PORT = process.env.PORT || 8090;

app.use(express.json());

// Example endpoint
app.get('/api/node/hello', (req, res) => {
    res.json({ message: 'Hello from Node.js microservice!' });
});

app.listen(PORT, () => {
    console.log(`Node.js microservice running on port ${PORT}`);
});
