// script2.js - Event handlers
document.getElementById('submitBtn').addEventListener('click', function() {
    const xmlText = document.getElementById('textArea').value;
    const outputArea = document.getElementById('outputArea');
    
    try {
        // Show types in alert
        const types = parseXMLAndGetTypes(xmlText);
        if (types.length > 0) {
            alert('Found types:\n' + types.join('\n'));
        } else {
            alert('No type attributes found in the XML');
        }
        
        // Transform and show generated code
        const generatedCode = transformXMLToCode(xmlText);
        outputArea.value = generatedCode;
    } catch (error) {
        alert(error.message);
        outputArea.value = '// Error: ' + error.message;
    }
});

// script2.js - XML transformation logic
function transformXMLToCode(xmlElement, type) {
    switch (type.toLowerCase()) {
        case 'end':
            return 'EXIT FUNCTION';
        case 'decision':
            return 'IF CONDITION THEN\n    // Decision block\nEND IF';
        case 'start':
            return 'START FUNCTION';
        // Add more transformations as needed
        default:
            return `// Type not supported: ${type}`;
    }
}

function processXMLSequence(structure) {
    let output = '';
    
    for (const item of structure) {
        output += `// Stage ${item.stageId} (${item.type})\n`;
        output += transformXMLToCode(item.xml, item.type);
        output += '\n\n';
    }
    
    return output.trim();
} 