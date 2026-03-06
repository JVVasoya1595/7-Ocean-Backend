const Gallery = require('../models/Gallery');
const { encrypt, decrypt } = require('../utils/encryption');

// Helper to get or create Gallery document
const getOrCreateGalleryDoc = async () => {
    let galleryDoc = await Gallery.findOne();
    if (!galleryDoc) {
        galleryDoc = await Gallery.create({
            hero: {
                background: { imageUrl: '/gallery-hero.jpg' },
                infoBox: {
                    title: 'Gallery',
                    pagePath: [
                        { label: 'Home', url: '/' },
                        { label: 'Gallery', url: '/gallery' }
                    ]
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
                    { imageUrl: '/gallery-1.jpg', category: 'Rides', title: 'Ray Loop Rush' },
                    { imageUrl: '/gallery-2.jpg', category: 'Moments', title: 'Blue Wave Deck' },
                    { imageUrl: '/gallery-3.jpg', category: 'Dining', title: 'Neon Bar Corner' },
                    { imageUrl: '/gallery-4.jpg', category: 'Dining', title: 'Signature Plates' },
                    { imageUrl: '/gallery-5.jpg', category: 'Moments', title: 'Park Map Snap' },
                    { imageUrl: '/gallery-6.jpg', category: 'Resort', title: 'Resort Serenity' },
                    { imageUrl: '/gallery-7.jpg', category: 'Rides', title: 'Ticket Gate Energy' },
                    { imageUrl: '/gallery-8.jpg', category: 'Moments', title: 'Retail Walkthrough' }
                ],
                footer: {
                    text: 'Want your moment featured in the 7-Oceans gallery wall?',
                    buttonLabel: 'Share Your Story →',
                    buttonLink: '/share-story'
                }
            }
        });
    }
    return galleryDoc;
};


// @desc    Get Gallery Hero Background
// @route   GET /gallery/hero/background
// @access  Admin / BackendWorker / FrontendWorker
exports.getGalleryHeroBackground = async (req, res) => {
    try {
        const galleryDoc = await getOrCreateGalleryDoc();
        const encryptedData = encrypt({ background: galleryDoc.hero.background });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Gallery Hero Background
// @route   GET /gallery/hero/background/update
// @access  Admin / BackendWorker
exports.updateGalleryHeroBackground = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });
        const decryptedData = decrypt(req.body.encryptedToken);
        const { background } = decryptedData;
        const galleryDoc = await getOrCreateGalleryDoc();
        if (background && background.imageUrl) {
            galleryDoc.hero.background.imageUrl = background.imageUrl;
        }
        await galleryDoc.save();
        const encryptedResponse = encrypt({ background: galleryDoc.hero.background });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get Gallery Hero InfoBox
// @route   GET /gallery/hero/infobox
// @access  Admin / BackendWorker / FrontendWorker
exports.getGalleryHeroInfoBox = async (req, res) => {
    try {
        const galleryDoc = await getOrCreateGalleryDoc();
        const encryptedData = encrypt({ infoBox: galleryDoc.hero.infoBox });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Gallery Hero InfoBox
// @route   GET /gallery/hero/infobox/update
// @access  Admin / BackendWorker
exports.updateGalleryHeroInfoBox = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });
        const decryptedData = decrypt(req.body.encryptedToken);
        const { infoBox } = decryptedData;
        const galleryDoc = await getOrCreateGalleryDoc();
        if (infoBox) {
            Object.assign(galleryDoc.hero.infoBox, infoBox);
        }
        await galleryDoc.save();
        const encryptedResponse = encrypt({ infoBox: galleryDoc.hero.infoBox });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get Gallery Grid Section
// @route   GET /gallery/grid-section
// @access  Admin / BackendWorker / FrontendWorker
exports.getGalleryGridSection = async (req, res) => {
    try {
        const galleryDoc = await getOrCreateGalleryDoc();
        const encryptedData = encrypt({ gridSection: galleryDoc.gridSection });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Gallery Grid Section
// @route   GET /gallery/grid-section/update
// @access  Admin / BackendWorker
exports.updateGalleryGridSection = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });
        const decryptedData = decrypt(req.body.encryptedToken);
        const { gridSection } = decryptedData;
        const galleryDoc = await getOrCreateGalleryDoc();
        if (gridSection) {
            Object.assign(galleryDoc.gridSection, gridSection);
        }
        await galleryDoc.save();
        const encryptedResponse = encrypt({ gridSection: galleryDoc.gridSection });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
