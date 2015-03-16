if[ ! -f "vagrant/www/default/dashboard-custom.php" ]; then
   vagrant-provision.bat
else
   cd vagrant
   vagrant up
   cd ..
   start http://wpca.dev
   grunt start-dev
fi