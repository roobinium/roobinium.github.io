function photoshoot() {
    const galleryWrapper = document.querySelector('.photoshoot__gallery-wrapper');
    let isDown = false;
    let startX;
    let scrollLeft;

    galleryWrapper.addEventListener('mousedown', (e) => {
        isDown = true;
        galleryWrapper.classList.add('active');
        startX = e.pageX - galleryWrapper.offsetLeft;
        scrollLeft = galleryWrapper.scrollLeft;

        galleryWrapper.style.userSelect = 'none';
        galleryWrapper.style.cursor = 'grabbing';
    });

    galleryWrapper.addEventListener('mouseup', () => {
        isDown = false;
        galleryWrapper.classList.remove('active');

        galleryWrapper.style.userSelect = '';
        galleryWrapper.style.cursor = 'grab';
    });

    galleryWrapper.addEventListener('mouseleave', () => {
        isDown = false;
        galleryWrapper.classList.remove('active');
        galleryWrapper.style.userSelect = '';
        galleryWrapper.style.cursor = 'grab';
    });

    galleryWrapper.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - galleryWrapper.offsetLeft;
        const walk = (x - startX) * 0.8;
        galleryWrapper.scrollLeft = scrollLeft - walk;
    });

}

export default photoshoot;