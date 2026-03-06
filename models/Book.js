const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    hero: {
        background: {
            imageUrl: { type: String, default: '/book-hero.jpg' }
        },
        textContent: {
            description: { type: String, default: 'Dive into our exhilarating water slides, lazy river, and wave pool. Relax in our luxurious beachfront resort, surrounded by tropical beauty. Enjoy family-friendly fun, delicious dining, and endless entertainment. Book your unforgettable getaway today and experience the ultimate in waterpark excitement and resort luxury at 7-Oceans!' }
        },
        infoBox: {
            title: { type: String, default: 'Book Your Experience' },
            pagePath: [{
                label: { type: String, required: true },
                url: { type: String }
            }]
        }
    },
    experiences: {
        text: {
            subtitle: { type: String, default: 'CHOOSE YOUR EXPERIENCE' },
            titleMain: { type: String, default: 'One Destination.' },
            titleHighlight: { type: String, default: ' Two Ways to Play.' },
            description: { type: String, default: 'Book your day at the waterpark or your stay at the resort—or both. Pick an option below to get started.' }
        },
        cards: [{
            title: { type: String, required: true },
            description: { type: String, required: true },
            buttonText: { type: String, required: true },
            buttonLink: { type: String, required: true },
            backgroundImage: { type: String, required: true },
            iconUrl: { type: String }
        }]
    },
    bookingFlow: {
        form: {
            subtitle: { type: String, default: 'WATERPARK BOOKING' },
            title: { type: String, default: 'Book Your Waterpark Tickets' },
            labels: {
                name: { type: String, default: 'Name' },
                namePlaceholder: { type: String, default: 'Enter your name' },
                visitDate: { type: String, default: 'Visit Date' },
                tickets: { type: String, default: 'How Many Tickets' },
                paymentMethod: { type: String, default: 'Payment Method' },
                totalAmount: { type: String, default: 'Total Amount' },
                currencyPrefix: { type: String, default: 'INR' },
                calculationPrefix: { type: String, default: 'Calculation:' },
                buttonText: { type: String, default: 'Proceed to Payment' }
            },
            paymentOptions: [{ type: String }]
        },
        successModal: {
            title: { type: String, default: 'Congratulations!' },
            message: { type: String, default: 'Your booking ticket has been confirmed successfully.' },
            buttonText: { type: String, default: 'OK' }
        }
    },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);