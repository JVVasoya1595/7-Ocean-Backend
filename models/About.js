const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    hero: {
        background: {
            imageUrl: { type: String, default: '/about-hero.jpg' }
        },
        infoBox: {
            title: { type: String, default: 'About 7-Oceans' },
            pagePath: [{
                label: { type: String, required: true },
                url: { type: String }
            }]
        }
    },
    ourStory: {
        image: {
            url: { type: String, default: '/about-story.jpg' }
        },
        callCenter: {
            label: { type: String, default: 'CALL CENTER 24/7' },
            phone: { type: String, default: '+1 (212) 578-5758' },
            iconUrl: { type: String, default: '/icon-phone.png' }
        },
        textContent: {
            subtitle: { type: String, default: 'OUR STORY' },
            titleMain: { type: String, default: 'Refined Destination for' },
            titleHighlight: { type: String, default: ' Beachside Living' },
            description: { type: String, default: 'Designed for those who appreciate style, atmosphere, and meaningful moments, 7-Oceans Waterpark & Resort invites you to relax, celebrate, and indulge in a lifestyle shaped by warmth, rhythm, and effortless luxury.' }
        },
        button: {
            label: { type: String, default: 'Explore Activities' },
            url: { type: String, default: '/activities' }
        }
    },
    ourPurpose: {
        textContent: {
            subtitle: { type: String, default: 'OUR PURPOSE' },
            titleMain: { type: String, default: 'Where Water Meets' },
            titleHighlight: { type: String, default: ' Wonder' },
            description: { type: String, default: 'We create a place where slides, pools, and resort comfort come together—so every guest can make a splash, unwind by the water, and leave with moments worth remembering.' }
        },
        cards: [{
            title: { type: String, required: true },
            description: { type: String, required: true },
            iconUrl: { type: String }
        }],
        image: {
            url: { type: String, default: '/about-purpose.jpg' },
            statBox: {
                value: { type: String, default: '150K+' },
                label: { type: String, default: 'Guests Welcomed' }
            }
        }
    },
    ourValues: {
        textContent: {
            subtitle: { type: String, default: 'OUR VALUES' },
            titleMain: { type: String, default: 'Principles That Shape' },
            titleHighlight: { type: String, default: ' the 7-Oceans Experience' },
            description: { type: String, default: 'Our values guide how we design rides, host guests, and create unforgettable moments across the park.' }
        },
        cards: [{
            title: { type: String, required: true },
            description: { type: String, required: true },
            iconUrl: { type: String }
        }],
        banner: {
            imageUrl: { type: String, default: '/about-values-banner.jpg' },
            title: { type: String, default: 'Make Waves at 7-Oceans' },
            buttonText: { type: String, default: 'Explore Attractions ?' },
            buttonLink: { type: String, default: '/attractions' }
        }
    },
    excellence: {
        textContent: {
            subtitle: { type: String, default: 'RECOGNIZED EXCELLENCE' },
            titleMain: { type: String, default: 'Honors That Reflect Our' },
            titleHighlight: { type: String, default: ' Excellence' },
            description: { type: String, default: 'Awards and recognition from industry and guests remind us to keep raising the bar for waterpark and resort experiences.' }
        },
        video: {
            thumbnailUrl: { type: String, default: '/about-excellence-video-thumb.jpg' },
            videoUrl: { type: String, default: '/about-excellence-video.mp4' }
        },
        awards: [{
            year: { type: String, required: true },
            title: { type: String, required: true },
            issuer: { type: String, required: true }
        }]
    },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);