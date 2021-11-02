#NETWORK --> Los tres contenedores estan en la misma red de tipo Bridge.
sudo docker network create --driver bridge APP

#CONT_MONGO
sudo docker build -t img_mongo .
                                                              
sudo docker run -d -p 27017:27017 --network APP --name cont_mongo img_mongo
# Insertamos datos en la DB.
sudo docker exec -i cont_mongo sh -c 'mongoimport -c productos -d appDB --drop' < productosDB.json

#CONT_SERVIDOR
sudo docker build -t img_server ./servidor

sudo docker run -d -p 4000:4000 --network APP --name cont_server img_server

#CONT_CLIENTE
sudo docker build -t img_cliente ./cliente

sudo docker run -p 4200:4200 --name cont_cliente --network APP img_cliente