const app = require('./app');
require('dotenv').config();
const connectWithDatabase = require('./config/db_config');

const PORT = process.env.PORT || 4500

// connect with database
connectWithDatabase();

app.listen(PORT, () => {
    console.log(`server started running on the port: ${PORT}`);
})