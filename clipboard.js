// clipboard.js - Clipboard functionality
document.addEventListener('DOMContentLoaded', () => {
    // Create a copy button
    const outputContainer = document.querySelector('.output-container');
    const copyButton = document.createElement('button');
    copyButton.id = 'copyBtn';
    copyButton.textContent = 'Copy to Clipboard';
    copyButton.className = 'copy-button';
    
    // Insert the button after the output textarea
    const outputArea = document.getElementById('outputArea');
    outputArea.insertAdjacentElement('afterend', copyButton);
    
    // Add click event listener to the copy button
    copyButton.addEventListener('click', () => {
        const textToCopy = outputArea.value;
        
        if (!textToCopy) {
            console.warn('No content to copy');
            return;
        }
        
        // Try to use the Clipboard API first
        const copyUsingAPI = () => {
            return navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    console.log('Text copied to clipboard using Clipboard API');
                    return true;
                })
                .catch(err => {
                    console.error('Failed to copy text using Clipboard API: ', err);
                    return false;
                });
        };
        
        // Fallback method using document.execCommand
        const copyUsingExecCommand = () => {
            // Create a temporary textarea element
            const tempTextArea = document.createElement('textarea');
            tempTextArea.value = textToCopy;
            
            // Make it invisible but part of the document
            tempTextArea.style.position = 'absolute';
            tempTextArea.style.left = '-9999px';
            tempTextArea.style.top = '0';
            document.body.appendChild(tempTextArea);
            
            // Select and copy
            tempTextArea.select();
            let success = false;
            
            try {
                success = document.execCommand('copy');
                if (success) {
                    console.log('Text copied to clipboard using execCommand');
                } else {
                    console.error('execCommand copy failed');
                }
            } catch (err) {
                console.error('Failed to copy text using execCommand: ', err);
                success = false;
            }
            
            // Clean up
            document.body.removeChild(tempTextArea);
            return success;
        };
        
        // Try Clipboard API first, then fall back to execCommand
        copyUsingAPI().then(success => {
            if (!success) {
                // Try the fallback method
                success = copyUsingExecCommand();
            }
            
            // Visual feedback regardless of which method worked
            if (success) {
                const originalText = copyButton.textContent;
                copyButton.textContent = 'Copied!';
                copyButton.classList.add('copied');
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    copyButton.textContent = originalText;
                    copyButton.classList.remove('copied');
                }, 2000);
            } else {
                // If both methods failed, show error message
                copyButton.textContent = 'Copy Failed';
                copyButton.classList.add('copy-error');
                
                setTimeout(() => {
                    copyButton.textContent = 'Copy to Clipboard';
                    copyButton.classList.remove('copy-error');
                }, 2000);
            }
        });
    });
}); 