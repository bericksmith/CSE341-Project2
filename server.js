const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models'); // Import the db from models/index.js
const app = express();

const port = process.env.PORT || 5500;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

// Use Mongoose to connect to MongoDB
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


.then(() => {
    console.log('Connected to the database!');
    app.listen(port, () => {
        console.log(`Node server is running on port ${port}`);
    });
})
.catch(err => {
    console.log('Cannot connect to the database!', err);
    process.exit();
});
