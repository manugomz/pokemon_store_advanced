/*------------------------------------Dark mode--------------------------------------------------- */
const darkButton = document.getElementById('dark-button');
const textLists = document.querySelectorAll('.to-dark');
const textLinks = document.querySelectorAll('.to-dark-link');
const arrow = document.querySelectorAll('.arrow');
const colorBack = document.body;

if (sessionStorage.darkMode === 'on') {
    darkModeToggle();
    darkButton.textContent = "Light mode";
}

darkButton.addEventListener("click", () => {
    if (sessionStorage.darkMode === "on") {
        sessionStorage.darkMode = "off";
        darkButton.textContent = "Dark mode";
    } else {
        sessionStorage.darkMode = "on";
        darkButton.textContent = "Light mode";
    }
    darkModeToggle();
});

function darkModeToggle() {
    colorBack.classList.toggle('dark-mode-bg');

    arrow.forEach(arrow => {
        arrow.classList.toggle('dark-mode-arrow');
    })

    textLists.forEach(text => {
        text.classList.toggle('dark-mode-txt');
    })
    textLinks.forEach(text => {
        text.classList.toggle('dark-mode-link');
    })
}
