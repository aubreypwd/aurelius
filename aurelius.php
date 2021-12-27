<?php
/**
 * Plugin Name:     Aurelius
 * Description:     A Gutenberg block that displays random quotes by Marcus Aurelius.
 * Version:         1.0.0
 * Author:          Aubrey Portwood
 * License:         MIT
 * Text Domain:     aubreypwd-aurelius
 *
 * @since           Nov 12, 2021
 * @package         aubreypwd\Aurelius
 */

namespace aubreypwd\Aurelius;

define( __NAMESPACE__ . '\PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( __NAMESPACE__ . '\PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( __NAMESPACE__ . '\PLUGIN_FILE', __FILE__ );

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

// Load things.
require_once 'inc/register-block.php';
