// public/script.js
function validateXMLInput(xmlText) {
    if (!xmlText || xmlText.trim() === '') {
        throw new Error('XML input is empty');
    }

    try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        
        // Check for parsing errors
        const parserError = xmlDoc.querySelector('parsererror');
        if (parserError) {
            throw new Error('Invalid XML format');
        }
        
        return xmlDoc;
    } catch (error) {
        throw new Error('XML validation failed: ' + error.message);
    }
}