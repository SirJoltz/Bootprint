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
            xml: stage.outerHTML
        }));

        return structure;
    } catch (error) {
        throw new Error('XML parsing failed: ' + error.message);
    }
}