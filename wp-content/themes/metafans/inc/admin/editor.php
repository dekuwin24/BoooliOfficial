<?php
/**
 * Support Gutenberg Editor.
 *
 * @since 0.2.6
 */
class Tophive_Editor {
	private $action = 'tophive_load_editor_style';
	private $editor_file = 'assets/css/admin/editor.css';
	public function __construct() {
		// Add editor settings.
		add_action( 'block_editor_settings', array( $this, 'editor_settings' ) );
		// Add ajax action to load css file.
		add_action( 'wp_ajax_' . $this->action, array( $this, 'css_file' ) );
		// Add more editor assets.
		add_action( 'enqueue_block_editor_assets', array( $this, 'assets' ) );
	}

	/**
	 * Add more editor styles and scripts
	 *
	 * @todo Add Custom Fonts and styling settings.
	 *
	 * @return void
	 */
	function assets() {
		wp_enqueue_style( 'tophive-editor-fonts', Tophive_Customizer_Auto_CSS::get_instance()->get_font_url() );
		wp_add_inline_style( 'wp-edit-post', $this->css() );
	}

	/**
	 * Add styling settings to editor.
	 *
	 * @return string CSS code.
	 */
	public function css() {
		$fields = array();
		$keys = array(
			'container_width',
			'site_content_styling',
			'content_background',
			'single_blog_post_content_width',
			'global_typography_heading_h1',
			'global_typography_base_heading',
			'global_styling_color_heading',
		);

		foreach ( $keys as $k ) {
			$f  = tophive_metafans()->customizer->get_field_setting( $k );
			if ( $f ) {
				$fields[ $k ] = $f;
			}
		}

		if ( $fields['global_styling_color_heading'] ) {
			$fields['global_styling_color_heading']['selector'] = '.editor-styles-wrapper .editor-post-title .editor-post-title__input';
			$fields['global_styling_color_heading']['css_format'] = 'color: {{value}};';
		}

		if ( $fields['container_width'] ) {
			$fields['container_width']['selector'] = '.editor-styles-wrapper .wp-block[data-align="wide"]';
			$fields['container_width']['css_format'] = 'width: calc( {{value}} - 4em ); max-width: 100%;';
		}

		if ( $fields['single_blog_post_content_width'] ) {
			$fields['single_blog_post_content_width']['selector'] = '.editor-styles-wrapper .wp-block:not([data-align="full"]):not([data-align="wide"])';
			$fields['single_blog_post_content_width']['css_format'] = 'max-width: {{value}};';
		}

		if ( $fields['global_typography_base_heading'] ) {
			$fields['global_typography_base_heading']['selector'] = '.editor-post-title__block .editor-post-title__input';
		}
		if ( $fields['global_typography_heading_h1'] ) {
			$fields['global_typography_heading_h1']['selector'] = ' .editor-post-title__block texarea.editor-post-title__input';
		}

		if ( $fields['site_content_styling'] ) {
			$fields['site_content_styling']['selector'] = array(
				'normal' => '.edit-post-visual-editor.editor-styles-wrapper',
			);
		}

		if ( isset( $fields['content_background'] ) && $fields['content_background'] ) {
			$fields['content_background']['selector'] = array(
				'normal' => '.edit-post-layout__content',
			);
		}

		$c = new Tophive_Customizer_Auto_CSS();
		$css = $c->render_css( $fields );

		$css .= '.edit-post-layout__content .edit-post-layout__metaboxes { background: #FFF; }
		.edit-post-layout__metaboxes:not(:empty) { margin-top: 0px; }
		.editor-styles-wrapper textarea.editor-post-title__input { min-height: 0; }
		.editor-styles-wrapper textarea.editor-post-title__input:focus,
		.block-editor-page .editor-styles-wrapper button { background: none; }
		';
		return $css;
	}

	/**
	 * Create a dymanic stylesheet url.
	 *
	 * @return string CSS URL
	 */
	public function editor_style_url() {
		return add_query_arg(
			array(
				'action' => $this->action,
				'nonce' => wp_create_nonce( $this->action ),
			),
			admin_url( 'admin-ajax.php' )
		);
	}

	/**
	 * Add edditor settings.
	 *
	 * @see gutenberg_editor_scripts_and_styles
	 *
	 * @param array $editor_settings
	 * @return array
	 */
	public function editor_settings( $editor_settings ) {

		$editor_settings['styles'][] = array(
			'css' => $this->load_style(),
		);

		return $editor_settings;
	}

	/**
	 * Render dynamic CSS content.
	 *
	 * @return void
	 */
	public function css_file() {
		header( 'Content-type: text/css; charset: UTF-8' );
		echo tophive_sanitize_filter($this->load_style());
	}

	/**
	 * Load CSS content.
	 *
	 * @return string CSS code.
	 */
	public function load_style() {
		global $wp_filesystem;
		WP_Filesystem();
		$file = get_template_directory() . '/' . $this->editor_file;
		$file_contents = '';
		if ( file_exists( $file ) ) {
			$file_contents .= $wp_filesystem->get_contents( $file );
		}

		/**
		 * Remove editor background
		 *
		 * @since 0.3.0
		 */
		$config_fields = tophive_metafans()->customizer->get_config();
		$c = new Tophive_Customizer_Auto_CSS();
		$css_code = $c->render_css( $config_fields );

		$file_contents .= $css_code;
		return $file_contents;
	}

}

new Tophive_Editor();
