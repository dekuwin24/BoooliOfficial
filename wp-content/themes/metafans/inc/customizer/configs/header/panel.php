<?php

class Tophive_Builder_Header extends Tophive_Customize_Builder_Panel {
	public $id = 'header';

	/**
	 * Panel builder configs.
	 *
	 * @since 0.0.1
	 * @since 0.2.9
	 *
	 * @return array
	 */
	function get_config() {
		return array(
			'id'            => $this->id,
			'title'         => esc_html__( 'Header Builder', 'metafans' ),
			'control_id'    => 'header_builder_panel', // Control ID for ver 1.
			'version_id'    => 'header_builder_version', // The control id where store version.
			'panel'         => 'header_settings',
			'section'       => 'header_builder_panel',
			// Versions support, can choice v1 or v2.
			'versions'      => array(
				'v1' => array(
					'control_id' => 'header_builder_panel',
					'label' => esc_html__( 'Version 1', 'metafans' ),
				),
				'v2' => array(
					'control_id' => 'header_builder_panel_v2',
					'label' => esc_html__( 'Version 2', 'metafans' ),
				),
			),
			'devices'       => array(
				'desktop'      => esc_html__( 'Desktop', 'metafans' ),
				'mobile'       => esc_html__( 'Mobile/Tablet', 'metafans' ),
			),
		);
	}

	function get_rows_config() {
		return array(
			'top'     => esc_html__( 'Header Top', 'metafans' ),
			'main'    => esc_html__( 'Header Main', 'metafans' ),
			'bottom'  => esc_html__( 'Header Bottom', 'metafans' ),
			'sidebar' => esc_html__( 'Menu Sidebar', 'metafans' ),
			'sidebar_bottom' => esc_html__( 'Menu Sidebar Bottom', 'metafans' ),
		);
	}

	function customize() {

		$fn     = 'tophive_customize_render_header';
		$config = array(
			array(
				'name'     => 'header_settings',
				'type'     => 'panel',
				'priority' => 1,
				'title'    => esc_html__( 'Header', 'metafans' ),
			),

			array(
				'name'  => 'header_builder_panel',
				'type'  => 'section',
				'panel' => 'header_settings',
				'title' => esc_html__( 'Header Builder', 'metafans' ),
			),

			// Header Builder v1 store data key.
			array(
				'name'                => 'header_builder_panel',
				'type'                => 'js_raw',
				'section'             => 'header_builder_panel',
				'theme_supports'      => '',
				'title'               => esc_html__( 'Header Builder', 'metafans' ),
				'selector'            => '#masthead',
				'render_callback'     => $fn,
				'container_inclusive' => true,
			),

			// Header Builder v2 store data key.
			array(
				'name'                => 'header_builder_panel_v2',
				'type'                => 'js_raw',
				'section'             => 'header_builder_panel',
				'theme_supports'      => '',
				'title'               => '',
				'selector'            => '#masthead',
				'render_callback'     => $fn,
				'container_inclusive' => true,
			),

			// Header Builder v2 store data key.
			array(
				'name'                => 'header_builder_version',
				'type'                => 'js_raw',
				'section'             => 'header_builder_panel',
				'theme_supports'      => '',
				'title'               => '',
				'selector'            => '#masthead',
				'sanitize_callback'   => 'sanitize_text_field',
				'render_callback'     => $fn,
				'container_inclusive' => true,
			),

		);

		return $config;
	}

