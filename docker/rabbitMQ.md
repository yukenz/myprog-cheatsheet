# RabbitMQ Docker

### Script for install
```shell
docker container create \
--interactive \
--tty \
--name rabbitmq \
--hostname rabbitmq \
--publish 15672:15672 \
--env RABBITMQ_DEFAULT_USER=yukenz \
--env RABBITMQ_DEFAULT_PASS=awan \
rabbitmq:management-alpine
```
