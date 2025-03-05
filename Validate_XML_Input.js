// public/script.js
document.getElementById('submitBtn').addEventListener('click', function() {
    const xmlText = document.getElementById('textArea').value;
    
    try {
        // Parse the XML string
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        
        // Get all elements with a type attribute
        const elementsWithType = xmlDoc.querySelectorAll('[type]');
        
        if (elementsWithType.length > 0) {
            // Collect all types
            const types = Array.from(elementsWithType).map(element => element.getAttribute('type'));
            
            // Show types in alert box
            alert('Found types:\n' + types.join('\n'));
        } else {
            alert('No type attributes found in the XML');
        }
    } catch (error) {
        alert('Invalid XML format');
    }
});

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