	function row_config( $section = false, $section_name = false ) {

		if ( ! $section ) {
			$section = 'header_top';
		}
		if ( ! $section_name ) {
			$section_name = esc_html__( 'Header Top', 'metafans' );
		}

		// Text skin.
		$color_mode = 'light-mode';
		if ( 'header_top' == $section ) {
			$color_mode = 'dark-mode';
		}

		$selector           = '.header--row.' . str_replace( '_', '-', $section );
		$skin_selector      = '.header--row.' . str_replace( '_', '-', $section );
		$skin_selector      = '.header--row:not(.header--transparent).' . str_replace( '_', '-', $section );
		$skin_mode_selector = '.header--row-inner.' . str_replace( '_', '-', $section ) . '-inner';

		$fn           = 'tophive_customize_render_header';
		$selector_all = '#masthead';

		$config = array(
			array(
				'name'           => $section,
				'type'           => 'section',
				'panel'          => 'header_settings',
				'theme_supports' => '',
				'title'          => $section_name,
			),

			array(
				'name'            => $section . '_layout',
				'type'            => 'select',
				'section'         => $section,
				'title'           => esc_html__( 'Layout', 'metafans' ),
				'selector'        => $selector,
				'css_format'      => 'html_class',
				'render_callback' => $fn,
				'default'         => 'layout-full-contained',
				'choices'         => array(
					'layout-full-contained' => esc_html__( 'Full width - Contained', 'metafans' ),
					'layout-fullwidth'      => esc_html__( 'Full Width', 'metafans' ),
					'layout-contained'      => esc_html__( 'Contained', 'metafans' ),
				),
			),

			array(
				'name'        => $section . '_noti_layout',
				'type'        => 'custom_html',
				'section'     => $section,
				'title'       => '',
				'description' => __( "Layout <code>Full width - Contained</code> and <code>Full Width</code> will not fit browser width because you've selected <a class='focus-control' data-id='site_layout' href='#'>Site Layout</a> as <code>Boxed</code> or <code>Framed</code>", 'metafans' ),
				'required'    => array(
					array( 'site_layout', '=', array( 'site-boxed', 'site-framed' ) ),
				),
			),

			array(
				'name'            => $section . '_height',
				'type'            => 'slider',
				'section'         => $section,
				'theme_supports'  => '',
				'device_settings' => true,
				'max'             => 250,
				'selector'        => $selector . " .tophive-grid, $selector .style-full-height .primary-menu-ul > li > a",
				'css_format'      => 'min-height: {{value}};',
				'title'           => esc_html__( 'Height', 'metafans' ),
			),

			array(
				'name'       => $section . '_text_mode',
				'type'       => 'image_select',
				'section'    => $section,
				'selector'   => $skin_mode_selector,
				'css_format' => 'html_class',
				'title'      => esc_html__( 'Skin Mode', 'metafans' ),
				'default'    => $color_mode,
				'choices'    => array(
					'dark-mode'  => array(
						'img'   => esc_url( get_template_directory_uri() ) . '/assets/images/customizer/text_mode_light.svg',
						'label' => 'Dark',
					),
					'light-mode' => array(
						'img'   => esc_url( get_template_directory_uri() ) . '/assets/images/customizer/text_mode_dark.svg',
						'label' => 'Light',
					),
				),
			),

			array(
				'name'             => $section . '_styling',
				'type'             => 'styling',
				'section'          => $section,
				'title'            => esc_html__( 'Advanced Styling', 'metafans' ),
				'description'      => sprintf( esc_html__( 'Advanced styling for %s', 'metafans' ), $section_name ),
				'live_title_field' => 'title',
				'selector'         => array(
					'normal' => "{$skin_selector} .header--row-inner",
				),
				'css_format'       => 'styling',
				'fields'           => array(
					'normal_fields' => array(
						'text_color' => false,
						'link_color' => false,
						'padding'    => false,
						'margin'     => false,
					),
					'hover_fields'  => false,
				), // disable hover tab and all fields inside.
			),

		);

		return $config;

	}

	function row_sidebar_config( $section, $section_name ) {
		$selector = '#header-menu-sidebar-bg';

		$config = array(
			array(
				'name'           => $section,
				'type'           => 'section',
				'panel'          => 'header_settings',
				'theme_supports' => '',
				'title'          => $section_name,
			),

			array(
				'name'            => $section . '_animate',
				'type'            => 'select',
				'section'         => $section,
				'selector'        => 'body',
				'render_callback' => 'tophive_customize_render_header',
				'css_format'      => 'html_class',
				'title'           => esc_html__( 'Display Type', 'metafans' ),
				'default'         => 'menu_sidebar_slide_left',
				'choices'         => array(
					'menu_sidebar_slide_left'    => esc_html__( 'Slide From Left', 'metafans' ),
					'menu_sidebar_slide_right'   => esc_html__( 'Slide From Right', 'metafans' ),
					'menu_sidebar_slide_overlay' => esc_html__( 'Full-screen Overlay', 'metafans' ),
					'menu_sidebar_dropdown'      => esc_html__( 'Toggle Dropdown', 'metafans' ),
				),
			),

			array(
				'name'       => $section . '_skin_mode',
				'type'       => 'image_select',
				'section'    => $section,
				'selector'   => '#header-menu-sidebar, .close-sidebar-panel',
				'css_format' => 'html_class',
				'title'      => esc_html__( 'Skin Mode', 'metafans' ),
				'default'    => 'dark-mode',
				'choices'    => array(
					'dark-mode'  => array(
						'img'   => esc_url( get_template_directory_uri() ) . '/assets/images/customizer/text_mode_light.svg',
						'label' => 'Dark',
					),
					'light-mode' => array(
						'img'   => esc_url( get_template_directory_uri() ) . '/assets/images/customizer/text_mode_dark.svg',
						'label' => 'Light',
					),
				),
			),

			array(
				'name'             => $section . '_styling',
				'type'             => 'styling',
				'section'          => $section,
				'title'            => esc_html__( 'Styling', 'metafans' ),
				'description'      => sprintf( esc_html__( 'Advanced styling for %s', 'metafans' ), $section_name ),
				'live_title_field' => 'title',
				'selector'         => array(
					'normal'               => $selector,
					'normal_link_color'    => "{$selector} .menu li a, {$selector} .item--html a, {$selector} .cart-item-link, {$selector} .nav-toggle-icon",
					'hover_link_color'     => "{$selector} .menu li a:hover, {$selector} .item--html a:hover, {$selector} .cart-item-link:hover, {$selector} li.open-sub .nav-toggle-icon",
					'normal_bg_color'      => '#header-menu-sidebar-bg:before',
					'normal_bg_image'      => '#header-menu-sidebar-bg:before',
					'normal_bg_attachment' => '#header-menu-sidebar-bg:before',
					'normal_bg_cover'      => '#header-menu-sidebar-bg:before',
					'normal_bg_repeat'     => '#header-menu-sidebar-bg:before',
					'normal_bg_position'   => '#header-menu-sidebar-bg:before',
					'normal_box_shadow'    => '#header-menu-sidebar',
				),
				'css_format'       => 'styling', // styling.
				'fields'           => array(
					'normal_fields' => array(
						'border_color'  => false,
						'border_radius' => false,
						'border_width'  => false,
						'border_style'  => false,
					),
					'hover_fields'  => array(
						'text_color'     => false,
						'padding'        => false,
						'bg_color'       => false,
						'bg_heading'     => false,
						'bg_cover'       => false,
						'bg_image'       => false,
						'bg_repeat'      => false,
						'border_heading' => false,
						'border_color'   => false,
						'border_radius'  => false,
						'border_width'   => false,
						'border_style'   => false,
						'box_shadow'     => false,
					), // disable hover tab and all fields inside.
				),
			),

			array(
				'name'           => $section . '_menu_no_duplicator',
				'type'           => 'checkbox',
				'section'        => $section,
				'selector'       => '.sub-menu .li-duplicator',
				'css_format'     => 'display:none !important;',
				'checkbox_label' => esc_html__( 'Do not copy parent menu to submenu.', 'metafans' ),
				'default'        => 1,
			),

			array(
				'name'            => $section . '_align',
				'type'            => 'text_align_no_justify',
				'section'         => $section,
				'priority'        => 820,
				'device_settings' => true,
				'selector'        => '.header-menu-sidebar-inner',
				'css_format'      => 'text-align: {{value}};',
				'title'           => esc_html__( 'Align', 'metafans' ),
			),

		);

		return $config;
	}

}

