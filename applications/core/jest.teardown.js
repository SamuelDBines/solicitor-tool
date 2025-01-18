const { execSync } = require('child_process');

module.exports = async () => {
  console.log('Running global teardown...');
  // Reset the test database
  execSync('npx prisma db push --force-reset --schema=prisma/schema.prisma', { stdio: 'inherit' });
  console.log('Global teardown completed.');
};
