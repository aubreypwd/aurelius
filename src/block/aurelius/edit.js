import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @author Aubrey Portwood <code@aubreypwd.com>
 * @since 1.0.0
 * @link https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @param {Object} [props] Properties passed from the editor.
 * @return {WPElement} Element to render.
 */
export default function Edit( props ) {
	const {
		attributes: {},
	} = props;

	return (
		<blockquote id="wp-block-aubreypwd-aurelius"></blockquote>
	);
}
