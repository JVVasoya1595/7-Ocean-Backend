const Resort = require('../models/Resort');
const { encrypt, decrypt } = require('../utils/encryption');

// Helper to get or create Resort document
const getOrCreateResortDoc = async () => {
    let resort = await Resort.findOne();
    if (!resort) {
        resort = await Resort.create({
            hero: {
                background: { imageUrl: '/resort.png' },
                infoBox: {
                    title: 'Resort',
                    pagePath: [
                        { label: 'Home', url: '/' },
                        { label: 'Resort', url: '/resort' }
                    ]
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
                checkInLabel: 'Check In',
                checkOutLabel: 'Check Out',
                adultsLabel: 'Adults',
                childrenLabel: 'Children',
                roomTypeLabel: 'Room Type',
                buttonText: 'Check Availability'
            },
            stayAndRecharge: {
                text: {
                    subtitle: 'STAY & RECHARGE',
                    title: 'A Nature-Led',
                    highlightedTitle: ' Resort Escape',
                    description: 'Inspired by premium retreat experiences, the 7-Oceans Resort blends lush scenery, curated hospitality, and contemporary comfort to create a stay that feels both peaceful and memorable.'
                },
                image: {
                    imageUrl: '/resort.png',
                    badges: ['Signature Stay', 'Open Year-Round']
                },
                tags: ['Lakefront Walks', 'Private Lawn Events', 'Sunset Dining', 'Weekend Retreats', 'Family Staycations'],
                cards: [
                    {
                        imageUrl: '/evening.png',
                        title: 'Crafted Stays',
                        description: 'Villas and suites designed for privacy, natural light, and slow-luxury comfort.'
                    },
                    {
                        imageUrl: '/pooldining.png',
                        title: 'Wellness & Calm',
                        description: 'Guided relaxation moments, open-air calm zones, and a restorative resort atmosphere.'
                    },
                    {
                        imageUrl: '/resturant.png',
                        title: 'Curated Dining',
                        description: 'Regional and global flavors, sunset seating, and handcrafted evening menu experiences.'
                    }
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
                        {
                            imageUrl: '/resort.png',
                            priceTag: 'from ₹12,500/night',
                            title: 'Deluxe Room',
                            description: 'Comfortable room with modern amenities and resort views.',
                            features: ['2 Guests', 'Breakfast', 'Pool Access']
                        },
                        {
                            imageUrl: '/evening.png',
                            priceTag: 'from ₹16,900/night',
                            title: 'Premium Suite',
                            description: 'Spacious suite with private balcony and evening pool access.',
                            features: ['4 Guests', 'Breakfast + Hi-Tea', 'Private Sit-Out']
                        },
                        {
                            imageUrl: '/pooldining.png',
                            priceTag: 'from ₹9,800/night',
                            title: 'Family Villa',
                            description: 'Private villa with pool, lounge area and curated dining.',
                            features: ['2 Guests', 'Breakfast', 'Poolside Lounge']
                        }
                    ]
                }
            },
            testimonials: {
                subtitle: 'GUEST VOICES',
                title: 'Resort Testimonials',
                items: [
                    {
                        imageUrl: '/resort.png',
                        quote: 'The resort feels peaceful yet vibrant. Mornings by the lake and evenings at the lounge were perfect.',
                        author: 'Aanya Rao',
                        location: 'Bengaluru'
                    },
                    {
                        imageUrl: '/pooldining.png',
                        quote: 'We came for a weekend retreat and stayed longer. Service, room comfort, and atmosphere were truly premium.',
                        author: 'Karan Mehta',
                        location: 'Mumbai'
                    }
                ]
            }
        });
    }
    return resort;
};


// @desc    Get Resort Hero Background
// @route   GET /resort/hero/background
// @access  Admin / BackendWorker / FrontendWorker
exports.getResortHeroBackground = async (req, res) => {
    try {
        const resort = await getOrCreateResortDoc();
        const encryptedData = encrypt({ background: resort.hero.background });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Resort Hero Background
// @route   GET /resort/hero/background/update
// @access  Admin / BackendWorker
exports.updateResortHeroBackground = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });
        const decryptedData = decrypt(req.body.encryptedToken);
        const { background } = decryptedData;
        const resort = await getOrCreateResortDoc();
        if (background) {
            if (background.imageUrl) resort.hero.background.imageUrl = background.imageUrl;
        }
        await resort.save();
        const encryptedResponse = encrypt({ background: resort.hero.background });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get Resort Hero InfoBox
