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

    // Save to localStorage
    saveToLocalStorage(nameInput);
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
    canvas.width = 1191;
    canvas.height = 907;

    // Clear the canvas before drawing
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Set background
    const img = new Image();
    img.src = 'pics/text-back.jpg'; // Add a relevant image for the background
    img.onload = () => {
        console.log('Image loaded successfully');
        context.globalCompositeOperation = 'source-over'; // Ensure drawing over the background
        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Function to wrap text into lines
        function wrapText(context, text, maxWidth, fontSize) {
            const words = text.split(' ');
            let line = '';
            const lines = [];

            for (let n = 0; n < words.length; n++) {
                const testLine = line + words[n] + ' ';
                context.font = fontSize + 'px GoogleMedium';
                const metrics = context.measureText(testLine);
                const testWidth = metrics.width;
                if (testWidth > maxWidth && n > 0) {
                    lines.push(line.trim());
                    line = words[n] + ' ';
                } else {
                    line = testLine;
                }
            }
            lines.push(line.trim());
            return lines;
        }

        // Calculate the font size and adjust it based on text length and canvas width
        const MAX_FONT_SIZE = 120;
        const MIN_FONT_SIZE = 40;
        let fontSize = MAX_FONT_SIZE;
        let lines = wrapText(context, text, canvas.width - 100, fontSize);
        let textHeight = lines.length * (fontSize + 10);

        // Adjust font size if text exceeds canvas width or height
        while (fontSize > MIN_FONT_SIZE && (textHeight > canvas.height - 100 || lines.some(line => context.measureText(line).width > canvas.width - 100))) {
            fontSize -= 5;
            lines = wrapText(context, text, canvas.width - 100, fontSize);
            textHeight = lines.length * (fontSize + 10);
        }

        // Set text properties
        context.font = fontSize + 'px GoogleMedium';
        context.fillStyle = 'black';
        context.textAlign = 'center';
        context.textBaseline = 'middle';

        // Draw wrapped text
        const lineHeight = fontSize + 10;
        const verticalOffset = 80; // Adjust this value to move the text down
        const initialY = canvas.height / 2 - (lines.length - 1) * lineHeight / 2 + verticalOffset;
        lines.forEach((line, index) => {
            context.fillText(line, canvas.width / 2, initialY + index * lineHeight);
        });

        // Add download button
        const downloadButton = document.createElement('button');
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

function saveToLocalStorage(text) {
    let storedTexts = JSON.parse(localStorage.getItem('storedTexts')) || [];
    storedTexts.push(text);
    localStorage.setItem('storedTexts', JSON.stringify(storedTexts));
}

// The following function is for developer use only, not for displaying to users
function getStoredTexts() {
    return JSON.parse(localStorage.getItem('storedTexts')) || [];
}
