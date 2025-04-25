<?php
/**
 * Magnus theme functions and definitions
 *
 * @package Magnus
 */

// Composer autoload
if (file_exists($composer_autoload = __DIR__ . '/vendor/autoload.php')) {
    require_once $composer_autoload;
}

// Initialize Timber
use Timber\Timber;
Timber::init();

// Set the directories Timber should look for templates
Timber::$dirname = ['templates'];

// Include core theme files
require_once get_template_directory() . '/inc/enqueue.php';
require_once get_template_directory() . '/inc/class-magnus-site.php';

// Initialize the theme
new Magnus_Site();
