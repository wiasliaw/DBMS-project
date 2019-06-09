docker run -dt --name testdb \
  -p 5432:5432 \
  -e POSTGRESQL_USERNAME=postgres \
  -e POSTGRESQL_PASSWORD=cfgcmapy \
  -e POSTGRESQL_DATABASE=project \
  -v `pwd`/db/init.sql:/docker-entrypoint-initdb.d/init.sql \
  bitnami/postgresql
