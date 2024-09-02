function contentBlock() {
	const moreButton = document.querySelector('.content-block__more-button');
        const hiddenText = document.querySelector('.content-block__text-hide');
        moreButton.addEventListener('click', function() {
            if (hiddenText.style.display === 'none' || hiddenText.style.display === '') {
                hiddenText.classList.add('animate__fadeInUp');
                hiddenText.style.display = 'block';
                moreButton.style.display = 'none';
            } else {
                hiddenText.style.display = 'none';
                moreButton.style.display = 'inline-block';
            }
        });
}
export default contentBlock;
