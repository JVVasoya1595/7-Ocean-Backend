const mongoose = require('mongoose');

const navbarSchema = new mongoose.Schema({
    logo: {
        imageUrl: { type: String, default: '/logo.png' },
        altText: { type: String, default: '7-Oceans Logo' }
    },
    background: {
        decorations: [{
            iconUrl: { type: String, required: true }, // e.g., floating leaves/waterdrops
            position: { type: String }
        }]
    },
    links: [{
        label: { type: String, required: true },
        iconUrl: { type: String }, // Small icon next to the text
        url: { type: String, required: true },
        hasDropdown: { type: Boolean, default: false },
        dropdownItems: [{
            label: { type: String },
            url: { type: String }
        }]
    }],
    actionButton: {
        label: { type: String, default: 'BOOK NOW' },
        url: { type: String, default: '/book' }
    }
}, { timestamps: true });

module.exports = mongoose.model('Navbar', navbarSchema);
