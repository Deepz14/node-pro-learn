const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 4500

app.listen(PORT, () => {
    console.log(`server started running on the port: ${PORT}`);
})