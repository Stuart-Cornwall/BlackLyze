const vision = require('@google-cloud/vision');

exports.handler = async (event) => {
    try {
        const client = new vision.ImageAnnotatorClient();
        const { image } = JSON.parse(event.body);

        // Analyze the image using OCR
        const [result] = await client.textDetection(Buffer.from(image, 'base64'));
        const detectedText = result.textAnnotations[0]?.description || '';

        // Process text to extract card details
        const cards = extractCards(detectedText);

        // Calculate probabilities and advice
        const advice = calculateBlackjackStrategy(cards);

        return {
            statusCode: 200,
            body: JSON.stringify({ advice }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to process image.' }),
        };
    }
};

function extractCards(text) {
    // Extract card information based on the OCR output
    const matches = text.match(/([2-9]|10|J|Q|K|A)[♠♥♦♣]?/g) || [];
    return matches.slice(0, 3); // Assume first 3 are relevant
}

function calculateBlackjackStrategy(cards) {
    // Implement blackjack probability and strategy calculation
    return 'Hit'; // Placeholder logic
}
