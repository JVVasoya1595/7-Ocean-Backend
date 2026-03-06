const mongoose = require('mongoose');

const barSchema = new mongoose.Schema({
    hero: {
        background: {
            imageUrl: { type: String, default: '/bar-hero.jpg' }
        },
        infoBox: {
            title: { type: String, default: 'Bar' },
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
    drinksAndViews: {
        text: {
            tagline: { type: String, default: 'DRINKS & VIEWS' },
            title: { type: String, default: 'Bar' },
            highlightedTitle: { type: String, default: ' at 7-Oceans' },
            description: { type: String, default: 'A lively, neon-inspired bar experience with handcrafted drinks, sunset energy, and island lounge vibes.' }
        },
        tags: [{ type: String }],
        cards: [{
            imageUrl: { type: String, required: true },
            badge: { type: String }, // e.g. "Signature Mocktail", "House Favorite"
            title: { type: String, required: true },
            description: { type: String }
        }]
    },
    discoverCocktails: {
        text: {
            title: { type: String, default: 'Discover the Best Cocktails' },
            highlightedTitle: { type: String, default: ' at 7-Oceans' },
            subtitle: { type: String, default: 'Visit our bar by the pool—signature drinks, sunset vibes, and island energy.' },
            description: { type: String, default: 'If you\'re at 7-Oceans we guarantee our cocktails will hit the spot. With summer in the air, come over to our poolside bar for seasonal specials and timeless classics. Enjoy a relaxed atmosphere with friends. And if you haven\'t tried it yet, this is the perfect time for our signature **Ocean Mint Cooler**.' }
        },
        videos: [{
            videoUrl: { type: String, required: true },
            thumbnailUrl: { type: String }
        }]
    },
    perfectDrink: {
        text: {
            description: { type: String, default: 'With the bar at 7-Oceans, you\'re never far from a perfect drink.' },
            subtitle: { type: String, default: 'OUR BAR OFFERS YOU BESPOKE' },
            title: { type: String, default: 'COCKTAILS & POOLSIDE VIBES' }
        },
        images: [{
            imageUrl: { type: String, required: true }
        }]
    },
    reservations: {
        title: { type: String, default: 'RESERVATIONS' },
        description: { type: String, default: 'Reserve your table for curated drinks, music, and an elevated bar atmosphere.' },
        buttonText: { type: String, default: 'Book Bar Experience' },
        buttonLink: { type: String, default: '/book' }
    },
    // Future sections for the Bar page can be added here
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Bar', barSchema);
