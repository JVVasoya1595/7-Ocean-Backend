const Bar = require('../models/Bar');
const { encrypt, decrypt } = require('../utils/encryption');

// Helper to get or create Bar document
const getOrCreateBarDoc = async () => {
    let bar = await Bar.findOne();
    if (!bar) {
        bar = await Bar.create({
            hero: {
                background: { imageUrl: '/bar-neon.png' },
                infoBox: {
                    title: 'Bar',
                    pagePath: [
                        { label: 'Home', url: '/' },
                        { label: 'Bar', url: '/bar' }
                    ]
                }
            },
            introduction: {
                parts: [
                    { type: 'text', content: 'Welcome to the 7-Oceans Bar — your go-to spot for handcrafted drinks, sunset vibes, and island energy.' },
                    { type: 'image', content: '/bar-neon.png', altText: 'Bar at 7-Oceans' }
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
                    {
                        imageUrl: '/ocean-mint-cooler.png',
                        badge: 'Signature Mocktail',
                        title: 'Ocean Mint Cooler',
                        description: 'Mint, citrus, sparkling tonic, blue blend'
                    },
                    {
                        imageUrl: '/sunset-citrus-fizz.png',
                        badge: 'House Favorite',
                        title: 'Sunset Citrus Fizz',
                        description: 'Orange peel, ginger syrup, fresh soda lift'
                    },
                    {
                        imageUrl: '/lagoon-spice-punch.png',
                        badge: 'Tropical Special',
                        title: 'Lagoon Spice Punch',
                        description: 'Pineapple, spice notes, chilled island mix'
                    }
                ]
            },
            discoverCocktails: {
                text: {
                    title: 'Discover the Best Cocktails',
                    highlightedTitle: ' at 7-Oceans',
                    subtitle: 'Visit our bar by the pool—signature drinks, sunset vibes, and island energy.',
                    description: 'If you\'re at 7-Oceans we guarantee our cocktails will hit the spot. With summer in the air, come over to our poolside bar for seasonal specials and timeless classics. Enjoy a relaxed atmosphere with friends. And if you haven\'t tried it yet, this is the perfect time for our signature **Ocean Mint Cooler**.'
                },
                videos: [
                    { videoUrl: '/bar-video.mp4', thumbnailUrl: '/bar-neon.png' }
                ]
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
            }
        });
    }
    return bar;
};


