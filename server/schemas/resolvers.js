const { AuthenticationError } = require('apollo-server-express');
const { User, Match } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate('rightSwipes', '_id');

                return user;
            }

            throw new AuthenticationError('Not logged in');
        },
        
        matches: async (parent, { userId }) => {
            /*
                WRITE THE CODE
                return an array of matches that have the userId as either the requester or the requestee
            */
        },
        
        rightSwipes: async (parent, { userId }) => {
            const user = await User.findById({ _id: userId}).populate('rightSwipes');
            return user.rightSwipes;
        }
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
                return await User.findByIdAndUpdate(context.user._id, { $addToSet: { rightSwipes: toAdd } })
                    .populate('rightSwipes', '_id');
            }

            throw new AuthenticationError('Not logged in');
        },


    }
};

module.exports = resolvers;
