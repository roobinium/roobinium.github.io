function caseStudies() {
	function truncateText() {
		const descrElementsMed = document.querySelectorAll('.case-studies__card--descr.medium');
		const descrElementsBig = document.querySelectorAll('.case-studies__card--descr.big');
		const screenWidth = window.innerWidth;
		
		if (screenWidth <= 1050) {
			descrElementsMed.forEach(el => {
			const originalText = el.textContent;
		
				if (originalText.length > 100) { // обрезаем текст до 100 символов
					el.textContent = originalText.slice(0, 75) + ' ..';
				}
			});
			descrElementsBig.forEach(el => {
				const originalText = el.textContent;
			
					if (originalText.length > 100) { // обрезаем текст до 100 символов
						el.textContent = originalText.slice(0, 81) + ' ..';
					}
				});
		}
	}
	window.addEventListener('load', truncateText);
	window.addEventListener('resize', truncateText); 
}

export default caseStudies;