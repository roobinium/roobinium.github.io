function web3() {
	const swiper = new Swiper(".web3__container", {
		slidesPerView: 2.3,
		centeredSlides: true,
		spaceBetween: 8,
        initialSlide: 1,
		// autoplay: {
		// 	delay: 5000,
		// 	disableOnInteraction: false,
		// },
		breakpoints: {
			// when window width is >= 320px
			768: {
				slidesPerView: 2.3,
				spaceBetween: 8,
			},
			360: {
				slidesPerView: 2.4,
				spaceBetween: 8,
			},
		},
        navigation: {
            nextEl: ".web3-button-next",
            prevEl: ".web3-button-prev",
        },
	});
}
export default web3;
