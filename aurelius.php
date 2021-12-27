<?php
/**
 * Plugin Name:     Aurelius
 * Description:     A Gutenberg block that displays quotes by Marcus Aurelius.
 * Version:         1.0.0
 * Author:          Aubrey Portwood
 * License:         MIT
 * Text Domain:     aubreypwd-aurelius
 *
 * @since           Nov 12, 2021
 * @package         aubreypwd\Aurelius
 */

namespace aubreypwd\Aurelius;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/**
 * Register the block with WordPress.
 *
 * @author Aubrey Portwood <code@aubreypwd.com>
 * @since 1.0.0
 */
function register_block() {

	// Define our assets.
	$editor_script   = 'build/index.js';
	$editor_style    = 'build/index.css';
	$frontend_style  = 'build/frontend.css';
	$frontend_script = 'build/frontend.js';
	$plugin_dir      = plugin_dir_path( __FILE__ );

	// Verify we have an editor script.
	if ( ! file_exists( $plugin_dir . $editor_script ) ) {
		wp_die( esc_html__( 'Whoops! You need to run `npm run build` for Aurelius first.', 'aubreypwd-aurelius' ) );
	}

	// Autoload dependencies and version.
	$asset_file = require $plugin_dir . 'build/index.asset.php';

	// Register editor script.
	wp_register_script(
		'aubreypwd/aurelius/editor-script',
		plugins_url( $editor_script, __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version'],
		true
	);

	// Register editor style.
	if ( file_exists( $plugin_dir . $editor_style ) ) {
		wp_register_style(
			'aubreypwd/aurelius/editor-style',
			plugins_url( $editor_style, __FILE__ ),
			[ 'wp-edit-blocks' ],
			filemtime( $plugin_dir . $editor_style )
		);
	}

	// Register frontend style.
	if ( file_exists( $plugin_dir . $frontend_style ) ) {
		wp_register_style(
			'aubreypwd/aurelius/style',
			plugins_url( $frontend_style, __FILE__ ),
			[],
			filemtime( $plugin_dir . $frontend_style )
		);
	}

	// Register block with WordPress.
	register_block_type( 'aubreypwd/aurelius', [
		'editor_script' => 'aubreypwd/aurelius/editor-script',
		'editor_style'  => 'aubreypwd/aurelius/editor-style',
		'style'         => 'aubreypwd/aurelius/style',
	] );

	// Register frontend script.
	if ( file_exists( $plugin_dir . $frontend_script ) ) {
		wp_enqueue_script(
			'aubreypwd/aurelius/frontend-script',
			plugins_url( $frontend_script, __FILE__ ),
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);
	}
}
add_action( 'init', __NAMESPACE__ . '\register_block' );
