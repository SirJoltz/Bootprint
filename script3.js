// script3.js - Event handlers
document.getElementById('submitBtn').addEventListener('click', function() {
    const xmlText = document.getElementById('textArea').value;
    const outputArea = document.getElementById('outputArea');
    
    try {
        // Get the structured array of XML elements
        const structure = parseXMLStructure(xmlText);
        
        if (structure.length > 0) {
            // Show found types and stageIds in alert
            const summary = structure
                .map(item => `Stage ${item.stageId}: ${item.type}`)
                .join('\n');
            alert('Found elements:\n' + summary);
            
            // Transform and show generated code
            const generatedCode = processXMLSequence(structure);
            outputArea.value = generatedCode;
        } else {
            alert('No elements with both type and stageId attributes found');
            outputArea.value = '// No valid elements found';
        }
    } catch (error) {
        alert(error.message);
        outputArea.value = '// Error: ' + error.message;
    }
}); 