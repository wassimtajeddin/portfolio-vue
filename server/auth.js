const basicAuth = require('basic-auth');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const authenticate = async (req, res, next) => {
  const user = basicAuth(req);
  
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPasswordHash && !adminPassword) {
    console.error('ADMIN_PASSWORD_HASH or ADMIN_PASSWORD not set in environment variables');
    return res.status(500).send('Server configuration error');
  }

  if (!user || user.name !== adminUsername) {
    res.set('WWW-Authenticate', 'Basic realm="Admin Area"');
    return res.status(401).send('Authentication required');
  }

  let isValidPassword = false;
  if (adminPasswordHash) {
    isValidPassword = await bcrypt.compare(user.pass, adminPasswordHash);
  } else {
    isValidPassword = crypto.timingSafeEqual(Buffer.from(user.pass), Buffer.from(adminPassword));
  }

  if (!isValidPassword) {
    res.set('WWW-Authenticate', 'Basic realm="Admin Area"');
    return res.status(401).send('Authentication required');
  }
  
  next();
};

module.exports = authenticate;