<?php

/**
 * A Simple Metabox Fields Class
 *
 * Class Tophive_Form_Fields
 *
 * @since 0.2.2
 */
class Tophive_Form_Fields {

	/**
	 * @var array List fields
	 */
	private $fields = array();
	/**
	 * @var array Input Tabs
	 */
	private $tabs = array();
	/**
	 * @var array Values of fields
	 */
	private $values = array();
	/**
	 * @var bool Using tabs or not
	 */
	private $using_tabs = true;
	/**
	 * @var string Group input name
	 */
	private $group_name = 'tophive_page_settings';

	/**
	 * Parse field args
	 *
	 * @param array $args Setting arguments.
	 *
	 * @return array
	 */
	public function parse_args( $args ) {
		if ( ! is_array( $args ) ) {
			$args = array();
		}
		$args = wp_parse_args(
			$args,
			array(
				'title'         => '',
				'label'         => '', // Alias of title.
				'type'          => 'text',
				'tab'           => 'text',
				'name'          => '',
				'description'   => '',
				'desc'          => '', // Alias of description.
				'content'       => '', // For html content.
				'default'       => null,
				'show_default'  => false,
				'default_label' => false,
				'placeholder'   => '',
				'choices'       => array(),
				'options'       => array(), // Alias of options.
			)
		);

		if ( empty( $args['choices'] ) ) {
			$args['choices'] = $args['options'];
		}

		if ( empty( $args['description'] ) ) {
			$args['description'] = $args['desc'];
		}

		if ( empty( $args['title'] ) ) {
			$args['title'] = $args['label'];
		}

		unset( $args['label'], $args['options'], $args['desc'] );

		$args['type'] = sanitize_text_field( $args['type'] );

		return $args;
	}

	/**
	 * Get all registered fields
	 *
	 * @return array
	 */
	public function get_all_fields() {
		return $this->fields;
	}

	/**
	 * Get all registered tabs
	 *
	 * @return array
	 */
	public function get_all_tabs() {
		return $this->tabs;
	}

	/**
	 * Set using tabs or not
	 *
	 * @param boolean $using Is using tab or not.
	 */
	public function using_tabs( $using ) {
		$this->using_tabs = $using;
	}

	/**
	 * Set values for fields
	 *
	 * @param mixed $values Value to set.
	 */
	public function set_values( $values ) {
		$this->values = $values;
	}

	/**
	 * Set Group name
	 *
	 * @param string $name Group name.
	 */
	public function set_group_name( $name ) {
		$this->group_name = $name;
	}

	/**
	 * Get data from submitted form
	 *
	 * @return array
	 */
	public function get_submitted_values() {
		$data           = $this->group_name && isset( $_REQUEST[ $this->group_name ] ) ? wp_unslash( $_REQUEST[ $this->group_name ] ) : wp_unslash( $_REQUEST ); // WPCS: XSS OK.
		$submitted_data = array();
		foreach ( $this->fields as $field ) {
			if ( 'multiple_checkbox' == $field['type'] ) {
				foreach ( (array) $field['choices'] as $key => $label ) {
					$value                  = isset( $data[ $key ] ) ? $data[ $key ] : null;
					$submitted_data[ $key ] = $value;
				}
			} elseif ( $field['name'] ) {
				$value                            = isset( $data[ $field['name'] ] ) ? $data[ $field['name'] ] : null;
				$submitted_data[ $field['name'] ] = $value;
			}
		}

		return $submitted_data;
	}

	/**
	 * Add a tab
	 *
	 * @param string $tab_id Tab ID.
	 * @param array  $args   Settings.
	 */
	public function add_tab( $tab_id, $args ) {
		$args        = wp_parse_args(
			$args,
			array(
				'title' => '',
				'icon'  => '',
			)
		);
		$args['_id'] = $tab_id;

		$this->tabs[ $tab_id ] = $args;
	}

	/**
	 * Add field
	 *
	 * @param array $args Settings.
	 */
	public function add_field( $args ) {
		$this->fields[] = $this->parse_args( $args );
	}

	/**
	 * Add fields
	 *
	 * @param array $fields Settings.
	 */
	public function add_fields( $fields ) {
		foreach ( $fields as $field ) {
			$this->add_field( $field );
		}
	}

	/**
	 * Reset fields
	 */
	public function reset_fields() {
		$this->fields = array();
	}

	/**
	 * Render input fields
	 *
	 * @param string $tab_id Tab ID.
	 */
	private function render_fields( $tab_id = false ) {
		foreach ( $this->fields as $field ) {
			if ( $tab_id ) {
				if ( $tab_id != $field['tab'] ) {
					continue;
				}
			}

			$cb        = apply_filters( 'tophive_render_field_cb', false, $field );
			$_in_class = false;
			if ( ! is_callable( $cb ) ) {
				if ( method_exists( $this, 'field_' . $field['type'] ) ) {
					$cb        = array( $this, 'field_' . $field['type'] );
					$_in_class = true;
				}
			}

			ob_start();

			if ( $cb ) {
				call_user_func_array( $cb, array( $field ) );
			}

			$content = ob_get_clean();

			if ( $content ) {
				$this->before_field( $field );
				if ( $_in_class ) {
					$this->label( $field );
				}
				echo '<div class="tophive-mt-field-inner">';
				echo tophive_sanitize_filter($content); // WPCS: XSS OK.
				$this->description( $field );
				echo '</div>';
				$this->after_field( $field );
			}
		}
	}

