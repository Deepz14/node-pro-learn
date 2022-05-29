const mongoose = require('mongoose');

const connectDb = () => {
    mongoose.connect(process.env.MONGODB_ATLAS_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    })
    .then(res => console.log('DB is connected'))
    .catch(err => {
        console.log('something went wrong unable to connect DB');
        console.log(err)
        process.exit(1);
    })
}

module.exports = connectDb;
