rm -rf /data/tiles/default/*
carto fans.mml > mapnik.xml
sudo -u renderer renderd -f -c /etc/renderd.conf