	/**
	 * Check string is url ?
	 *
	 * @param string $url URL to check.
	 *
	 * @return bool
	 */
	public function is_valid_url( $url ) {

		// Must start with http:// or https://.
		if ( 0 !== strpos( $url, 'http://' ) && 0 !== strpos( $url, 'https://' ) ) {
			return false;
		}

		// Must pass validation.
		if ( ! filter_var( $url, FILTER_VALIDATE_URL ) ) {
			return false;
		}

		return true;
	}

	/**
	 * Render tabs and inputs inside
	 */
	private function render_tabs() {
		if ( $this->using_tabs && ! empty( $this->tabs ) ) {
			echo '<div class="tophive-mt-tabs">';
			echo '<ul class="tophive-mt-tabs-list">';
			$i = 0;
			foreach ( $this->tabs as $id => $tab ) {
				$icon  = '';
				$class = ' tophive-mt-tab-cont';
				if ( 0 == $i ) {
					$class .= ' active ';
				}
				if ( $this->is_valid_url( $tab['icon'] ) ) {
					$icon = '<img alt="metabox" src="' . esc_url( $tab['icon'] ) . '"/>';
				} elseif ( $tab['icon'] ) {
					$icon = '<i class="' . esc_attr( $tab['icon'] ) . '"></i>';
				}

				echo '<li class="li-' . esc_attr( $id ) . $class . '"><a href="#" data-tab-id="' . esc_attr( $id ) . '" data-title="' . esc_attr( $tab['title'] ) . '">' . $icon . esc_html( $tab['title'] ) . '</a></li>';
				$i ++;
			}
			echo '</ul>';

			echo '<div class="tophive-mt-tab-contents">';
			$i = 0;
			foreach ( $this->tabs as $id => $tab ) {
				$class = 'tophive-mt-tab-cont';
				if ( 0 == $i ) {
					$class .= ' active ';
				}
				echo '<div class="' . $class . '" data-tab-id="' . esc_attr( $id ) . '">';
				$this->render_fields( $id );
				echo '</div>';
				$i ++;
			}
			echo '</div>';

			echo '</div>';
		}
	}

	/**
	 * Render content
	 */
	public function render() {
		if ( $this->using_tabs ) {
			$this->render_tabs();
		} else {
			$class = 'tophive-mt-tabs tophive-mt-box';
			echo '<div class="' . $class . '">';
			echo '<div class="tophive-mt-box-inner">';
			$this->render_fields();
			echo '</div>';
			echo '</div>';
		}
	}

	/**
	 * Before field
	 *
	 * @param array $args Settings.
	 */
	function before_field( $args ) {
		echo "<div class=\"tophive-mt-field field-type-{$args['type']}\">";
	}

	/**
	 * After field
	 *
	 * @param array $args Settings.
	 */
	public function after_field( $args ) {
		echo '</div>';
	}

	/**
	 * Get field name
	 *
	 * @param array|string $args Field settings or field name.
	 *
	 * @return string
	 */
	public function get_name( $args ) {
		$key = is_array( $args ) ? $args['name'] : $args;
		if ( $this->group_name ) {
			return $this->group_name . "[$key]";
		}

		return $args['name'];
	}

	/**
	 * Get field value
	 *
	 * @param string|array $args Field setting or input name.
	 *
	 * @return mixed|null
	 */
	public function get_value( $args ) {
		$key = is_array( $args ) ? $args['name'] : $args;
		if ( isset( $this->values[ $key ] ) ) {
			return $this->values[ $key ];
		}

		return is_array( $args ) ? $args['default'] : null;
	}

	/**
	 * Get field id
	 *
	 * @param string|array $args Field setting or input name.
	 *
	 * @return string
	 */
	private function get_filed_id( $args ) {
		$key = is_array( $args ) ? $args['name'] : $args;

		return 'tophive-mt-field-' . $key;
	}

	/**
	 * Display field label
	 *
	 * @param array $args Settings.
	 */
	public function label( $args ) {
		if ( $args['title'] ) {
			?>
			<label class="tophive-mt-field-label" for="<?php echo esc_attr( $this->get_filed_id( $args ) ); ?>"><?php echo esc_attr($args['title']); // WPCS: XSS OK. ?></label>
			<?php
		}
	}

