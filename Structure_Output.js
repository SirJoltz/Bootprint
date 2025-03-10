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
        
        // Find the starting stage (one that has no incoming connections)
        const startStage = structure.find(stage => 
            !structure.some(s => 
                s.onTrue === stage.stageId || 
                s.onFalse === stage.stageId || 
                (s.type.toLowerCase() === 'anchor' && s.onsuccess === stage.stageId)
            )
        );

        if (startStage) {
            output += generatePADCode(
                startStage.type, 
                startStage.name, 
                startStage.expression,
                startStage.nextStageTrue,
                startStage.nextStageFalse,
                startStage.nextStageSuccess,
                startStage.actionObject,
                startStage.actionName
            );
        } else {
            output += '# Error: Could not find starting stage';
        }
        
        outputArea.value = output.trim();
    } catch (error) {
        outputArea.value = '# Error: ' + error.message;
        console.error(error);
    }
}); 