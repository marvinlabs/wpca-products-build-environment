vagrant-stop.bat
cp -a vagrant-config/* vagrant
cd vagrant
vagrant up --provision
cd ..
vagrant-stop.bat
vagrant-start.bat