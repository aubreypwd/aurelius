<?php
/**
 * Register the block and it's assets.
 *
 * @since   Dec 27, 2021
 * @package aubreypwd\Aurelius
 */

namespace aubreypwd\Aurelius;

/**
 * Enqueue block assets and register the block.
 *
 * @author Aubrey Portwood <code@aubreypwd.com>
 * @since 1.0.0
 */
function register_block() {

	// Define our built assets.
	$editor_script   = 'build/index.js';
	$editor_style    = 'build/index.css';
	$frontend_style  = 'build/frontend.css';
	$frontend_script = 'build/frontend.js';

	// Stuff we'll re-use below.
	$plugin_dir  = untrailingslashit( PLUGIN_DIR );
	$plugin_time = filemtime( "{$plugin_dir}/build/index.js" );

	// Verify we have an editor script.
	if ( ! file_exists( "{$plugin_dir}/{$editor_script}" ) ) {
		wp_die( esc_html__( 'Whoops! You need to run `npm run build` for Aurelius first.', 'aubreypwd-aurelius' ) );
	}

	// This gets built for us, so use that for most of this.
	$asset_file = require "{$plugin_dir}/build/index.asset.php";

	// Frontend.
	wp_enqueue_script( 'aubreypwd/aurelius/frontend-script', plugins_url( $frontend_script, PLUGIN_FILE ), $asset_file['dependencies'], $asset_file['version'], true );
	wp_register_style( 'aubreypwd/aurelius/style', plugins_url( $frontend_style, PLUGIN_FILE ), [], $plugin_time );

	// Editor.
	wp_register_script( 'aubreypwd/aurelius/editor-script', plugins_url( $editor_script, PLUGIN_FILE ), $asset_file['dependencies'], $asset_file['version'], true );
	wp_register_style( 'aubreypwd/aurelius/editor-style', plugins_url( $editor_style, PLUGIN_FILE ), [ 'wp-edit-blocks' ], $plugin_time );

	// Register block with WordPress.
	register_block_type( 'aubreypwd/aurelius', [
		'editor_script' => 'aubreypwd/aurelius/editor-script',
		'editor_style'  => 'aubreypwd/aurelius/editor-style',
		'style'         => 'aubreypwd/aurelius/style',
	] );
}
add_action( 'init', __NAMESPACE__ . '\register_block' );
