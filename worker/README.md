#### build image:
docker build -t test-worker .

#### run container:
docker run -d -p 5172:8080 test-worker

#### remove container:
sh rm_worker_container.sh test-worker

#### remove image:
docker image rm -f test-worker

