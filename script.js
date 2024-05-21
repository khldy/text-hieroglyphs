document.getElementById('nameForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nameInput = document.getElementById('nameInput').value;
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = convertToHieroglyphs(nameInput);
});

function convertToHieroglyphs(name) {
    const hieroglyphsMap = {
        'a': '𓄿', 'b': '𓃀', 'c': '𓎡', 'd': '𓂧', 'e': '𓇋', 'f': '𓆑', 
        'g': '𓎼', 'h': '𓎛', 'i': '𓇋', 'j': '𓆓', 'k': '𓎡', 'l': '𓃭', 
        'm': '𓅓', 'n': '𓈖', 'o': '𓅱', 'p': '𓊪', 'q': '𓏘', 'r': '𓂋', 
        's': '𓋴', 't': '𓏏', 'u': '𓅱', 'v': '𓆑', 'w': '𓅱', 'x': '𓎡𓋴', 
        'y': '𓇋', 'z': '𓊃'
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
