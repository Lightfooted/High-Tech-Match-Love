const { AuthenticationError } = require('apollo-server-express');
const { User, Match, PicInfo } = require('../models');
const { signToken } = require('../utils/auth');
const cloudinary = require('cloudinary').v2;

const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            if (context.user) {
                // right and left swipes arrays populated with only the _id and githubId
                const user = await User
                    .findById(context.user._id)
                    .populate('rightSwipes', '_id githubId')
                    .populate('leftSwipes', '_id githubId');

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
            // returns the array of right swipes with fully populated users
            const user = await User.findById({ _id: userId }).populate('rightSwipes');
            return user.rightSwipes;
        },

        leftSwipes: async (parent, { userId }) => {
            // returns the array of right swipes with fully populated users
            const user = await User.findbyId({ _id: userId }).populate('leftSwipes');
            return user.leftSwipes;
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
                // right and left swipes arrays populated with only the _id and githubId
                return await User.findByIdAndUpdate(context.user._id, { $addToSet: { rightSwipes: toAdd } }, { new: true })
                    .populate('rightSwipes', '_id githubId')
                    .populate('leftSwipes', '_id githubId');
            }

            throw new AuthenticationError('Not logged in');
        },

        addLeftSwipe: async (parent, { toAdd }, context) => {
            if (context.user) {
                // right and left swipes arrays populated with only the _id and githubId
                return await User.findByIdAndUpdate(context.user._id, { $addToSet: { leftSwipes: toAdd } }, { new: true })
                    .populate('rightSwipes', '_id githubId')
                    .populate('leftSwipes', '_id githubId');
            }

            throw new AuthenticationError('Not logged in');
        },

        // saves the profile picture from the passed URL into Cloudinary and then saved the URL returned from Cloudinary to
        // the users profilePicUrl
        addProfilePic: async (parent, { picPath }, context) => {
            if (context.user) {
                const storageResult = await cloudinary.uploader.upload(picPath, async function (err, image) {
                    if (err) {
                        throw new AuthenticationError(`Unable to save profile picture.`);
                    }
                })
                return await User.findByIdAndUpdate(context.user._id, { profilePicUrl: storageResult.url }, { new: true });
            }

            throw new AuthenticationError('Not logged in');
        },
    }
};

module.exports = resolvers;
