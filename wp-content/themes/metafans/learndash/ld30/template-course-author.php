<div class="lms-header-instructor">
	<?php
	if ( class_exists( 'BuddyPress' ) ) {

		// if ( buddyboss_theme_get_option( 'learndash_course_author' ) || buddyboss_theme_get_option( 'learndash_course_date' ) ) {
			$bb_single_meta_pfx = 'bb_single_meta_pfx';
		// } else {
		// 	$bb_single_meta_pfx = 'bb_single_meta_off';
		// }
		?>

        <div class="mf-about-instructor <?php echo $bb_single_meta_pfx; ?>">
            <div class="ec-d-flex">
				<?php
				// if ( buddyboss_theme_get_option( 'learndash_course_author' ) ) { ?>
                    <div class="mf-avatar-wrap">
						<?php
						$user_id = get_the_author_meta( 'ID' );
						$avatar  = get_avatar_url( get_the_author_meta( 'email', $user_id ), array( 'size' => 60 ) );
						if ( ! empty( $avatar ) ) :
                            if ( class_exists( 'BuddyPress' ) ) {
                            ?>
                            <a href="<?php echo bp_core_get_user_domain( $user_id ); ?>">
                            <?php
                            } else {
                            ?>
                                <a href="<?php echo get_author_posts_url( $user_id, get_the_author_meta( 'user_nicename', $user_id ) ); ?>">
                                <?php
                            } ?>
                                <img class="round avatar" src="<?php echo $avatar; ?>"/>
                            </a>
							<?php
                        endif;
                        ?>
                    </div>
					<?php
				// } 
                ?>
                <div class="mf-content-wrap">
                    <h5>
						<?php
						// if ( buddyboss_theme_get_option( 'learndash_course_author' ) ) {
                            if ( class_exists( 'BuddyPress' ) ) {
                            ?>
                            <a href="<?php echo bp_core_get_user_domain( $user_id ); ?>">
                                <?php
                                } else {
                                    ?>
                                    <a href="<?php echo get_author_posts_url( $user_id, get_the_author_meta( 'user_nicename', $user_id ) ); ?>">
                                    <?php
                                } ?>
                                    <?php echo get_the_author_meta( 'display_name', $user_id ); ?>
                                </a>
                                <?php
                        // }
                        // if ( buddyboss_theme_get_option( 'learndash_course_date' ) ) {
                            ?>
                            <span class="mf-about-instructor-date"><?php the_date(); ?></span>
                            <?php
                        // } 
                        ?>
                    </h5>
                </div>
            </div>
        </div>
		<?php
	}
	?>
</div>