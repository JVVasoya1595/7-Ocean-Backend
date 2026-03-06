const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Models
const Home = require('../models/Home');
const Bar = require('../models/Bar');
const Resort = require('../models/Resort');
const About = require('../models/About');
const Book = require('../models/Book');
const Contact = require('../models/Contact');
const Gallery = require('../models/Gallery');
const Navbar = require('../models/Navbar');
const Footer = require('../models/Footer');
const Logo = require('../models/Logo');
const WelcomePopup = require('../models/WelcomePopup');

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

// ─────────────────────────────────────────────────────────────
// SEED DATA
// ─────────────────────────────────────────────────────────────

const homeData = {
    hero: {
        background: '/hero-bg-2.png',
        text: {
            title: '7-OCEANS WATERPARK & RESORT',
            tagline: 'Splash Into Adventure, Stay For The Experience.'
        }
    },
    quickAccess: {
        text: { tagline: 'Splash, stay & unwind', title: 'The Waterpark & More' },
        cards: [
            { title: 'Waterpark', subtitle: 'Splash & thrill', features: 'Slides • Waves • Adventure', bgImage: '/waterpark.png' },
            { title: 'Resort', subtitle: 'Stay & recharge', features: 'Rooms • Cabanas • Comfort', bgImage: '/resort.png' },
            { title: 'Bar', subtitle: 'Drinks & views', features: 'Mocktails • Music • Lounge', bgImage: '/bar.png' }
        ],
        decorations: [
            { iconUrl: '/dolphin-1.png', position: 'top-left' },
            { iconUrl: '/dolphin-2.png', position: 'bottom-right' }
        ]
    },
    diningAndMore: {
        background: { imageUrl: '/dining-bg-pattern.png', animationStyle: 'float', animationSpeed: '2s' },
        text: {
            tagline: 'DINING & MORE',
            title: 'Water Fun, Dining & More',
            description: 'The island boasts food and beverage outlets, retail stores, changing rooms and a locker, plus private cabanas with pontoon access.'
        },
        posters: [
            { imageUrl: '/dining-1.jpg', title: 'Poolside Bar', description: 'Refreshing drinks by the pool.', buttonLabel: 'View Menu', buttonUrl: '/bar' },
            { imageUrl: '/dining-2.jpg', title: 'Resort Restaurant', description: 'Chef-led multi-cuisine dining.', buttonLabel: 'View Menu', buttonUrl: '/restaurant' }
        ]
    },
    signatureAttractions: {
        text: { tagline: 'SIGNATURE ATTRACTIONS', title: 'Our Iconic Resort' },
        categories: [
            { iconUrl: '/icon-ride.png', title: 'Ride', subtitle: 'Rides' },
            { iconUrl: '/icon-water.png', title: 'Water', subtitle: 'Slides' },
            { iconUrl: '/icon-resort.png', title: 'Resort', subtitle: 'Comfort' }
        ],
        cards: [
            { imageUrl: '/resturant.png', title: 'Luxury Poolside Resort', description: 'Unwind in a serene poolside setting.', buttonLabel: 'RIDE DETAILS', buttonUrl: '/rides/poolside' },
            { imageUrl: '/pooldining.png', title: 'Family Stay Villas', description: 'Spacious villas for families.', buttonLabel: 'RIDE DETAILS', buttonUrl: '/rides/villas' },
            { imageUrl: '/evening.png', title: 'Evening Leisure & Dining', description: 'Relaxed evenings with ambient lighting.', buttonLabel: 'RIDE DETAILS', buttonUrl: '/rides/evening' }
        ]
    },
    bookingBar: {
        background: { patternUrl: '/booking-wave.svg' },
        decorations: [{ iconUrl: '/dolphin-blue.png', position: 'bottom-right' }],
        title: { text: 'Water Park', iconUrl: '/dot-icon.png' },
        formLabels: {
            dateLabel: 'Date', adultLabel: 'Adult', juniorLabel: 'Junior',
            buttonLabel: 'Confirm', buttonUrl: '/checkout'
        }
    },
    resortAmenities: {
        background: { patternUrl: '/amenities-bg-pattern.svg' },
        decorations: [{ iconUrl: '/dolphin-green.png', position: 'top-right' }],
        text: {
            tagline: 'RESORT COMFORT',
            title: 'Resort Amenities',
            description: 'Unwind and have non-stop fun with premium amenities, perfectly tailored for you.'
        },
        amenities: [
            { iconUrl: '/amenity-waterpark.png', description: 'Steps away from 7-Oceans Water Park' },
            { iconUrl: '/amenity-tropical.png', description: 'Nestled in a lush tropical setting' },
            { iconUrl: '/amenity-restaurant.png', description: 'Multi-cuisine restaurant and poolside bar' },
            { iconUrl: '/amenity-banquet.png', description: 'Banquet and event spaces' },
            { iconUrl: '/amenity-outdoor.png', description: 'Outdoor fun with cycling' },
            { iconUrl: '/amenity-pool.png', description: 'Temperature-controlled pools' }
        ]
    },
    guestReviews: {
        background: { patternUrl: '/reviews-wave.svg' },
        decorations: [{ iconUrl: '/review-star.png', position: 'top-left' }],
        text: { tagline: 'GUEST REVIEWS', title: 'What Guests Say' },
        reviews: [
            { avatarInitial: 'A', avatarColor: 'bg-teal-700', rating: 5, text: 'Amazing experience! The water slides were fantastic.', guestName: 'Arjun Mehta', date: 'Feb 2026' },
            { avatarInitial: 'S', avatarColor: 'bg-blue-700', rating: 5, text: 'Perfect family outing. Kids loved every second!', guestName: 'Sunita Rao', date: 'Jan 2026' },
            { avatarInitial: 'R', avatarColor: 'bg-green-700', rating: 4, text: 'Great ambiance, food and service were top-notch.', guestName: 'Rahul Sharma', date: 'Dec 2025' }
        ]
    },
    isActive: true
};

