const app = require('./app');
require('dotenv').config();
const connectWithDatabase = require('./config/db_config');
const cloudinary = require('cloudinary');

const PORT = process.env.PORT || 4500

// connect with database
connectWithDatabase();

// cloudinary config
cloudinary.config({ 
  cloud_name: process.env.CLOUDNIARY_NAME, 
  api_key: process.env.CLOUDNIARY_API_KEY, 
  api_secret: process.env.CLOUDNIARY_API_SECRET,
  secure: true
});

app.listen(PORT, () => {
    console.log(`server started running on the port: ${PORT}`);
})