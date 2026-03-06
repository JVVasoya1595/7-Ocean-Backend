const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    hero: {
        background: {
            imageUrl: { type: String, default: '/contact-hero.jpg' }
        },
        infoBox: {
            title: { type: String, default: 'Get in touch' },
            pagePath: [{
                label: { type: String, required: true },
                url: { type: String }
            }]
        }
    },
    getInTouch: {
        textContent: {
            subtitle: { type: String, default: 'GET IN TOUCH' },
            titleMain: { type: String, default: 'We\'d Love to Hear' },
            titleHighlight: { type: String, default: ' from You' },
            description: { type: String, default: 'Have a question, reservation inquiry, or special request? Reach out to us and our team will respond with care and attention.' }
        },
        imageBox: {
            imageUrl: { type: String, default: '/contact-getintouch.jpg' },
            socialLabel: { type: String, default: 'Follow Us' },
            socialLinks: [{
                iconUrl: { type: String },
                platformUrl: { type: String }
            }]
        },
        form: {
            name: {
                label: { type: String, default: 'Name *' },
                placeholder: { type: String, default: 'Enter your name' }
            },
            email: {
                label: { type: String, default: 'Email *' },
                placeholder: { type: String, default: 'Enter your email' }
            },
            phone: {
                label: { type: String, default: 'Phone *' },
                placeholder: { type: String, default: 'Enter your phone' }
            },
            subject: {
                label: { type: String, default: 'Subject *' },
                placeholder: { type: String, default: 'Enter your subject' }
            },
            message: {
                label: { type: String, default: 'Message' },
                placeholder: { type: String, default: 'Write your message here' }
            },
            termsText: { type: String, default: 'I have read and accepted terms and privacy.' },
            buttonText: { type: String, default: 'Send Message' }
        }
    },
    reachUs: {
        mapIframeUrl: { type: String, default: 'https://www.google.com/maps/embed' },
        textContent: {
            subtitle: { type: String, default: 'REACH US' },
            titleMain: { type: String, default: 'Everything You Need to' },
            titleHighlight: { type: String, default: ' Contact 7-Oceans' },
            description: { type: String, default: 'Find our location, phone number, and contact details to connect with 7-Oceans effortlessly. We\'re always ready to assist your plans and inquiries.' }
        },
        contactCards: [{    
            iconUrl: { type: String },
            label: { type: String },
            value: { type: String }
        }]
    },
    needToKnow: {
        textContent: {
            subtitle: { type: String, default: 'NEED TO KNOW' },
            titleMain: { type: String, default: 'Everything You Need' },
            titleHighlight: { type: String, default: ' Before You Visit' },
            description: { type: String, default: 'Find quick answers to common questions about reservations, dress code, events, and facilities to help you plan a seamless and enjoyable experience at 7-Oceans.' },
            contactText: { type: String, default: 'Still have any questions?' },
            contactLinkText: { type: String, default: 'Contact Us →' },
            contactLinkUrl: { type: String, default: '/contact' }
        },
        faqs: [{
            question: { type: String, required: true },
            answer: { type: String, required: true }
        }]
    },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);