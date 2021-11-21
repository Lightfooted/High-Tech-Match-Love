const db = require('./connection');
const { User, Match, Message } = require('../models');

db.once('open', async () => {

    await User.deleteMany();

    const user1 = await User.create({
        firstName: 'Pamela',
        lastName: 'Washington',
        email: 'pamela@testmail.com',
        location: 'Tampa, FL',
        bio: 'A really excellent coder.',
        password: 'password12345',
        githubId: 'pwashFAKE'
    });

    const user2 = await User.create({
        firstName: 'Elijah',
        lastName: 'Holt',
        email: 'eholt@testmail.com',
        location: 'Orlando',
        bio: 'Coding is my life!',
        password: 'password12345',
        githubId: 'eholtFAKE'
    });

    const user3 = await User.create({
        firstName: 'Billy',
        lastName: 'Stein',
        email: 'bstein@testmail.com',
        location: 'Miami',
        bio: 'Is there anything more fun than coding with a companion?',
        password: 'password12345',
        githubId: 'bsteinFAKE',
    });

    const user4 = await User.create({
        firstName: 'Brenda',
        lastName: 'Jean',
        email: 'fake1@fake.com',
        location: 'Everywhere',
        bio: 'Thanks for watching and happy coding!',
        password: '12345678',
        githubId: 'bjackels5',
    });

    console.log('users seeded');

    await Message.deleteMany();

    await Message.create({
        author: user4._id,
        recipient: user3._id,
        text: 'a message from Brenda to Billy',
    });

    console.log('messages seeded');

    process.exit();
});
