export default function tagsToggle() {
    const toggleButton = document.querySelector('.tags-search__toggle');
    const hiddenTags = document.querySelectorAll('.tags-search__tag--hidden');
    
    if (!toggleButton || hiddenTags.length === 0) return;
    
    let isExpanded = false;
    
    function updateButtonText() {
        if (isExpanded) {
            toggleButton.textContent = 'Hide more';
            toggleButton.setAttribute('data-state', 'hide');
        } else {
            toggleButton.textContent = 'Show more';
            toggleButton.setAttribute('data-state', 'show');
        }
    }
    
    function toggleTags() {
        isExpanded = !isExpanded;
        
        hiddenTags.forEach(tag => {
            if (isExpanded) {
                tag.classList.add('show-hidden');
            } else {
                tag.classList.remove('show-hidden');
            }
        });
        
        updateButtonText();
    }

    updateButtonText();

    toggleButton.addEventListener('click', toggleTags);

    function handleResize() {
        if (window.innerWidth <= 768) {
            toggleButton.style.display = 'inline-block';
        } else {
            toggleButton.style.display = 'none';
            if (isExpanded) {
                isExpanded = false;
                hiddenTags.forEach(tag => {
                    tag.classList.remove('show-hidden');
                });
                updateButtonText();
            }
        }
    }

    handleResize();

    window.addEventListener('resize', handleResize);
}