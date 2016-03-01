#!/bin/bash

# Script that create required
# symlinks to work with
# WPCA environment

for i in "/srv/www/wordpress-default/wp-content" "/srv/www/wordpress-develop/src/wp-content" "/srv/www/wordpress-trunk/wp-content"; do

    cd ${i}

    for type in "plugins" "themes"; do

        if [ ! -h ${type} ]; then
            if [ -d ${type} ]; then
                for D in `find ${type} -mindepth 1 -maxdepth 1 -type d`
                do
                    if [ ! -d "/srv/wpca-"${D} ]; then
                        mv ${D} "/srv/wpca-"${D}
                    fi
                done
                rm -R ${type}
            fi
            if [ ! -d ${type} ] && [ ! -f ${type} ]; then
              ln -sf "/srv/wpca-"${type} ${type}
            fi

            ln -sf "/srv/wpca-"${type} "../wp-"${type}
        fi

    done

done

for i in "/srv/www/wordpress-default" "/srv/www/wordpress-develop/src" "/srv/www/wordpress-trunk"; do

    cd ${i}

    for type in "vendor"; do

        if [ ! -h ${type} ]; then
            if [ -d ${type} ]; then
                for D in `find ${type} -mindepth 1 -maxdepth 1 -type d`
                do
                    if [ ! -d "/srv/wpca-"${D} ]; then
                        mv ${D} "/srv/wpca-"${D}
                    fi
                done
                rm -R ${type}
            fi
            if [ ! -d ${type} ] && [ ! -f ${type} ]; then
              ln -sf "/srv/wpca-"${type} ${type}
            fi
        fi

    done

done
