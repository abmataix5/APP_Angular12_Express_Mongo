## Práctica Docker Compose y Kubernetes



## Que es Docker Compose?

Docker Compose es una herramienta desarrollada para ayudar a definir y compartir aplicaciones de varios contenedores. Con Compose, puede crear un archivo YAML para definir los servicios y, con un solo comando, ponerlo todo en marcha o eliminarlo.

La gran ventaja de usar Compose es que puede definir la pila de la aplicación en un archivo, mantenerlo en la raíz del repositorio del proyecto (ahora tendrá control de versiones) y permitir que un tercero contribuya al proyecto. Un usuario solo tendría que clonar el repositorio e iniciar la aplicación Compose. De hecho, es posible que vea bastantes proyectos en GitHub/GitLab en los que se hace exactamente esto.


### Creamos el docker-compose que levantara los contenedores del cliente,servidor y mongoDB

version: "3"

services:

  angular:
    container_name: cliente-twohand
    build: ./cliente
    ports:
      - 4200:4200
    networks:
      - twohand

  rest:
    container_name: server-twohand
    build: ./servidor
    depends_on:
      - mongo
    ports:
      - 4000:4000
    environment:
      - DB_MONGO=mongodb://mongo:27017/appDB 
      - SECRET=ola123
    networks:
      - twohand

  mongo:
    container_name: twohand-mongo
    image: mongo
    ports:
      - 27017:27017
    networks:
      - twohand

networks:
  twohand:
    driver: bridge

### Prometheus y Grafana


