

function animation() {
	let wow = new WOW({
		boxClass: "wow",
		animateClass: "animate__animated",
		offset: 0,
		mobile: true,
		live: true,
		callback: function (box) {
			if (box.classList.contains("footer")) {
                box.addEventListener('click', () => {
                    setTimeout(() => {
                        window.location.href = "https://roobinium.io/"; 
                    }, 500);
                });
            }
		},
	});

	wow.init();
}

export default animation;
