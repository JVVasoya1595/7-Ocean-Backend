const Home = require('../models/Home');
const { encrypt, decrypt } = require('../utils/encryption');

// Helper to get or create a Home document so we never crash if DB is empty
const getOrCreateHomeDoc = async () => {
    let home = await Home.findOne();
    if (!home) {
        home = await Home.create({
            hero: {
                background: '/hero-bg-2.png',
                text: {
                    title: '7-OCEANS WATERPARK & RESORT',
                    tagline: 'Splash Into Adventure, Stay For The Experience.'
                }
            },
            quickAccess: {
                text: {
                    tagline: 'Splash, stay & unwind',
                    title: 'The Waterpark & More'
                },
                cards: [
                    { title: 'Waterpark', subtitle: 'Slides & wave pools', features: 'Family fun', bgImage: '/qa-park.png' },
                    { title: 'Resort', subtitle: 'Luxury stay', features: 'Ocean view', bgImage: '/qa-resort.png' }
                ],
                decorations: [
                    { iconUrl: '/fish-icon.png', position: 'top-left' }
                ]
            },
            diningAndMore: {
                background: {
                    imageUrl: '/dining-bg-pattern.png',
                    animationStyle: 'float',
                    animationSpeed: '2s'
                },
                text: {
                    tagline: 'DINING & MORE',
                    title: 'Water Fun, Dining & More',
                    description: 'The island boasts food and beverage outlets, retail stores, changing rooms and a locker, plus private cabanas with pontoon access.'
                },
                posters: [
                    { imageUrl: '/dining-1.jpg', title: 'Ocean Grill', description: 'Seafood and steaks.', buttonLabel: 'Menu', buttonUrl: '/dining/grill' },
                    { imageUrl: '/dining-2.jpg', title: 'Sunset Cafe', description: 'Coffee and pastries.', buttonLabel: 'Menu', buttonUrl: '/dining/cafe' }
                ]
            },
            signatureAttractions: {
                text: {
                    tagline: 'SIGNATURE ATTRACTIONS',
                    title: 'Our Iconic Resort'
                },
                categories: [
                    { iconUrl: '/icon-ride.png', title: 'Ride', subtitle: 'Rides' },
                    { iconUrl: '/icon-water.png', title: 'Water', subtitle: 'Water' },
                    { iconUrl: '/icon-resort.png', title: 'Resort', subtitle: 'Resort' }
                ],
                cards: [
                    { imageUrl: '/attr-1.jpg', title: 'The Big Drop', description: 'Tallest slide around.', buttonLabel: 'Discover', buttonUrl: '/attractions/1' },
                    { imageUrl: '/attr-2.jpg', title: 'Lazy River', description: 'Relax all day.', buttonLabel: 'Discover', buttonUrl: '/attractions/2' },
                    { imageUrl: '/attr-3.jpg', title: 'Wave Pool', description: 'Feel the ocean swell.', buttonLabel: 'Discover', buttonUrl: '/attractions/3' }
                ]
            },
            bookingBar: {
                background: { patternUrl: '/booking-wave.svg' },
                decorations: [
                    { iconUrl: '/dolphin-blue.png', position: 'bottom-right' }
                ],
                title: { text: 'Water Park', iconUrl: '/dot-icon.png' },
                formLabels: {
                    dateLabel: 'Date',
                    adultLabel: 'Adult',
                    juniorLabel: 'Junior',
                    buttonLabel: 'Confirm',
                    buttonUrl: '/checkout'
                }
            },
            resortAmenities: {
                background: { patternUrl: '/amenities-bg-pattern.svg' },
                decorations: [
                    { iconUrl: '/palm-leaf.png', position: 'top-right' },
                    { iconUrl: '/starfish.png', position: 'bottom-left' }
                ],
                text: {
                    tagline: 'RESORT COMFORT',
                    title: 'Resort Amenities',
                    description: 'Unwind and have non-stop fun with premium amenities, perfectly tailored for you.'
                },
                amenities: [
                    { iconUrl: '/icon-wifi.png', description: 'Free High-Speed Wi-Fi' },
                    { iconUrl: '/icon-pool.png', description: 'Infinity Pool' },
                    { iconUrl: '/icon-spa.png', description: 'Luxury Spa' },
                    { iconUrl: '/icon-gym.png', description: 'Fitness Center' }
                ]
            },
            guestReviews: {
                background: { patternUrl: '/reviews-wave.svg' },
                decorations: [
                    { iconUrl: '/star-sparkle.png', position: 'top-left' }
                ],
                text: {
                    tagline: 'GUEST REVIEWS',
                    title: 'What Guests Say'
                },
                reviews: [
                    { avatarInitial: 'j', avatarColor: 'bg-teal-700', rating: 5, text: 'Absolutely wonderful experience!', guestName: 'John Doe', date: 'Oct 2023' },
                    { avatarInitial: 'a', avatarColor: 'bg-amber-500', rating: 4, text: 'Fun for the whole family.', guestName: 'Alice Smith', date: 'Nov 2023' },
                    { avatarInitial: 'm', avatarColor: 'bg-rose-600', rating: 5, text: 'Can\'t wait to go back!', guestName: 'Mark Lee', date: 'Dec 2023' }
                ]
            }
        });
    }
    return home;
};


