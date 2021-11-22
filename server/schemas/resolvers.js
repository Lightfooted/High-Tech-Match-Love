const { AuthenticationError } = require('apollo-server-express');
const { User, Match, Message } = require('../models');
const { signToken } = require('../utils/auth');
// const cloudinary = require('cloudinary').v2;

const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id);

                return user;
            }

            throw new AuthenticationError('Not logged in');
        },

        users: async (parent, args, context) => {
                const user = await User.find();

                return user;

            throw new AuthenticationError('Not logged in');
        },


        // matches: async (parent, { userId }) => {
        // allUsers: async () => {
        //     return User.find({});
        // },

        // returns all the users in the database except for the logged in user
        allOtherUsers: async(parent, args, context) => {
            if (context.user) {
                return User.find({"_id": { $ne: context.user._id }});
            }
            
            throw new AuthenticationError('Not logged in');
        },

        // matches: async (parent, { userId }) => {    
        //     /*
        //         WRITE THE CODE
        //         return an array of matches that have the userId as either the requester or the requestee
        //     */
        // },

        getRightSwipes: async (parent, { userId }) => {
            const user = await User.findById({ _id: userId });
            return user.rightSwipes;
        },

        getLeftSwipes: async (parent, { userId }) => {
            const user = await User.findbyId({ _id: userId });
            return user.leftSwipes;
        },

        usersWithMessages: async (parent, { userId }) => {
            // returns the array of users with whom the logged in user has messages
            if (context.user) {
                const recipients = await Message.distinct("recipient", { "author": context.user._id });
                const authors = await Message.distinct("author", { "recipient": context.user._id });
                // merge those and remove duplicates

                // const users = do magic here...
                // return users;
            }

            throw new AuthenticationError('Not logged in');
        },

        messagesWithUser: async (parent, { userId }, context) => {
            // returns an array of messages sent between the logged in user and the userId
            if (context.user) {
                const messages = await Message.find({
                    $or: [
                        { author: userId, recipient: context.user._id },
                        { recipient: userId, author: context.user._id }
                    ]
                })
                .populate('author')
                .populate('recipient');
                return messages;
            }
            
            throw new AuthenticationError('Not logged in');
        },

    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect email');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password');
            }

            const token = signToken(user);

            return { token, user };
        },

        updateUser: async (parent, args, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }

            throw new AuthenticationError('Not logged in');
        },

        addRightSwipe: async (parent, { toAdd }, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, { $addToSet: { rightSwipes: toAdd } }, { new: true });
            }

            throw new AuthenticationError('Not logged in');
        },

        addLeftSwipe: async (parent, { toAdd }, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, { $addToSet: { leftSwipes: toAdd } }, { new: true });
            }

            throw new AuthenticationError('Not logged in');
        },

        addMessage: async (parent, { text, recipient}, context) => {
            if (context.user) {
                let message = await Message.create({ text: text, recipient: recipient, author: context.user._id});
                message = await message.populate('recipient author').execPopulate();
                
                return message;
            }

            throw new AuthenticationError('Not logged in');
        }
    }
};

module.exports = resolvers;
