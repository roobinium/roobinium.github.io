function initDraggableGallery() {
	const galleryContainer = document.querySelector(".gallery");
	const galleryContent = document.querySelector(".gallery__container");

	if (!galleryContainer || !galleryContent) return;

	// Параметры для настройки поведения
	const settings = {
		momentum: false, // Включить инерцию
		momentumRatio: 0, // Высокий коэффициент инерции для плавного движения
		velocityThreshold: 0.9, // Порог скорости для активации инерции
		maxVelocity: 50, // Максимальная скорость скролла
		animationDuration: 1200, // Увеличенная длительность для более плавной инерции
		mouseMultiplier: 1, // Множитель скорости для мыши
		minDragDistance: 3, // Минимальное расстояние для начала перетаскивания
		velocityMultiplier: 20, // Множитель для расчета скорости
		smoothScroll: true, // Включить плавный скроллинг
	};

	// Переменные для отслеживания состояния
	let isDragging = false;
	let dragStarted = false;
	let startX = 0;
	let startY = 0;
	let scrollLeft = 0;
	let lastX = 0;
	let lastTimestamp = 0;
	let velocity = 0;
	let animationFrame = null;
	let dragDistance = 0;
	let isScrollingX = false; // Флаг для отслеживания горизонтального скролла

	// Настраиваем галерею
	galleryContainer.style.overflowX = "scroll";
	if (settings.smoothScroll) {
		galleryContainer.style.scrollBehavior = "smooth";
	}

	// Обработчики событий для мыши
	galleryContainer.addEventListener("mousedown", startDrag);
	window.addEventListener("mousemove", drag);
	window.addEventListener("mouseup", endDrag);
	window.addEventListener("mouseleave", endDrag);

	// Обработчики событий для сенсорных экранов
	galleryContainer.addEventListener("touchstart", startDragTouch);
	galleryContainer.addEventListener("touchmove", dragTouch);
	galleryContainer.addEventListener("touchend", endDragTouch);

	// ВАЖНО: Убираем предотвращение события wheel, чтобы позволить
	// вертикальный скролл страницы колесиком мыши
	// Теперь скролл страницы работает обычным образом, когда курсор над галереей

	// Отключение стандартного поведения при перетаскивании изображений
	const galleryImages = galleryContainer.querySelectorAll("img");
	galleryImages.forEach((img) => {
		img.addEventListener("dragstart", (e) => e.preventDefault());
	});

	// Запуск перетаскивания (для мыши)
	function startDrag(e) {
		isDragging = true;
		dragStarted = false;
		isScrollingX = false;
		startX = e.clientX;
		startY = e.clientY;
		scrollLeft = galleryContainer.scrollLeft;
		lastX = e.clientX;
		lastTimestamp = Date.now();
		velocity = 0;
		dragDistance = 0;

		// Остановить анимацию инерции, если она идет
		if (animationFrame) {
			cancelAnimationFrame(animationFrame);
			animationFrame = null;
		}

		// Временно отключаем плавный скролл на время перетаскивания для отзывчивости
		if (settings.smoothScroll) {
			galleryContainer.style.scrollBehavior = "auto";
		}

		// Изменяем стиль курсора
		galleryContainer.style.cursor = "grabbing";
		document.body.style.userSelect = "none";

		// Добавляем класс для активного состояния
		galleryContainer.classList.add("dragging");

		e.preventDefault();
	}

	// Перетаскивание (для мыши)
	function drag(e) {
		if (!isDragging) return;

		const currentX = e.clientX;
		const currentY = e.clientY;

		const distanceX = Math.abs(currentX - startX);
		const distanceY = Math.abs(currentY - startY);

		// Если это первое движение, проверяем направление
		if (!dragStarted) {
			// Если движение больше вертикальное, чем горизонтальное, не перехватываем
			if (distanceY > distanceX * 1.5) {
				isDragging = false; // Прекращаем перетаскивание если это вертикальное движение
				galleryContainer.classList.remove("dragging");
				galleryContainer.style.cursor = "grab";
				document.body.style.userSelect = "";

				// Возвращаем плавный скролл
				if (settings.smoothScroll) {
					galleryContainer.style.scrollBehavior = "smooth";
				}

				return;
			}

			// Начинаем перетаскивание при минимальном движении
			if (distanceX >= settings.minDragDistance) {
				dragStarted = true;
				isScrollingX = true; // Включаем флаг горизонтального скролла
			}
		}

		if (dragStarted) {
			// Вычисляем смещение с множителем для мыши
			const moveX = (startX - currentX) * settings.mouseMultiplier;
			const newScrollLeft = scrollLeft + moveX;

			// Применяем плавное перемещение с помощью requestAnimationFrame
			// для большей плавности чем прямое изменение scrollLeft
			smoothScrollTo(newScrollLeft, 0);

			// Вычисляем скорость для инерции
			const now = Date.now();
			const dt = Math.max(1, now - lastTimestamp);

			const dx = lastX - currentX;
			velocity = (dx / dt) * settings.velocityMultiplier;

			// Обновляем для следующего вычисления
			lastX = currentX;
			lastTimestamp = now;
			dragDistance += Math.abs(dx);

			// Предотвращаем событие по умолчанию только если активно перетаскивание
			e.preventDefault();
		}
	}

	// Функция для плавного перемещения к позиции
	function smoothScrollTo(targetScrollLeft, duration = 0) {
		if (duration <= 0) {
			galleryContainer.scrollLeft = targetScrollLeft;
			return;
		}

		const startScrollLeft = galleryContainer.scrollLeft;
		const distance = targetScrollLeft - startScrollLeft;
		const startTime = performance.now();

		function step() {
			const elapsed = performance.now() - startTime;
			const progress = Math.min(elapsed / duration, 1);

			// Функция ease-out для плавного замедления
			const easing = 1 - Math.pow(1 - progress, 3);
			galleryContainer.scrollLeft = startScrollLeft + distance * easing;

			if (progress < 1) {
				requestAnimationFrame(step);
			}
		}

		requestAnimationFrame(step);
	}

	// Окончание перетаскивания (для мыши)
	function endDrag(e) {
		if (!isDragging) return;
		isDragging = false;

		// Возвращаем стиль курсора
		galleryContainer.style.cursor = "grab";
		document.body.style.userSelect = "";

		// Удаляем класс для активного состояния
		galleryContainer.classList.remove("dragging");

		// Возвращаем плавный скролл после перетаскивания
		if (settings.smoothScroll) {
			galleryContainer.style.scrollBehavior = "smooth";
		}

		// Применяем инерцию только если было реальное перетаскивание
		if (dragStarted && settings.momentum && Math.abs(velocity) > settings.velocityThreshold) {
			applyMomentum();
		}

		// Сбрасываем флаг горизонтального скролла
		isScrollingX = false;
	}

	// Запуск перетаскивания (для тач-экранов)
	function startDragTouch(e) {
		if (e.touches.length !== 1) return;

		const touch = e.touches[0];
		isDragging = true;
		dragStarted = false;
		isScrollingX = false;
		startX = touch.clientX;
		startY = touch.clientY;
		scrollLeft = galleryContainer.scrollLeft;
		lastX = touch.clientX;
		lastTimestamp = Date.now();
		velocity = 0;
		dragDistance = 0;

		// Остановить анимацию инерции, если она идет
		if (animationFrame) {
			cancelAnimationFrame(animationFrame);
			animationFrame = null;
		}

		// Временно отключаем плавный скролл на время перетаскивания
		if (settings.smoothScroll) {
			galleryContainer.style.scrollBehavior = "auto";
		}

		// Добавляем класс для активного состояния
		galleryContainer.classList.add("dragging");
	}

	// Перетаскивание (для тач-экранов)
	function dragTouch(e) {
		if (!isDragging || e.touches.length !== 1) return;

		const touch = e.touches[0];
		const currentX = touch.clientX;
		const currentY = touch.clientY;

		const distanceX = Math.abs(currentX - startX);
		const distanceY = Math.abs(currentY - startY);

		// Если это первое движение, проверяем направление
		if (!dragStarted) {
			// Если движение больше вертикальное, чем горизонтальное
			if (distanceY > distanceX * 1.5) {
				isDragging = false; // Прекращаем перетаскивание
				galleryContainer.classList.remove("dragging");

				// Возвращаем плавный скролл
				if (settings.smoothScroll) {
					galleryContainer.style.scrollBehavior = "smooth";
				}

				return;
			}

			// Начинаем перетаскивание при минимальном движении
			if (distanceX >= settings.minDragDistance) {
				dragStarted = true;
				isScrollingX = true; // Включаем флаг горизонтального скролла
			}
		}

		if (dragStarted) {
			// Вычисляем новую позицию скролла
			const moveX = startX - currentX;
			galleryContainer.scrollLeft = scrollLeft + moveX;

			// Вычисляем скорость для инерции
			const now = Date.now();
			const dt = Math.max(1, now - lastTimestamp);

			const dx = lastX - currentX;
			velocity = (dx / dt) * settings.velocityMultiplier;

			lastX = currentX;
			lastTimestamp = now;
			dragDistance += Math.abs(dx);

			// Предотвращаем вертикальный скролл только при горизонтальном перетаскивании
			if (isScrollingX) {
				e.preventDefault();
			}
		}
	}

	// Окончание перетаскивания (для тач-экранов)
	function endDragTouch(e) {
		if (!isDragging) return;
		isDragging = false;

		// Удаляем класс для активного состояния
		galleryContainer.classList.remove("dragging");

		// Возвращаем плавный скролл
		if (settings.smoothScroll) {
			galleryContainer.style.scrollBehavior = "smooth";
		}

		// Применяем инерцию только если было реальное перетаскивание
		if (dragStarted && settings.momentum && Math.abs(velocity) > settings.velocityThreshold) {
			applyMomentum();
		}

		// Сбрасываем флаг горизонтального скролла
		isScrollingX = false;
	}

	// Применение инерции для плавного замедления
	function applyMomentum() {
		const startTime = Date.now();
		const startVelocity = velocity;

		function momentumStep() {
			const elapsed = Date.now() - startTime;
			const progress = Math.min(1, elapsed / settings.animationDuration);

			// Используем кубическую функцию для более естественного замедления
			const easeOutFactor = 1 - Math.pow(1 - progress, 3);
			const currentVelocity = startVelocity * (1 - easeOutFactor);

			// Применяем текущую скорость к позиции скролла
			galleryContainer.scrollLeft += currentVelocity;

			// Проверяем, достигли ли края галереи
			const maxScrollLeft = galleryContainer.scrollWidth - galleryContainer.clientWidth;
			const isAtStart = galleryContainer.scrollLeft <= 0;
			const isAtEnd = galleryContainer.scrollLeft >= maxScrollLeft - 1;

			// Продолжаем анимацию до полной остановки или достижения конца галереи
			if (progress < 1 && Math.abs(currentVelocity) > 0.1 && !isAtStart && !isAtEnd) {
				animationFrame = requestAnimationFrame(momentumStep);
			} else {
				animationFrame = null;
			}
		}

		animationFrame = requestAnimationFrame(momentumStep);
	}

	// Добавляем стиль курсора
	galleryContainer.style.cursor = "grab";

	// Функция для обновления параметров галереи при изменении размера окна
	function updateGalleryWidth() {
		// Проверяем, нужно ли устанавливать фиксированную ширину
		const screenWidth = window.innerWidth;
		if (screenWidth > 1200) {
			galleryContent.style.width = "100%";
			galleryContent.style.flexWrap = "nowrap";
		}
	}

	// Обновляем при загрузке и изменении размера окна
	updateGalleryWidth();
	window.addEventListener("resize", updateGalleryWidth);
}

export default initDraggableGallery;
