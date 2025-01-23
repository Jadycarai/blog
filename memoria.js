document.querySelectorAll('.fragment').forEach(fragment => {
    fragment.addEventListener('mouseover', () => {
        fragment.style.transform = 'scale(1.05)';
    });

    fragment.addEventListener('mouseout', () => {
        fragment.style.transform = 'scale(1)';
    });
});
