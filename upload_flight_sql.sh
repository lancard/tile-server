#!/bin/bash

service postgresql start

sudo -u renderer psql -d gis -f /data.sql

service postgresql stop
