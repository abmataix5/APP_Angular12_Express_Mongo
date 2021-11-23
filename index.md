## Práctica Docker Compose y Kubernetes



## Que es Docker Compose?

Docker Compose es una herramienta desarrollada para ayudar a definir y compartir aplicaciones de varios contenedores. Con Compose, puede crear un archivo YAML para definir los servicios y, con un solo comando, ponerlo todo en marcha o eliminarlo.

La gran ventaja de usar Compose es que puede definir la pila de la aplicación en un archivo, mantenerlo en la raíz del repositorio del proyecto (ahora tendrá control de versiones) y permitir que un tercero contribuya al proyecto. Un usuario solo tendría que clonar el repositorio e iniciar la aplicación Compose. De hecho, es posible que vea bastantes proyectos en GitHub/GitLab en los que se hace exactamente esto.


### Creamos el docker-compose que levantara los contenedores del cliente,servidor y mongoDB.

En este docker compose tendremos los siguientes servicios, todos ellos estaran conectados mediante una network:

  - Cliente en angular.
  - Servidor en express.
  - La BBDD con MongoDB.

![Captura de pantalla de 2021-11-23 13-59-17](https://user-images.githubusercontent.com/62303274/143028432-f899c0eb-70a2-42cf-8d13-f122f20b2158.png)

### Configurar variables de acceso

Se ha configurado un archivo .env en el que se guardan los puertos de acceso de cada uno de los contenedores, así como las variables de entorno necesarias.

![Captura de pantalla de 2021-11-23 14-02-17](https://user-images.githubusercontent.com/62303274/143028823-b70578d0-e746-4ab7-bf05-6c42606ded40.png)

### Carga de datos Mongo
Para generar una copia de la base de datos recurrimos al uso de MONGODUMP, por lo que:

![Captura de pantalla de 2021-11-23 14-05-43](https://user-images.githubusercontent.com/62303274/143029422-9b92c110-d4d2-41e9-a7dd-b7c9792d1500.png)

Este proceso nos genera una carpeta con el contenido de la base de datos seleccionada.

![Captura de pantalla de 2021-11-23 14-07-15](https://user-images.githubusercontent.com/62303274/143029602-1b48ffea-0064-4fea-bad2-48f7e530010f.png)

Desde el docker-compose.yml le decimos que nos copie este directorio, en un directorio del contenedor.

```
RUTA --> ./dump/:/docker-entrypoint-initdb.d/dump/
```

![Captura de pantalla de 2021-11-23 14-09-52](https://user-images.githubusercontent.com/62303274/143029877-0e576c80-565c-4fea-8060-86a7d8b7cf0b.png)

Para que ejecute la acción de cargar los datos, creamos un script que nos realiza dicha acción. En este caso mongorestore.sh

![Captura de pantalla de 2021-11-23 14-11-48](https://user-images.githubusercontent.com/62303274/143030211-4be37070-a4c3-49fb-8e84-870c804771cd.png)

Como en el caso del directorio "dump", tenemos que decirle que copie el script dentro del mismo directorio.

```
RUTA --> ./mongorestore.sh:/docker-entrypoint-initdb.d/mongorestore.sh
```
Se elige este directorio ya que una vez arrancado el contenedor, se procesan todos los archivos contenidos dentro del directorio /docker-entrypoint-initdb.d
que sean del tipo ".sh o .js" por esto ejecutará el script sin tener que hacerlo posteriormente.

### Levantar los contenedores

Utilizamos el comando:

```
 $sudo docker-compose up
```

![Captura de pantalla de 2021-11-23 14-25-25](https://user-images.githubusercontent.com/62303274/143032210-93766557-3c28-47fe-8301-377c0f088e2d.png)

### Comprovar estado

Para comprovar el estado de los contenedores:
```
$sudo docker-compose ps
```

![Captura de pantalla de 2021-11-23 14-26-31](https://user-images.githubusercontent.com/62303274/143032413-4cbe260d-94d2-4517-b4dd-9f3a73f231bb.png)

Abrimos un navagador en el 4200 para ver que la app esta operativa.

![Captura de pantalla de 2021-11-23 14-28-24](https://user-images.githubusercontent.com/62303274/143032625-704749ab-33b2-4b5a-aa07-aaa6db4e9beb.png)


![Captura de pantalla de 2021-11-23 14-29-07](https://user-images.githubusercontent.com/62303274/143032716-58d9b56e-02f2-43b1-a5cc-f97f5f55333d.png)


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






