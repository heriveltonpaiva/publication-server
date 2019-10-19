# Publication Server

Para subir o mongo e o client e a aplicação execute o comando a baixo para executar o docker-compose.yml

```bash
$ docker-compose up -d --build

```
Para acessar a aplicação: http://localhost:3000/

Ao acessar o endereço http://localhost:8081 via browser aparecerá inicialmente uma janela solicitando as credenciais para uso do mongo-express

Para rodar a aplicação:
```bash
$ node server.js

```
## Rodando a aplicação Via Docker

Construindo o container

```bash
docker build -t hpaiva/publication-server-container .
```

Rodando o container

```bash
docker run -it -p 3000:8080 --name publication-container publication-server-container:latest 
```