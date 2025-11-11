function initCustomImageSwap() {
    try {
        // Находим основной элемент с главным изображением
        const mainPhotoElement = document.querySelector(".designer__award--best-freelance");
        if (!mainPhotoElement) {
            console.warn("Элемент с главным изображением не найден");
            return;
        }

        // Находим все слайды с миниатюрами
        const slides = document.querySelectorAll(".designer__award__slider-photo__slide");
        if (!slides || slides.length === 0) {
            console.warn("Слайды с миниатюрами не найдены");
            return;
        }

        // Определяем плотность пикселей устройства
        const getDevicePixelRatio = function() {
            return window.devicePixelRatio || 1;
        };

        // Определяем тип устройства (мобильное или десктоп)
        const isMobileDevice = function() {
            return window.innerWidth <= 768;
        };

        /**
         * Формирует оптимальный путь к изображению исходя из базового пути,
         * типа устройства и плотности пикселей
         */
        const getOptimalImagePath = function(basePath) {
            if (!basePath) return null;

            try {
                // Если это путь к главной фотографии (photo3.jpg), обрабатываем отдельно
                if (basePath.includes('/photo3.')) {
                    const pixelRatio = getDevicePixelRatio();
                    if (pixelRatio >= 2) {
                        // Для устройств с высокой плотностью используем @3x версию
                        return basePath.replace(/\.jpg$/, '@3x.jpg');
                    }
                    return basePath;
                }
                
                // Получаем тип устройства
                const deviceType = isMobileDevice() ? 'mobile' : 'desktop';
                
                // Если путь уже содержит desktop/mobile, заменяем на нужный тип устройства
                if (basePath.includes('/desktop/') && deviceType === 'mobile') {
                    basePath = basePath.replace('/desktop/', '/mobile/');
                } else if (basePath.includes('/mobile/') && deviceType === 'desktop') {
                    basePath = basePath.replace('/mobile/', '/desktop/');
                }
                
                // Получаем плотность пикселей и определяем суффикс
                const pixelRatio = getDevicePixelRatio();
                let densitySuffix = '';
                
                if (pixelRatio >= 3) {
                    densitySuffix = '@3x';
                } else if (pixelRatio >= 2) {
                    densitySuffix = '@2x';
                }
                
                // Если нет плотности, возвращаем путь как есть
                if (!densitySuffix) {
                    return basePath;
                }
                
                // Добавляем суффикс плотности к имени файла
                const lastDotIndex = basePath.lastIndexOf('.');
                if (lastDotIndex !== -1) {
                    const pathWithoutExt = basePath.substring(0, lastDotIndex);
                    const extension = basePath.substring(lastDotIndex);
                    
                    // Если имя файла уже содержит суффикс плотности, заменяем его
                    if (pathWithoutExt.endsWith('@2x') || pathWithoutExt.endsWith('@3x')) {
                        return pathWithoutExt.replace(/@[23]x$/, densitySuffix) + extension;
                    } else {
                        // Иначе добавляем новый суффикс
                        return pathWithoutExt + densitySuffix + extension;
                    }
                }
                
                return basePath;
            } catch (error) {
                console.error("Ошибка при формировании пути к изображению:", error);
                return basePath; // В случае ошибки возвращаем исходный путь
            }
        };

        // Кэш для хранения информации о путях к изображениям
        const imagePathsCache = new Map();

        /**
         * Извлекает и обрабатывает базовые пути к изображениям из элемента picture
         */
        const extractImageInfo = function(pictureElement) {
            if (!pictureElement) return null;

            try {
                // Получаем основное изображение из img
                const img = pictureElement.querySelector("img");
                if (!img || !img.getAttribute("src")) return null;

                // Получаем базовые данные об изображении
                const srcPath = img.getAttribute("src");
                const altText = img.getAttribute("alt") || "Image";
                
                return {
                    srcPath: srcPath, // Сохраняем путь как есть, уже включающий desktop/mobile
                    altText: altText
                };
            } catch (error) {
                console.error("Ошибка при извлечении информации об изображении:", error);
                return null;
            }
        };

        /**
         * Инициализирует кэш с путями к изображениям
         */
        const initializeCache = function() {
            try {
                // Сохраняем информацию для главного изображения
                const mainPicture = mainPhotoElement.querySelector("picture");
                if (mainPicture) {
                    const mainId = "main-image";
                    const mainImageInfo = extractImageInfo(mainPicture);
                    if (mainImageInfo) {
                        imagePathsCache.set(mainId, mainImageInfo);
                        mainPicture.setAttribute("data-image-id", mainId);
                    }
                }

                // Сохраняем информацию для всех слайдов
                slides.forEach((slide, index) => {
                    const slidePicture = slide.querySelector("picture");
                    if (slidePicture) {
                        const slideId = `slide-image-${index}`;
                        const slideImageInfo = extractImageInfo(slidePicture);
                        if (slideImageInfo) {
                            imagePathsCache.set(slideId, slideImageInfo);
                            slidePicture.setAttribute("data-image-id", slideId);
                        }
                    }
                });
            } catch (error) {
                console.error("Ошибка при инициализации кэша:", error);
            }
        };

        /**
         * Обновляет изображение в элементе picture с оптимальным разрешением
         */
        const updateImage = function(pictureElement, imageInfo) {
            try {
                if (!pictureElement || !imageInfo) return;

                const img = pictureElement.querySelector("img");
                if (!img) {
                    // Если img отсутствует, создаем новый элемент
                    const newImg = document.createElement("img");
                    newImg.alt = imageInfo.altText;
                    
                    // Формируем оптимальный путь к изображению
                    const optimalPath = getOptimalImagePath(imageInfo.srcPath);
                    newImg.src = optimalPath;
                    
                    pictureElement.innerHTML = '';
                    pictureElement.appendChild(newImg);
                } else {
                    // Иначе обновляем существующий img
                    img.alt = imageInfo.altText;
                    
                    // Формируем оптимальный путь к изображению
                    const optimalPath = getOptimalImagePath(imageInfo.srcPath);
                    img.src = optimalPath;
                }
            } catch (error) {
                console.error("Ошибка при обновлении изображения:", error);
            }
        };

        /**
         * Обменивает изображения между главным элементом и выбранным слайдом
         */
        const swapImages = function(slideElement) {
            try {
                // Находим элементы с изображениями
                const mainPicture = mainPhotoElement.querySelector("picture");
                const slidePicture = slideElement.querySelector("picture");

                if (!mainPicture || !slidePicture) {
                    console.warn("Не найдены элементы с изображениями");
                    return;
                }

                // Получаем идентификаторы изображений
                const mainImageId = mainPicture.getAttribute("data-image-id");
                const slideImageId = slidePicture.getAttribute("data-image-id");

                if (!mainImageId || !slideImageId) {
                    console.warn("Отсутствуют идентификаторы изображений");
                    return;
                }

                // Получаем информацию об изображениях из кэша
                const mainImageInfo = { ...imagePathsCache.get(mainImageId) };
                const slideImageInfo = { ...imagePathsCache.get(slideImageId) };

                if (!mainImageInfo || !slideImageInfo) {
                    console.warn("Отсутствует информация об изображениях в кэше");
                    return;
                }

                // Выполняем обмен данными в кэше
                imagePathsCache.set(mainImageId, slideImageInfo);
                imagePathsCache.set(slideImageId, mainImageInfo);

                // Обновляем изображения после обмена данными в кэше
                updateImage(mainPicture, slideImageInfo);
                updateImage(slidePicture, mainImageInfo);
                
                // Добавляем класс для сохранения оригинального размера
                const mainImg = mainPicture.querySelector("img");
                if (mainImg) {
                    mainImg.classList.add("original-size-image");
                }
            } catch (error) {
                console.error("Ошибка при обмене изображениями:", error);
            }
        };

        /**
         * Обновляет все изображения при изменении размера окна
         */
        const updateAllImages = function() {
            try {
                // Обновляем главное изображение
                const mainPicture = mainPhotoElement.querySelector("picture");
                if (mainPicture) {
                    const mainImageId = mainPicture.getAttribute("data-image-id");
                    if (mainImageId) {
                        const mainImageInfo = imagePathsCache.get(mainImageId);
                        if (mainImageInfo) {
                            updateImage(mainPicture, mainImageInfo);
                        }
                    }
                }

                // Обновляем все изображения в слайдах
                slides.forEach((slide) => {
                    const slidePicture = slide.querySelector("picture");
                    if (slidePicture) {
                        const slideImageId = slidePicture.getAttribute("data-image-id");
                        if (slideImageId) {
                            const slideImageInfo = imagePathsCache.get(slideImageId);
                            if (slideImageInfo) {
                                updateImage(slidePicture, slideImageInfo);
                            }
                        }
                    }
                });
            } catch (error) {
                console.error("Ошибка при обновлении всех изображений:", error);
            }
        };

        // Инициализируем кэш
        initializeCache();
        
        // Обновляем все изображения после инициализации
        updateAllImages();

        // Добавляем обработчик события изменения размера окна
        window.addEventListener('resize', function() {
            // Используем debounce для предотвращения слишком частых обновлений
            if (this.resizeTimeout) {
                clearTimeout(this.resizeTimeout);
            }
            this.resizeTimeout = setTimeout(function() {
                updateAllImages();
            }, 300);
        });

        // Настраиваем обработчики событий для слайдов
        Array.from(slides).forEach((slide, originalIndex) => {
            try {
                // Клонируем слайд для избежания проблем с обработчиками событий
                const newSlide = slide.cloneNode(true);
                if (slide.parentNode) {
                    slide.parentNode.replaceChild(newSlide, slide);
                }

                // Переинициализируем data-image-id для нового слайда
                const slidePicture = newSlide.querySelector("picture");
                if (slidePicture) {
                    // Используем исходный индекс, чтобы сохранить правильную нумерацию
                    const slideId = `slide-image-${originalIndex}`;
                    
                    if (!imagePathsCache.has(slideId)) {
                        const slideImageInfo = extractImageInfo(slidePicture);
                        if (slideImageInfo) {
                            imagePathsCache.set(slideId, slideImageInfo);
                        }
                    }
                    
                    slidePicture.setAttribute("data-image-id", slideId);
                }

                // Добавляем обработчик события клика
                newSlide.addEventListener("click", function(event) {
                    event.preventDefault();
                    swapImages(this);
                });
                
            } catch (error) {
                console.error("Ошибка при настройке слайда:", error);
            }
        });

    } catch (error) {
        console.error("Критическая ошибка в функции initCustomImageSwap:", error);
    }
}

export default initCustomImageSwap;