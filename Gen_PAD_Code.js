function generatePADCode(type, stageName, expression) {
    if (!type) {
        return '// Type not provided';
    }
    
    switch (type.toLowerCase()) {
        case 'end':
            return 'EXIT FUNCTION';
        case 'decision':
            return `IF "${expression}" = True THEN\n    // Decision block\nEND`;
        case 'start':
            return 'START FUNCTION';
        default:
            return `// Type not supported: ${type}`;
    }
}