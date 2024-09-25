function dev() {
    document.querySelector('.dev__button').addEventListener('click', function() {
        const hiddenCards = document.querySelectorAll('.dev__card--hide');
    
        hiddenCards.forEach(card => {
            card.style.display = 'flex';
            card.classList.remove('animate__fadeOutDown');
            card.classList.add('animate__fadeInUp');
        });
        
    
        this.style.display = 'none'
    });
}
export default dev;
