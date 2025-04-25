<?php
/**
 * Template Name: Front Page
 * Description: The Theme Homepage
 */

use Timber\Timber;

$context = Timber::context();

// Render the front-page template
Timber::render('front-page.twig', $context);
