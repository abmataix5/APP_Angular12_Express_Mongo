# PRACTICA ENTREGABLE DOCKER 
```
Desarrollado por:

- Abel Mataix
- Hugo Micó

```
<hr>

<p> 

- El proyecto está basado en una aplicación web desarrollada en la asignatura de Servidor, con las tecnologias NodeJs-Express-Angular. <br>

- El objetivo de esta práctica es obtener una dockerización del proyecto, mediante el uso de 3 contenedores docker conectados 
entre si, a través de una network. <br>
- Cada contenedor tiene su propio dockerfile, en el que se configura la imagen del docker-container.  <br>
- Para tener el proceso automatizado, se crea un script, el cual es el encargado se generar los containers a partir de las imagenes 
generadas en los dockerfiles. <br>

<em>Partiendo del proyecto base, etiquetamos el proyecto con la version V1:</em></p>

## CREACION ETIQUETA ANOTADA
```
Utilizamos el siguiente comando:

$ git tag -a v1.0 -m 'Versión inicial de la aplicación'
```
<br>
<em> - Para no afectar al desarrollo del proyecto principal, creamos una rama, a la que denominaremos "main_dockerfile".</em>

## CREACIÓN NUEVA RAMA
```
$ git branch main_dockerfile

$ git checkout main_dockerfile
```
<br>


## CREAMOS UNA NETWORK PARA CONECTAR LOS 3 CONTENEDORES
```
$ docker network create --driver bridge APP

APP --> es el nombre que le aplicamos a la network.
```
<hr>
<br>
<em>Descargaremos el proyecto mediante descarga o un git clone.
Lo primero es crear una archivo dentro de la carpera "servidor" denominado --> variables.env
Incluiremos el contenido:</em>

<strong> DB_MONGO= 'mongodb://cont_mongo:27017/appDB' </strong>

<br>
<hr>

## DOCKER-CONTAINER MONGO
<p>
DOCKERFILE:<br>

Para seguir el orden en el que se van a levantar los contenedores, comenzamos preparando la imagen de mongo.<br>

    - Partiendo de una imagen oficial de mongo.
    - Establecemos un directorio de trabajo.
    - Copiamos los archivos del directorio. En este caso incluira el .json de la base de datos.
    - Exponemos el puerto 27017

Para obtener la colleccion de la base de datos, se ha seguido un pequeño tutorial:

https://www.digitalocean.com/community/tutorials/how-to-import-and-export-a-mongodb-database-on-ubuntu-20-04-es
```
$sudo mongoexport --db newdb -c restaurants --out newdbexport.json

newdb -> nombre de la db
restaurants -> nombre colleccion
newdbexport.json -> nombre que tendra el archivo .json
```

DOCKER BUILD:
```
$sudo docker build -t img_mongo .

img_mongo--> es el nombre que le damos a la imagen.
Atento con el signo "." al final del build
Para ejecutar el build, hay que estar situado en el mismo directorio que el dockerfile que vamos a utilizar.
```
DOCKER RUN:
```
$sudo docker run -d -p 27017:27017 --network APP --name cont_mongo img_mongo
Tener en cuenta que al realizar el docker Run, hay que añadir la network.
Importante el parametro -d, para que la automatización funcione.
```
Para cargar datos a la base de datos:
```
$sudo docker exec -i cont_mongo sh -c 'mongoimport -c productos -d appDB --drop' < productosDB.json
```
</p>

### DOCKERFILE MONGODB
![Alt text](imagenes/dockerfile_mongo.png?raw=true "Title")
<hr>

## DOCKER-CONTAINER NODE-EXPRESS

DOCKERFILE:
```
- Partimos de una imagen de node oficial.
- Definimos directorio de trabajo.
- Copiamos los archivos del directorio actual, al directorio de trabajo del container.
- Exponemos el puerto 4000 que es el puerto sobre el que trabajamos.
- CMD : una vez creada la imagen, y levantado el contenedor, se ejecutará la instrucción en el CMD. En esta caso equivalente a $npm start. Que arrancará el servidor.
```
DOCKER BUILD:
```
$sudo docker build -t img_server .
Atento con el signo "." al final del build
Para ejecutar el build, hay que estar situado en el mismo directorio que el dockerfile que vamos a utilizar.
```
DOCKER RUN:
```
$sudo docker run -d -p 4000:4000 --network APP --name cont_server img_server

Declaramos los puertos 4000, tanto del host como del container.
Tener en cuenta que al realizar el docker Run, hay que añadir la network.
Importante el parametro -d, para que la automatización funcione.
```
### DOCKERFILE SERVIDOR
![Alt text](imagenes/dockerfile_server.png?raw=true "Title")

