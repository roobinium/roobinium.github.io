function setRealViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setRealViewportHeight();
window.addEventListener('resize', setRealViewportHeight);
window.addEventListener('orientationchange', setRealViewportHeight);

function headerNav() {

    let isBurgerOpen = false;
    let isToggleLangDesktopOpen = false;
    let isToggleLangMobileOpen = false;
    let clickDisabled = false;
    function isMobileDevice() {
        return window.innerWidth < 768;
    }

    function toggleClass(element, class1, class2) {
        if (element.classList.contains(class1)) {
            element.classList.remove("animate__animated", class1);
            element.classList.add("animate__animated", class2);
        } else {
            element.classList.remove(class2);
            element.classList.add("animate__animated", class1);
        }
    }

    function toggleDisplay(element, display1, display2) {
        if (element.style.display === display1) {
            setTimeout(() => {
                element.style.display = display2;
            }, 500);
        } else {
            setTimeout(() => {
                element.style.display = display1;
            }, 200);
        }
    }

    function togglangDisp(element, display1, display2) {
        if (element.style.display === display1) {
            element.style.display = display2;
        } else {
            element.style.display = display1;
        }
    }

    function toggleOverlay(overlay) {
        overlay.classList.toggle("active");
    }

    function toggleNoScroll() {
        if (document.body.classList.contains("no-scroll")) {
            document.body.classList.remove("no-scroll");
            document.body.style.removeProperty('padding-right');
        } else {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.classList.add("no-scroll");
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }
    }

    function togglPos(element, display1, display2) {
        if (element.style.position === display1) {
            element.style.position = display2;
            element.style.overflowY = "visible"
        } else {
            element.style.position = display1;
            element.style.overflowY = "scroll"
        }
    }

    const burger = document.querySelector(".i-burger");
    const mobileMenu = document.querySelector(".header__nav");
    const overlay = document.querySelector(".i-overlay");
    const header = document.querySelector(".header");
    const menuGradient = document.querySelector(".menu-gradient");
    const headerLogo = document.querySelector(".header__logo");

    const toggleLangDesktop = document.querySelector(".toggle-lang__desktop .toggle-lang");
    const toggleLangMobile = document.querySelector(".toggle-lang__mobile .toggle-lang");
    const toggleLangWrappDesktop = document.querySelector(".toggle-lang__desktop");
    const toggleLangWrappMobile = document.querySelector(".toggle-lang__mobile");

    function toggleHeaderBackground(isOpen) {
        if (menuGradient && header && mobileMenu) {
            if (isOpen) {
                menuGradient.style.display = "block";
                toggleClass(menuGradient, "animate__fadeInDown", "animate__fadeOutUp");
            } else {
                toggleClass(menuGradient, "animate__fadeInDown", "animate__fadeOutUp");
                setTimeout(() => {
                    menuGradient.style.display = "none";
                }, 700);
            }
        }
    }

    function toggleHeaderLogo(isOpen) {
        if (headerLogo && isMobileDevice()) {
            if (isOpen) {
                headerLogo.style.display = "inline-flex";
                toggleClass(headerLogo, "animate__fadeInDown", "animate__fadeOutUp");
            } else {
                toggleClass(headerLogo, "animate__fadeInDown", "animate__fadeOutUp");
                setTimeout(() => {
                    headerLogo.style.display = "none";
                }, 300);
            }
        }
    }

    function closeBurger() {
        burger.classList.remove("clicked");
        header.classList.remove("active");
        toggleClass(mobileMenu, "animate__fadeInDown", "animate__fadeOutUp");
        toggleDisplay(mobileMenu, "grid", "none");
        toggleOverlay(overlay);
        toggleNoScroll();
        toggleHeaderBackground(false);
        toggleHeaderLogo(false);

        // Используем функцию вместо константы
        if (isMobileDevice() && toggleLangMobile) {
            toggleLangMobile.classList.remove("active__toggle-lang");
            isToggleLangMobileOpen = false;
        }

        isBurgerOpen = false;
    }


    // Открытие/закрытие бургера
    burger.addEventListener("click", function () {
        if (clickDisabled) return;

        clickDisabled = true;
        setTimeout(() => { clickDisabled = false; }, 700);

        // Используем функцию вместо константы
        if (isToggleLangDesktopOpen && !isMobileDevice() && toggleLangDesktop) {
            toggleLangDesktop.classList.remove("active__toggle-lang");
            isToggleLangDesktopOpen = false;
        }

        burger.classList.toggle("clicked");
        header.classList.toggle("active");
        toggleClass(mobileMenu, "animate__fadeInDown", "animate__fadeOutUp");
        toggleDisplay(mobileMenu, "grid", "none");
        toggleOverlay(overlay);
        toggleNoScroll();

        const willBeOpen = burger.classList.contains("clicked");
        toggleHeaderBackground(willBeOpen);

        if (willBeOpen) {
            setTimeout(() => {
                toggleHeaderLogo(true);
            }, 200);
        } else {
            toggleHeaderLogo(false);
        }

        // Используем функцию вместо константы
        if (!willBeOpen && isMobileDevice() && toggleLangMobile) {
            toggleLangMobile.classList.remove("active__toggle-lang");
            isToggleLangMobileOpen = false;
        }

        isBurgerOpen = willBeOpen;
    });

    // ДЕСКТОПНЫЙ переключатель языка
    if (toggleLangWrappDesktop) {
        toggleLangWrappDesktop.addEventListener("click", function () {
            if (clickDisabled) return;

            // Используем функцию вместо константы
            if (isBurgerOpen && !isMobileDevice()) {
                clickDisabled = true;
                closeBurger();
                setTimeout(() => {
                    toggleLangDesktop.classList.toggle("active__toggle-lang");
                    isToggleLangDesktopOpen = toggleLangDesktop.classList.contains("active__toggle-lang");
                    clickDisabled = false;
                }, 700);
            } else {
                toggleLangDesktop.classList.toggle("active__toggle-lang");
                isToggleLangDesktopOpen = toggleLangDesktop.classList.contains("active__toggle-lang");
            }
        });
    }

    // МОБИЛЬНЫЙ переключатель языка
    if (toggleLangWrappMobile) {
        toggleLangWrappMobile.addEventListener("click", function () {
            if (clickDisabled) return;

            toggleLangMobile.classList.toggle("active__toggle-lang");
            isToggleLangMobileOpen = toggleLangMobile.classList.contains("active__toggle-lang");
        });
    }

    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        if (!isMobileDevice()) {
            // Переключились на десктоп - закрываем мобильный переключатель
            if (toggleLangMobile) {
                toggleLangMobile.classList.remove("active__toggle-lang");
                isToggleLangMobileOpen = false;
            }
        } else {
            // Переключились на мобилку - закрываем десктопный переключатель
            if (toggleLangDesktop) {
                toggleLangDesktop.classList.remove("active__toggle-lang");
                isToggleLangDesktopOpen = false;
            }
        }
    });

    // Закрытие меню при клике на overlay
    overlay.addEventListener("click", function() {
        if (isBurgerOpen) {
            closeBurger();
        }
    });
}

function linkOnGlitch(){
    var glitchItemsList = document.querySelectorAll('.glitch')

    Array.from(glitchItemsList).forEach(function(item) {
        item.addEventListener('click', function(){
            if (item.dataset.href){
                var url = item.dataset.href;
                var isInternal = url.startsWith('/') || url.includes('roobinium.io');
                
                console.log('🔗 Glitch click:', {
                    url: url,
                    isInternal: isInternal,
                    target: isInternal ? '_self' : '_blank'
                });
                
                Object.assign(document.createElement('a'), {
                    target: isInternal ? '_self' : '_blank',
                    rel: isInternal ? '' : 'noopener noreferrer',
                    href: url,
                }).click();
            }
        })
    })
}

document.addEventListener("DOMContentLoaded", () => { headerNav(); linkOnGlitch(); });
