const About = require('../models/About');
const { encrypt, decrypt } = require('../utils/encryption');

// Helper to get or create About document
const getOrCreateAboutDoc = async () => {
    let aboutDoc = await About.findOne();
    if (!aboutDoc) {
        aboutDoc = await About.create({
            hero: {
                background: { imageUrl: '/resort.png' },
                infoBox: {
                    title: 'About 7-Oceans',
                    pagePath: [
                        { label: 'Home', url: '/' },
                        { label: 'About Us', url: '/about' }
                    ]
                }
            },
            ourStory: {
                image: {
                    url: '/pooldining.png'
                },
                callCenter: {
                    label: 'CALL CENTER 24/7',
                    phone: '+1 (212) 578-5758',
                    iconUrl: '/icon-phone.png'
                },
                textContent: {
                    subtitle: 'OUR STORY',
                    titleMain: 'Refined Destination for',
                    titleHighlight: ' Beachside Living',
                    description: 'Designed for those who appreciate style, atmosphere, and meaningful moments, 7-Oceans Waterpark & Resort invites you to relax, celebrate, and indulge in a lifestyle shaped by warmth, rhythm, and effortless luxury.'
                },
                button: {
                    label: 'Explore Activities',
                    url: '/activities'
                }
            },
            ourPurpose: {
                textContent: {
                    subtitle: 'OUR PURPOSE',
                    titleMain: 'Where Water Meets',
                    titleHighlight: ' Wonder',
                    description: 'We create a place where slides, pools, and resort comfort come together—so every guest can make a splash, unwind by the water, and leave with moments worth remembering.'
                },
                cards: [
                    {
                        title: 'Vision',
                        description: 'To be the leading waterpark and resort where families and friends enjoy thrills, relaxation, and beachside vibes in one place.',
                        iconUrl: '/icon-vision.png'
                    },
                    {
                        title: 'Mission',
                        description: 'To deliver safe, exciting rides, refreshing pools, and warm hospitality so every guest has a memorable day at 7-Oceans.',
                        iconUrl: '/icon-mission.png'
                    }
                ],
                image: {
                    url: '/waterpark.png',
                    statBox: {
                        value: '150K+',
                        label: 'Guests Welcomed'
                    }
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
                    {
                        title: 'Ride Safety First',
                        description: 'Designing and operating every slide and attraction with the highest safety standards.',
                        iconUrl: '/icon-safety.png'
                    },
                    {
                        title: 'Thrill & Fun',
                        description: 'Creating exciting water rides and experiences that spark joy for every age group.',
                        iconUrl: '/icon-thrill.png'
                    },
                    {
                        title: 'Island Atmosphere',
                        description: 'Blending tropical design, music, and water elements to deliver a true island vibe.',
                        iconUrl: '/icon-island.png'
                    },
                    {
                        title: 'Guest Care',
                        description: 'Welcoming every guest with friendly service, comfort, and attention throughout the park.',
                        iconUrl: '/icon-care.png'
                    }
                ],
                banner: {
                    imageUrl: '/hero-bg-2.png',
                    title: 'Make Waves at 7-Oceans',
                    buttonText: 'Explore Attractions ?',
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
                    {
                        year: '2024',
                        title: 'Best Family Waterpark',
                        issuer: 'Regional Hospitality Awards'
                    },
                    {
                        year: '2023',
                        title: 'Excellence in Guest Experience',
                        issuer: 'Travel & Leisure Magazine'
                    },
                    {
                        year: '2022',
                        title: 'Top Resort & Attraction',
                        issuer: 'Coastal Tourism Board'
                    }
                ]
            }
        });
    }
    return aboutDoc;
};


// @desc    Get About Hero Background
// @route   GET /about/hero/background
// @access  Admin / BackendWorker / FrontendWorker
exports.getAboutHeroBackground = async (req, res) => {
    try {
        const aboutDoc = await getOrCreateAboutDoc();
        const encryptedData = encrypt({ background: aboutDoc.hero.background });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update About Hero Background
// @route   GET /about/hero/background/update
// @access  Admin / BackendWorker
exports.updateAboutHeroBackground = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });
        const decryptedData = decrypt(req.body.encryptedToken);
        const { background } = decryptedData;
        const aboutDoc = await getOrCreateAboutDoc();
        if (background && background.imageUrl) {
            aboutDoc.hero.background.imageUrl = background.imageUrl;
        }
        await aboutDoc.save();
        const encryptedResponse = encrypt({ background: aboutDoc.hero.background });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get About Hero InfoBox
