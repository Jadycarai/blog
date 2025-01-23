document.querySelectorAll('.fragment').forEach(fragment => {
    fragment.addEventListener('click', () => {
        fragment.style.transform = 'rotate(180deg)';
        setTimeout(() => fragment.style.transform = '', 1000);
    });
});