const barData = {
    hero: {
        background: { imageUrl: '/bar-neon.png' },
        infoBox: {
            title: 'Bar',
            pagePath: [{ label: 'Home', url: '/' }, { label: 'Bar', url: '/bar' }]
        }
    },
    introduction: {
        parts: [
            { type: 'text', content: 'Welcome to the 7-Oceans Bar — your go-to spot for handcrafted drinks, sunset vibes, and island energy.' },
            { type: 'image', content: '/bar-neon.png', altText: 'Bar Introduction' }
        ]
    },
    drinksAndViews: {
        text: {
            tagline: 'DRINKS & VIEWS',
            title: 'Bar',
            highlightedTitle: ' at 7-Oceans',
            description: 'A lively, neon-inspired bar experience with handcrafted drinks, sunset energy, and island lounge vibes.'
        },
        tags: ['Neon Nights', 'Live DJ Evenings', 'Poolside Lounge', 'Sunset Sessions'],
        cards: [
            { imageUrl: '/ocean-mint-cooler.png', badge: 'Signature Mocktail', title: 'Ocean Mint Cooler', description: 'Mint, citrus, sparkling tonic, blue blend' },
            { imageUrl: '/sunset-citrus-fizz.png', badge: 'House Favorite', title: 'Sunset Citrus Fizz', description: 'Orange peel, ginger syrup, fresh soda lift' },
            { imageUrl: '/lagoon-spice-punch.png', badge: 'Tropical Special', title: 'Lagoon Spice Punch', description: 'Pineapple, spice notes, chilled island mix' }
        ]
    },
    discoverCocktails: {
        text: {
            title: 'Discover the Best Cocktails',
            highlightedTitle: ' at 7-Oceans',
            subtitle: 'Visit our bar by the pool—signature drinks, sunset vibes, and island energy.',
            description: 'If you\'re at 7-Oceans we guarantee our cocktails will hit the spot.'
        },
        videos: [{ videoUrl: '/bar-video.mp4', thumbnailUrl: '/bar-neon.png' }]
    },
    perfectDrink: {
        text: {
            description: 'With the bar at 7-Oceans, you\'re never far from a perfect drink.',
            subtitle: 'OUR BAR OFFERS YOU BESPOKE',
            title: 'COCKTAILS & POOLSIDE VIBES'
        },
        images: [
            { imageUrl: '/rides.png' },
            { imageUrl: '/waterpark.png' },
            { imageUrl: '/bar-neon.png' },
            { imageUrl: '/dinningdish.png' },
            { imageUrl: '/parkmap.png' },
            { imageUrl: '/resort.png' },
            { imageUrl: '/ticket.png' },
            { imageUrl: '/retail.png' },
            { imageUrl: '/evening.png' },
            { imageUrl: '/resturant.png' },
            { imageUrl: '/pooldining.png' },
            { imageUrl: '/hero-bg-2.png' }
        ]
    },
    reservations: {
        title: 'RESERVATIONS',
        description: 'Reserve your table for curated drinks, music, and an elevated bar atmosphere.',
        buttonText: 'Book Bar Experience',
        buttonLink: '/book'
    },
    isActive: true
};

