const Contact = require('../models/Contact');
const { encrypt, decrypt } = require('../utils/encryption');

// Helper to get or create Contact document
const getOrCreateContactDoc = async () => {
    let contactDoc = await Contact.findOne();
    if (!contactDoc) {
        contactDoc = await Contact.create({
            hero: {
                background: { imageUrl: '/hero-bg-2.png' },
                infoBox: {
                    title: 'Get in touch',
                    pagePath: [
                        { label: 'Home', url: '/' },
                        { label: 'Contact', url: '/contact' }
                    ]
                }
            },
            getInTouch: {
                textContent: {
                    subtitle: 'GET IN TOUCH',
                    titleMain: 'We\'d Love to Hear',
                    titleHighlight: ' from You',
                    description: 'Have a question, reservation inquiry, or special request? Reach out to us and our team will respond with care and attention.'
                },
                imageBox: {
                    imageUrl: '/resort.png',
                    socialLabel: 'Follow Us',
                    socialLinks: [
                        { iconUrl: '/icon-x.png', platformUrl: 'https://x.com' },
                        { iconUrl: '/icon-facebook.png', platformUrl: 'https://facebook.com' },
                        { iconUrl: '/icon-instagram.png', platformUrl: 'https://instagram.com' },
                        { iconUrl: '/icon-tiktok.png', platformUrl: 'https://tiktok.com' },
                        { iconUrl: '/icon-youtube.png', platformUrl: 'https://youtube.com' }
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
                mapIframeUrl: 'https://www.google.com/maps/embed',
                textContent: {
                    subtitle: 'REACH US',
                    titleMain: 'Everything You Need to',
                    titleHighlight: ' Contact 7-Oceans',
                    description: 'Find our location, phone number, and contact details to connect with 7-Oceans effortlessly. We\'re always ready to assist your plans and inquiries.'
                },
                contactCards: [
                    {
                        iconUrl: '/icon-phone.png',
                        label: 'Call Center 24/7',
                        value: '+1 (212) 578-5758'
                    },
                    {
                        iconUrl: '/icon-email.png',
                        label: 'Send Message',
                        value: 'contact@7oceans.com'
                    }
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
                    {
                        question: 'Do I need a reservation to visit 7-Oceans?',
                        answer: 'Reservations are recommended, especially on weekends and during special events, to ensure the best experience.'
                    },
                    {
                        question: 'Is there a dress code at 7-Oceans?',
                        answer: 'We recommend casual and comfortable beachwear or resort attire.'
                    },
                    {
                        question: 'Are events open to the public?',
                        answer: 'Most events are open to the public; check our calendar for private gatherings.'
                    },
                    {
                        question: 'What facilities can guests enjoy?',
                        answer: 'Guests can enjoy a range of facilities including pools, lounges, cabanas, and dining options.'
                    },
                    {
                        question: 'Is 7-Oceans suitable for private or group events?',
                        answer: 'Yes, we offer extensive venues for private and corporate group gatherings.'
                    },
                    {
                        question: 'What are the operating hours?',
                        answer: 'We operate daily from 9:00 AM to 10:00 PM.'
                    }
                ]
            }
        });
    }
    return contactDoc;
};


// @desc    Get Contact Hero Background
// @route   GET /contact/hero/background
// @access  Admin / BackendWorker / FrontendWorker
exports.getContactHeroBackground = async (req, res) => {
    try {
        const contactDoc = await getOrCreateContactDoc();
        const encryptedData = encrypt({ background: contactDoc.hero.background });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Contact Hero Background
// @route   GET /contact/hero/background/update
// @access  Admin / BackendWorker
exports.updateContactHeroBackground = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });
        const decryptedData = decrypt(req.body.encryptedToken);
        const { background } = decryptedData;
        const contactDoc = await getOrCreateContactDoc();
        if (background && background.imageUrl) {
            contactDoc.hero.background.imageUrl = background.imageUrl;
        }
        await contactDoc.save();
        const encryptedResponse = encrypt({ background: contactDoc.hero.background });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get Contact Hero InfoBox
// @route   GET /contact/hero/infobox
// @access  Admin / BackendWorker / FrontendWorker
exports.getContactHeroInfoBox = async (req, res) => {
    try {
        const contactDoc = await getOrCreateContactDoc();
        const encryptedData = encrypt({ infoBox: contactDoc.hero.infoBox });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Contact Hero InfoBox
// @route   GET /contact/hero/infobox/update
// @access  Admin / BackendWorker
exports.updateContactHeroInfoBox = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });
        const decryptedData = decrypt(req.body.encryptedToken);
        const { infoBox } = decryptedData;
        const contactDoc = await getOrCreateContactDoc();
        if (infoBox) {
            Object.assign(contactDoc.hero.infoBox, infoBox);
        }
        await contactDoc.save();
        const encryptedResponse = encrypt({ infoBox: contactDoc.hero.infoBox });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get Contact Get In Touch
// @route   GET /contact/get-in-touch
// @access  Admin / BackendWorker / FrontendWorker
exports.getContactGetInTouch = async (req, res) => {
    try {
        const contactDoc = await getOrCreateContactDoc();
        const encryptedData = encrypt({ getInTouch: contactDoc.getInTouch });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Contact Get In Touch
// @route   GET /contact/get-in-touch/update
// @access  Admin / BackendWorker
exports.updateContactGetInTouch = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });
        const decryptedData = decrypt(req.body.encryptedToken);
        const { getInTouch } = decryptedData;
        const contactDoc = await getOrCreateContactDoc();
        if (getInTouch) {
            Object.assign(contactDoc.getInTouch, getInTouch);
        }
        await contactDoc.save();
        const encryptedResponse = encrypt({ getInTouch: contactDoc.getInTouch });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get Contact Reach Us
// @route   GET /contact/reach-us
// @access  Admin / BackendWorker / FrontendWorker
exports.getContactReachUs = async (req, res) => {
    try {
        const contactDoc = await getOrCreateContactDoc();
        const encryptedData = encrypt({ reachUs: contactDoc.reachUs });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Contact Reach Us
// @route   GET /contact/reach-us/update
// @access  Admin / BackendWorker
exports.updateContactReachUs = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });
        const decryptedData = decrypt(req.body.encryptedToken);
        const { reachUs } = decryptedData;
        const contactDoc = await getOrCreateContactDoc();
        if (reachUs) {
            Object.assign(contactDoc.reachUs, reachUs);
        }
        await contactDoc.save();
        const encryptedResponse = encrypt({ reachUs: contactDoc.reachUs });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Get Contact Need To Know
// @route   GET /contact/need-to-know
// @access  Admin / BackendWorker / FrontendWorker
exports.getContactNeedToKnow = async (req, res) => {
    try {
        const contactDoc = await getOrCreateContactDoc();
        const encryptedData = encrypt({ needToKnow: contactDoc.needToKnow });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Contact Need To Know
// @route   GET /contact/need-to-know/update
// @access  Admin / BackendWorker
exports.updateContactNeedToKnow = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });
        const decryptedData = decrypt(req.body.encryptedToken);
        const { needToKnow } = decryptedData;
        const contactDoc = await getOrCreateContactDoc();
        if (needToKnow) {
            Object.assign(contactDoc.needToKnow, needToKnow);
        }
        await contactDoc.save();
        const encryptedResponse = encrypt({ needToKnow: contactDoc.needToKnow });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
