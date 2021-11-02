# PRACTICA ENTREGABLE DOCKER
Making attractive and usable readme's. 
This is a short description about the content of my proyect. This text have to be simple and explicit.

## CREACION ETIQUETA ANOTADA

Utilizamos el siguiente comando:

$ git tag -a v1.0 -m 'Versión inicial de la aplicación'

## CREACIÓN NUEVA RAMA

$ git branch main_dockerfile

$ git checkout main_dockerfile


## CREAMOS UNA NETWORK PARA CONECTAR LOS 3 CONTENEDORES

$ docker network create --driver bridge APP

## DOCKERFILE SERVIDOR
![Alt text](imagenes/dockerfile_servidor.png?raw=true "Title")


## DOCKERFILE MONGODB
![Alt text](imagenes/dockerfile_mongo.png?raw=true "Title")


## DOCKERFILE CLIENTE
![Alt text](imagenes/dockerfile_cliente.png?raw=true "Title")




## CREAMOS SCRIPT PARA ARRANCAR LOS CONTENEDORES

![Alt text](imagenes/dockerfile_script.png?raw=true "Title")