// script1.js - XML parsing and structure analysis
function parseXMLStructure(xmlDoc) {
    try {
        // Get all stage elements
        const stages = xmlDoc.getElementsByTagName('stage');
        
        if (stages.length === 0) {
            throw new Error('No stage elements found');
        }

        // Create array of objects with type, stageId, and decision expression
        const structure = Array.from(stages).map(stage => ({
            type: stage.getAttribute('type') || '',
            stageId: stage.getAttribute('stageid') || '',
            name: stage.getAttribute('name') || '',
            expression: stage.querySelector('decision')?.getAttribute('expression') || '',
            onTrue: stage.querySelector('ontrue')?.textContent || '',
            xml: stage.outerHTML
        }));

        // Add reference to next stage object
        structure.forEach(stage => {
            if (stage.onTrue) {
                stage.nextStage = structure.find(s => s.stageId === stage.onTrue);
            }
        });

        return structure;
    } catch (error) {
        throw new Error('XML parsing failed: ' + error.message);
    }
}