// @desc    Get hero background
// @route   GET /home/hero/background
// @access  Admin / BackendWorker / FrontendWorker
const getHeroBackground = async (req, res) => {
    try {
        const home = await getOrCreateHomeDoc();
        const encryptedData = encrypt({ background: home.hero.background });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update hero background
// @route   GET /home/hero/background/update
// @access  Admin / BackendWorker
const updateHeroBackground = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { background } = decryptedData;

        const home = await getOrCreateHomeDoc();
        if (background) home.hero.background = background;
        await home.save();

        const encryptedResponse = encrypt({ background: home.hero.background });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get hero text
// @route   GET /home/hero/text
// @access  Admin / BackendWorker / FrontendWorker
const getHeroText = async (req, res) => {
    try {
        const home = await getOrCreateHomeDoc();
        const encryptedData = encrypt({ title: home.hero.text.title, tagline: home.hero.text.tagline });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update hero text
// @route   GET /home/hero/text/update
// @access  Admin / BackendWorker
const updateHeroText = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { title, tagline } = decryptedData;

        const home = await getOrCreateHomeDoc();
        if (title) home.hero.text.title = title;
        if (tagline) home.hero.text.tagline = tagline;
        await home.save();

        const encryptedResponse = encrypt({ title: home.hero.text.title, tagline: home.hero.text.tagline });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get quick access text
// @route   GET /home/quick-access/text
// @access  Admin / BackendWorker / FrontendWorker
const getQuickAccessText = async (req, res) => {
    try {
        const home = await getOrCreateHomeDoc();
        const encryptedData = encrypt({ tagline: home.quickAccess.text.tagline, title: home.quickAccess.text.title });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update quick access text
// @route   GET /home/quick-access/text/update
// @access  Admin / BackendWorker
const updateQuickAccessText = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { tagline, title } = decryptedData;

        const home = await getOrCreateHomeDoc();
        if (tagline) home.quickAccess.text.tagline = tagline;
        if (title) home.quickAccess.text.title = title;
        await home.save();

        const encryptedResponse = encrypt({ tagline: home.quickAccess.text.tagline, title: home.quickAccess.text.title });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get quick access cards
// @route   GET /home/quick-access/cards
// @access  Admin / BackendWorker / FrontendWorker
const getQuickAccessCards = async (req, res) => {
    try {
        const home = await getOrCreateHomeDoc();
        const encryptedData = encrypt({ cards: home.quickAccess.cards });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update quick access cards
// @route   GET /home/quick-access/cards/update
// @access  Admin / BackendWorker
const updateQuickAccessCards = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { cards } = decryptedData; // Expecting an array of cards

        const home = await getOrCreateHomeDoc();
        if (cards) home.quickAccess.cards = cards;
        await home.save();

        const encryptedResponse = encrypt({ cards: home.quickAccess.cards });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get quick access decorations
// @route   GET /home/quick-access/decorations
// @access  Admin / BackendWorker / FrontendWorker
const getQuickAccessDecorations = async (req, res) => {
    try {
        const home = await getOrCreateHomeDoc();
        const encryptedData = encrypt({ decorations: home.quickAccess.decorations });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update quick access decorations
// @route   GET /home/quick-access/decorations/update
// @access  Admin / BackendWorker
const updateQuickAccessDecorations = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { decorations } = decryptedData; // Expecting an array of decorations (e.g., dolphins)

        const home = await getOrCreateHomeDoc();
        if (decorations) home.quickAccess.decorations = decorations;
        await home.save();

        const encryptedResponse = encrypt({ decorations: home.quickAccess.decorations });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get dining background
// @route   GET /home/dining/background
// @access  Admin / BackendWorker / FrontendWorker
const getDiningBackground = async (req, res) => {
    try {
        const home = await getOrCreateHomeDoc();
        const encryptedData = encrypt({ background: home.diningAndMore.background });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update dining background
// @route   GET /home/dining/background/update
// @access  Admin / BackendWorker
const updateDiningBackground = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { background } = decryptedData;

        const home = await getOrCreateHomeDoc();
        if (background) home.diningAndMore.background = background;
        await home.save();

        const encryptedResponse = encrypt({ background: home.diningAndMore.background });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get dining text
// @route   GET /home/dining/text
// @access  Admin / BackendWorker / FrontendWorker
const getDiningText = async (req, res) => {
    try {
        const home = await getOrCreateHomeDoc();
        const encryptedData = encrypt({ text: home.diningAndMore.text });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update dining text
// @route   GET /home/dining/text/update
// @access  Admin / BackendWorker
const updateDiningText = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { text } = decryptedData;

        const home = await getOrCreateHomeDoc();
        if (text) {
            Object.assign(home.diningAndMore.text, text);
        }
        await home.save();

        const encryptedResponse = encrypt({ text: home.diningAndMore.text });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get dining posters
// @route   GET /home/dining/posters
// @access  Admin / BackendWorker / FrontendWorker
const getDiningPosters = async (req, res) => {
    try {
        const home = await getOrCreateHomeDoc();
        const encryptedData = encrypt({ posters: home.diningAndMore.posters });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update dining posters
// @route   GET /home/dining/posters/update
// @access  Admin / BackendWorker
const updateDiningPosters = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { posters } = decryptedData; // Expecting an array of posters

        const home = await getOrCreateHomeDoc();
        if (posters) home.diningAndMore.posters = posters;
        await home.save();

        const encryptedResponse = encrypt({ posters: home.diningAndMore.posters });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get signature attractions text
// @route   GET /home/signature-attractions/text
// @access  Admin / BackendWorker / FrontendWorker
const getSignatureText = async (req, res) => {
    try {
        const home = await getOrCreateHomeDoc();
        const encryptedData = encrypt({ text: home.signatureAttractions.text });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update signature attractions text
// @route   GET /home/signature-attractions/text/update
// @access  Admin / BackendWorker
const updateSignatureText = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { text } = decryptedData;

        const home = await getOrCreateHomeDoc();
        if (text) {
            Object.assign(home.signatureAttractions.text, text);
        }
        await home.save();

        const encryptedResponse = encrypt({ text: home.signatureAttractions.text });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get signature attractions categories
// @route   GET /home/signature-attractions/categories
// @access  Admin / BackendWorker / FrontendWorker
const getSignatureCategories = async (req, res) => {
    try {
        const home = await getOrCreateHomeDoc();
        const encryptedData = encrypt({ categories: home.signatureAttractions.categories });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update signature attractions categories
// @route   GET /home/signature-attractions/categories/update
// @access  Admin / BackendWorker
const updateSignatureCategories = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { categories } = decryptedData; // Expecting an array

        const home = await getOrCreateHomeDoc();
        if (categories) home.signatureAttractions.categories = categories;
        await home.save();

        const encryptedResponse = encrypt({ categories: home.signatureAttractions.categories });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get signature attractions cards
// @route   GET /home/signature-attractions/cards
// @access  Admin / BackendWorker / FrontendWorker
const getSignatureCards = async (req, res) => {
    try {
        const home = await getOrCreateHomeDoc();
        const encryptedData = encrypt({ cards: home.signatureAttractions.cards });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update signature attractions cards
// @route   GET /home/signature-attractions/cards/update
// @access  Admin / BackendWorker
const updateSignatureCards = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { cards } = decryptedData; // Expecting an array

        const home = await getOrCreateHomeDoc();
        if (cards) home.signatureAttractions.cards = cards;
        await home.save();

        const encryptedResponse = encrypt({ cards: home.signatureAttractions.cards });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get booking background
// @route   GET /home/booking/background
// @access  Admin / BackendWorker / FrontendWorker
const getBookingBackground = async (req, res) => {
    try {
        const home = await getOrCreateHomeDoc();
        const encryptedData = encrypt({ background: home.bookingBar.background });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update booking background
// @route   GET /home/booking/background/update
// @access  Admin / BackendWorker
const updateBookingBackground = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { background } = decryptedData;

        const home = await getOrCreateHomeDoc();
        if (background) home.bookingBar.background = background;
        await home.save();

        const encryptedResponse = encrypt({ background: home.bookingBar.background });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get booking decorations
// @route   GET /home/booking/decorations
// @access  Admin / BackendWorker / FrontendWorker
const getBookingDecorations = async (req, res) => {
    try {
        const home = await getOrCreateHomeDoc();
        const encryptedData = encrypt({ decorations: home.bookingBar.decorations });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update booking decorations
// @route   GET /home/booking/decorations/update
// @access  Admin / BackendWorker
const updateBookingDecorations = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { decorations } = decryptedData;

        const home = await getOrCreateHomeDoc();
        if (decorations) home.bookingBar.decorations = decorations;
        await home.save();

        const encryptedResponse = encrypt({ decorations: home.bookingBar.decorations });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get booking title
// @route   GET /home/booking/title
// @access  Admin / BackendWorker / FrontendWorker
const getBookingTitle = async (req, res) => {
    try {
        const home = await getOrCreateHomeDoc();
        const encryptedData = encrypt({ title: home.bookingBar.title });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update booking title
// @route   GET /home/booking/title/update
// @access  Admin / BackendWorker
const updateBookingTitle = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { title } = decryptedData;

        const home = await getOrCreateHomeDoc();
        if (title) home.bookingBar.title = title;
        await home.save();

        const encryptedResponse = encrypt({ title: home.bookingBar.title });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get booking form labels
// @route   GET /home/booking/form-labels
// @access  Admin / BackendWorker / FrontendWorker
const getBookingFormLabels = async (req, res) => {
    try {
        const home = await getOrCreateHomeDoc();
        const encryptedData = encrypt({ formLabels: home.bookingBar.formLabels });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update booking form labels
// @route   GET /home/booking/form-labels/update
// @access  Admin / BackendWorker
const updateBookingFormLabels = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { formLabels } = decryptedData;

        const home = await getOrCreateHomeDoc();
        if (formLabels) home.bookingBar.formLabels = formLabels;
        await home.save();

        const encryptedResponse = encrypt({ formLabels: home.bookingBar.formLabels });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get resort amenities background
// @route   GET /home/resort-amenities/background
// @access  Admin / BackendWorker / FrontendWorker
const getAmenitiesBackground = async (req, res) => {
    try {
        const home = await getOrCreateHomeDoc();
        const encryptedData = encrypt({ background: home.resortAmenities.background });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update resort amenities background
// @route   GET /home/resort-amenities/background/update
// @access  Admin / BackendWorker
const updateAmenitiesBackground = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { background } = decryptedData;

        const home = await getOrCreateHomeDoc();
        if (background) home.resortAmenities.background = background;
        await home.save();

        const encryptedResponse = encrypt({ background: home.resortAmenities.background });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get resort amenities decorations
// @route   GET /home/resort-amenities/decorations
// @access  Admin / BackendWorker / FrontendWorker
const getAmenitiesDecorations = async (req, res) => {
    try {
        const home = await getOrCreateHomeDoc();
        const encryptedData = encrypt({ decorations: home.resortAmenities.decorations });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update resort amenities decorations
// @route   GET /home/resort-amenities/decorations/update
// @access  Admin / BackendWorker
const updateAmenitiesDecorations = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { decorations } = decryptedData;

        const home = await getOrCreateHomeDoc();
        if (decorations) home.resortAmenities.decorations = decorations;
        await home.save();

        const encryptedResponse = encrypt({ decorations: home.resortAmenities.decorations });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get resort amenities text
// @route   GET /home/resort-amenities/text
// @access  Admin / BackendWorker / FrontendWorker
const getAmenitiesText = async (req, res) => {
    try {
        const home = await getOrCreateHomeDoc();
        const encryptedData = encrypt({ text: home.resortAmenities.text });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update resort amenities text
// @route   GET /home/resort-amenities/text/update
// @access  Admin / BackendWorker
const updateAmenitiesText = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { text } = decryptedData;

        const home = await getOrCreateHomeDoc();
        if (text) {
            Object.assign(home.resortAmenities.text, text);
        }
        await home.save();

        const encryptedResponse = encrypt({ text: home.resortAmenities.text });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get resort amenities
// @route   GET /home/resort-amenities/amenities
// @access  Admin / BackendWorker / FrontendWorker
const getAmenities = async (req, res) => {
    try {
        const home = await getOrCreateHomeDoc();
        const encryptedData = encrypt({ amenities: home.resortAmenities.amenities });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update resort amenities
// @route   GET /home/resort-amenities/amenities/update
// @access  Admin / BackendWorker
const updateAmenities = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { amenities } = decryptedData;

        const home = await getOrCreateHomeDoc();
        if (amenities) home.resortAmenities.amenities = amenities;
        await home.save();

        const encryptedResponse = encrypt({ amenities: home.resortAmenities.amenities });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get guest reviews background
// @route   GET /home/guest-reviews/background
// @access  Admin / BackendWorker / FrontendWorker
const getGuestReviewsBackground = async (req, res) => {
    try {
        const home = await getOrCreateHomeDoc();
        const encryptedData = encrypt({ background: home.guestReviews.background });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update guest reviews background
// @route   GET /home/guest-reviews/background/update
// @access  Admin / BackendWorker
const updateGuestReviewsBackground = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { background } = decryptedData;

        const home = await getOrCreateHomeDoc();
        if (background) home.guestReviews.background = background;
        await home.save();

        const encryptedResponse = encrypt({ background: home.guestReviews.background });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get guest reviews decorations
// @route   GET /home/guest-reviews/decorations
// @access  Admin / BackendWorker / FrontendWorker
const getGuestReviewsDecorations = async (req, res) => {
    try {
        const home = await getOrCreateHomeDoc();
        const encryptedData = encrypt({ decorations: home.guestReviews.decorations });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update guest reviews decorations
// @route   GET /home/guest-reviews/decorations/update
// @access  Admin / BackendWorker
const updateGuestReviewsDecorations = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { decorations } = decryptedData;

        const home = await getOrCreateHomeDoc();
        if (decorations) home.guestReviews.decorations = decorations;
        await home.save();

        const encryptedResponse = encrypt({ decorations: home.guestReviews.decorations });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get guest reviews text
// @route   GET /home/guest-reviews/text
// @access  Admin / BackendWorker / FrontendWorker
const getGuestReviewsText = async (req, res) => {
    try {
        const home = await getOrCreateHomeDoc();
        const encryptedData = encrypt({ text: home.guestReviews.text });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update guest reviews text
// @route   GET /home/guest-reviews/text/update
// @access  Admin / BackendWorker
const updateGuestReviewsText = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { text } = decryptedData;

        const home = await getOrCreateHomeDoc();
        if (text) {
            Object.assign(home.guestReviews.text, text);
        }
        await home.save();

        const encryptedResponse = encrypt({ text: home.guestReviews.text });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get guest reviews list
// @route   GET /home/guest-reviews/reviews
// @access  Admin / BackendWorker / FrontendWorker
const getGuestReviewsList = async (req, res) => {
    try {
        const home = await getOrCreateHomeDoc();
        const encryptedData = encrypt({ reviews: home.guestReviews.reviews });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update guest reviews list
// @route   GET /home/guest-reviews/reviews/update
// @access  Admin / BackendWorker
const updateGuestReviewsList = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { reviews } = decryptedData;

        const home = await getOrCreateHomeDoc();
        if (reviews) home.guestReviews.reviews = reviews;
        await home.save();

        const encryptedResponse = encrypt({ reviews: home.guestReviews.reviews });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

module.exports = {
    getHeroBackground,
    updateHeroBackground,
    getHeroText,
    updateHeroText,
    getQuickAccessText,
    updateQuickAccessText,
    getQuickAccessCards,
    updateQuickAccessCards,
    getQuickAccessDecorations,
    updateQuickAccessDecorations,
    getDiningBackground,
    updateDiningBackground,
    getDiningText,
    updateDiningText,
    getDiningPosters,
    updateDiningPosters,
    getSignatureText,
    updateSignatureText,
    getSignatureCategories,
    updateSignatureCategories,
    getSignatureCards,
    updateSignatureCards,
    getBookingBackground,
    updateBookingBackground,
    getBookingDecorations,
    updateBookingDecorations,
    getBookingTitle,
    updateBookingTitle,
    getBookingFormLabels,
    updateBookingFormLabels,
    getAmenitiesBackground,
    updateAmenitiesBackground,
    getAmenitiesDecorations,
    updateAmenitiesDecorations,
    getAmenitiesText,
    updateAmenitiesText,
    getAmenities,
    updateAmenities,
    getGuestReviewsBackground,
    updateGuestReviewsBackground,
    getGuestReviewsDecorations,
    updateGuestReviewsDecorations,
    getGuestReviewsText,
    updateGuestReviewsText,
    getGuestReviewsList,
    updateGuestReviewsList
};
