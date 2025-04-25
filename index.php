<?php
/**
 * The main template file
 *
 * @package Magnus
 */

use Timber\Timber;

$context = Timber::context();
$context['post'] = Timber::get_post();

Timber::render('index.twig', $context);
