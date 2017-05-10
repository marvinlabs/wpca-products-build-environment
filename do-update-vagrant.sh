echo "==> script: Update this build environment to last version and update VVV"
git pull && git submodule foreach git pull origin master

echo "==> script: Copy wpca custom config for VVV"
cp -a vagrant-config/* vagrant

echo "==> script: Provision and start the VM"
cd vagrant
vagrant box update
vagrant up --provision
cd ..