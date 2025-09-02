// Dark mode toggle
const darkModeBtn = document.getElementById("darkModeBtn");
darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Typewriter Animation
const texts = ["I build modern websites", "I build web apps", "AI & Automation"];
let index = 0, charIndex = 0;
const animatedText = document.getElementById("animated-text");

function type() {
    if (charIndex === 0) animatedText.textContent = "";

    if (charIndex < texts[index].length) {
        animatedText.textContent += texts[index][charIndex];
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 1500);
    }
}

function erase() {
    if (charIndex > 0) {
        animatedText.textContent = texts[index].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        index = (index + 1) % texts.length;
        charIndex = 0;
        setTimeout(type, 500);
    }
}

type();
