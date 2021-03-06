/**
 * Render Quotes
 *
 * This file mostly takes <blockquotes> and renders Marcus Aurelius Quotes in them.
 *
 * @since Dec 27, 2021
 */

document.addEventListener( 'DOMContentLoaded', () => {

	/**
	 * Where we would store quotes in local storage.
	 *
	 * @type {String}
	 */
	const quoteCacheKey = 'aurelius_quotes_773d6310cb469462e79d0f7ff0a55840';

	/**
	 * The evenual quotes we will pick from.
	 *
	 * @type {Array}
	 */
	let quotes = [];

	/**
	 * Blockquotes in the DOM.
	 *
	 * @type {Array}
	 */
	let blockQuotes = [];

	/**
	 * Filter out only Marcus Aurelius quotes.
	 *
	 * @author Aubrey Portwood <aubrey@webdevstudios.com>
	 * @since  Monday, December 27, 2021
	 * @param  {Array} serverQuotes Quotes.
	 * @return {Array}              Only quotes where author is Marcus Auralius.
	 */
	function filterServerMarcusQuotes( serverQuotes ) {
		return serverQuotes.filter( ( quote ) => 'Marcus Aurelius' === quote.author || '' );
	}

	/**
	 * Get the .body of the Quote object.
	 *
	 * @author Aubrey Portwood <aubrey@webdevstudios.com>
	 * @since  Monday, December 27, 2021
	 * @param  {Array} serverQuotes Quotes from the server.
	 * @return {Array}              The .body value of the object.
	 */
	function filterServerQuoteBody( serverQuotes ) {
		return serverQuotes.map( ( quote ) => quote.body || '' );
	}

	/**
	 * Render quotes onto block quotes in the DOM.
	 *
	 * @author Aubrey Portwood <aubrey@webdevstudios.com>
	 * @since  Monday, December 27, 2021
	 */
	function renderNewQuotes() {

		// Select everything that isn't rendered.
		blockQuotes = document.querySelectorAll( '.wp-block-aubreypwd-aurelius:not(.rendered)' );

		if ( 0 >= blockQuotes.length ) {
			return; // No blockquotes on the page.
		}

		if ( 0 >= quotes.length ) {
			return; // No quotes to choose from.
		}

		for ( const element of blockQuotes ) {

			if ( element.classList.contains( 'rendered' ) ) {
				continue;
			}

			// Render in a random quote.
			element.innerText = quotes[ Math.floor( Math.random() * quotes.length ) ];

			// Note this element was rendered, so it doesn't get rendered again.
			element.classList.add( 'rendered' );
		}
	}

	/**
	 * Periodically look for new blockquotes in the DOM.
	 *
	 * @author Aubrey Portwood <aubrey@webdevstudios.com>
	 * @since  Monday, December 27, 2021
	 */
	function periodicallyRenderNewQuotes() {
		setInterval( renderNewQuotes, 1 );
	}

	/**
	 * Fetch Marcus Aurelius quotes from the server.
	 *
	 * @author Aubrey Portwood <aubrey@webdevstudios.com>
	 * @since  Monday, December 27, 2021
	 */
	function fetchServerQuotesAndBeginToRender() {

		const cache = JSON.parse( window.localStorage.getItem( quoteCacheKey ) );

		if ( Array.isArray( cache ) ) {

			// We stored this in local storage, just use that.
			quotes = cache;

			// Now render quotes with it.
			periodicallyRenderNewQuotes();

			// And don't fetch.
			return;
		}

		// First try and get a quote from this server.
		fetch( 'https://stoic-server.herokuapp.com/search/marcus_aurelius' ).then( ( response ) => response.json() ).then( ( serverQuotes ) => {

			// Store them for runtime.
			quotes = filterServerQuoteBody( filterServerMarcusQuotes( serverQuotes ) );

			// Also cache them in local storage.
			window.localStorage.setItem( quoteCacheKey, JSON.stringify( quotes ) );

		// In the case of an error.
		} ).catch( () => {

			// Use these handful of quotes.
			quotes = [
				'You have power over your mind ??? not outside events. Realize this, and you will find strength.',
				'Dwell on the beauty of life. Watch the stars, and see yourself running with them.',
				'The happiness of your life depends upon the quality of your thoughts.',
				'Everything we hear is an opinion, not a fact. Everything we see is a perspective, not the truth.',
				'Waste no more time arguing about what a good man should be. Be one.',
				'If you are distressed by anything external, the pain is not due to the thing itself, but to your estimate of it; and this you have the power to revoke at any moment.',
				'When you arise in the morning think of what a privilege it is to be alive, to think, to enjoy, to love ???',
				'The best revenge is to be unlike him who performed the injury.',
				'Accept the things to which fate binds you, and love the people with whom fate brings you together,but do so with all your heart.',
				'The soul becomes dyed with the colour of its thoughts.',
				'It is not death that a man should fear, but he should fear never beginning to live.',
				'Our life is what our thoughts make it.',
				'Never let the future disturb you. You will meet it, if you have to, with the same weapons of reason which today arm you against the present.',
				'If someone is able to show me that what I think or do is not right, I will happily change, for I seek the truth, by which no one was ever truly harmed. It is the person who continues in his self-deception and ignorance who is harmed.',
				'If it is not right do not do it; if it is not true do not say it.',
				'Very little is needed to make a happy life; it is all within yourself in your way of thinking.',
				'I have often wondered how it is that every man loves himself more than all the rest of men, but yet sets less value on his own opinion of himself than on the opinion of others.',
				'The object of life is not to be on the side of the majority, but to escape finding oneself in the ranks of the insane.',
				'Whenever you are about to find fault with someone, ask yourself the following question: What fault of mine most nearly resembles the one I am about to criticize?',
				'The best revenge is not to be like your enemy.',
				'Reject your sense of injury and the injury itself disappears.',
				'When you wake up in the morning, tell yourself: the people I deal with today will be meddling, ungrateful, arrogant, dishonest, jealous and surly. They are like this because they can???t tell good from evil. But I have seen the beauty of good, and the ugliness of evil, and have recognized that the wrongdoer has a nature related to my own ??? not of the same blood and birth, but the same mind, and possessing a share of the divine. And so none of them can hurt me. No one can implicate me in ugliness. Nor can I feel angry at my relative, or hate him. We were born to work together like feet, hands and eyes, like the two rows of teeth, upper and lower. To obstruct each other is unnatural. To feel anger at someone, to turn your back on him: these are unnatural.',
				'When another blames you or hates you, or people voice similar criticisms, go to their souls, penetrate inside and see what sort of people they are. You will realize that there is no need to be racked with anxiety that they should hold any particular opinion about you.',
				'The first rule is to keep an untroubled spirit. The second is to look things in the face and know them for what they are.',
				'How much more grievous are the consequences of anger than the causes of it.',
				'Do not act as if you were going to live ten thousand years. Death hangs over you. While you live, while it is in your power, be good.',
				'Begin each day by telling yourself: Today I shall be meeting with interference, ingratitude, insolence, disloyalty, ill-will, and selfishness ??? all of them due to the offenders??? ignorance of what is good or evil.',
				'Look well into thyself; there is a source of strength which will always spring up if thou wilt always look.',
				'To bear this worthily is good fortune.',
				'How much time he gains who does not look to see what his neighbour says or does or thinks, but only at what he does himself, to make it just and holy.',
			];

		// After all this...
		} ).finally(

			// Once we've resolved data, start to render these quotes into the DOM.
			() => periodicallyRenderNewQuotes()
		);
	}

	/**
	 * Init
	 *
	 * @author Aubrey Portwood <aubrey@webdevstudios.com>
	 * @since  Monday, December 27, 2021
	 */
	function init() {
		fetchServerQuotesAndBeginToRender();
	}

	init();
} );