const resortData = {
    hero: {
        background: { imageUrl: '/resort.png' },
        infoBox: {
            title: 'Resort',
            pagePath: [{ label: 'Home', url: '/' }, { label: 'Resort', url: '/resort' }]
        }
    },
    introduction: {
        parts: [
            { type: 'text', content: 'Discover ' },
            { type: 'image', content: '/evening.png', altText: 'Resort at Night' },
            { type: 'text', content: ' a refined world of ' },
            { type: 'image', content: '/pooldining.png', altText: 'Pool Dining' },
            { type: 'text', content: '\ntropical indulgence\nat our ' },
            { type: 'image', content: '/resturant.png', altText: '7-Oceans Restaurant' },
            { type: 'text', content: ' 7 Oceans Luxury Resort' }
        ]
    },
    bookingForm: {
        checkInLabel: 'Check In', checkOutLabel: 'Check Out', adultsLabel: 'Adults',
        childrenLabel: 'Children', roomTypeLabel: 'Room Type', buttonText: 'Check Availability'
    },
    stayAndRecharge: {
        text: {
            subtitle: 'STAY & RECHARGE',
            title: 'A Nature-Led',
            highlightedTitle: ' Resort Escape',
            description: 'Inspired by premium retreat experiences, the 7-Oceans Resort blends lush scenery, curated hospitality, and contemporary comfort to create a stay that feels both peaceful and memorable.'
        },
        image: { imageUrl: '/resort.png', badges: ['Signature Stay', 'Open Year-Round'] },
        tags: ['Lakefront Walks', 'Private Lawn Events', 'Sunset Dining', 'Weekend Retreats', 'Family Staycations'],
        cards: [
            { imageUrl: '/evening.png', title: 'Crafted Stays', description: 'Villas and suites designed for privacy, natural light, and slow-luxury comfort.' },
            { imageUrl: '/pooldining.png', title: 'Wellness & Calm', description: 'Guided relaxation moments, open-air calm zones, and a restorative resort atmosphere.' },
            { imageUrl: '/resturant.png', title: 'Curated Dining', description: 'Regional and global flavors, sunset seating, and handcrafted evening menu experiences.' }
        ]
    },
    roomCategories: {
        banner: {
            imageUrl: '/hero-bg-2.png',
            tag: 'Signature Retreat Experience',
            title: 'Slow mornings, lush landscapes, and immersive resort living.'
        },
        options: {
            subtitle: 'ROOM CATEGORIES',
            title: 'Stay Options & Pricing',
            cards: [
                { imageUrl: '/resort.png', priceTag: '₹6,500/night', title: 'Deluxe Room', description: 'Comfortable room with modern amenities and resort views.', features: ['AC', 'King Bed', 'Wi-Fi', 'Breakfast'] },
                { imageUrl: '/evening.png', priceTag: '₹9,500/night', title: 'Premium Suite', description: 'Spacious suite with private balcony and evening pool access.', features: ['AC', 'King Bed', 'Jacuzzi', 'Breakfast', 'Wi-Fi'] },
                { imageUrl: '/pooldining.png', priceTag: '₹18,000/night', title: 'Family Villa', description: 'Private villa with pool, lounge area and curated dining.', features: ['Pool', '3 Bedrooms', 'Kitchen', 'Wi-Fi', 'Breakfast'] }
            ]
        }
    },
    testimonials: {
        subtitle: 'GUEST VOICES',
        title: 'Resort Testimonials',
        items: [
            { imageUrl: '/resort.png', quote: 'The resort feels peaceful yet vibrant. Mornings by the lake and evenings at the lounge were perfect.', author: 'Aanya Rao', location: 'Bengaluru' },
            { imageUrl: '/pooldining.png', quote: 'We came for a weekend retreat and stayed longer. Service, room comfort, and atmosphere were truly premium.', author: 'Karan Mehta', location: 'Mumbai' }
        ]
    },
    isActive: true
};


