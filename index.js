const app = require('./app');
const {PORT} = process.env;

app.listen(PORT, () => console.log(`App started and running on PORT: ${PORT}`));