function generatePADCode(type, stageName, expression, nextStage) {
    if (!type) {
        return '# Type not provided';
    }
    
    switch (type.toLowerCase()) {
        case 'end':
            return 'EXIT FUNCTION';
        case 'decision':
            const cleanExpression = expression.replace(/[\[\]"']/g, '');
            let decisionBlock = `IF ${cleanExpression} = True THEN\n`;
            if (nextStage) {
                decisionBlock += `    ${generatePADCode(nextStage.type, nextStage.name, nextStage.expression, nextStage.nextStage)}\n`;
            } else {
                decisionBlock += '# No next stage found\n';
            }
            decisionBlock += 'END';
            return decisionBlock;
        default:
            return `# Type not supported: ${type}`;
    }
}