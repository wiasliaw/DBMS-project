docker run -it --name testdb \
  -p 8001:5432 \
  -e POSTGRESQL_USERNAME=postgres \
  -e POSTGRESQL_PASSWORD=cfgcmapy \
  -e POSTGRESQL_DATABASE=project \
  -v `pwd`/init.sql:/docker-entrypoint-initdb.d/init.sql \
  bitnami/postgresql
  