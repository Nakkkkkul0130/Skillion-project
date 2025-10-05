const crypto = require('crypto');

const generateCertificateHash = (userId, courseId, completionDate) => {
  const data = `${userId}-${courseId}-${completionDate}`;
  return crypto.createHash('sha256').update(data).digest('hex');
};

module.exports = { generateCertificateHash };