import edit from './edit';
import save from './save';
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import './style.scss';

/**
 * Register block type definition.
 *
 * @author WebDevStudios
 * @since 0.0.1
 * @link https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( 'aubreypwd/aurelius', {
	title: __( 'Aurelius', 'aurelius' ),
	icon: 'edit',
	category: 'common',
	keywords: [
		__( 'aubreypwd', 'aurelius' ),
		__( 'Aurelius', 'aurelius' ),
	],
	attributes: {
	},
	edit,
	save,
} );
