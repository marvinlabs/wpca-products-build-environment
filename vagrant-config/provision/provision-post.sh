#!/bin/bash

for i in "/srv/www/wordpress-default/wp-content" "/srv/www/wordpress-develop/src/wp-content" "/srv/www/wordpress-trunk/wp-content"; do

    # Check if plugins symlink exists
    cd $i
    if [ -d "plugins" ]; then
      rm -R "plugins"
    fi
    if [ ! -d "plugins" ] && [ ! -f "plugins" ] && [ ! -h "plugins" ]; then
      ln -sf "/srv/wpca-plugins" "plugins"
    fi

    # Check if themes symlink exists
    if [ ! -h "themes" ]; then
        cd $i
        if [ -d "themes" ]; then
            for D in `find themes -mindepth 1 -maxdepth 1 -type d`
            do
                if [ ! -d "/srv/wpca-"$D ]; then
                    mv $D "/srv/wpca-"$D
                fi
            done
            rm -R themes
        fi
        if [ ! -d "themes" ] && [ ! -f "themes" ]; then
          ln -sf "/srv/wpca-themes" "themes"
        fi
    fi
done