// @route   GET /about/hero/infobox
// @access  Admin / BackendWorker / FrontendWorker
exports.getAboutHeroInfoBox = async (req, res) => {
    try {
        const aboutDoc = await getOrCreateAboutDoc();
        const encryptedData = encrypt({ infoBox: aboutDoc.hero.infoBox });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update About Hero InfoBox
// @route   GET /about/hero/infobox/update
// @access  Admin / BackendWorker
exports.updateAboutHeroInfoBox = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });
        const decryptedData = decrypt(req.body.encryptedToken);
        const { infoBox } = decryptedData;
        const aboutDoc = await getOrCreateAboutDoc();
        if (infoBox) {
            Object.assign(aboutDoc.hero.infoBox, infoBox);
        }
        await aboutDoc.save();
        const encryptedResponse = encrypt({ infoBox: aboutDoc.hero.infoBox });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get About Our Story Section
// @route   GET /about/our-story
// @access  Admin / BackendWorker / FrontendWorker
exports.getAboutOurStory = async (req, res) => {
    try {
        const aboutDoc = await getOrCreateAboutDoc();
        const encryptedData = encrypt({ ourStory: aboutDoc.ourStory });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update About Our Story Section
// @route   GET /about/our-story/update
// @access  Admin / BackendWorker
exports.updateAboutOurStory = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });
        const decryptedData = decrypt(req.body.encryptedToken);
        const { ourStory } = decryptedData;
        const aboutDoc = await getOrCreateAboutDoc();
        if (ourStory) {
            Object.assign(aboutDoc.ourStory, ourStory);
        }
        await aboutDoc.save();
        const encryptedResponse = encrypt({ ourStory: aboutDoc.ourStory });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get About Our Purpose Section
// @route   GET /about/our-purpose
// @access  Admin / BackendWorker / FrontendWorker
exports.getAboutOurPurpose = async (req, res) => {
    try {
        const aboutDoc = await getOrCreateAboutDoc();
        const encryptedData = encrypt({ ourPurpose: aboutDoc.ourPurpose });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update About Our Purpose Section
// @route   GET /about/our-purpose/update
// @access  Admin / BackendWorker
exports.updateAboutOurPurpose = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });
        const decryptedData = decrypt(req.body.encryptedToken);
        const { ourPurpose } = decryptedData;
        const aboutDoc = await getOrCreateAboutDoc();
        if (ourPurpose) {
            Object.assign(aboutDoc.ourPurpose, ourPurpose);
        }
        await aboutDoc.save();
        const encryptedResponse = encrypt({ ourPurpose: aboutDoc.ourPurpose });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get About Our Values Section
// @route   GET /about/our-values
// @access  Admin / BackendWorker / FrontendWorker
exports.getAboutOurValues = async (req, res) => {
    try {
        const aboutDoc = await getOrCreateAboutDoc();
        const encryptedData = encrypt({ ourValues: aboutDoc.ourValues });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update About Our Values Section
// @route   GET /about/our-values/update
// @access  Admin / BackendWorker
exports.updateAboutOurValues = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });
        const decryptedData = decrypt(req.body.encryptedToken);
        const { ourValues } = decryptedData;
        const aboutDoc = await getOrCreateAboutDoc();
        if (ourValues) {
            Object.assign(aboutDoc.ourValues, ourValues);
        }
        await aboutDoc.save();
        const encryptedResponse = encrypt({ ourValues: aboutDoc.ourValues });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get About Excellence Section
// @route   GET /about/excellence
// @access  Admin / BackendWorker / FrontendWorker
exports.getAboutExcellence = async (req, res) => {
    try {
        const aboutDoc = await getOrCreateAboutDoc();
        const encryptedData = encrypt({ excellence: aboutDoc.excellence });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update About Excellence Section
// @route   GET /about/excellence/update
// @access  Admin / BackendWorker
exports.updateAboutExcellence = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });
        const decryptedData = decrypt(req.body.encryptedToken);
        const { excellence } = decryptedData;
        const aboutDoc = await getOrCreateAboutDoc();
        if (excellence) {
            Object.assign(aboutDoc.excellence, excellence);
        }
        await aboutDoc.save();
        const encryptedResponse = encrypt({ excellence: aboutDoc.excellence });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
