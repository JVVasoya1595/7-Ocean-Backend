const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    hero: {
        background: {
            imageUrl: { type: String, default: '/gallery-hero.jpg' }
        },
        infoBox: {
            title: { type: String, default: 'Gallery' },
            pagePath: [{
                label: { type: String, required: true },
                url: { type: String }
            }]
        }
    },
    gridSection: {
        textContent: {
            subtitle: { type: String, default: 'CAPTURED MOMENTS' },
            titleMain: { type: String, default: 'A Funky Look Into' },
            titleHighlight: { type: String, default: ' 7-Oceans' }
        },
        categories: [{ type: String }],
        images: [{
            imageUrl: { type: String, required: true },
            category: { type: String },
            title: { type: String }
        }],
        footer: {
            text: { type: String, default: 'Want your moment featured in the 7-Oceans gallery wall?' },
            buttonLabel: { type: String, default: 'Share Your Story →' },
            buttonLink: { type: String, default: '/share-story' }
        }
    },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);