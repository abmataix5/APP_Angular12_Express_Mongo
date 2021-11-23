## Práctica Docker Compose y Kubernetes



## Que es Docker Compose?

Docker Compose es una herramienta desarrollada para ayudar a definir y compartir aplicaciones de varios contenedores. Con Compose, puede crear un archivo YAML para definir los servicios y, con un solo comando, ponerlo todo en marcha o eliminarlo.

La gran ventaja de usar Compose es que puede definir la pila de la aplicación en un archivo, mantenerlo en la raíz del repositorio del proyecto (ahora tendrá control de versiones) y permitir que un tercero contribuya al proyecto. Un usuario solo tendría que clonar el repositorio e iniciar la aplicación Compose. De hecho, es posible que vea bastantes proyectos en GitHub/GitLab en los que se hace exactamente esto.


### Creamos el docker-compose que levantara los contenedores del cliente,servidor y mongoDB.

En este docker compose tendremos los siguientes servicios, todos ellos estaran conectados mediante una network:

  - Cliente en angular.
  - Servidor en express.
  - La BBDD con MongoDB.


![Captura de pantalla de 2021-11-23 00-30-14](https://user-images.githubusercontent.com/62066419/142950282-04c203be-2e30-4a81-8f72-701c3fef05be.png)


### Prometheus y Grafana

## Que es Prometheus?

Prometheus es un sistema de monitoreo de código abierto basado en métricas. Recopila datos de servicios y hosts mediante el envío de solicitudes HTTP en puntos finales de métricas. Luego, almacena los resultados en una base de datos de series de tiempo y los pone a disposición para análisis y alertas.

## Que es Grafana?

Grafana es una herramienta de interfaz de usuario centralizada en la obtención de datos a partir de consultas, como también del almacenamiento de estos y su visualización. Es completamente de código abierto, y está respaldada por una gran comunidad entusiasta y dedicada.


