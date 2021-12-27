document.addEventListener( 'DOMContentLoaded', () => {

	let blockQuote = null;

	/**
	 * Render the quote.
	 *
	 * @author Aubrey Portwood <aubrey@webdevstudios.com>
	 * @since  Monday, December 27, 2021
	 */
	function fetchQuote() {

		const promise = fetch( 'https://stoic-server.herokuapp.com/search/marcus_aurelius' );

		promise.then( ( response ) => {
			return response.json();
		} ).then( ( quotes ) => {

			// Render the quote.
			blockQuote.innerText = quotes[ Math.floor( Math.random() * quotes.length ) ].body;

		} );
	}

	/**
	 * Render Quote.
	 *
	 * @author Aubrey Portwood <aubrey@webdevstudios.com>
	 * @since  Monday, December 27, 2021
	 */
	function init() {

		blockQuote = document.getElementById( 'wp-block-aubreypwd-aurelius' );

		if ( null === blockQuote || 'object' !== typeof blockQuote ) {
			return; // Not yet on the page.
		}

		clearInterval( interval ); // Stop trying to find the blockquote.
		fetchQuote(); // Fetch a quote.
	}

	// Use an Interval as a cheap alternatives for rendering it in the Editor.
	const interval = setInterval( function() {

		init(); // Every 200ms.

	}, 200 );

	init(); // Immediatly.
} );
