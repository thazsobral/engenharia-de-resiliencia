# Estudo de Caso 01: Efeito Cascata em Microsserviços por Falha de Dependência

## 📋 Contexto
* **Sistema:** Plataforma de e-commerce baseada em microsserviços.
* **Resumo:** Uma falha intermitente em um serviço secundário de recomendação gerou esgotamento de conexões (*connection pool*) no gateway de API, derrubando todo o sistema de compras.

---

## 🔍 Análise sob a Ótica da Engenharia de Resiliência

### 1. Migração para Limites Perigosos
* O sistema operava próximo ao limite de capacidade sem que houvesse visibilidade clara da degradação do serviço de recomendação. 
* A ausência de degradação graciosa (*graceful degradation*) fez com que o acoplamento forte priorizasse a falha total em vez de isolar o componente.

### 2. A Resposta Operacional
* A equipe de plantão precisou intervir manualmente para desativar o recurso de recomendação por meio de uma *feature flag*, restaurando o fluxo principal.
* A recuperação dependeu da adaptabilidade humana para diagnosticar rapidamente a causa raiz em meio a alertas ruidosos.

---

## 💡 Lições Aprendidas
* **Isolamento de Falhas:** Implementação futura de *Circuit Breakers* e *Timeouts* agressivos para evitar que falhas periféricas afetem o núcleo do negócio.
* **Trabalho Real vs. Imaginado:** Os diagramas de arquitetura originais assumiam independência que não existia na prática sob alta carga.