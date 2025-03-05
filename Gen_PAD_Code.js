function generatePADCode(type, stageName, expression) {
    if (!type) {
        return '# Type not provided';
    }
    
    switch (type.toLowerCase()) {
        case 'end':
            return 'EXIT FUNCTION';
        case 'decision':
            // Debug alerts to show expression transformation
            const cleanExpression = expression.replace(/[\[\]"']/g, '');
            return `IF ${cleanExpression} = True THEN\n# Decision block\nEND`;
        default:
            return `# Type not supported: ${type}`;
    }
}