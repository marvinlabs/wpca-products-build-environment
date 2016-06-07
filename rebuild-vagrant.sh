echo "==> script: Backup databases, destroy and recreate the whole VM and reimport databases"
cd vagrant
vagrant destroy
cd ..
. up-vagrant.sh