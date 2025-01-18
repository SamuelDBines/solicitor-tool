const { execSync } = require('child_process');

module.exports = async () => {
  console.log('Running global setup...');
  // Apply migrations or other setup tasks
  execSync('npx prisma migrate deploy --schema=prisma/schema.prisma', { stdio: 'inherit' });
  execSync('npx prisma generate --schema=prisma/schema.prisma', { stdio: 'inherit' });
};

