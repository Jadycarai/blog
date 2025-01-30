const image = document.querySelector('.glitch-image');
const sound = document.getElementById('glitch-sound');

image.addEventListener('mouseover', () => {
    image.style.transform = 'scale(1.1)';
    sound.play();
});

image.addEventListener('mouseout', () => {
    image.style.transform = 'scale(1)';
    sound.pause();
});
