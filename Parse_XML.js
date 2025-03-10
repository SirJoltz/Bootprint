// script1.js - XML parsing and structure analysis
function parseXMLStructure(xmlDoc) {
    try {
        // Get all stage elements
        const stages = xmlDoc.getElementsByTagName('stage');
        console.log('Found stages:', stages);
        
        if (stages.length === 0) {
            throw new Error('No stage elements found');
        }

        // Create array of objects with type, stageId, and decision expression
        let structure = Array.from(stages).map(stage => {
            console.log('Processing stage:', stage);
            const stageObj = {
                type: stage.getAttribute('type') || '',
                stageId: stage.getAttribute('stageid') || '',
                name: stage.getAttribute('name') || '',
                expression: stage.querySelector('decision')?.getAttribute('expression') || '',
                onTrue: stage.querySelector('ontrue')?.textContent || '',
                onFalse: stage.querySelector('onfalse')?.textContent || '',
                onsuccess: stage.querySelector('onsuccess')?.textContent || '',
                xml: stage.outerHTML
            };
            
            // Extract action information for action type stages
            if (stageObj.type.toLowerCase() === 'action') {
                const resource = stage.querySelector('resource');
                if (resource) {
                    stageObj.actionObject = resource.getAttribute('object') || '';
                    stageObj.actionName = resource.getAttribute('action') || '';
                }
            }
            
            console.log('Stage details:', {
                type: stageObj.type,
                name: stageObj.name,
                stageId: stageObj.stageId,
                expression: stageObj.expression,
                onTrue: stageObj.onTrue,
                onFalse: stageObj.onFalse,
                onsuccess: stageObj.onsuccess,
                actionObject: stageObj.actionObject,
                actionName: stageObj.actionName
            });
            return stageObj;
        });

        // Reverse the order of the stages
        structure = structure.reverse();
        console.log('Structure after reversing:', structure);

        console.log('Final structure before linking:', structure);

        // Add reference to next stage object for all paths
        structure.forEach(stage => {
            if (stage.onTrue) {
                stage.nextStageTrue = structure.find(s => s.stageId === stage.onTrue);
                console.log(`Linking stage ${stage.stageId} to next true stage:`, {
                    currentStage: stage.stageId,
                    nextStageId: stage.onTrue,
                    nextStageFound: !!stage.nextStageTrue
                });
            }
            if (stage.onFalse) {
                stage.nextStageFalse = structure.find(s => s.stageId === stage.onFalse);
                console.log(`Linking stage ${stage.stageId} to next false stage:`, {
                    currentStage: stage.stageId,
                    nextStageId: stage.onFalse,
                    nextStageFound: !!stage.nextStageFalse
                });
            }
            if (stage.onsuccess) {
                stage.nextStageSuccess = structure.find(s => s.stageId === stage.onsuccess);
                console.log(`Linking stage ${stage.stageId} to next success stage:`, {
                    currentStage: stage.stageId,
                    nextStageId: stage.onsuccess,
                    nextStageFound: !!stage.nextStageSuccess
                });
            }
        });

        console.log('Final structure after linking:', JSON.stringify(structure, null, 2));
        return structure;
    } catch (error) {
        console.error('XML parsing error:', error);
        throw new Error('XML parsing failed: ' + error.message);
    }
}