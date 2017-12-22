echo "==> script: Copy wpca custom config for VVV"
cp -a vagrant-config/* vagrant

echo "==> script: Start the VM and load database backups"
cd vagrant
vagrant up
cd ..

echo "==> script: Load WPCA Dashboard"
start http://vvv.test

# echo "==> script: Start grunt dev task"
# grunt start-dev