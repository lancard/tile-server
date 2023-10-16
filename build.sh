mkdir tile-server-postgre-database

docker run \
 --rm \
 -v $PWD/tile-server-postgre-database:/data/database/ \
 -e DOWNLOAD_PBF=https://github.com/lancard/filtered-south-korea-osm/raw/master/filtered.osm.pbf \
 -e DOWNLOAD_POLY=https://download.geofabrik.de/asia/south-korea.poly \
 overv/openstreetmap-tile-server \
 import

wget https://github.com/lancard/korea-flight-database/releases/latest/download/data.sql -O data.sql

docker run \
 --rm \
 -v $PWD/tile-server-postgre-database:/data/database/ \
 -v $PWD/data.sql:/data.sql \
 -v $PWD/run_in_container.sh:/run.sh \
 overv/openstreetmap-tile-server