// @desc    Get Bar Hero Background
// @route   GET /bar/hero/background
// @access  Admin / BackendWorker / FrontendWorker
exports.getBarHeroBackground = async (req, res) => {
    try {
        const bar = await getOrCreateBarDoc();
        const encryptedData = encrypt({ background: bar.hero.background });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Bar Hero Background
// @route   GET /bar/hero/background/update
// @access  Admin / BackendWorker
exports.updateBarHeroBackground = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { background } = decryptedData;

        const bar = await getOrCreateBarDoc();
        if (background) {
            if (background.imageUrl) bar.hero.background.imageUrl = background.imageUrl;
        }
        await bar.save();

        const encryptedResponse = encrypt({ background: bar.hero.background });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get Bar Hero InfoBox
// @route   GET /bar/hero/infobox
// @access  Admin / BackendWorker / FrontendWorker
exports.getBarHeroInfoBox = async (req, res) => {
    try {
        const bar = await getOrCreateBarDoc();
        const encryptedData = encrypt({ infoBox: bar.hero.infoBox });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Bar Hero InfoBox
// @route   GET /bar/hero/infobox/update
// @access  Admin / BackendWorker
exports.updateBarHeroInfoBox = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { infoBox } = decryptedData;

        const bar = await getOrCreateBarDoc();
        if (infoBox) {
            if (infoBox.title) bar.hero.infoBox.title = infoBox.title;
            if (infoBox.pagePath) bar.hero.infoBox.pagePath = infoBox.pagePath;
        }
        await bar.save();

        const encryptedResponse = encrypt({ infoBox: bar.hero.infoBox });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get Bar Introduction
// @route   GET /bar/introduction
// @access  Admin / BackendWorker / FrontendWorker
exports.getBarIntroduction = async (req, res) => {
    try {
        const bar = await getOrCreateBarDoc();
        const encryptedData = encrypt({ introduction: bar.introduction });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Bar Introduction
// @route   GET /bar/introduction/update
// @access  Admin / BackendWorker
exports.updateBarIntroduction = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { introduction } = decryptedData;

        const bar = await getOrCreateBarDoc();
        if (introduction) {
            bar.introduction = introduction;
        }
        await bar.save();

        const encryptedResponse = encrypt({ introduction: bar.introduction });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get Bar Drinks And Views Text
// @route   GET /bar/drinks-and-views/text
// @access  Admin / BackendWorker / FrontendWorker
exports.getBarDrinksAndViewsText = async (req, res) => {
    try {
        const bar = await getOrCreateBarDoc();
        const encryptedData = encrypt({ text: bar.drinksAndViews.text });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Bar Drinks And Views Text
// @route   GET /bar/drinks-and-views/text/update
// @access  Admin / BackendWorker
exports.updateBarDrinksAndViewsText = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { text } = decryptedData;

        const bar = await getOrCreateBarDoc();
        if (text) {
            Object.assign(bar.drinksAndViews.text, text);
        }
        await bar.save();

        const encryptedResponse = encrypt({ text: bar.drinksAndViews.text });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get Bar Drinks And Views Tags
// @route   GET /bar/drinks-and-views/tags
// @access  Admin / BackendWorker / FrontendWorker
exports.getBarDrinksAndViewsTags = async (req, res) => {
    try {
        const bar = await getOrCreateBarDoc();
        const encryptedData = encrypt({ tags: bar.drinksAndViews.tags });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Bar Drinks And Views Tags
// @route   GET /bar/drinks-and-views/tags/update
// @access  Admin / BackendWorker
exports.updateBarDrinksAndViewsTags = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { tags } = decryptedData;

        const bar = await getOrCreateBarDoc();
        if (tags) {
            bar.drinksAndViews.tags = tags;
        }
        await bar.save();

        const encryptedResponse = encrypt({ tags: bar.drinksAndViews.tags });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get Bar Drinks And Views Cards
// @route   GET /bar/drinks-and-views/cards
// @access  Admin / BackendWorker / FrontendWorker
exports.getBarDrinksAndViewsCards = async (req, res) => {
    try {
        const bar = await getOrCreateBarDoc();
        const encryptedData = encrypt({ cards: bar.drinksAndViews.cards });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Bar Drinks And Views Cards
// @route   GET /bar/drinks-and-views/cards/update
// @access  Admin / BackendWorker
exports.updateBarDrinksAndViewsCards = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { cards } = decryptedData;

        const bar = await getOrCreateBarDoc();
        if (cards) {
            bar.drinksAndViews.cards = cards;
        }
        await bar.save();

        const encryptedResponse = encrypt({ cards: bar.drinksAndViews.cards });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get Bar Discover Cocktails Text
// @route   GET /bar/discover-cocktails/text
// @access  Admin / BackendWorker / FrontendWorker
exports.getBarDiscoverCocktailsText = async (req, res) => {
    try {
        const bar = await getOrCreateBarDoc();
        const encryptedData = encrypt({ text: bar.discoverCocktails.text });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Bar Discover Cocktails Text
// @route   GET /bar/discover-cocktails/text/update
// @access  Admin / BackendWorker
exports.updateBarDiscoverCocktailsText = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { text } = decryptedData;

        const bar = await getOrCreateBarDoc();
        if (text) {
            Object.assign(bar.discoverCocktails.text, text);
        }
        await bar.save();

        const encryptedResponse = encrypt({ text: bar.discoverCocktails.text });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get Bar Discover Cocktails Videos
// @route   GET /bar/discover-cocktails/videos
// @access  Admin / BackendWorker / FrontendWorker
exports.getBarDiscoverCocktailsVideos = async (req, res) => {
    try {
        const bar = await getOrCreateBarDoc();
        const encryptedData = encrypt({ videos: bar.discoverCocktails.videos });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Bar Discover Cocktails Videos
// @route   GET /bar/discover-cocktails/videos/update
// @access  Admin / BackendWorker
exports.updateBarDiscoverCocktailsVideos = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { videos } = decryptedData;

        const bar = await getOrCreateBarDoc();
        if (videos) {
            bar.discoverCocktails.videos = videos;
        }
        await bar.save();

        const encryptedResponse = encrypt({ videos: bar.discoverCocktails.videos });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get Bar Perfect Drink Text
// @route   GET /bar/perfect-drink/text
// @access  Admin / BackendWorker / FrontendWorker
exports.getBarPerfectDrinkText = async (req, res) => {
    try {
        const bar = await getOrCreateBarDoc();
        const encryptedData = encrypt({ text: bar.perfectDrink.text });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Bar Perfect Drink Text
// @route   GET /bar/perfect-drink/text/update
// @access  Admin / BackendWorker
exports.updateBarPerfectDrinkText = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });
        const decryptedData = decrypt(req.body.encryptedToken);
        const { text } = decryptedData;
        const bar = await getOrCreateBarDoc();
        if (text) {
            Object.assign(bar.perfectDrink.text, text);
        }
        await bar.save();
        const encryptedResponse = encrypt({ text: bar.perfectDrink.text });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get Bar Perfect Drink Images
// @route   GET /bar/perfect-drink/images
// @access  Admin / BackendWorker / FrontendWorker
exports.getBarPerfectDrinkImages = async (req, res) => {
    try {
        const bar = await getOrCreateBarDoc();
        const encryptedData = encrypt({ images: bar.perfectDrink.images });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Bar Perfect Drink Images
// @route   GET /bar/perfect-drink/images/update
// @access  Admin / BackendWorker
exports.updateBarPerfectDrinkImages = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });
        const decryptedData = decrypt(req.body.encryptedToken);
        const { images } = decryptedData;
        const bar = await getOrCreateBarDoc();
        if (images) {
            bar.perfectDrink.images = images;
        }
        await bar.save();
        const encryptedResponse = encrypt({ images: bar.perfectDrink.images });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get Bar Reservations
// @route   GET /bar/reservations
// @access  Admin / BackendWorker / FrontendWorker
exports.getBarReservations = async (req, res) => {
    try {
        const bar = await getOrCreateBarDoc();
        const encryptedData = encrypt({ reservations: bar.reservations });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Bar Reservations
// @route   GET /bar/reservations/update
// @access  Admin / BackendWorker
exports.updateBarReservations = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });
        const decryptedData = decrypt(req.body.encryptedToken);
        const { reservations } = decryptedData;
        const bar = await getOrCreateBarDoc();
        if (reservations) {
            Object.assign(bar.reservations, reservations);
        }
        await bar.save();
        const encryptedResponse = encrypt({ reservations: bar.reservations });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
