<?php

if ( ! function_exists( 'tophive_site_content_class' ) ) :
	/**
	 * Display the classes for the site content element.
	 *
	 * @since 0.0.1
	 *
	 * @param string|array $class One or more classes to add to the class list.
	 */
	function tophive_site_content_class( $class = '' ) {
		// Separates classes with a single space, collates classes for body element.
		echo 'class="' . join( ' ', tophive_get_site_content_class( $class ) ) . '"';
	}
endif;

if ( ! function_exists( 'tophive_get_site_content_class' ) ) :
	/**
	 * Retrieve the classes for the site content element as an array.
	 *
	 * @since 0.0.1
	 *
	 * @param string|array $class One or more classes to add to the class list.
	 *
	 * @return array Array of classes.
	 */
	function tophive_get_site_content_class( $class = '' ) {

		$classes = array();

		if ( ! empty( $class ) ) {
			if ( ! is_array( $class ) ) {
				$class = preg_split( '#\s+#', $class );
			}
			$classes = array_merge( $classes, $class );
		} else {
			// Ensure that we always coerce class to being an array.
			$class = array();
		}

		if ( tophive_is_support_meta() ) {
			$page_layout = get_post_meta( tophive_get_support_meta_id(), '_tophive_content_layout', true );
			$page_layout_spacing = get_post_meta( tophive_get_support_meta_id(), '_tophive_content_spacing', true );

			if ( $page_layout ) {
				$classes['content_layout'] = 'content-' . sanitize_text_field( $page_layout );
			}
			if ( $page_layout_spacing ) {
				if( 'lp_course' == get_post_type() ){
					$classes['content_layout'] = 'content-no-gap';
				}else{
					$classes['content_layout'] = 'content-' . sanitize_text_field( $page_layout_spacing );
				}
			}else{
				$classes['content_layout'] = 'content-sm-space';
			}
		}else{
			$classes['content_layout'] = 'content-sm-space';
		}

		if( is_archive() ){
			$classes['content_layout'] = 'content-sm-space';
		}

		$classes = array_map( 'esc_attr', $classes );
		$classes = apply_filters( 'tophive_site_content_class', $classes, $class );

		return array_unique( $classes );
	}
endif;

if ( ! function_exists( 'tophive_sidebar_primary_class' ) ) :
	/**
	 * Display the classes for the primary sidebar element.
	 *
	 * @since 0.0.1
	 *
	 * @param string|array $class One or more classes to add to the class list.
	 */
	function tophive_sidebar_primary_class( $class = '' ) {
		// Separates classes with a single space, collates classes for body element.
		echo 'class="' . join( ' ', tophive_get_sidebar_primary_class( $class ) ) . '"';
	}
endif;

if ( ! function_exists( 'tophive_get_sidebar_primary_class' ) ) :
	/**
	 * Retrieve the classes for the primary sidebar element as an array.
	 *
	 * @since 0.0.1
	 *
	 * @param string|array $class One or more classes to add to the class list.
	 *
	 * @return array Array of classes.
	 */
	function tophive_get_sidebar_primary_class( $class = '' ) {

		$classes = array();

		if ( ! empty( $class ) ) {
			if ( ! is_array( $class ) ) {
				$class = preg_split( '#\s+#', $class );
			}
			$classes = array_merge( $classes, $class );
		} else {
			// Ensure that we always coerce class to being an array.
			$class = array();
		}

		$classes = array_map( 'esc_attr', $classes );
		$classes = apply_filters( 'tophive_sidebar_primary_class', $classes, $class );

		return array_unique( $classes );
	}
endif;

if ( ! function_exists( 'tophive_sidebar_secondary_class' ) ) :
	/**
	 * Display the classes for the secondary sidebar element.
	 *
	 * @since 0.0.1
	 *
	 * @param string|array $class One or more classes to add to the class list.
	 */
	function tophive_sidebar_secondary_class( $class = '' ) {
		// Separates classes with a single space, collates classes for body element.
		echo 'class="' . join( ' ', tophive_get_sidebar_secondary_class( $class ) ) . '"';
	}
endif;