const aboutData = {
    hero: {
        background: { imageUrl: '/resort.png' },
        infoBox: {
            title: 'About 7-Oceans',
            pagePath: [{ label: 'Home', url: '/' }, { label: 'About', url: '/about' }]
        }
    },
    ourStory: {
        image: { url: '/pooldining.png' },
        callCenter: { label: 'CALL CENTER 24/7', phone: '+1 (212) 578-5758', iconUrl: '/icon-phone.png' },
        textContent: {
            subtitle: 'OUR STORY',
            titleMain: 'Refined Destination for',
            titleHighlight: ' Beachside Living',
            description: 'Designed for those who appreciate style, atmosphere, and meaningful moments, 7-Oceans Waterpark & Resort invites you to relax, celebrate, and indulge in a lifestyle shaped by warmth, rhythm, and effortless luxury.'
        },
        button: { label: 'Explore Activities', url: '/activities' }
    },
    ourPurpose: {
        textContent: {
            subtitle: 'OUR PURPOSE',
            titleMain: 'Where Water Meets',
            titleHighlight: ' Wonder',
            description: 'We create a place where slides, pools, and resort comfort come together—so every guest can make a splash, unwind by the water, and leave with moments worth remembering.'
        },
        cards: [
            { title: 'Vision', description: 'To be the leading waterpark and resort where families and friends enjoy thrills, relaxation, and beachside vibes in one place.', iconUrl: '/icon-vision.png' },
            { title: 'Mission', description: 'To deliver safe, exciting rides, refreshing pools, and warm hospitality so every guest has a memorable day at 7-Oceans.', iconUrl: '/icon-mission.png' }
        ],
        image: {
            url: '/waterpark.png',
            statBox: { value: '150K+', label: 'Guests Welcomed' }
        }
    },
    ourValues: {
        textContent: {
            subtitle: 'OUR VALUES',
            titleMain: 'Principles That Shape',
            titleHighlight: ' the 7-Oceans Experience',
            description: 'Our values guide how we design rides, host guests, and create unforgettable moments across the park.'
        },
        cards: [
            { title: 'Ride Safety First', description: 'Designing and operating every slide and attraction with the highest safety standards.', iconUrl: '/icon-safety.png' },
            { title: 'Thrill & Fun', description: 'Creating exciting water rides and experiences that spark joy for every age group.', iconUrl: '/icon-thrill.png' },
            { title: 'Island Atmosphere', description: 'Blending tropical design, music, and water elements to deliver a true island vibe.', iconUrl: '/icon-island.png' },
            { title: 'Guest Care', description: 'Welcoming every guest with friendly service, comfort, and attention throughout the park.', iconUrl: '/icon-care.png' }
        ],
        banner: {
            imageUrl: '/hero-bg-2.png',
            title: 'Make Waves at 7-Oceans',
            buttonText: 'Explore Attractions →',
            buttonLink: '/attractions'
        }
    },
    excellence: {
        textContent: {
            subtitle: 'RECOGNIZED EXCELLENCE',
            titleMain: 'Honors That Reflect Our',
            titleHighlight: ' Excellence',
            description: 'Awards and recognition from industry and guests remind us to keep raising the bar for waterpark and resort experiences.'
        },
        video: {
            thumbnailUrl: '/evening.png',
            videoUrl: '/about-excellence-video.mp4'
        },
        awards: [
            { year: '2024', title: 'Best Family Waterpark', issuer: 'Regional Hospitality Awards' },
            { year: '2023', title: 'Excellence in Guest Experience', issuer: 'Travel & Leisure Magazine' },
            { year: '2022', title: 'Top Resort & Attraction', issuer: 'Coastal Tourism Board' }
        ]
    },
    isActive: true
};

