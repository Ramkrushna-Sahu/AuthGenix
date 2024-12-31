const cors = require('cors')
const allowedOrigins = require('./allowed_origins')

const corsOptions = {
    origin: allowedOrigins,
};

module.exports = corsOptions