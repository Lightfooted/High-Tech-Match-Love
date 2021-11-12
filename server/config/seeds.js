const db = require('./connection');
const { User, Match } = require('../models');

db.once('open', async () => {

  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    userName: 'PamWash',
    email: 'pamela@testmail.com',
    location: 'Tampa, FL',
    bio: 'A really excellent coder.',
    password: 'password12345',
    githubLink: 'https://github.com/pwashFAKE'      
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    userName: 'EliHolt',
    email: 'eholt@testmail.com',
    location: 'Orlando',
    bio: 'Coding is my life!',
    password: 'password12345',
    githubLink: 'https://github.com/eholtFAKE'
  });

  await User.create({
    firstName: 'Billy',
    lastName: 'Stein',
    userName: 'BillMug',
    email: 'bstein@testmail.com',
    location: 'Miami',
    bio: 'Is there anything more fun than coding with a companion?',
    password: 'password12345',
    githubLink: 'https://github.com/bsteinFAKE'
  });

  console.log('users seeded');

  process.exit();
});
