const WelcomePopup = require('../models/WelcomePopup');
const { encrypt, decrypt } = require('../utils/encryption');

// Helper to get or create
const getOrCreateWelcomePopupDoc = async () => {
    let popup = await WelcomePopup.findOne();
    if (!popup) {
        popup = await WelcomePopup.create({
            image: {
                imageUrl: '/namaste-woman.png',
                altText: 'Welcome Image'
            },
            text: {
                subtitle: 'WELCOME',
                title: 'Namaste',
                description: 'Namaste and welcome to 7-Oceans Waterpark & Resort.'
            },
            button: {
                label: 'Enter Website',
                url: '/'
            },
            isActive: true
        });
    }
    return popup;
};


// @desc    Get Welcome Popup Data
// @route   GET /welcome-popup
// @access  Admin / BackendWorker / FrontendWorker
exports.getWelcomePopup = async (req, res) => {
    try {
        const popup = await getOrCreateWelcomePopupDoc();
        const encryptedData = encrypt({ popup });
        res.status(200).json({ success: true, encryptedToken: encryptedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


// @desc    Update Welcome Popup Data
// @route   GET /welcome-popup/update
// @access  Admin / BackendWorker
exports.updateWelcomePopup = async (req, res) => {
    try {
        if (!req.body.encryptedToken) return res.status(400).json({ success: false, error: 'Encrypted token required' });

        const decryptedData = decrypt(req.body.encryptedToken);
        const { popup } = decryptedData;
        const popupDoc = await getOrCreateWelcomePopupDoc();

        if (popup) {
            if (popup.image) Object.assign(popupDoc.image, popup.image);
            if (popup.text) Object.assign(popupDoc.text, popup.text);
            if (popup.button) Object.assign(popupDoc.button, popup.button);
            if (popup.isActive !== undefined) popupDoc.isActive = popup.isActive;
        }

        await popupDoc.save();
        const encryptedResponse = encrypt({ popup: popupDoc });
        res.status(200).json({ success: true, encryptedToken: encryptedResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
