#!/bin/bash

# Configurações do experimento
CONTAINER_NAME="meu-servico-dependencia"
LATENCIA_MS="300ms"
PERDA_PACOTES="5%"

echo "==> Iniciando injeção de falha de rede no container: $CONTAINER_NAME"
echo "==> Adicionando latência de $LATENCIA_MS e $PERDA_PACOTES de perda de pacotes."

# Utiliza o iproute2 (tc) dentro do container para injetar instabilidade de rede
docker exec -it $CONTAINER_NAME tc qdisc add dev eth0 root netem delay $LATENCIA_MS loss $PERDA_PACOTES

echo "==> Falha injetada com sucesso. Monitore as métricas do sistema."