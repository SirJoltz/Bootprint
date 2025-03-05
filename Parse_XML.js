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
function parseXMLStructure(xmlText) {
    try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        
        // Get all elements with both type and stageId attributes
        const elements = xmlDoc.querySelectorAll('[type][stageId]');
        
        if (elements.length > 0) {
            // Create array of objects with type and stageId
            const structure = Array.from(elements).map(element => ({
                type: element.getAttribute('type'),
                stageId: parseInt(element.getAttribute('stageId')),
                xml: element.outerHTML // Store the XML for this element
            }));
            
            // Sort by stageId
            return structure.sort((a, b) => a.stageId - b.stageId);
        }
        return [];
    } catch (error) {
        throw new Error('Invalid XML format');
    }
} 