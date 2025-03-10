// Store the original console methods
const originalConsole = {
    log: console.log,
    error: console.error,
    warn: console.warn,
    info: console.info
};

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    const consoleOutput = document.getElementById('consoleOutput');
    const clearConsoleBtn = document.getElementById('clearConsole');

    // Override console methods
    console.log = function(...args) {
        appendToConsole('log', args);
        originalConsole.log.apply(console, args);
    };

    console.error = function(...args) {
        appendToConsole('error', args);
        originalConsole.error.apply(console, args);
    };

    console.warn = function(...args) {
        appendToConsole('warn', args);
        originalConsole.warn.apply(console, args);
    };

    console.info = function(...args) {
        appendToConsole('info', args);
        originalConsole.info.apply(console, args);
    };

    // Function to append messages to our custom console
    function appendToConsole(type, args) {
        const entry = document.createElement('div');
        entry.className = `console-entry console-${type}`;
        
        const timestamp = new Date().toLocaleTimeString();
        const message = args.map(arg => {
            if (typeof arg === 'object') {
                return JSON.stringify(arg, null, 2);
            }
            return String(arg);
        }).join(' ');

        entry.innerHTML = `<span class="console-timestamp">[${timestamp}]</span> ${message}`;
        consoleOutput.appendChild(entry);
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }

    // Clear console functionality
    clearConsoleBtn.addEventListener('click', () => {
        consoleOutput.innerHTML = '';
    });
}); 