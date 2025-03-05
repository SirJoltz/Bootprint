// public/script.js
document.getElementById('submitBtn').addEventListener('click', function() {
  const text = document.getElementById('textArea').value;
  if (text.trim()) {
    alert('Text Submitted: ' + text);
  } else {
    alert('Please paste some text');
  }
});