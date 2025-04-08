## Cliente Gateway

este servicio es el putno de entrada a los microservicios de ordenes, productos, auteniticacion etc.

## Dev

1. Clonar el repositorio de manera local (mantenga la carpeta junto a los otros microservicios)
2. Instalar dependencias `npm install`
3. Crear el archivo `.env` basado en el archivo `.env.template`
4. Iniciar proyecto con el comando `npm run start:dev`

## Nats

Para levantar el service borker, corra el siguiente comando:
`docker run -d --name nats-main -p 4222:4222 -p 8222:8222 nats`
