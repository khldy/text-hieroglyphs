document.getElementById('nameForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nameInput = document.getElementById('nameInput').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Clear previous results
    const hieroglyphs = convertToHieroglyphs(nameInput);
    const hieroglyphsText = document.createElement('div');
    hieroglyphsText.textContent = hieroglyphs;
    resultDiv.appendChild(hieroglyphsText);
    createImage(hieroglyphs);
});

function convertToHieroglyphs(name) {
    const hieroglyphsMap = {
        'a': '𓄿', 'b': '𓃀', 'c': '𓎡', 'd': '𓂧', 'e': '𓇋', 'f': '𓆑', 
        'g': '𓎼', 'h': '𓎛', 'i': '𓇋', 'j': '𓆓', 'k': '𓎡', 'l': '𓃭', 
        'm': '𓅓', 'n': '𓈖', 'o': '𓍯', 'p': '𓊪', 'q': '𓏘', 'r': '𓂋', 
        's': '𓋴', 't': '𓏏', 'u': '𓅱', 'v': '𓆑', 'w': '𓅱', 'x': '𓎡𓋴', 
        'y': '𓇋𓇋', 'z': '𓊃', 'ı':'𓇋', 'ü': '𓅱', 'ö': '𓅱', 'ç':  '𓎡',
        'ş': '𓋴', ' ': ' '
    };

    let hieroglyphs = '';
    for (let char of name.toLowerCase()) {
        if (hieroglyphsMap[char]) {
            hieroglyphs += hieroglyphsMap[char];
        } else {
            hieroglyphs += char;
        }
    }
    return hieroglyphs;
}

function createImage(text) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 1080;
    canvas.height = 1080;

    // Clear the canvas before drawing
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Set background
    const img = new Image();
    img.src = 'pics/text-back.jpg'; // Add a relevant image for the background
    img.onload = () => {
        console.log('Image loaded successfully');
        context.globalCompositeOperation = 'source-over'; // Ensure drawing over the background
        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Split the text by spaces to create multiple lines
        const lines = text.split('\n');
        const lineHeight = 130;

        // Calculate the font size based on the length of the input text
        const MAX_FONT_SIZE = 120;
        const MIN_FONT_SIZE = 40;
        const fontSize = Math.min(MAX_FONT_SIZE, Math.max(MIN_FONT_SIZE, MAX_FONT_SIZE - text.length));

        // Set text properties
        context.font = fontSize + 'px GoogleMedium';
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        
        const initialY = canvas.height / 2 - (lines.length - 1) * lineHeight / 2;
        lines.forEach((line, index) => {
            context.fillText(line, canvas.width / 2, initialY + index * lineHeight);
        });

        // const verticalOffset = 55; // Adjust this value as needed
    // context.fillText(text, canvas.width / 2, canvas.height / 2 + verticalOffset);
        // Draw text
        // context.fillText(text, canvas.width / 2, canvas.height / 2);

        // Add download button
        const downloadButton = document.createElement('d-button');
        downloadButton.textContent = 'Download Image';
        downloadButton.style.display = 'block';
        downloadButton.style.marginTop = '20px';

        downloadButton.addEventListener('click', function() {
            const dataURL = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = dataURL;
            downloadLink.download = 'hieroglyphs.png';
            downloadLink.click();
        });

        document.getElementById('result').appendChild(downloadButton);
    };
}
