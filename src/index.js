import edit from './edit';
import save from './save';
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Register block type definition.
 *
 * @author WebDevStudios
 * @since 0.0.1
 * @link https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( 'aubreypwd/aurelius', {
	title: __( 'Aurelius', 'aurelius' ),
	icon: 'editor-quote',
	category: 'common',
	keywords: [
		__( 'aubreypwd', 'aurelius' ),
		__( 'Marcus', 'aurelius' ),
		__( 'Aurelius', 'aurelius' ),
		__( 'Stoic', 'aurelius' ),
		__( 'Stoicism', 'aurelius' ),
		__( 'Quote', 'aurelius' ),
		__( 'Quotes', 'aurelius' ),
	],
	attributes: {},
	edit,
	save,
} );
