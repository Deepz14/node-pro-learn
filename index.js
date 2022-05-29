const app = require('./app');
require('dotenv').config();
const DBconnect = require('./config/db_config');

const PORT = process.env.PORT || 4500

// connect with database
DBconnect();

app.listen(PORT, () => {
    console.log(`server started running on the port: ${PORT}`);
})