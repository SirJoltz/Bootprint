function generatePADCode(type, stageName, expression, nextStageTrue, nextStageFalse, nextStageSuccess, actionObject, actionName) {
    if (!type) {
        return '# Type not provided';
    }
    
    switch (type.toLowerCase()) {
        case 'end':
            return 'EXIT FUNCTION';
            
        case 'anchor':
            // For anchor stages, continue to the next stage in the success path
            if (nextStageSuccess) {
                return generatePADCode(
                    nextStageSuccess.type,
                    nextStageSuccess.name,
                    nextStageSuccess.expression,
                    nextStageSuccess.nextStageTrue,
                    nextStageSuccess.nextStageFalse,
                    nextStageSuccess.nextStageSuccess,
                    nextStageSuccess.actionObject,
                    nextStageSuccess.actionName
                );
            }
            return '# Anchor with no next stage';
            
        case 'action':
            // For action stages, create a comment with the action information
            let actionOutput = `# Stage ${stageName}\n`;
            actionOutput += `# Desktop Flow - ${actionObject}.${actionName}\n`;
            
            // If there's a success path, follow it
            if (nextStageSuccess) {
                return actionOutput + generatePADCode(
                    nextStageSuccess.type,
                    nextStageSuccess.name,
                    nextStageSuccess.expression,
                    nextStageSuccess.nextStageTrue,
                    nextStageSuccess.nextStageFalse,
                    nextStageSuccess.nextStageSuccess,
                    nextStageSuccess.actionObject,
                    nextStageSuccess.actionName
                );
            }
            
            return actionOutput;
            
        case 'decision':
            const cleanExpression = expression.replace(/[\[\]"']/g, '');
            let output = `# Stage ${stageName}\n`;
            output += `IF ${cleanExpression} = True THEN\n`;
            
            // Add the true path PAD code
            if (nextStageTrue) {
                output += generatePADCode(
                    nextStageTrue.type,
                    nextStageTrue.name,
                    nextStageTrue.expression,
                    nextStageTrue.nextStageTrue,
                    nextStageTrue.nextStageFalse,
                    nextStageTrue.nextStageSuccess,
                    nextStageTrue.actionObject,
                    nextStageTrue.actionName
                ) + '\n';
            }
            
            output += 'ELSE\n';
            
            // Add the false path PAD code
            if (nextStageFalse) {
                output += generatePADCode(
                    nextStageFalse.type,
                    nextStageFalse.name,
                    nextStageFalse.expression,
                    nextStageFalse.nextStageTrue,
                    nextStageFalse.nextStageFalse,
                    nextStageFalse.nextStageSuccess,
                    nextStageFalse.actionObject,
                    nextStageFalse.actionName
                ) + '\n';
            }
            
            output += 'END';
            return output;
            
        default:
            return `# Type not supported: ${type}`;
    }
}