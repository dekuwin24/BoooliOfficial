<?php
global $post;

if ( 'sfwd-courses' != $post->post_type ) {
	return;
}
$course = $post;
?>
	<?php $is_author_info = 'mf-about-instructor--is-info'; ?>
	<div class="mf-about-instructor <?php echo $is_author_info; ?>">
		<h4><?php _e( 'About Instructor', 'metafans' ); ?></h4>
		<div class="mf-grid">
            <div class="mf-instructor-wrap ec-d-flex">
                <div class="mf-avatar-wrap">
    				<div>
    					<?php $avatar = get_avatar_url( get_the_author_meta( 'email', $course->post_author ), array( 'size' => 50 ) ); ?>
    					<?php if( ! empty( $avatar ) ) : ?>
                            <?php if ( class_exists( 'BuddyPress' ) ) { ?>
            				<a href="<?php echo bp_core_get_user_domain( get_the_author_meta( 'ID', $post->post_author ) ); ?>">
                			<?php } else { ?>
                			     <a href="<?php echo get_author_posts_url( get_the_author_meta( 'ID', $post->post_author ), get_the_author_meta( 'user_nicename', $post->post_author ) ); ?>">
                			<?php } ?>
    						<img class="round avatar" src="<?php echo $avatar; ?>" />
                            </a>
    					<?php endif; ?>
    				</div>
    			</div>
    			<div class="mf-content-wrap">
    				<h5>
                        <?php if ( class_exists( 'BuddyPress' ) ) { ?>
        				<a href="<?php echo bp_core_get_user_domain( get_the_author_meta( 'ID', $post->post_author ) ); ?>">
            			<?php } else { ?>
            			     <a href="<?php echo get_author_posts_url( get_the_author_meta( 'ID', $post->post_author ), get_the_author_meta( 'user_nicename', $post->post_author ) ); ?>">
            			<?php } ?>
                            <?php echo get_the_author_meta( 'display_name', $course->post_author ); ?>
                        </a>
                    </h5>
						<p class="mf-author-info"><?php echo get_the_author_meta( 'description', $course->post_author ); ?></p>
    				<p class="mf-author-meta"><?php echo count_user_posts( get_the_author_meta( 'ID', $post->post_author ), 'sfwd-courses' ); ?> <?php echo count_user_posts( get_the_author_meta( 'ID', $post->post_author ), 'sfwd-courses' ) > 1 ? LearnDash_Custom_Label::get_label( 'courses' ) : LearnDash_Custom_Label::get_label( 'course' ); ?></p>
    			</div>
            </div>
            <div class="mf-instructor-message">
                <?php
                if ( ( ( bp_is_active( 'messages' ) && function_exists('bp_force_friendship_to_message') && ! bp_force_friendship_to_message() ) ||
                           ( function_exists('bp_force_friendship_to_message') && bp_force_friendship_to_message() && bp_is_active( 'friends' ) && friends_check_friendship( bp_loggedin_user_id(), $course->post_author ) ) ) && is_user_logged_in() && ( get_current_user_id() != get_the_author_meta( 'ID', $course->post_author ) ) ) { ?>
					<a href="<?php echo apply_filters( 'bp_get_send_private_message_link', wp_nonce_url( bp_loggedin_user_domain() . bp_get_messages_slug() . '/compose/?r=' . bp_core_get_username( $course->post_author ) ) ); ?>" class="button small push-bottom"><i class="mf-icons mf-icon-chat"></i><?php _e( 'Message', 'metafans' ); ?></a>
				<?php } ?>
            </div>
		</div>
	</div>