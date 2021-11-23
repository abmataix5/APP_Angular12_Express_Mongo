## Práctica Docker Compose y Kubernetes



## Que es Docker Compose?

Docker Compose es una herramienta desarrollada para ayudar a definir y compartir aplicaciones de varios contenedores. Con Compose, puede crear un archivo YAML para definir los servicios y, con un solo comando, ponerlo todo en marcha o eliminarlo.

La gran ventaja de usar Compose es que puede definir la pila de la aplicación en un archivo, mantenerlo en la raíz del repositorio del proyecto (ahora tendrá control de versiones) y permitir que un tercero contribuya al proyecto. Un usuario solo tendría que clonar el repositorio e iniciar la aplicación Compose. De hecho, es posible que vea bastantes proyectos en GitHub/GitLab en los que se hace exactamente esto.


### Creamos el docker-compose que levantara los contenedores del cliente,servidor y mongoDB.

En este docker compose tendremos los siguientes servicios, todos ellos estaran conectados mediante una network:

  - Cliente en angular.
  - Servidor en express.
  - La BBDD con MongoDB.

![Captura de pantalla de 2021-11-23 11-22-12](https://user-images.githubusercontent.com/62066419/143007505-6e4fa466-56f0-42e5-98f5-c99902e889ca.png)




## Prometheus y Grafana

### Que es Prometheus?

Prometheus es un sistema de monitoreo de código abierto basado en métricas. Recopila datos de servicios y hosts mediante el envío de solicitudes HTTP en puntos finales de métricas. Luego, almacena los resultados en una base de datos de series de tiempo y los pone a disposición para análisis y alertas.

### Que es Grafana?

Grafana es una herramienta de interfaz de usuario centralizada en la obtención de datos a partir de consultas, como también del almacenamiento de estos y su visualización. Es completamente de código abierto, y está respaldada por una gran comunidad entusiasta y dedicada.

### Docker Compose para los servicios de Prometheus y Grafana

En este docker compose tendremos los siguientes servicios, todos ellos estaran conectados mediante una network externa,que utilizaremos para conectarlos con,los servicios del otro docker compose:

  - Prometheus.
  - Grafana.
  

![Captura de pantalla de 2021-11-23 11-18-42](https://user-images.githubusercontent.com/62066419/143006977-e097f8c5-8682-40f3-be50-73c3a37d3a20.png)


### Configuración Prometheus y Grafana.

En el directorio Prometheus, en la cual tendremos el archivo prometheus.yml, que tendrá la ruta de acceso de los logs, quedará tal que así:

![Captura de pantalla de 2021-11-23 11-26-40](https://user-images.githubusercontent.com/62066419/143008030-2f963bd3-e1ed-403f-86bc-09abd68032d7.png)

En el directorio Grafana, tendremos el archivo datasources.yml, quedará tal que así:

![Captura de pantalla de 2021-11-23 11-29-45](https://user-images.githubusercontent.com/62066419/143008418-44620056-1f0d-414e-939a-eee63f58f038.png)

Ahora para levantar los dos docker compose utilizaremos el siguiente comando: 

docker-compose -f docker-compose.yml -f docker-compose1.yml up -d

### Comprobamos que funciona Prometheus y Grafana:

![Captura de pantalla de 2021-11-23 11-33-26](https://user-images.githubusercontent.com/62066419/143009059-ee21b2f8-fdd5-4408-9e55-6bb1e99b9ad3.png)

![Captura de pantalla de 2021-11-23 11-33-57](https://user-images.githubusercontent.com/62066419/143009069-d73b85a3-d9ce-407d-98a3-c80b93e6e1da.png)


#### Accedemos a http://0.0.0.0:4000/metrics para comprovar que podemos ver las métricas

![Captura de pantalla de 2021-11-23 11-38-27](https://user-images.githubusercontent.com/62066419/143009562-a174aca1-e3fe-4558-bce2-9d5bb57cfacf.png)



### Cambios necesarios en el codigo

El primer cambio necesario sera instalar prom-client, en el package.json del server: 

![Captura de pantalla de 2021-11-23 11-40-35](https://user-images.githubusercontent.com/62066419/143009899-487ea71c-9062-4537-a1f5-e6416a409db2.png)

En index.js, añadiremos el siguiente codigo,para poder recoger las métricas:

![Captura de pantalla de 2021-11-23 11-41-49](https://user-images.githubusercontent.com/62066419/143010110-cbf58022-70ce-4120-af22-e68667fe4251.png)

Por ultimo añadiremos un contador y lo incrementaremos que haya una request a esa ruta, lo hemos añadido para usuarios y productos:

![Captura de pantalla de 2021-11-23 11-43-52](https://user-images.githubusercontent.com/62066419/143010418-574844ff-dbe9-41ff-b0da-e455a7d6ccec.png)






