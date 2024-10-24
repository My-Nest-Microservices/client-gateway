## Cliente Gateway

El gateway es el punto de accesso entre nuestros clientes y nuestros servicios. Es el encargado
de recibir las peticiones, enviarlas al servidor NATS y de ahi que lleguen a los servicios
correspondentes y de luego devolver la respuesta al cliente.

## Dev

1. Clonar el repositorio
2. Instalar dependencias
3. Crear un archivo `.env` basado en el `.env.template`
4. Levantar el servidor de NATS
   `docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats`
5. Levantar los microservicios que se van a consumir
6. Levantar proyecto con `np run start:dev`

## PROD

Ejecutar

```
docker build -f dockerfile.prod -t client-gateway .
```
