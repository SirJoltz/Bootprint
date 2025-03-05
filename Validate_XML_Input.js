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