const bookData = {
    hero: {
        background: { imageUrl: '/waterpark.png' },
        textContent: { description: 'Dive into our exhilarating water slides, lazy river, and wave pool. Book your unforgettable getaway today!' },
        infoBox: {
            title: 'Book Your Experience',
            pagePath: [{ label: 'Home', url: '/' }, { label: 'Book', url: '/book' }]
        }
    },
    experiences: {
        text: {
            subtitle: 'CHOOSE YOUR EXPERIENCE',
            titleMain: 'One Destination.',
            titleHighlight: ' Two Ways to Play.',
            description: 'Book your day at the waterpark or your stay at the resort—or both.'
        },
        cards: [
            {
                title: 'Waterpark',
                description: 'Slides, wave pools, and endless splash. Book day tickets and get ready for a fun-filled day.',
                buttonText: 'Book Waterpark Tickets →',
                buttonLink: '/book/waterpark',
                backgroundImage: '/waterpark.png',
                iconUrl: '/ticket.png'
            },
            {
                title: 'Resort',
                description: 'Stay, relax, and recharge. Rooms, cabanas, and beachside comfort for the perfect getaway.',
                buttonText: 'Book Resort Stay →',
                buttonLink: '/book/resort',
                backgroundImage: '/resort.png',
                iconUrl: '/parkmap.png'
            }
        ]
    },
    bookingFlow: {
        form: {
            subtitle: 'WATERPARK BOOKING',
            title: 'Book Your Waterpark Tickets',
            labels: {
                name: 'Name', namePlaceholder: 'Enter your name',
                visitDate: 'Visit Date', tickets: 'How Many Tickets',
                paymentMethod: 'Payment Method', totalAmount: 'Total Amount',
                currencyPrefix: 'INR', calculationPrefix: 'Calculation:',
                buttonText: 'Proceed to Payment'
            },
            paymentOptions: ['Credit Card', 'Debit Card', 'UPI', 'Net Banking']
        },
        successModal: {
            title: 'Congratulations!',
            message: 'Your booking ticket has been confirmed successfully.',
            buttonText: 'OK'
        }
    },
    isActive: true
};

const contactData = {
    hero: {
        background: { imageUrl: '/hero-bg-2.png' },
        infoBox: {
            title: 'Get in touch',
            pagePath: [{ label: 'Home', url: '/' }, { label: 'Contact', url: '/contact' }]
        }
    },
    getInTouch: {
        textContent: {
            subtitle: 'GET IN TOUCH',
            titleMain: 'We\'d Love to Hear',
            titleHighlight: ' from You',
            description: 'Have a question, reservation inquiry, or special request? Our team will respond with care and attention.'
        },
        imageBox: {
            imageUrl: '/resort.png',
            socialLabel: 'Follow Us',
            socialLinks: [
                { iconUrl: '/icon-x.png', platformUrl: 'https://x.com/7oceans' },
                { iconUrl: '/icon-facebook.png', platformUrl: 'https://facebook.com/7oceans' },
                { iconUrl: '/icon-instagram.png', platformUrl: 'https://instagram.com/7oceans' },
                { iconUrl: '/icon-tiktok.png', platformUrl: 'https://tiktok.com/@7oceans' },
                { iconUrl: '/icon-youtube.png', platformUrl: 'https://youtube.com/c/7oceans' }
            ]
        },
        form: {
            name: { label: 'Name *', placeholder: 'Enter your name' },
            email: { label: 'Email *', placeholder: 'Enter your email' },
            phone: { label: 'Phone *', placeholder: 'Enter your phone' },
            subject: { label: 'Subject *', placeholder: 'Enter your subject' },
            message: { label: 'Message', placeholder: 'Write your message here' },
            termsText: 'I have read and accepted terms and privacy.',
            buttonText: 'Send Message'
        }
    },
    reachUs: {
        mapIframeUrl: 'https://www.google.com/maps/embed?pb=!1m18!...',
        textContent: {
            subtitle: 'REACH US',
            titleMain: 'Everything You Need to',
            titleHighlight: ' Contact 7-Oceans',
            description: "Find our location, phone number, and contact details to connect with 7-Oceans effortlessly. We're always ready to assist your plans and inquiries."
        },
        contactCards: [
            { iconUrl: '/icon-phone.png', label: 'Call Center 24/7', value: '+1 (212) 578-5758' },
            { iconUrl: '/icon-email.png', label: 'Send Message', value: 'contact@7oceans.com' }
        ]
    },
    needToKnow: {
        textContent: {
            subtitle: 'NEED TO KNOW',
            titleMain: 'Everything You Need',
            titleHighlight: ' Before You Visit',
            description: 'Find quick answers to common questions about reservations, dress code, events, and facilities to help you plan a seamless and enjoyable experience at 7-Oceans.',
            contactText: 'Still have any questions?',
            contactLinkText: 'Contact Us →',
            contactLinkUrl: '/contact'
        },
        faqs: [
            { question: 'Do I need a reservation to visit 7-Oceans?', answer: 'Reservations are recommended, especially on weekends and during special events, to ensure the best experience.' },
            { question: 'Is there a dress code at 7-Oceans?', answer: 'We recommend casual and comfortable beachwear or resort attire.' },
            { question: 'Are events open to the public?', answer: 'Most events are open to the public; check our calendar for private gatherings.' },
            { question: 'What facilities can guests enjoy?', answer: 'Guests can enjoy a range of facilities including pools, lounges, cabanas, and dining options.' },
            { question: 'Is 7-Oceans suitable for private or group events?', answer: 'Yes, we offer extensive venues for private and corporate group gatherings.' },
            { question: 'What are the operating hours?', answer: 'We operate daily from 9:00 AM to 10:00 PM.' }
        ]
    },
    isActive: true
};

