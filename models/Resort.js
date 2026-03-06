const mongoose = require('mongoose');

const resortSchema = new mongoose.Schema({
    hero: {
        background: {
            imageUrl: { type: String, default: '/resort-hero.jpg' }
        },
        infoBox: {
            title: { type: String, default: 'Resort' },
            pagePath: [{
                label: { type: String, required: true },
                url: { type: String }
            }]
        }
    },
    introduction: {
        parts: [{
            type: { type: String, enum: ['text', 'image'], required: true },
            content: { type: String, required: true },
            altText: { type: String }
        }]
    },
    bookingForm: {
        checkInLabel: { type: String, default: 'Check In' },
        checkOutLabel: { type: String, default: 'Check Out' },
        adultsLabel: { type: String, default: 'Adults' },
        childrenLabel: { type: String, default: 'Children' },
        roomTypeLabel: { type: String, default: 'Room Type' },
        buttonText: { type: String, default: 'Check Availability' }
    },
    stayAndRecharge: {
        text: {
            subtitle: { type: String, default: 'STAY & RECHARGE' },
            title: { type: String, default: 'A Nature-Led' },
            highlightedTitle: { type: String, default: ' Resort Escape' },
            description: { type: String, default: 'Inspired by premium retreat experiences, the 7-Oceans Resort blends lush scenery, curated hospitality, and contemporary comfort to create a stay that feels both peaceful and memorable.' }
        },
        image: {
            imageUrl: { type: String, default: '/resort-nature.jpg' },
            badges: [{ type: String }]
        },
        tags: [{ type: String }],
        cards: [{
            imageUrl: { type: String, required: true },
            title: { type: String, required: true },
            description: { type: String, required: true }
        }]
    },
    roomCategories: {
        banner: {
            imageUrl: { type: String, default: '/resort-banner.jpg' },
            tag: { type: String, default: 'Signature Retreat Experience' },
            title: { type: String, default: 'Slow mornings, lush landscapes, and immersive resort living.' }
        },
        options: {
            subtitle: { type: String, default: 'ROOM CATEGORIES' },
            title: { type: String, default: 'Stay Options & Pricing' },
            cards: [{
                imageUrl: { type: String, required: true },
                priceTag: { type: String, required: true },
                title: { type: String, required: true },
                description: { type: String, required: true },
                features: [{ type: String }]
            }]
        }
    },
    testimonials: {
        subtitle: { type: String, default: 'GUEST VOICES' },
        title: { type: String, default: 'Resort Testimonials' },
        items: [{
            imageUrl: { type: String, required: true },
            quote: { type: String, required: true },
            author: { type: String, required: true },
            location: { type: String, required: true }
        }]
    },
    // Future sections for the Resort page can be added here
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Resort', resortSchema);
