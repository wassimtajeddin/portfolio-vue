const basicAuth = require('basic-auth');
const crypto = require('crypto');

const authenticate = (req, res, next) => {
  const user = basicAuth(req);
  
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    console.error('ADMIN_PASSWORD not set in environment variables');
    return res.status(500).send('Server configuration error');
  }

  if (!user || 
      !crypto.timingSafeEqual(Buffer.from(user.name), Buffer.from(adminUsername)) ||
      !crypto.timingSafeEqual(Buffer.from(user.pass), Buffer.from(adminPassword))) {
    res.set('WWW-Authenticate', 'Basic realm="Admin Area"');
    return res.status(401).send('Authentication required');
  }
  
  next();
};

module.exports = authenticate;