const galleryData = {
    hero: {
        background: { imageUrl: '/hero-bg-2.png' },
        infoBox: {
            title: 'Gallery',
            pagePath: [{ label: 'Home', url: '/' }, { label: 'Gallery', url: '/gallery' }]
        }
    },
    gridSection: {
        textContent: {
            subtitle: 'CAPTURED MOMENTS',
            titleMain: 'A Funky Look Into',
            titleHighlight: ' 7-Oceans'
        },
        categories: ['All', 'Rides', 'Resort', 'Dining', 'Moments'],
        images: [
            { imageUrl: '/rides.png', category: 'Rides', title: 'Sky Loop Rush' },
            { imageUrl: '/waterpark.png', category: 'Rides', title: 'Blue Wave Deck' },
            { imageUrl: '/bar-neon.png', category: 'Dining', title: 'Neon Bar Corner' },
            { imageUrl: '/dinningdish.png', category: 'Dining', title: 'Signature Plates' },
            { imageUrl: '/parkmap.png', category: 'Moments', title: 'Park Map Snap' },
            { imageUrl: '/resort.png', category: 'Resort', title: 'Resort Serenity' },
            { imageUrl: '/ticket.png', category: 'Moments', title: 'Ticket Gate Energy' },
            { imageUrl: '/retail.png', category: 'Moments', title: 'Retail Walkthrough' }
        ],
        footer: {
            text: 'Want your moment featured in the 7-Oceans gallery wall?',
            buttonLabel: 'Share Your Story →',
            buttonLink: '/share-story'
        }
    },
    isActive: true
};

const navbarData = {
    logo: { imageUrl: '/logo.png', altText: '7-Oceans Logo' },
    background: {
        decorations: [
            { iconUrl: '/waterdrop-1.png', position: 'top-left' },
            { iconUrl: '/waterdrop-2.png', position: 'top-right' }
        ]
    },
    links: [
        {
            label: 'HORECA', iconUrl: '/icon-horeca.png', url: '#', hasDropdown: true,
            dropdownItems: [{ label: 'Bar', url: '/bar' }, { label: 'Resort', url: '/resort' }]
        },
        { label: 'BOOK', iconUrl: '', url: '/book', hasDropdown: false, dropdownItems: [] },
        { label: 'ABOUT', iconUrl: '', url: '/about', hasDropdown: false, dropdownItems: [] },
        { label: 'CONTACT', iconUrl: '', url: '/contact', hasDropdown: false, dropdownItems: [] },
        { label: 'GALLERY', iconUrl: '', url: '/gallery', hasDropdown: false, dropdownItems: [] }
    ],
    actionButton: { label: 'BOOK NOW', url: '/book' }
};

