// public/script.js
document.getElementById('submitBtn').addEventListener('click', function() {
    const xmlText = document.getElementById('textArea').value;
    const resultDiv = document.getElementById('result');
    
    try {
        // Parse the XML string
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        
        // Get the root element
        const rootElement = xmlDoc.documentElement;
        
        // Get the type attribute
        const type = rootElement.getAttribute('type');
        
        if (type) {
            resultDiv.textContent = `Type: ${type}`;
            resultDiv.style.color = 'green';
        } else {
            resultDiv.textContent = 'No type attribute found in the XML';
            resultDiv.style.color = 'orange';
        }
    } catch (error) {
        resultDiv.textContent = 'Invalid XML format';
        resultDiv.style.color = 'red';
    }
});