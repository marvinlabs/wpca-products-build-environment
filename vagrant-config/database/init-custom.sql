# Any SQL files included in the database/backups directory will be
# imported as Vagrant boots up. To best manage expectations, these
# databases should be created in advance with proper user permissions
# so that any code bases configured to work with them will start
# without trouble.
#
# Create a copy of this file as "init-custom.sql" in the database directory
# and add any additional SQL commands that should run on startup. Most likely
# these will be similar to the following - with CREATE DATABASE and GRANT ALL,
# but it can be any command.
#
CREATE DATABASE IF NOT EXISTS `wordpresslocal`;
GRANT ALL PRIVILEGES ON `wordpresslocal`.* TO 'wp'@'localhost' IDENTIFIED BY 'wp';