<hr>

## DOCKER-CONTAINER ANGULAR
DOCKERFILE:
```
- Partimos de una imagen de node oficial en este caso una 16-alpine13.12, tener en cuenta si se utiliza otra image, que las que tienen numero impar, no tienen mantenimiento LTS por lo que no son aptas para desarrollo. (Nos da error y no nos deja dockerizar).
- Definimos directorio de trabajo.
- Copiamos los archivos del directorio actual, al directorio de trabajo del container.
- Instalamos una version actulizada de npm, puesto que nos dará error si no lo hacemos.
- Actualizamos npm.
- Realizamos el npm install para generar el node_modules y carge archivos.
- Exponemos el puerto 4200 que es el puerto sobre el que trabajamos.
- Instalamos angular -cli.
- CMD : una vez creada la imagen, y levantado el contenedor, se ejecutará la instrucción en el CMD, arrancará el cliente.
```
DOCKER BUILD:
```
$sudo docker build -t img_cliente .

Atento con el signo "." al final del build
Para ejecutar el build, hay que estar situado en el mismo directorio que el dockerfile que vamos a utilizar.
```
DOCKER RUN:
```
$sudo docker run  -p 4200:4200 --network APP --name cont_cliente img_cliente

Declaramos los puertos 4200, tanto del host como del container.
Tener en cuenta que al realizar el docker Run, hay que añadir la network.
```
### DOCKERFILE CLIENTE
![Alt text](imagenes/dockerfile_cliente.png?raw=true "Title")


<hr>
<br>

<p> Con esto tendriamos la aplicación ejecutandose a través del puerto 4200.<p>

<br>
<hr>

## CREAMOS SCRIPT PARA ARRANCAR LOS CONTENEDORES
<br>
<p> 
    - Para que el proceso quede automatizado, se ha creado un script para que genere todo el proceso.<br>
    - Para ejecutar el script, tenemos que abrir un terminal Ctrl+Alt+T y ejecutar <strong>$./ejecutable_app.sh.</strong>
    <br>
    <em>Ahora solo queda esperar a que se complete, para disponer de la aplicación.</em>
</p>

![Alt text](imagenes/dockerfile_script.png?raw=true "Title")

<hr>
<br>
## CAMBIOS REALIZADOS SOBRE EL CÓDIGO
<p>
Practicamente no se han realizado cambios sobre el código original del proyecto.
El cambio más relevante es el realizado sobre el archivo variables.env, que contiene la url de mongo, en la que se ha sustituido:</p>
<br>

```
DB_MONGO= 'mongodb://localhost:27017/appDB'

por >>

DB_MONGO= 'mongodb://cont_mongo:27017/appDB'

siendo cont_mongo, el nombre del container.
```

<hr>
<br>

## SUBIMOS NUESTRAS IMAGENES A DOCKER HUB

### Primero de tenemos que crear una cuenta en docker hub para poder subir nuestras imagenes.

![Alt text](imagenes/login.png?raw=true "Title")

### Una vez creada nuestra cuenta, inciaremos sesion utilizando el siguiente comando: 

```
$ sudo docker login -u 'Username'
```

![Alt text](imagenes/login-u.png?raw=true "Title")

### Subimos las imagenes con los siguientes comandos:
```
-Listamos las imagenes que tenemos con : $ sudo docker images

-Para subir las imagenes ejecutamos los siguientes comandos:

$ sudo docker tag img_server abmataix5/img_server

$ sudo docker push abmataix5/img_server
```

![Alt text](imagenes/tag.png?raw=true "Title")



### Por ultimo, comprobamos que se han subido correctamente :

![Alt text](imagenes/end.png?raw=true "Title")