// @route   GET /resort/hero/infobox
// @access  Admin / BackendWorker / FrontendWorker
exports.getResortHeroInfoBox = async (req, res) => {
    try {
        const resort = await getOrCreateResortDoc();
        const encryptedData = encrypt({ infoBox: resort.hero.infoBox });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Resort Hero InfoBox
// @route   GET /resort/hero/infobox/update
// @access  Admin / BackendWorker
exports.updateResortHeroInfoBox = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { infoBox } = decryptedData;

        const resort = await getOrCreateResortDoc();
        if (infoBox) {
            if (infoBox.title) resort.hero.infoBox.title = infoBox.title;
            if (infoBox.pagePath) resort.hero.infoBox.pagePath = infoBox.pagePath;
        }
        await resort.save();

        const encryptedResponse = encrypt({ infoBox: resort.hero.infoBox });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get Resort Introduction
// @route   GET /resort/introduction
// @access  Admin / BackendWorker / FrontendWorker
exports.getResortIntroduction = async (req, res) => {
    try {
        const resort = await getOrCreateResortDoc();
        const encryptedData = encrypt({ introduction: resort.introduction });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Resort Introduction
// @route   GET /resort/introduction/update
// @access  Admin / BackendWorker
exports.updateResortIntroduction = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });
        const decryptedData = decrypt(req.body.encryptedToken);
        const { introduction } = decryptedData;
        const resort = await getOrCreateResortDoc();
        if (introduction) {
            resort.introduction = introduction;
        }
        await resort.save();
        const encryptedResponse = encrypt({ introduction: resort.introduction });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get Resort Booking Form
// @route   GET /resort/booking-form
// @access  Admin / BackendWorker / FrontendWorker
exports.getResortBookingForm = async (req, res) => {
    try {
        const resort = await getOrCreateResortDoc();
        const encryptedData = encrypt({ bookingForm: resort.bookingForm });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Resort Booking Form
// @route   GET /resort/booking-form/update
// @access  Admin / BackendWorker
exports.updateResortBookingForm = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });
        const decryptedData = decrypt(req.body.encryptedToken);
        const { bookingForm } = decryptedData;
        const resort = await getOrCreateResortDoc();
        if (bookingForm) {
            Object.assign(resort.bookingForm, bookingForm);
        }
        await resort.save();
        const encryptedResponse = encrypt({ bookingForm: resort.bookingForm });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get Resort Stay And Recharge Text
// @route   GET /resort/stay-and-recharge/text
// @access  Admin / BackendWorker / FrontendWorker
exports.getResortStayAndRechargeText = async (req, res) => {
    try {
        const resort = await getOrCreateResortDoc();
        const encryptedData = encrypt({ text: resort.stayAndRecharge.text });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Resort Stay And Recharge Text
// @route   GET /resort/stay-and-recharge/text/update
// @access  Admin / BackendWorker
exports.updateResortStayAndRechargeText = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });
        const decryptedData = decrypt(req.body.encryptedToken);
        const { text } = decryptedData;
        const resort = await getOrCreateResortDoc();
        if (text) {
            Object.assign(resort.stayAndRecharge.text, text);
        }
        await resort.save();
        const encryptedResponse = encrypt({ text: resort.stayAndRecharge.text });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get Resort Stay And Recharge Image
// @route   GET /resort/stay-and-recharge/image
// @access  Admin / BackendWorker / FrontendWorker
exports.getResortStayAndRechargeImage = async (req, res) => {
    try {
        const resort = await getOrCreateResortDoc();
        const encryptedData = encrypt({ image: resort.stayAndRecharge.image });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Resort Stay And Recharge Image
// @route   GET /resort/stay-and-recharge/image/update
// @access  Admin / BackendWorker
exports.updateResortStayAndRechargeImage = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });
        const decryptedData = decrypt(req.body.encryptedToken);
        const { image } = decryptedData;
        const resort = await getOrCreateResortDoc();
        if (image) {
            Object.assign(resort.stayAndRecharge.image, image);
        }
        await resort.save();
        const encryptedResponse = encrypt({ image: resort.stayAndRecharge.image });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get Resort Stay And Recharge Tags
// @route   GET /resort/stay-and-recharge/tags
// @access  Admin / BackendWorker / FrontendWorker
exports.getResortStayAndRechargeTags = async (req, res) => {
    try {
        const resort = await getOrCreateResortDoc();
        const encryptedData = encrypt({ tags: resort.stayAndRecharge.tags });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Resort Stay And Recharge Tags
// @route   GET /resort/stay-and-recharge/tags/update
// @access  Admin / BackendWorker
exports.updateResortStayAndRechargeTags = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });
        const decryptedData = decrypt(req.body.encryptedToken);
        const { tags } = decryptedData;
        const resort = await getOrCreateResortDoc();
        if (tags) {
            resort.stayAndRecharge.tags = tags;
        }
        await resort.save();
        const encryptedResponse = encrypt({ tags: resort.stayAndRecharge.tags });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get Resort Stay And Recharge Cards
// @route   GET /resort/stay-and-recharge/cards
// @access  Admin / BackendWorker / FrontendWorker
exports.getResortStayAndRechargeCards = async (req, res) => {
    try {
        const resort = await getOrCreateResortDoc();
        const encryptedData = encrypt({ cards: resort.stayAndRecharge.cards });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Resort Stay And Recharge Cards
// @route   GET /resort/stay-and-recharge/cards/update
// @access  Admin / BackendWorker
exports.updateResortStayAndRechargeCards = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });
        const decryptedData = decrypt(req.body.encryptedToken);
        const { cards } = decryptedData;
        const resort = await getOrCreateResortDoc();
        if (cards) {
            resort.stayAndRecharge.cards = cards;
        }
        await resort.save();
        const encryptedResponse = encrypt({ cards: resort.stayAndRecharge.cards });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get Resort Room Categories Banner
// @route   GET /resort/room-categories/banner
// @access  Admin / BackendWorker / FrontendWorker
exports.getResortRoomCategoriesBanner = async (req, res) => {
    try {
        const resort = await getOrCreateResortDoc();
        const encryptedData = encrypt({ banner: resort.roomCategories.banner });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Resort Room Categories Banner
// @route   GET /resort/room-categories/banner/update
// @access  Admin / BackendWorker
exports.updateResortRoomCategoriesBanner = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });
        const decryptedData = decrypt(req.body.encryptedToken);
        const { banner } = decryptedData;
        const resort = await getOrCreateResortDoc();
        if (banner) {
            Object.assign(resort.roomCategories.banner, banner);
        }
        await resort.save();
        const encryptedResponse = encrypt({ banner: resort.roomCategories.banner });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get Resort Room Categories Options
// @route   GET /resort/room-categories/options
// @access  Admin / BackendWorker / FrontendWorker
exports.getResortRoomCategoriesOptions = async (req, res) => {
    try {
        const resort = await getOrCreateResortDoc();
        const encryptedData = encrypt({ options: resort.roomCategories.options });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Resort Room Categories Options
// @route   GET /resort/room-categories/options/update
// @access  Admin / BackendWorker
exports.updateResortRoomCategoriesOptions = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });
        const decryptedData = decrypt(req.body.encryptedToken);
        const { options } = decryptedData;
        const resort = await getOrCreateResortDoc();
        if (options) {
            Object.assign(resort.roomCategories.options, options);
        }
        await resort.save();
        const encryptedResponse = encrypt({ options: resort.roomCategories.options });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get Resort Testimonials
// @route   GET /resort/testimonials
// @access  Admin / BackendWorker / FrontendWorker
exports.getResortTestimonials = async (req, res) => {
    try {
        const resort = await getOrCreateResortDoc();
        const encryptedData = encrypt({ testimonials: resort.testimonials });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Resort Testimonials
// @route   GET /resort/testimonials/update
// @access  Admin / BackendWorker
exports.updateResortTestimonials = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });
        const decryptedData = decrypt(req.body.encryptedToken);
        const { testimonials } = decryptedData;
        const resort = await getOrCreateResortDoc();
        if (testimonials) {
            Object.assign(resort.testimonials, testimonials);
        }
        await resort.save();
        const encryptedResponse = encrypt({ testimonials: resort.testimonials });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
