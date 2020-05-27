const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    githubusername: {
        type: String
    },
    experience: [
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            location: {
                type: String
            },
            to: {
                type: Date
            },
            description: {
                type: String
            },
            current: {
                type: Boolean,
                default: false
            }

        }
    ],
    education: [
        {
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            fieldofstudy: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            description: {
                type: String
            },
            current: {
                type: Boolean,
                default: false
            }

        }
    ],
    social: {
        youtube: {
            type: String
        },
        linkedin: {
            type: String
        },
        facebook: {
            type: String
        },
        twitter: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profille = mongoose.model('profile', ProfileSchema); 