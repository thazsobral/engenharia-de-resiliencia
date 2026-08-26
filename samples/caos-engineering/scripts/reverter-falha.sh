#!/bin/bash

CONTAINER_NAME="meu-servico-dependencia"

echo "==> Removendo regras de falha de rede do container: $CONTAINER_NAME"
docker exec -it $CONTAINER_NAME tc qdisc del dev eth0 root

echo "==> Estado estável restaurado."