const footerData = {
    logo: { imageUrl: '/footer-logo.png', altText: '7-Oceans Logo' },
    links: [
        { label: 'Rides', url: '/#rides' },
        { label: 'Experience', url: '/#experience' },
        { label: 'Resort', url: '/resort' },
        { label: 'Book', url: '/book' },
        { label: 'Gallery', url: '/gallery' }
    ],
    contactInfo: { email: 'info@sevanoceans.com', phone: '+91 234 567 8900' },
    copyright: { text: '© 2026 Sevan Oceans Waterpark & Resort. All rights reserved.' }
};

const logoData = {
    imageUrl: '/logo.png',
    altText: '7-Oceans Waterpark & Resort'
};

const welcomePopupData = {
    image: { imageUrl: '/namaste-woman.jpg', altText: 'Welcome Image' },
    text: {
        subtitle: 'WELCOME',
        title: 'Namaste',
        description: 'Namaste and welcome to 7-Oceans Waterpark & Resort.'
    },
    button: { label: 'Enter Website', url: '/' },
    isActive: true
};

// Generic Page seed (home page content via flexible Map)
const homePageSeed = {
    pageName: 'home',
    seo: {
        title: '7-Oceans Waterpark & Resort',
        description: 'Splash Into Adventure, Stay For The Experience.',
        keywords: ['waterpark', 'resort', 'vacation', '7-oceans']
    },
    sections: new Map([
        ['header', {
            logoUrl: '/logo.png', logoAlt: '7-OCEANS Logo',
            navLinks: [
                { label: 'HORECA', hasDropdown: true, dropdownItems: [{ label: 'Bar', url: '/bar' }, { label: 'Resort', url: '/resort' }] },
                { label: 'BOOK', url: '/book' }, { label: 'ABOUT', url: '/about' },
                { label: 'CONTACT', url: '/contact' }, { label: 'GALLERY', url: '/gallery' }
            ],
            ctaLabel: 'BOOK NOW', ctaUrl: '/book'
        }],
        ['hero', { title: '7-OCEANS WATERPARK & RESORT', tagline: 'Splash Into Adventure, Stay For The Experience.', backgroundUrl: '/hero-bg-2.png' }],
        ['quick_access', {
            tagline: 'Splash, stay & unwind', title: 'The Waterpark & More',
            services: [
                { label: 'Waterpark', description: 'Splash & thrill', details: 'Slides • Waves • Adventure', iconUrl: '/waterpark.png' },
                { label: 'Resort', description: 'Stay & recharge', details: 'Rooms • Cabanas • Comfort', iconUrl: '/resort.png' },
                { label: 'Bar', description: 'Drinks & views', details: 'Mocktails • Music • Lounge', iconUrl: '/bar.png' }
            ]
        }],
        ['footer', {
            links: [
                { label: 'Rides', url: '/#rides' }, { label: 'Experience', url: '/#experience' },
                { label: 'Resort', url: '/resort' }, { label: 'Book', url: '/book' }, { label: 'Gallery', url: '/gallery' }
            ],
            contactEmail: 'info@sevanoceans.com', contactPhone: '+91 234 567 8900',
            copyrightText: '© 2026 Sevan Oceans Waterpark & Resort. All rights reserved.'
        }]
    ])
};

// ─────────────────────────────────────────────────────────────
// SEEDER
// ─────────────────────────────────────────────────────────────

const seedData = async () => {
    try {
        console.log('🗑️  Clearing existing data...');
        await Promise.all([
            Home.deleteMany(),
            Bar.deleteMany(),
            Resort.deleteMany(),
            About.deleteMany(),
            Book.deleteMany(),
            Contact.deleteMany(),
            Gallery.deleteMany(),
            Navbar.deleteMany(),
            Footer.deleteMany(),
            Logo.deleteMany(),
            WelcomePopup.deleteMany()
        ]);

        console.log('🌱 Seeding all models...');
        await Promise.all([
            Home.create(homeData),
            Bar.create(barData),
            Resort.create(resortData),
            About.create(aboutData),
            Book.create(bookData),
            Contact.create(contactData),
            Gallery.create(galleryData),
            Navbar.create(navbarData),
            Footer.create(footerData),
            Logo.create(logoData),
            WelcomePopup.create(welcomePopupData)
        ]);

        console.log('✅ Database seeded successfully! All 12 models populated.');
        process.exit();
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

seedData();
