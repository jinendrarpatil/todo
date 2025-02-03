const mongoose = require('mongoose')


const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_URL)
        console.log('Databse connection successful');

    } catch (error) {
        console.log(error);
        //if any error occurse exit the application, 1 means true
        process.exit(1)

    }
}

module.exports = connectMongoDB;