# Check if the box has never been initialized, if so, provision it
if [ ! -f "vagrant/www/default/dashboard-custom.php" ]; then
   . vagrant-provision.sh

# Else, start the box and grunt for developing
else
   cd vagrant
   vagrant up
   cd ..
   start http://vvv.dev
   grunt start-dev
fi