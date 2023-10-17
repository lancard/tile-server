mkdir flight-database-sql
mkdir tile-server-postgre-database
mkdir tiles-default
chmod 777 tiles-default
rm -rf style/mapnik.xml

wget https://github.com/lancard/korea-flight-database/releases/latest/download/data.sql -O flight-database-sql/data.sql

# init db
docker run \
 --rm \
 -v $PWD/tile-server-postgre-database:/data/database/ \
 -e DOWNLOAD_PBF=https://github.com/lancard/filtered-south-korea-osm/raw/master/filtered.osm.pbf \
 -e DOWNLOAD_POLY=https://download.geofabrik.de/asia/south-korea.poly \
 overv/openstreetmap-tile-server \
 import

# import sql
docker run \
 --rm \
 -v $PWD/tile-server-postgre-database:/data/database/ \
 -v $PWD/flight-database-sql/data.sql:/data.sql \
 -v $PWD/upload_flight_sql.sh:/run.sh \
 overv/openstreetmap-tile-server

# run container
docker run \
 -p 8080:80 -p 5432:5432 \
 -v $PWD/tile-server-postgre-database:/data/database/ \
 -v $PWD/tiles-default:/data/tiles/default \
 -v $PWD/style:/data/style \
 -e NAME_MML=fans.mml \
 overv/openstreetmap-tile-server \
 run
