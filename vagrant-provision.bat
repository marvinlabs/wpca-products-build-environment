xcopy "vagrant-config" "vagrant" /s /e /y
cd vagrant
vagrant up --provision
cd ..
vagrant-stop.bat
vagrant-start.bat