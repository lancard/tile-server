# build
- apt install npm git
- run ubuntu in not docker env (allocate enough resource cpu, memory, storage)
- ssh-keygen -t rsa
- add deploy keys in github (write mode)
- git clone git@github.com:lancard/tile-server.git
- run 1_build_and_run.sh (after docker runs, check http://(ip):8080 for check
- run 2_build_tiles_after_run.sh
- git push to github
