function clients() {
	const swiper = new Swiper(".clients__container", {
		
		loop: true,
		speed: 800, 
        freeMode: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
        breakpoints: {
            // when window width is >= 320px
            768: {
                slidesPerView: 5.6,
                centeredSlides: true,
                initialSlide: 2,
            },
            360: {
                slidesPerView: 'auto',
                initialSlide: 0,
                spaceBetween: 0,
                centeredSlides: false,
            },
        },
	});
}
export default clients;
