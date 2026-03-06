const Book = require('../models/Book');
const { encrypt, decrypt } = require('../utils/encryption');

// Helper to get or create Book document
const getOrCreateBookDoc = async () => {
    let bookDoc = await Book.findOne();
    if (!bookDoc) {
        bookDoc = await Book.create({
            hero: {
                background: { imageUrl: '/waterpark.png' },
                textContent: {
                    description: 'Dive into our exhilarating water slides, lazy river, and wave pool. Relax in our luxurious beachfront resort, surrounded by tropical beauty. Enjoy family-friendly fun, delicious dining, and endless entertainment. Book your unforgettable getaway today and experience the ultimate in waterpark excitement and resort luxury at 7-Oceans!'
                },
                infoBox: {
                    title: 'Book Your Experience',
                    pagePath: [
                        { label: 'Home', url: '/' },
                        { label: 'Book', url: '/book' }
                    ]
                }
            },
            experiences: {
                text: {
                    subtitle: 'CHOOSE YOUR EXPERIENCE',
                    titleMain: 'One Destination.',
                    titleHighlight: ' Two Ways to Play.',
                    description: 'Book your day at the waterpark or your stay at the resort—or both. Pick an option below to get started.'
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
                        name: 'Name',
                        namePlaceholder: 'Enter your name',
                        visitDate: 'Visit Date',
                        tickets: 'How Many Tickets',
                        paymentMethod: 'Payment Method',
                        totalAmount: 'Total Amount',
                        currencyPrefix: 'INR',
                        calculationPrefix: 'Calculation:',
                        buttonText: 'Proceed to Payment'
                    },
                    paymentOptions: ['UPI', 'Credit / Debit Card', 'Net Banking', 'Cash at Counter']
                },
                successModal: {
                    title: 'Congratulations!',
                    message: 'Your booking ticket has been confirmed successfully.',
                    buttonText: 'OK'
                }
            }
        });
    }
    return bookDoc;
};


// @desc    Get Book Hero Background
// @route   GET /book/hero/background
// @access  Admin / BackendWorker / FrontendWorker
exports.getBookHeroBackground = async (req, res) => {
    try {
        const bookDoc = await getOrCreateBookDoc();
        const encryptedData = encrypt({ background: bookDoc.hero.background });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Book Hero Background
// @route   GET /book/hero/background/update
// @access  Admin / BackendWorker
exports.updateBookHeroBackground = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });
        const decryptedData = decrypt(req.body.encryptedToken);
        const { background } = decryptedData;
        const bookDoc = await getOrCreateBookDoc();
        if (background && background.imageUrl) {
            bookDoc.hero.background.imageUrl = background.imageUrl;
        }
        await bookDoc.save();
        const encryptedResponse = encrypt({ background: bookDoc.hero.background });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get Book Hero Text Content
// @route   GET /book/hero/text-content
// @access  Admin / BackendWorker / FrontendWorker
exports.getBookHeroTextContent = async (req, res) => {
    try {
        const bookDoc = await getOrCreateBookDoc();
        const encryptedData = encrypt({ textContent: bookDoc.hero.textContent });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Book Hero Text Content
// @route   GET /book/hero/text-content/update
// @access  Admin / BackendWorker
exports.updateBookHeroTextContent = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });
        const decryptedData = decrypt(req.body.encryptedToken);
        const { textContent } = decryptedData;
        const bookDoc = await getOrCreateBookDoc();
        if (textContent) {
            Object.assign(bookDoc.hero.textContent, textContent);
        }
        await bookDoc.save();
        const encryptedResponse = encrypt({ textContent: bookDoc.hero.textContent });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get Book Hero InfoBox
// @route   GET /book/hero/infobox
// @access  Admin / BackendWorker / FrontendWorker
exports.getBookHeroInfoBox = async (req, res) => {
    try {
        const bookDoc = await getOrCreateBookDoc();
        const encryptedData = encrypt({ infoBox: bookDoc.hero.infoBox });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Book Hero InfoBox
// @route   GET /book/hero/infobox/update
// @access  Admin / BackendWorker
exports.updateBookHeroInfoBox = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });
        const decryptedData = decrypt(req.body.encryptedToken);
        const { infoBox } = decryptedData;
        const bookDoc = await getOrCreateBookDoc();
        if (infoBox) {
            Object.assign(bookDoc.hero.infoBox, infoBox);
        }
        await bookDoc.save();
        const encryptedResponse = encrypt({ infoBox: bookDoc.hero.infoBox });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get Book Experiences Section
// @route   GET /book/experiences
// @access  Admin / BackendWorker / FrontendWorker
exports.getBookExperiences = async (req, res) => {
    try {
        const bookDoc = await getOrCreateBookDoc();
        const encryptedData = encrypt({ experiences: bookDoc.experiences });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Book Experiences Section
// @route   GET /book/experiences/update
// @access  Admin / BackendWorker
exports.updateBookExperiences = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });
        const decryptedData = decrypt(req.body.encryptedToken);
        const { experiences } = decryptedData;
        const bookDoc = await getOrCreateBookDoc();
        if (experiences) {
            Object.assign(bookDoc.experiences, experiences);
        }
        await bookDoc.save();
        const encryptedResponse = encrypt({ experiences: bookDoc.experiences });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get Book Booking Flow
// @route   GET /book/booking-flow
// @access  Admin / BackendWorker / FrontendWorker
exports.getBookBookingFlow = async (req, res) => {
    try {
        const bookDoc = await getOrCreateBookDoc();
        const encryptedData = encrypt({ bookingFlow: bookDoc.bookingFlow });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Book Booking Flow
// @route   GET /book/booking-flow/update
// @access  Admin / BackendWorker
exports.updateBookBookingFlow = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });
        const decryptedData = decrypt(req.body.encryptedToken);
        const { bookingFlow } = decryptedData;
        const bookDoc = await getOrCreateBookDoc();
        if (bookingFlow) {
            Object.assign(bookDoc.bookingFlow, bookingFlow);
        }
        await bookDoc.save();
        const encryptedResponse = encrypt({ bookingFlow: bookDoc.bookingFlow });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
