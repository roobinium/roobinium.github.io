const ProfileMenuMobile = () => {
    const isMobile = () => window.innerWidth <= 768;

    const openButton = document.getElementById('openProfileOverlay');
    const closeButton = document.getElementById('closeProfileOverlay');
    const overlay = document.querySelector('.profile-overlay');
    const overlayContainer = document.querySelector('.profile-overlay__container');
    const body = document.body;
    const header = document.querySelector('.header');

    let scrollY = 0;

    if (!openButton || !closeButton || !overlay || !overlayContainer) {
        console.warn('ProfileMenuMobile: элементы не найдены');
        return null;
    }

    const applyAnimation = (element, animation, removeAnimations = []) => {
        element.classList.add('animate__animated', animation);
        removeAnimations.forEach(cls => element.classList.remove(cls));

        element.addEventListener(
            'animationend',
            () => element.classList.remove('animate__animated', animation),
            { once: true }
        );
    };

    const openOverlay = (e) => {
        if (!isMobile()) return;

        scrollY = window.scrollY;

        body.style.position = 'fixed';
        body.style.top = `-${scrollY}px`;
        body.style.width = '100%';

        overlay.classList.add('is-active');
        overlay.setAttribute('aria-hidden', 'false');
        
        
        setTimeout(() => {
            if (header) {
                header.classList.add('overlay-hidden');
            }

        }, 500);

        applyAnimation(overlayContainer, 'animate__fadeInUp', ['animate__fadeOutDown']);
        applyAnimation(overlay, 'animate__fadeInUp', ['animate__fadeOutDown']);
    };

    const closeOverlay = (e) => {
        if (!isMobile()) return;

        overlay.setAttribute('aria-hidden', 'true');

        applyAnimation(overlayContainer, 'animate__fadeOutDown', ['animate__fadeInUp']);
        applyAnimation(overlay, 'animate__fadeOutDown', ['animate__fadeInUp']);

        setTimeout(() => {
            overlay.classList.remove('is-active');
            
            

            const bodyY = Math.abs(parseInt(body.style.top || '0'));
            body.style.position = '';
            body.style.top = '';
            body.style.width = '';
            window.scrollTo(0, bodyY);

        }, 500);
        if (header) {
            header.classList.remove('overlay-hidden');
        }
    };

    const handleResize = () => {
        if (!isMobile() && overlay.classList.contains('is-active')) {
            overlay.classList.remove('is-active');

            if (header) {
                header.classList.remove('overlay-hidden');
            }

            const bodyY = Math.abs(parseInt(body.style.top || '0'));
            body.style.position = '';
            body.style.top = '';
            body.style.width = '';
            window.scrollTo(0, bodyY);
        }
    };

    openButton.addEventListener('click', openOverlay);
    closeButton.addEventListener('click', closeOverlay);
    window.addEventListener('resize', handleResize);

    return {
        open: () => openOverlay(new Event('click')),
        close: () => closeOverlay(new Event('click'))
    };
};

export default ProfileMenuMobile;
