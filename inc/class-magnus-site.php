<?php
/**
 * Main site class for Magnus theme
 *
 * @package Magnus
 */

use Timber\Site;
use Timber\Menu;

/**
 * Class Magnus_Site
 * 
 * Handles the setup of the theme including context variables,
 * theme supports, and navigation registration.
 */
class Magnus_Site extends Site {
    /**
     * Class constructor
     */
    public function __construct() {
        parent::__construct();

        // Actions
        add_action('after_setup_theme', [$this, 'theme_supports']);
        add_action('init', [$this, 'register_menus']);
        add_action('init', [$this, 'register_post_types']);
        add_action('init', [$this, 'register_taxonomies']);

        // Filters
        add_filter('timber/context', [$this, 'add_to_context']);
        add_filter('timber/twig', [$this, 'add_to_twig']);
    }

    /**
     * Add Timber context variables
     *
     * @param array $context Timber's context.
     * @return array Updated context
     */
    public function add_to_context($context) {
        // Add site-wide context variables
        $context['site'] = $this;

        // Add menus if they exist
        if (has_nav_menu('primary-menu')) {
            $context['primary_menu'] = new Menu('primary-menu');
        }
        if (has_nav_menu('footer-menu')) {
            $context['footer_menu'] = new Menu('footer-menu');
        }

        // Add theme settings
        $context['theme'] = [
            'path' => get_template_directory_uri(),
            'assets' => get_template_directory_uri() . '/dist',
        ];

        return $context;
    }

    /**
     * Add theme support features
     *
     * @return void
     */
    public function theme_supports() {
        // Add default posts and comments RSS feed links to head
        add_theme_support('automatic-feed-links');

        // Let WordPress manage the document title
        add_theme_support('title-tag');

        // Enable support for Post Thumbnails on posts and pages
        add_theme_support('post-thumbnails');

        // Switch default core markup to output valid HTML5
        add_theme_support('html5', [
            'search-form',
            'comment-form',
            'comment-list',
            'gallery',
            'caption',
            'style',
            'script',
        ]);

        // Add support for responsive embeds
        add_theme_support('responsive-embeds');

        // Add support for full and wide align images
        add_theme_support('align-wide');

        // Add support for custom logo
        add_theme_support('custom-logo', [
            'height'      => 100,
            'width'       => 400,
            'flex-width'  => true,
            'flex-height' => true,
        ]);

        // Add support for editor styles
        add_theme_support('editor-styles');
    }

    /**
     * Register navigation menus
     *
     * @return void
     */
    public function register_menus() {
        register_nav_menus([
            'primary-menu' => __('Primary Menu', 'magnus'),
            'footer-menu'  => __('Footer Menu', 'magnus'),
        ]);
    }

    /**
     * Register custom post types
     *
     * @return void
     */
    public function register_post_types() {
        // Add custom post types here
    }

    /**
     * Register custom taxonomies
     *
     * @return void
     */
    public function register_taxonomies() {
        // Add custom taxonomies here
    }

    /**
     * Add custom functions to Twig
     *
     * @param \Twig\Environment $twig The Twig environment.
     * @return \Twig\Environment
     */
    public function add_to_twig($twig) {
        // Add custom Twig functions here
        return $twig;
    }
}
