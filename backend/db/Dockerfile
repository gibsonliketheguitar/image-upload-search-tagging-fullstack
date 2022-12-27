#TODO not sure if I need this
FROM postgres
USER postgres
RUN whoami

COPY initDB.sql /docker-entrypoint-initdb.d/initDB.sql