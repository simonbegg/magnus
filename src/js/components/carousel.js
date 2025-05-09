document.addEventListener('DOMContentLoaded', function() {
    const carouselElement = document.querySelector('.glide');
    
    if (carouselElement) {
        new Glide('.glide', {
            type: 'carousel',
            startAt: 0,
            perView: 3,
            gap: 30,
            breakpoints: {
                1024: {
                    perView: 2
                },
                640: {
                    perView: 1
                }
            }
        }).mount();
    }
});
