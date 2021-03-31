const express = require('express');
const mongoose = require('mongoose');
const router = require('express').Router();
const dotenv = require('dotenv');
const routes = require('./routes/routes');
const cors = require('cors');
const path = require('path');


dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json())
app.use(cors());
app.use('/api', routes)


// connecting to mongoDB atlas
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const db = mongoose.connection;
db.once('open', function () {
    console.log('DB connected');
});
db.on('error', console.error.bind(console, 'connection error:'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(port, () => {
    console.log(`server is runnig on port ${port}`)
})