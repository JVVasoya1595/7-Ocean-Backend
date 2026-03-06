const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
    hero: {
        background: { type: String, default: '/hero-bg-2.png' },
        text: {
            title: { type: String, default: '7-OCEANS WATERPARK & RESORT' },
            tagline: { type: String, default: 'Splash Into Adventure, Stay For The Experience.' }
        }
    },
    quickAccess: {
        text: {
            tagline: { type: String, default: 'Splash, stay & unwind' },
            title: { type: String, default: 'The Waterpark & More' }
        },
        cards: [{
            title: { type: String, required: true },
            subtitle: { type: String },
            features: { type: String },
            bgImage: { type: String }
        }],
        decorations: [{
            iconUrl: { type: String },
            position: { type: String } // e.g. "top-left", "bottom-center"
        }]
    },
    diningAndMore: {
        background: {
            imageUrl: { type: String, default: '/dining-bg-pattern.png' },
            animationStyle: { type: String, default: 'float' }, // Manages the animation type for the patterns
            animationSpeed: { type: String, default: '2s' }     // Manages animation duration
        },
        text: {
            tagline: { type: String, default: 'DINING & MORE' },
            title: { type: String, default: 'Water Fun, Dining & More' },
            description: { type: String, default: 'The island boasts food and beverage outlets, retail stores, changing rooms and a locker, plus private cabanas with pontoon access.' }
        },
        posters: [{
            imageUrl: { type: String, required: true },
            title: { type: String, required: true },
            description: { type: String },
            buttonLabel: { type: String },
            buttonUrl: { type: String }
        }]
    },
    signatureAttractions: {
        text: {
            tagline: { type: String, default: 'SIGNATURE ATTRACTIONS' },
            title: { type: String, default: 'Our Iconic Resort' }
        },
        categories: [{
            iconUrl: { type: String, required: true },
            title: { type: String, required: true }, // e.g., "Ride", "Water", "Resort"
            subtitle: { type: String }               // e.g., "Rides"
        }],
        cards: [{
            imageUrl: { type: String, required: true },
            title: { type: String, required: true },
            description: { type: String },
            buttonLabel: { type: String },
            buttonUrl: { type: String }
        }]
    },
    bookingBar: {
        background: {
            patternUrl: { type: String, default: '/booking-wave.svg' }
        },
        decorations: [{
            iconUrl: { type: String, default: '/dolphin-blue.png' },
            position: { type: String, default: 'bottom-right' }
        }],
        title: {
            text: { type: String, default: 'Water Park' },
            iconUrl: { type: String } // The dot icon next to "Water Park"
        },
        formLabels: {
            dateLabel: { type: String, default: 'Date' },
            adultLabel: { type: String, default: 'Adult' },
            juniorLabel: { type: String, default: 'Junior' },
            buttonLabel: { type: String, default: 'Confirm' },
            buttonUrl: { type: String, default: '/checkout' }
        }
    },
    resortAmenities: {
        background: {
            patternUrl: { type: String, default: '/amenities-bg-pattern.svg' }
        },
        decorations: [{
            iconUrl: { type: String, required: true },
            position: { type: String }
        }],
        text: {
            tagline: { type: String, default: 'RESORT COMFORT' },
            title: { type: String, default: 'Resort Amenities' },
            description: { type: String, default: 'Unwind and have non-stop fun with premium amenities, perfectly tailored for you.' }
        },
        amenities: [{
            iconUrl: { type: String, required: true },
            description: { type: String, required: true }
        }]
    },
    guestReviews: {
        background: {
            patternUrl: { type: String, default: '/reviews-wave.svg' }
        },
        decorations: [{
            iconUrl: { type: String, required: true },
            position: { type: String }
        }],
        text: {
            tagline: { type: String, default: 'GUEST REVIEWS' },
            title: { type: String, default: 'What Guests Say' }
        },
        reviews: [{
            avatarInitial: { type: String, required: true },
            avatarColor: { type: String, default: 'bg-teal-700' }, // Custom background styling class or hex code
            rating: { type: Number, default: 5 },
            text: { type: String, required: true },
            guestName: { type: String, required: true },
            date: { type: String, required: true }
        }]
    },
    // Future sections (services, attractions, etc) can be nested here too
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Home', homeSchema);