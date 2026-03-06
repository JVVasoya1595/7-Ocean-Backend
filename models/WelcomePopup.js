const mongoose = require('mongoose');

const welcomePopupSchema = new mongoose.Schema({
    image: {
        imageUrl: { type: String, default: '/namaste-woman.jpg' },
        altText: { type: String, default: 'Welcome Image' }
    },
    text: {
        subtitle: { type: String, default: 'WELCOME' },
        title: { type: String, default: 'Namaste' },
        description: { type: String, default: 'Namaste and welcome to 7-Oceans Waterpark & Resort.' }
    },
    button: {
        label: { type: String, default: 'Enter Website' },
        url: { type: String, default: '/' }
    },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('WelcomePopup', welcomePopupSchema);
