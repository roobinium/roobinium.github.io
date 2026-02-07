// Скрипт для отладки ссылок
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔍 Debug: Мониторинг всех кликов по ссылкам...');
    
    // Перехватываем все клики на странице
    document.addEventListener('click', function(e) {
        var target = e.target;
        
        // Ищем ссылку среди кликнутого элемента или его родителей
        var link = target.closest('a');
        
        if (link && link.href) {
            var isInternal = link.href.includes('roobinium.io') || link.href.startsWith(window.location.origin);
            
            console.log('🔗 КЛИК ПО ССЫЛКЕ:', {
                href: link.href,
                target: link.target || '(не указан)',
                isInternal: isInternal,
                className: link.className,
                text: link.textContent.trim().substring(0, 50)
            });
            
            // Если внутренняя ссылка пытается открыться в новой вкладке
            if (isInternal && link.target === '_blank') {
                console.warn('⚠️ ВНИМАНИЕ: Внутренняя ссылка с target="_blank"!');
                alert('Обнаружена внутренняя ссылка с target="_blank"!\nURL: ' + link.href + '\nКласс: ' + link.className);
            }
        }
        
        // Проверяем элементы с data-href
        var dataHrefEl = target.closest('[data-href]');
        if (dataHrefEl) {
            console.log('🎯 КЛИК ПО ЭЛЕМЕНТУ С data-href:', {
                href: dataHrefEl.dataset.href,
                className: dataHrefEl.className,
                id: dataHrefEl.id
            });
        }
    }, true);
});
