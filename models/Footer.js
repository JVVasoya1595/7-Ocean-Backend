const mongoose = require('mongoose');

const footerSchema = new mongoose.Schema({
    logo: {
        imageUrl: { type: String, default: '/footer-logo.png' },
        altText: { type: String, default: '7-Oceans Logo' }
    },
    links: [{
        label: { type: String, required: true },
        url: { type: String, required: true }
    }],
    contactInfo: {
        email: { type: String, default: 'info@sevanoceans.com' },
        phone: { type: String, default: '+91 234 567 8900' }
    },
    copyright: {
        text: { type: String, default: '© 2026 Sevan Oceans Waterpark & Resort. All rights reserved.' }
    }
}, { timestamps: true });

module.exports = mongoose.model('Footer', footerSchema);
