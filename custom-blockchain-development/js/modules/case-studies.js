function caseStudies() {
	// Сохраняем оригинальные тексты при первом запуске
	const descrElementsMed = document.querySelectorAll('.case-studies__card--descr.medium');
	const descrElementsBig = document.querySelectorAll('.case-studies__card--descr.big');
	
	// Сохраняем оригинальные тексты в Map
	const originalTexts = new Map();
	
	descrElementsMed.forEach(el => {
		originalTexts.set(el, el.textContent);
	});
	
	descrElementsBig.forEach(el => {
		originalTexts.set(el, el.textContent);
	});
	
	function truncateText() {
		const screenWidth = window.innerWidth;
		
		if (screenWidth <= 1050) {
			descrElementsMed.forEach(el => {
				const originalText = originalTexts.get(el);
				
				if (originalText.length > 100) {
					el.textContent = originalText.slice(0, 75) + ' ..';
				}
			});
			
			descrElementsBig.forEach(el => {
				const originalText = originalTexts.get(el);
				
				if (originalText.length > 100) {
					el.textContent = originalText.slice(0, 81) + ' ..';
				}
			});
		} else {
			// Восстанавливаем оригинальные тексты
			descrElementsMed.forEach(el => {
				el.textContent = originalTexts.get(el);
			});
			
			descrElementsBig.forEach(el => {
				el.textContent = originalTexts.get(el);
			});
		}
	}
	
	window.addEventListener('load', truncateText);
	window.addEventListener('resize', truncateText); 
}

export default caseStudies;