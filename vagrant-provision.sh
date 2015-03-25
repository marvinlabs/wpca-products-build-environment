# Update this build environment to last version and update VVV
git pull && git submodule foreach git pull origin master

# Copy wpca custom config for VVV
cp -a vagrant-config/* vagrant

# Provision and start the VM
cd vagrant
vagrant up --provision

# Return to main folder
cd ..