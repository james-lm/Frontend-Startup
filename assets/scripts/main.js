jQuery( document ).ready(

	function() {

		/* Overrides WP's <div> wrapper around videos, which mucks with flexible videos. */
		jQuery( 'div[style*="max-width: 100%"] > video' ).parent().css( 'width', '100%' );

		/* Responsive videos. */
		/* blip.tv adds a second <embed> with "display: none".  We don't want to wrap that. */
		jQuery( 'object, embed, iframe' ).not( 'embed[style*="display"], [src*="soundcloud.com"]' ).wrap( '<div class="embed-responsive embed-responsive-16by9" />' );

		/* Toggles audio/video info when using the [audio] or [video] shortcode. */
		jQuery( '.media-info-toggle' ).click(
			function() {
				jQuery( this ).parent().children( '.audio-info, .video-info' ).fadeToggle( 'slow' );
				jQuery( this ).toggleClass( 'active' );
			}
		);

		var changeHeaderOnBody = 500;

		jQuery(window).scroll(function () {
			clearTimeout( jQuery.data( this, "scrollCheck" ) );
			jQuery.data( this, "scrollCheck", setTimeout(function() {
				if (jQuery(window).scrollTop() > changeHeaderOnBody - 96 ) {
					jQuery("body").addClass("l-page-anchor-shrink");
				} else {
					jQuery("body").removeClass("l-page-anchor-shrink");
				}
				if (jQuery(window).scrollTop() > 100 ) {
					jQuery("body").addClass("l-page-anchor-shrink-light");
				} else {
					jQuery("body").removeClass("l-page-anchor-shrink-light");
				}
			}, 0) );
		});
	}
);
