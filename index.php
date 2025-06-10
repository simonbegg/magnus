<?php
/**
 * The main template file
 *
 * @package Magnus
 */

use Timber\Timber;

$context = Timber::context();
$timber_post = Timber::get_post();
$context['post'] = $timber_post;

Timber::render(array('page-' . $timber_post->post_name . '.twig', 'index.twig', 'page.twig'), $context);
