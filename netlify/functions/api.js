const serverless = require('serverless-http');
const app = require('../../app');

// Wrap the Express app as a Netlify Function handler
module.exports.handler = serverless(app);

