// Interactive Diagram Component
class InteractiveDiagram {
    constructor() {
        this.init();
    }

    init() {
        // Wait for GSAP to be available
        if (typeof gsap === 'undefined') {
            console.error('GSAP not loaded');
            return;
        }

        // Select all interactive elements
        const elements = document.querySelectorAll('.rewilding-element');
        const contentBlocks = document.querySelectorAll('.rewilding-content');

        if (!elements.length || !contentBlocks.length) {
            console.log('Interactive diagram elements not found');
            return;
        }

        // Initial state - hide all content blocks
        gsap.set(contentBlocks, { 
            opacity: 0, 
            display: 'none',
            backgroundColor: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        });

        // Add hover interactions
        elements.forEach((element) => {
            const elementType = element.dataset.element;
            const content = document.querySelector(`.rewilding-content[data-element="${elementType}"]`);
            
            if (!content) {
                console.log(`No content found for element type: ${elementType}`);
                return;
            }

            const icon = element.querySelector('.rounded-full');
            
            element.addEventListener('mouseenter', () => {
                // Hide all content blocks
                contentBlocks.forEach(block => {
                    gsap.set(block, { display: 'none', opacity: 0 });
                });
                
                // Show and animate the current content block
                gsap.set(content, { display: 'block' });
                gsap.to(content, {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });

                // Highlight the active element
                if (icon) {
                    gsap.to(icon, {
                        scale: 1.1,
                        duration: 0.3
                    });
                }

                // Highlight the connection line
                const connectionLine = document.querySelector(`path[data-element="${elementType}"]`);
                if (connectionLine) {
                    gsap.to(connectionLine, {
                        stroke: '#8B5CF6',
                        strokeWidth: 3,
                        duration: 0.3
                    });
                }
            });

            element.addEventListener('mouseleave', () => {
                // Fade out content
                gsap.to(content, {
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => {
                        gsap.set(content, { display: 'none' });
                    }
                });

                // Reset icon style
                if (icon) {
                    gsap.to(icon, {
                        scale: 1,
                        duration: 0.3
                    });
                }

                // Reset connection line
                const connectionLine = document.querySelector(`path[data-element="${elementType}"]`);
                if (connectionLine) {
                    gsap.to(connectionLine, {
                        stroke: '#ddd',
                        strokeWidth: 2,
                        duration: 0.3
                    });
                }
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new InteractiveDiagram();
});
