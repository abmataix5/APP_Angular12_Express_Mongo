
FROM  node

WORKDIR /usr/src/app/cliente

COPY . .

RUN npm install

EXPOSE 4200

RUN npm install -y -g @angular/cli

CMD ng serve --host 0.0.0.0