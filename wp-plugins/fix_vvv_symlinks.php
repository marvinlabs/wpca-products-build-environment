<?php

/*
Plugin Name: Fix VVV
Description:
Version: 1.0.0
 */
add_filter( 'script_loader_src', 'fix_vvv_symlinks' );
add_filter( 'style_loader_src', 'fix_vvv_symlinks' );
add_filter( 'plugins_url', 'fix_vvv_symlinks');
function fix_vvv_symlinks($url)
{
    $out = str_replace('srv/wpca-plugins', 'wp-content/plugins', $url);
    $out = str_replace('srv/wpca-themes', 'wp-content/themes', $out);
    return $out;
}