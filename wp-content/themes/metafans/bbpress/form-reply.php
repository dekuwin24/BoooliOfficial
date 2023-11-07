<?php

/**
 * New/Edit Reply
 *
 * @package bbPress
 * @subpackage Theme
 */

// Exit if accessed directly
defined( 'ABSPATH' ) || exit;

if ( bbp_is_reply_edit() ) : ?>

<div id="bbpress-forums" class="bbpress-wrapper">

	<?php bbp_breadcrumb(); ?>

<?php endif; ?>

<?php if ( bbp_current_user_can_access_create_reply_form() ) : ?>

	<div id="new-reply-<?php bbp_topic_id(); ?>" class="bbp-reply-form">

		<form id="new-post th-bbpress-universal-form" class="th-bbpress-reply-form" name="th-bbp-new-reply" method="">

			<?php do_action( 'bbp_theme_before_reply_form' ); ?>

			<fieldset class="bbp-form">
				<h4><?php esc_html_e( 'Reply', 'metafans' ); ?></h4>
				<?php do_action( 'bbp_theme_before_reply_form_notices' ); ?>

				<?php if ( ! bbp_is_topic_open() && ! bbp_is_reply_edit() ) : ?>

					<div class="bbp-template-notice">
						<ul>
							<li><?php esc_html_e( 'This topic is marked as closed to new replies, however your posting capabilities still allow you to reply.', 'metafans' ); ?></li>
						</ul>
					</div>

				<?php endif; ?>

				<?php if ( ! bbp_is_reply_edit() && bbp_is_forum_closed() ) : ?>

					<div class="bbp-template-notice">
						<ul>
							<li><?php esc_html_e( 'This forum is closed to new content, however your posting capabilities still allow you to post.', 'metafans' ); ?></li>
						</ul>
					</div>

				<?php endif; ?>

				<?php if ( current_user_can( 'unfiltered_html' ) ) : ?>

					<div class="bbp-template-notice">
						<ul>
							<li><?php esc_html_e( 'Your account has the ability to post unrestricted HTML content.', 'metafans' ); ?></li>
						</ul>
					</div>

				<?php endif; ?>

				<?php do_action( 'bbp_template_notices' ); ?>

				<div>

					<?php bbp_get_template_part( 'form', 'anonymous' ); ?>

					<?php do_action( 'bbp_theme_before_reply_form_content' ); ?>

					<div id="th_bbp_reply"></div>

					<?php do_action( 'bbp_theme_after_reply_form_content' ); ?>

					<?php if ( ! ( bbp_use_wp_editor() || current_user_can( 'unfiltered_html' ) ) ) : ?>

						<p class="form-allowed-tags">
							<label><?php esc_html_e( 'You may use these <abbr title="HyperText Markup Language">HTML</abbr> tags and attributes:','metafans' ); ?></label><br />
							<code><?php bbp_allowed_tags(); ?></code>
						</p>

					<?php endif; ?>

					<?php if ( bbp_is_reply_edit() ) : ?>

						<?php if ( current_user_can( 'moderate', bbp_get_reply_id() ) ) : ?>

							<?php do_action( 'bbp_theme_before_reply_form_reply_to' ); ?>

							<p class="form-reply-to">
								<label for="bbp_reply_to"><?php esc_html_e( 'Reply To:', 'metafans' ); ?></label><br />
								<?php bbp_reply_to_dropdown(); ?>
							</p>

							<?php do_action( 'bbp_theme_after_reply_form_reply_to' ); ?>

							<?php do_action( 'bbp_theme_before_reply_form_status' ); ?>

							<p>
								<label for="bbp_reply_status"><?php esc_html_e( 'Reply Status:', 'metafans' ); ?></label><br />
								<?php bbp_form_reply_status_dropdown(); ?>
							</p>

							<?php do_action( 'bbp_theme_after_reply_form_status' ); ?>

						<?php endif; ?>

						<?php if ( bbp_allow_revisions() ) : ?>

							<?php do_action( 'bbp_theme_before_reply_form_revisions' ); ?>

							<fieldset class="bbp-form">
								<legend>
									<input name="bbp_log_reply_edit" id="bbp_log_reply_edit" type="checkbox" value="1" <?php bbp_form_reply_log_edit(); ?> />
									<label for="bbp_log_reply_edit"><?php esc_html_e( 'Keep a log of this edit:', 'metafans' ); ?></label><br />
								</legend>

								<div>
									<label for="bbp_reply_edit_reason"><?php printf( esc_html__( 'Optional reason for editing:', 'metafans' ), bbp_get_current_user_name() ); ?></label><br />
									<input type="text" value="<?php bbp_form_reply_edit_reason(); ?>" size="40" name="bbp_reply_edit_reason" id="bbp_reply_edit_reason" />
								</div>
							</fieldset>

							<?php do_action( 'bbp_theme_after_reply_form_revisions' ); ?>

						<?php endif; ?>

					<?php endif; ?>

					<?php do_action( 'bbp_theme_before_reply_form_submit_wrapper' ); ?>

					<div class="bbp-submit-wrapper">

						<?php do_action( 'bbp_theme_before_reply_form_submit_button' ); ?>

						<?php bbp_cancel_reply_to_link(); ?>

						<button type="button" id="th_bbp_reply_submit" name="th_bbp_reply_submit" class="button submit"><?php esc_html_e( 'Submit', 'metafans' ); ?></button>

						<?php do_action( 'bbp_theme_after_reply_form_submit_button' ); ?>

					</div>

					<?php do_action( 'bbp_theme_after_reply_form_submit_wrapper' ); ?>
				</div>

				<?php bbp_reply_form_fields(); ?>
				<div class="th_bpp_reply_messages"></div>
			</fieldset>

			<?php do_action( 'bbp_theme_after_reply_form' ); ?>

		</form>
	</div>

<?php elseif ( bbp_is_topic_closed() ) : ?>

	<div id="no-reply-<?php bbp_topic_id(); ?>" class="bbp-no-reply">
		<div class="bbp-template-notice">
			<ul>
				<li><?php printf( esc_html__( 'The topic &#8216;%s&#8217; is closed to new replies.', 'metafans' ), bbp_get_topic_title() ); ?></li>
			</ul>
		</div>
	</div>

<?php elseif ( bbp_is_forum_closed( bbp_get_topic_forum_id() ) ) : ?>

	<div id="no-reply-<?php bbp_topic_id(); ?>" class="bbp-no-reply">
		<div class="bbp-template-notice">
			<ul>
				<li><?php printf( esc_html__( 'The forum &#8216;%s&#8217; is closed to new topics and replies.', 'metafans' ), bbp_get_forum_title( bbp_get_topic_forum_id() ) ); ?></li>
			</ul>
		</div>
	</div>

<?php else : ?>

	<div id="no-reply-<?php bbp_topic_id(); ?>" class="bbp-no-reply">
		<div class="bbp-template-notice">
			<ul>
				<li><?php is_user_logged_in()
					? esc_html_e( 'You cannot reply to this topic.',               'metafans' )
					: esc_html_e( 'You must be logged in to reply to this topic.', 'metafans' );
				?></li>
			</ul>
		</div>

		<?php if ( ! is_user_logged_in() ) : ?>

			<?php bbp_get_template_part( 'form', 'user-login' ); ?>

		<?php endif; ?>

	</div>

<?php endif; ?>

<?php if ( bbp_is_reply_edit() ) : ?>

</div>

<?php endif;