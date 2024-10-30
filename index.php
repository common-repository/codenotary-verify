<?php
/**
* Plugin Name: CodeNotary Verify
* Plugin URI: https://verify.codenotary.io/
* Description: Download Integrity Checker Plugin
* Version: 1.1
* Requires at least: 5.0
* Tested up to: 5.2
* Requires PHP: 5.6
* Author: vChain inc.
* Author URI: https://www.codenotary.io/
**/

function cn_editor() {
	wp_enqueue_script( 'cn-editor-script',
			plugins_url( 'editor.js', __FILE__ ),
			array( 'wp-blocks' ), 
			time()
	);
}

function cn_script() {
	wp_enqueue_script('cn-script', 'https://verify.codenotary.io/plugins/wp/cnv.1.0.js','1.0',true);
	wp_enqueue_style('cn-style', 'https://verify.codenotary.io/plugins/wp/cnv.1.0.css','1.0',true);
}

add_action('enqueue_block_editor_assets', 'cn_editor' );
add_action('wp_enqueue_scripts','cn_script');

function cn_custom_icons(){
	echo "<style>
	i.mce-i-check-circle:before { 
    content: '\f058';         
    font-family: FontAwesome;
}</style>";
}

class mcewrapper {
	var $pluginname = 'cnWRAP';
	var $internalVersion = 600;

	function mcewrapper()  {
		add_filter('tiny_mce_version', array (&$this, 'change_tinymce_version') );
		add_action('init', array (&$this, 'addbuttons') );
	}

	function addbuttons() {
		if ( !current_user_can('edit_posts') && !current_user_can('edit_pages') )
			return;
		if ( get_user_option('rich_editing') == 'true') {
			add_filter("mce_external_plugins", array (&$this, 'add_tinymce_plugin' ));
			add_filter('mce_buttons', array (&$this, 'register_button' ), 0);
		}
	}

	function register_button($buttons) {
		array_push($buttons, 'separator', $this->pluginname );
		return $buttons;
	}

	function add_tinymce_plugin($plugin_array) {
		$plugin_array[$this->pluginname] =  plugins_url( 'editor_tinymce.js?v=26', __FILE__ );
		return $plugin_array;
	}

	function change_tinymce_version($version) {
		$version = $version + $this->internalVersion;
		return $version;
	}
}

function cn_tinymce() {
	if (is_admin()){
		new mcewrapper();
	}
}

add_action( 'init', 'cn_tinymce', 9);
add_action('admin_head', 'cn_custom_icons');


