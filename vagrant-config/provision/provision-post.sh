#!/bin/bash

path="/srv/www/wordpress-default/wp-content"

# Check if plugins symlink exists
cd $path
if [ -d "plugins" ]; then
  rm -R "plugins"
fi
if [ ! -d "plugins" ] && [ ! -f "plugins" ] && [ ! -h "plugins" ]; then
  ln -sf "/srv/wpca-plugins" "plugins"
fi

# Check if themes symlink exists
cd $path
if [ -d "themes" ]; then
  rm -R "themes"
fi
if [ ! -d "themes" ] && [ ! -f "themes" ] && [ ! -h "themes" ]; then
  ln -sf "/srv/wpca-themes" "themes"
fi
