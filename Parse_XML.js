// script1.js - XML parsing functions
function parseXMLAndGetTypes(xmlText) {
    try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        
        // Get all elements with a type attribute
        const elementsWithType = xmlDoc.querySelectorAll('[type]');
        
        if (elementsWithType.length > 0) {
            // Collect all types
            return Array.from(elementsWithType).map(element => element.getAttribute('type'));
        }
        return [];
    } catch (error) {
        throw new Error('Invalid XML format');
    }
}

function transformXMLToCode(xmlText) {
    try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        const rootElement = xmlDoc.documentElement;
        
        // Get the type attribute
        const type = rootElement.getAttribute('type');
        
        // Transform based on type
        if (type === 'end') {
            return 'EXIT FUNCTION';
        }
        // Add more transformations here as needed
        
        return `// No transformation rule for type: ${type}`;
    } catch (error) {
        throw new Error('Invalid XML format');
    }
}

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