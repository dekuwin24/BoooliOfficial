<?php

/**
 * Topic Tag Edit Content Part
 *
 * @package bbPress
 * @subpackage Theme
 */

?>

<div id="bbpress-forums">

	<div class="youzify-bbp-topic-head">
		<?php bbp_breadcrumb(); ?>
	</div>

	<?php bbp_topic_tag_description(); ?>

	<?php do_action( 'bbp_template_before_topic_tag_edit' ); ?>

	<?php bbp_get_template_part( 'form', 'topic-tag' ); ?>

	<?php do_action( 'bbp_template_after_topic_tag_edit' ); ?>

</div>