if ( ! function_exists( 'tophive_get_sidebar_secondary_class' ) ) :
	/**
	 * Retrieve the classes for the secondary sidebar element as an array.
	 *
	 * @since 0.0.1
	 *
	 * @param string|array $class One or more classes to add to the class list.
	 *
	 * @return array Array of classes.
	 */
	function tophive_get_sidebar_secondary_class( $class = '' ) {

		$classes = array();

		if ( ! empty( $class ) ) {
			if ( ! is_array( $class ) ) {
				$class = preg_split( '#\s+#', $class );
			}
			$classes = array_merge( $classes, $class );
		} else {
			// Ensure that we always coerce class to being an array.
			$class = array();
		}

		$classes = array_map( 'esc_attr', $classes );
		$classes = apply_filters( 'tophive_sidebar_secondary_class', $classes, $class );

		return array_unique( $classes );
	}
endif;

if ( ! function_exists( 'tophive_main_content_class' ) ) :
	/**
	 * Display the classes for the main content element.
	 *
	 * @since 0.0.1
	 *
	 * @param string|array $class One or more classes to add to the class list.
	 */
	function tophive_main_content_class( $class = '' ) {
		// Separates classes with a single space, collates classes for body element.
		echo 'class="' . join( ' ', tophive_get_main_content_class( $class ) ) . '"';
	}
endif;

if ( ! function_exists( 'tophive_get_main_content_class' ) ) :
	/**
	 * Retrieve the classes for the main content element as an array.
	 *
	 * @since 0.0.1
	 *
	 * @param string|array $class One or more classes to add to the class list.
	 *
	 * @return array Array of classes.
	 */
	function tophive_get_main_content_class( $class = '' ) {

		$classes = array();

		if ( ! empty( $class ) ) {
			if ( ! is_array( $class ) ) {
				$class = preg_split( '#\s+#', $class );
			}
			$classes = array_merge( $classes, $class );
		} else {
			// Ensure that we always coerce class to being an array.
			$class = array();
		}

		$classes = array_map( 'esc_attr', $classes );
		$classes = apply_filters( 'tophive_main_content_class', $classes, $class );

		return array_unique( $classes );
	}
endif;

if ( ! function_exists( 'tophive_site_content_grid_class' ) ) :
	/**
	 * Display the classes for the site content grid wrapper element.
	 *
	 * @since 0.0.1
	 *
	 * @param string|array $class One or more classes to add to the class list.
	 */
	function tophive_site_content_grid_class( $class = '' ) {
		// Separates classes with a single space, collates classes for body element.
		echo 'class="' . join( ' ', tophive_get_site_content_grid_class( $class ) ) . '"';
	}
endif;

if ( ! function_exists( 'tophive_get_site_content_grid_class' ) ) :
	/**
	 * Retrieve the classes for the site content grid element as an array.
	 *
	 * @since 0.0.1
	 *
	 * @param string|array $class One or more classes to add to the class list.
	 *
	 * @return array Array of classes.
	 */
	function tophive_get_site_content_grid_class( $class = '' ) {

		$classes = array();

		if ( ! empty( $class ) ) {
			if ( ! is_array( $class ) ) {
				$class = preg_split( '#\s+#', $class );
			}
			$classes = array_merge( $classes, $class );
		} else {
			// Ensure that we always coerce class to being an array.
			$class = array();
		}

		$classes = array_map( 'esc_attr', $classes );
		$classes = apply_filters( 'tophive_site_content_grid_class', $classes, $class );

		return array_unique( $classes );
	}
endif;

if ( ! function_exists( 'tophive_site_content_container_class' ) ) :
	/**
	 * Display the classes for the site content container wrapper element.
	 *
	 * @since 0.0.1
	 *
	 * @param string|array $class One or more classes to add to the class list.
	 */
	function tophive_site_content_container_class( $class = '' ) {
		// Separates classes with a single space, collates classes for body element.
		echo 'class="' . join( ' ', tophive_get_site_content_container_class( $class ) ) . '"';
	}
endif;

if ( ! function_exists( 'tophive_get_site_content_container_class' ) ) :
	/**
	 * Retrieve the classes for the site content container element as an array.
	 *
	 * @since 0.0.1
	 *
	 * @param string|array $class One or more classes to add to the class list.
	 *
	 * @return array Array of classes.
	 */
	function tophive_get_site_content_container_class( $class = '' ) {

		$classes = array();

		if ( ! empty( $class ) ) {
			if ( ! is_array( $class ) ) {
				$class = preg_split( '#\s+#', $class );
			}
			$classes = array_merge( $classes, $class );
		} else {
			// Ensure that we always coerce class to being an array.
			$class = array();
		}

		$classes = array_map( 'esc_attr', $classes );
		$classes = apply_filters( 'tophive_site_content_container_class', $classes, $class );

		return array_unique( $classes );
	}
endif;
