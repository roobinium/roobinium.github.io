/**
 * Инициализация функционала обмена изображений между слайдером и главной фотографией
 */
function initImageExchange() {
	// Найдем все слайды в слайдере
	const slides = document.querySelectorAll(".designer__award__slider-photo__slide");

	// Попробуем найти главное изображение, которое находится перед слайдером
	// Предполагаем, что главное изображение находится в контейнере с классом .main-image или подобным
	// Здесь вам может потребоваться скорректировать селектор в зависимости от вашей HTML структуры
	const mainImageContainer =
		document.querySelector(".designer__award__photo-main") ||
		document.querySelector(".designer__main-photo") ||
		document.querySelector(".main-image");

	if (!mainImageContainer) {
		console.error("Не удалось найти контейнер с главным изображением");
		return;
	}

	const mainImage = mainImageContainer.querySelector("img");
	if (!mainImage) {
		console.error("Не удалось найти главное изображение");
		return;
	}

	// Функция для получения изображения высокого разрешения
	function getHighResImageFromElement(element) {
		const img = element.querySelector("img");
		const sourceTags = element.querySelectorAll("source");
		let imgSrc = "";
		let imgAlt = img?.alt || "";

		// Проверяем наличие тегов source
		if (sourceTags.length > 0) {
			// Ищем сначала изображения 3x, затем 2x
			for (let sourceTag of sourceTags) {
				const srcSet = sourceTag.srcset;
				if (srcSet) {
					const srcSetItems = srcSet.split(",");

					// Сначала ищем 3x версию
					for (let item of srcSetItems) {
						const src = item.trim();
						if (src.includes("3x")) {
							// Извлекаем часть URL перед дескриптором
							imgSrc = src.split(" ")[0].trim();
							return { src: imgSrc, alt: imgAlt };
						}
					}

					// Если 3x не нашли, ищем 2x версию
					for (let item of srcSetItems) {
						const src = item.trim();
						if (src.includes("2x")) {
							// Извлекаем часть URL перед дескриптором
							imgSrc = src.split(" ")[0].trim();
							break;
						}
					}
				}

				// Если нашли 2x версию, используем её и прекращаем поиск
				if (imgSrc) break;
			}
		}

		// Используем обычный src изображения, если 3x или 2x не найдены
		if (!imgSrc && img && img.src) {
			imgSrc = img.src;
		}

		return { src: imgSrc, alt: imgAlt };
	}

	// Функция для обмена изображениями
	function exchangeImages(slideElement) {
		// Получаем данные об изображении из слайда
		const slideImageData = getHighResImageFromElement(slideElement);
		if (!slideImageData.src) return;

		// Сохраняем данные о главном изображении перед заменой
		const mainImageSrc = mainImage.src;
		const mainImageAlt = mainImage.alt;

		// Меняем главное изображение на изображение из слайда
		mainImage.src = slideImageData.src;
		mainImage.alt = slideImageData.alt;

		// Применяем небольшую анимацию к главному изображению
		mainImage.style.transition = "opacity 0.3s ease";
		mainImage.style.opacity = "0";

		setTimeout(() => {
			mainImage.style.opacity = "1";
		}, 50);

		// Находим изображение в слайде и меняем его на главное
		const slideImg = slideElement.querySelector("img");
		if (slideImg) {
			slideImg.src = mainImageSrc;
			slideImg.alt = mainImageAlt;

			// Анимация изменения изображения в слайде
			slideImg.style.transition = "opacity 0.3s ease";
			slideImg.style.opacity = "0";

			setTimeout(() => {
				slideImg.style.opacity = "1";
			}, 50);
		}
	}

	// Добавляем обработчики клика на все слайды
	slides.forEach((slide) => {
		slide.addEventListener("click", function () {
			exchangeImages(this);
		});

		// Добавляем стиль pointer для показа кликабельности
		slide.style.cursor = "pointer";
	});
}

// Инициализация слайдера и функционала обмена изображениями
document.addEventListener("DOMContentLoaded", function () {
	// Инициализация слайдера Swiper согласно существующей конфигурации
	if (document.querySelector(".designer__award__slider-photo")) {
		const swiper = new Swiper(".slider-photo__container", {
			spaceBetween: 0,
			slidesPerView: 6.5,
			simulateTouch: true,
			loop: true,
			breakpoints: {
				// когда ширина окна >= 320px
				1000: {
					slidesPerView: 6.5,
				},
				480: {
					slidesPerView: "auto",
				},
			},
		});

		// Инициализация функционала обмена изображениями
		initImageExchange();
	}
});