	/**
	 * Display field description
	 *
	 * @param array $args Filed settings.
	 */
	public function description( $args ) {
		if ( $args['description'] ) {
			?>
			<p class="description"><?php echo tophive_sanitize_filter($args['description']); // WPCS: XSS OK. ?></p>
			<?php
		}
	}

	/**
	 * Field Text
	 *
	 * @param array $args Field settings.
	 */
	private function field_text( $args ) {
		?>
		<input type="text" id="<?php echo esc_attr( $this->get_filed_id( $args ) ); ?>" name="<?php echo esc_attr( $this->get_name( $args ) ); ?>" value="<?php echo esc_attr( $this->get_value( $args ) ); ?>" class="widefat">
		<?php
	}

	/**
	 * Field textarea
	 *
	 * @param array $args Field settings.
	 */
	private function field_textarea( $args ) {
		?>
		<textarea rows="5" id="<?php echo esc_attr( $this->get_filed_id( $args ) ); ?>" name="<?php echo esc_attr( $this->get_name( $args ) ); ?>" class="widefat"><?php echo esc_textarea( $this->get_value( $args ) ); ?></textarea>
		<?php
	}

	/**
	 * Field text select
	 *
	 * @param array $args Field settings.
	 */
	private function field_select( $args ) {
		?>
		<select id="tophive-met-field-<?php echo esc_attr( $args['name'] ); ?>" name="<?php echo esc_attr( $this->get_name( $args ) ); ?>">
			<?php if ( $args['show_default'] ) { ?>
				<option value=""><?php echo esc_attr($args['default_label']) ? $args['default_label'] : esc_html__( 'Default', 'metafans' ); ?></option>
			<?php } ?>
			<?php foreach ( $args['choices'] as $k => $label ) { ?>
				<option <?php selected( $this->get_value( $args ), $k ); ?> value="<?php echo esc_attr( $k ); ?>"><?php echo esc_html( $label ); ?></option>
			<?php } ?>
		</select>
		<?php
	}

	/**
	 * Field text multiple checkbox
	 *
	 * @param array $args Field settings.
	 */
	private function field_multiple_checkbox( $args ) {
		?>
		<?php foreach ( $args['choices'] as $k => $label ) { ?>
			<p class="field-p">
				<label><input type="checkbox" name="<?php echo esc_attr( $this->get_name( $k ) ); ?>" <?php checked( $this->get_value( $k ), 1 ); ?> value="1" /> <?php echo esc_attr($label); // WPCS: XSS OK. ?>
				</label></p>
		<?php } ?>
		<?php
	}

	/**
	 * Field Checkbox
	 *
	 * @param array $args Field settings.
	 */
	private function field_checkbox( $args ) {
		$args = wp_parse_args(
			$args,
			array(
				'checkbox_label' => '',
			)
		)
		?>
		<label>
			<input type="checkbox" id="<?php echo esc_attr( $this->get_filed_id( $args ) ); ?>" name="<?php echo esc_attr( $this->get_name( $args ) ); ?>" <?php checked( $this->get_value( $args ), 1 ); ?> value="1" /> <?php echo esc_attr($args['checkbox_label']); // WPCS: XSS OK. ?>
		</label>
		<?php
	}

	/**
	 * Field Checkbox
	 *
	 * @param array $args Field settings.
	 */
	private function field_html( $args ) {
		echo tophive_sanitize_filter($args['content']); // WPCS: XSS OK.
	}

	/**
	 * Field Image
	 *
	 * @param array $args Field settings.
	 */
	public function field_image( $args ) {
		$value = $this->get_value( $args );
		$image = wp_parse_args(
			$value,
			array(
				'url' => '',
				'id'  => '',
			)
		);

		$args = wp_parse_args(
			$args,
			array(
				'select_label' => esc_html__( 'Select image', 'metafans' ),
				'remove_label' => esc_html__( 'Remove', 'metafans' ),
			)
		);

		$img = tophive_metafans()->get_media( $image );
		?>
		<span class="tophive-mt-media <?php echo ( tophive_sanitize_filter($img) ) ? 'attachment-added' : 'no-attachment'; ?>">
			<span class="tophive-image-preview">
				<?php
				if ( $img ) {
					echo '<img src="' . esc_url( $img ) . '" alt="img"/>';
				}
				?>
			</span>
			<a class="tophive--add" href="#"><?php echo esc_attr($args['select_label']);// WPCS: XSS OK. ?></a>
			<a class="tophive--remove" href="#"><?php echo esc_attr($args['remove_label']);// WPCS: XSS OK. ?></a>
			<input type="hidden" name="<?php echo esc_attr( $this->get_name( $args ) ); ?>[id]" value="<?php echo esc_attr( $image['id'] ); ?>" class="widefat attachment-id">
			<input type="hidden" name="<?php echo esc_attr( $this->get_name( $args ) ); ?>[url]" value="<?php echo esc_attr( $image['url'] ); ?>" class="widefat attachment-url">
		</span>
		<?php
	}
}
