// script3.js - Event handlers
document.getElementById('submitBtn').addEventListener('click', function() {
    const xmlText = document.getElementById('textArea').value;
    const outputArea = document.getElementById('outputArea');
    
    try {
        // Step 1: Validate XML
        const xmlDoc = validateXMLInput(xmlText);
        
        // Step 2: Parse XML structure
        const structure = parseXMLStructure(xmlDoc);
        
        // Step 3: Generate and format output
        let output = '';
        for (const item of structure) {
            output += `# Stage ${item.stageId} Name ${item.name} (${item.type})\n`;
            output += generatePADCode(item.type, item.name, item.expression);
            output += '\n\n';
        }
        
        outputArea.value = output.trim();
    } catch (error) {
        outputArea.value = '# Error: ' + error.message;
        console.error(error);
    }
}); 