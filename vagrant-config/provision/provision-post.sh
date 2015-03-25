#!/bin/bash
paths=( "/srv/www/wordpress-default/wp-content" "/srv/www/wordpress-develop/src/wp-content" "/srv/www/wordpress-trunk/wp-content" )

for i in "${paths[@]}"; do
	# Check if plugins symlink exists
    cd $i
    if [ -d "plugins" ]; then
      rm -R "plugins"
    fi
    if [ ! -d "plugins" ] && [ ! -f "plugins" ] && [ ! -h "plugins" ]; then
      ln -sf "/vagrant/wpca-plugins" "plugins"
    fi

    # Check if themes symlink exists
    cd $i
    if [ -d "themes" ]; then
      rm -R "themes"
    fi
    if [ ! -d "themes" ] && [ ! -f "themes" ] && [ ! -h "themes" ]; then
      ln -sf "/vagrant/wpca-themes" "themes"
    fi
done
