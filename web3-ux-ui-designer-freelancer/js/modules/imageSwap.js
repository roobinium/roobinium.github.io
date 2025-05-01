function initCustomImageSwap() {
	const mainPhotoElement = document.querySelector(".designer__award--best-freelance");
	if (!mainPhotoElement) return;

	const slides = document.querySelectorAll(".designer__award__slider-photo__slide");
	if (!slides || slides.length === 0) return;

	// Кэш для хранения информации о путях к изображениям разного качества
	const imagePathsCache = new Map();

	// Функция для извлечения всех путей к изображениям (разных версий) из элемента picture
	function extractImagePaths(pictureElement) {
		if (!pictureElement) return null;

		const paths = {
			default: null, // Обычная версия
			x2: null, // @2x версия
			x3: null, // @3x версия
		};

		// Получаем путь к обычной версии из img
		const img = pictureElement.querySelector("img");
		if (img && img.getAttribute("src")) {
			paths.default = img.getAttribute("src");
		}

		// Ищем пути к версиям @2x и @3x в source элементах
		const sources = pictureElement.querySelectorAll("source");
		for (const source of sources) {
			const srcset = source.getAttribute("srcset");
			if (!srcset) continue;

			// Разделяем srcset на части и ищем версии @2x и @3x
			const srcsetParts = srcset.split(",").map((part) => part.trim());
			for (const part of srcsetParts) {
				const [url, density] = part.split(/\s+/);
				if (!url) continue;

				if (url.includes("@3x.jpg")) {
					paths.x3 = url;
				} else if (url.includes("@2x.jpg")) {
					paths.x2 = url;
				} else if (!paths.default) {
					paths.default = url;
				}
			}
		}

		// Если не нашли какую-то версию, используем ближайшую доступную
		if (!paths.x3 && paths.x2) paths.x3 = paths.x2;
		if (!paths.x2 && paths.default) paths.x2 = paths.default;
		if (!paths.default && (paths.x2 || paths.x3)) {
			paths.default = paths.x2 || paths.x3;
		}

		return paths;
	}

	// Функция для создания HTML-структуры picture с разными версиями изображений
	function createPictureHTML(paths, alt) {
		if (!paths || !paths.default) return "";

		// Определяем какие srcset использовать в зависимости от доступных путей
		let srcset1 = "";
		let srcset2 = "";

		if (paths.x3 && paths.x2 && paths.default) {
			srcset1 = `${paths.default} 1x, ${paths.x2} 2x, ${paths.x3} 3x`;
			srcset2 = `${paths.default} 1x, ${paths.x2} 2x`;
		} else if (paths.x2 && paths.default) {
			srcset1 = `${paths.default} 1x, ${paths.x2} 2x`;
			srcset2 = `${paths.default} 1x, ${paths.x2} 2x`;
		} else {
			srcset1 = `${paths.default} 1x`;
			srcset2 = `${paths.default} 1x`;
		}

		return `
            <source srcset="${srcset1}" media="(max-width: 768px)">
            <source srcset="${srcset2}" media="(min-width: 769px)">
            <img src="${paths.default}" alt="${alt || "Image"}">
        `;
	}

	// Инициализация кэша - сохраняем пути к изображениям для всех слайдов и для главного изображения
	function initializeCache() {
		// Сохраняем пути для главного изображения
		const mainPicture = mainPhotoElement.querySelector("picture");
		if (mainPicture) {
			const mainId = "main-image";
			const mainPaths = extractImagePaths(mainPicture);
			if (mainPaths) {
				imagePathsCache.set(mainId, mainPaths);
				mainPicture.setAttribute("data-image-id", mainId);
			}
		}

		// Сохраняем пути для всех слайдов
		slides.forEach((slide, index) => {
			const slidePicture = slide.querySelector("picture");
			if (slidePicture) {
				const slideId = `slide-image-${index}`;
				const slidePaths = extractImagePaths(slidePicture);
				if (slidePaths) {
					imagePathsCache.set(slideId, slidePaths);
					slidePicture.setAttribute("data-image-id", slideId);
				}
			}
		});
	}

	// Инициализируем кэш при загрузке страницы
	initializeCache();

	function swapImagesWithQualityPreservation(slideElement) {
		const mainPicture = mainPhotoElement.querySelector("picture");
		const slidePicture = slideElement.querySelector("picture");

		if (!mainPicture || !slidePicture) return;

		// Получаем идентификаторы изображений
		const mainImageId = mainPicture.getAttribute("data-image-id");
		const slideImageId = slidePicture.getAttribute("data-image-id");

		if (!mainImageId || !slideImageId) return;

		// Получаем информацию о путях из кэша
		const mainImagePaths = imagePathsCache.get(mainImageId);
		const slideImagePaths = imagePathsCache.get(slideImageId);

		if (!mainImagePaths || !slideImagePaths) return;

		// Обновляем HTML для обоих элементов
		// 1. Для главного блока используем @3x версию из слайда
		// 2. Для слайда используем @1x или @2x версию из главного блока

		// Получаем alt-тексты
		const mainImgAlt = mainPicture.querySelector("img")?.alt || "Image";
		const slideImgAlt = slidePicture.querySelector("img")?.alt || "Image";

		// Создаем HTML структуру для главного изображения (используем высокое качество)
		const mainHtmlWithHighQuality = `
            <source srcset="${slideImagePaths.x3}" media="(max-width: 768px)">
            <source srcset="${slideImagePaths.x3}" media="(min-width: 769px)">
            <img src="${slideImagePaths.x3}" alt="${slideImgAlt}" class="original-size-image">
        `;

		// Создаем HTML структуру для слайда (используем обычное качество или @2x)
		const slideHtmlWithRegularQuality = createPictureHTML(
			{
				default: mainImagePaths.default,
				x2: mainImagePaths.x2,
			},
			mainImgAlt,
		);

		// Обновляем содержимое элементов
		mainPicture.innerHTML = mainHtmlWithHighQuality;
		slidePicture.innerHTML = slideHtmlWithRegularQuality;

		// Обновляем data-image-id атрибуты (меняем местами)
		mainPicture.setAttribute("data-image-id", slideImageId);
		slidePicture.setAttribute("data-image-id", mainImageId);
	}

	slides.forEach((slide) => {
		const newSlide = slide.cloneNode(true);
		slide.parentNode.replaceChild(newSlide, slide);

		// Переинициализируем кэш после клонирования
		const slidePicture = newSlide.querySelector("picture");
		if (slidePicture) {
			const slideId = slidePicture.getAttribute("data-image-id");
			if (slideId && imagePathsCache.has(slideId)) {
				const paths = imagePathsCache.get(slideId);
				imagePathsCache.set(slideId, paths);
			}
		}

		newSlide.addEventListener("click", function (event) {
			event.preventDefault();
			swapImagesWithQualityPreservation(this);
		});
	});
}

export default initCustomImageSwap;
