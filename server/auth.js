const basicAuth = require('basic-auth');

const authenticate = (req, res, next) => {
  const user = basicAuth(req);
  
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!user || user.name !== adminUsername || user.pass !== adminPassword) {
    res.set('WWW-Authenticate', 'Basic realm="Admin Area"');
    return res.status(401).send('Authentication required');
  }
  
  next();
};

module.exports = authenticate;