export const esServerContainerCreationScript =
  'docker container run \\\n' +
  '  --rm \\\n' +
  '  --name es01 \\\n' +
  '  -e xpack.security.enabled=false \\\n' +
  '  -e http.cors.enabled=true \\\n' +
  '  -e http.cors.allow-origin="http://localhost:9100" \\\n' +
  '  -e http.cors.allow-origin="http://localhost:4200" \\\n' +
  '  -e http.cors.allow-headers="Authorization, X-Requested-With,X-Auth-Token,Content-Type, Content-Length" \\\n' +
  '  -e discovery.type=single-node \\\n' +
  '  -p 9200:9200 \\\n' +
  '  -it \\\n' +
  '  -m 1GB \\\n' +
  '  docker.elastic.co/elasticsearch/elasticsearch:8.15.2';
