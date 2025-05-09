<?php
/**
 * Enqueue scripts and styles
 *
 * @package Magnus
 */

function magnus_enqueue_assets() {
    // Get file modification time for cache busting
    $css_mod_time = file_exists(get_template_directory() . '/dist/css/main.min.css') 
        ? filemtime(get_template_directory() . '/dist/css/main.min.css') 
        : '1.0.0';
    
    $main_js_mod_time = file_exists(get_template_directory() . '/dist/js/main.js') 
        ? filemtime(get_template_directory() . '/dist/js/main.js') 
        : '1.0.0';

    // Enqueue Google Fonts: Urbanist for headings, Work Sans for body
    wp_enqueue_style(
        'google-fonts',
        'https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700&family=Work+Sans:wght@400;500&display=swap',
        [],
        null
    );

    // Enqueue main stylesheet
    wp_enqueue_style(
        'magnus-styles',
        get_template_directory_uri() . '/dist/css/main.min.css',
        [],
        $css_mod_time
    );

    // Enqueue Alpine.js
    wp_enqueue_script(
        'alpinejs',
        'https://cdn.jsdelivr.net/npm/alpinejs@3.12.2/dist/cdn.min.js',
        [],
        null,
        true
    );

    // Enqueue Glide.js
    wp_enqueue_script(
        'glidejs',
        'https://cdn.jsdelivr.net/npm/@glidejs/glide',
        [],
        null,
        true
    );

    // Enqueue carousel initialization
    wp_enqueue_script(
        'magnus-carousel',
        get_template_directory_uri() . '/src/js/components/carousel.js',
        ['glidejs'],
        filemtime(get_template_directory() . '/src/js/components/carousel.js'),
        true
    );

    // Enqueue GSAP
    wp_enqueue_script(
        'gsap',
        'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
        [],
        null,
        true
    );

    // Enqueue interactive diagram script
    wp_enqueue_script(
        'interactive-diagram',
        get_template_directory_uri() . '/src/js/components/interactive-diagram.js',
        ['gsap'],
        filemtime(get_template_directory() . '/src/js/components/interactive-diagram.js'),
        true
    );

    // Enqueue main JavaScript
    wp_enqueue_script(
        'magnus-main',
        get_template_directory_uri() . '/dist/js/main.js',
        ['alpinejs'],
        $main_js_mod_time,
        true
    );
}
add_action('wp_enqueue_scripts', 'magnus_enqueue_assets');