if ( ! function_exists( 'tophive_header_layout_settings' ) ) {
	function tophive_header_layout_settings( $item_id = '', $section = '', $cb = '', $name_prefix = 'header_' ) {

		if ( ! $cb ) {
			$cb = 'tophive_customize_render_header';
		}

		$class    = '.header--row';
		$selector = '#masthead';
		if ( ! $name_prefix ) {
			$name_prefix = 'header_';
		} else {
			if ( strpos( $item_id, 'footer' ) !== false ) {
				$class       = '.footer--row';
				$name_prefix = 'footer_';
				$cb          = 'tophive_customize_render_footer';
			}
		}

		$layout = array(
			array(
				'name'     => $name_prefix . $item_id . '_l_heading',
				'type'     => 'heading',
				'priority' => 800,
				'section'  => $section,
				'title'    => esc_html__( 'Item Layout', 'metafans' ),
			),

			array(
				'name'            => $name_prefix . $item_id . '_margin',
				'type'            => 'css_ruler',
				'priority'        => 810,
				'section'         => $section,
				'device_settings' => true,
				'css_format'      => array(
					'top'    => 'margin-top: {{value}};',
					'right'  => 'margin-right: {{value}};',
					'bottom' => 'margin-bottom: {{value}};',
					'left'   => 'margin-left: {{value}};',
				),
				'selector'        => "{$class} .builder-item--{$item_id}, .builder-item.builder-item--group .item--inner.builder-item--{$item_id}",
				'label'           => esc_html__( 'Margin', 'metafans' ),
			),

			/**
			 * Apply for version 1 only
			 *
			 * @since 0.2.9
			 */
			array(
				'name'            => $name_prefix . $item_id . '_align',
				'type'            => 'text_align_no_justify',
				'section'         => $section,
				'priority'        => 820,
				'device_settings' => true,
				'selector'        => "{$class} .builder-first--" . $item_id,
				'css_format'      => 'text-align: {{value}};',
				'title'           => esc_html__( 'Align', 'metafans' ),
				'required' => array( 'header_builder_version', '!=', 'v2' ),
			),

			/**
			 * Apply for version 1 only
			 *
			 * @since 0.2.9
			 */
			array(
				'name'            => $name_prefix . $item_id . '_merge',
				'type'            => 'select',
				'section'         => $section,
				'selector'        => $selector,
				'render_callback' => $cb,
				'priority'        => 999,
				'device_settings' => true,
				'devices'         => array( 'desktop', 'mobile' ),
				'title'           => esc_html__( 'Merge Item', 'metafans' ),
				'description'     => esc_html__( 'If you choose to merge this item, the alignment setting will inherit from the item you are merging.', 'metafans' ),
				'choices'         => array(
					0      => esc_html__( 'No', 'metafans' ),
					'prev' => esc_html__( 'Merge with left item', 'metafans' ),
					'next' => esc_html__( 'Merge with right item', 'metafans' ),
				),
				'required' => array( 'header_builder_version', '!=', 'v2' ),
			),
		);

		return $layout;
	}
}

Tophive_Customize_Layout_Builder()->register_builder( 'header', new Tophive_Builder_Header() );
