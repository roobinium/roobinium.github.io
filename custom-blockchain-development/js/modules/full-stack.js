function fullStack() {
	const swiper = new Swiper(".full-stack__container", {
		slidesPerView: 'auto',
		centeredSlides: true,
		spaceBetween: 0,
        initialSlide: 1,
		loop: true,
		speed: 800, 
		// freeMode: true,
		// autoplay: {
		// 	delay: 5000,
		// 	disableOnInteraction: false,
		// },
		// breakpoints: {
		// 	// when window width is >= 320px
		// 	1024: {
		// 		slidesPerView: 3,
		// 		spaceBetween: 0,
		// 		initialSlide: 2,
		// 		centeredSlides: true,
		// 	},
		// 	768: {
		// 		slidesPerView: 'auto',
		// 		spaceBetween: 0,
		// 		initialSlide: 1,
		// 	},
		// 	360: {
		// 		slidesPerView: 'auto',
		// 		initialSlide: 0,
		// 		spaceBetween: 0,
		// 		centeredSlides: false,
		// 	},
		// },
	});
}
export default fullStack;
