# Engenharia do Caos e Simulações

Esta pasta reúne conceitos, práticas e roteiros para a aplicação da Engenharia do Caos como ferramenta de validação da resiliência sistêmica.

A Engenharia do Caos consiste em realizar **experimentos controlados** em sistemas para construir confiança na capacidade de o sistema suportar condições adversas e imprevistas em produção.

---

## 📂 Conteúdos da Seção

* **[Guia de Experimento / GameDay](./template-experimento.md):** Estrutura padronizada para planejar, executar e analisar simulações de falhas de forma segura.

---

## 🎯 Princípios Fundamentais

1. **Definir o "Estado Estável":** Estabelecer métricas claras que indiquem o comportamento normal do sistema antes de injetar qualquer falha.
2. **Formular Hipóteses:** Supor que o sistema continuará funcionando (ou se degradará de forma controlada) mesmo com a interrupção de um componente específico.
3. **Minimizar o Raio de Explosão:** Conduzir os testes primeiro em ambientes controlados (staging) ou limitar o impacto a uma fração mínima de usuários em produção.
4. **Automatizar os Experimentos:** Garantir que os testes possam ser executados com frequência e segurança.

---

Para apoiar a execução dos experimentos e testes de hipóteses, a seção de Engenharia do Caos pode incluir tanto ferramentas de mercado consolidadas quanto scripts utilitários leves para simulações locais.

Abaixo está uma proposta de conteúdo para documentar essas ferramentas e um exemplo de script prático.
🛠️ Ferramentas de Mercado Recomendadas

- Chaos Toolkit

    O que é: Um framework declarativo de Engenharia do Caos nativo para a nuvem. Permite descrever experimentos em JSON/YAML e validá-los de forma automatizada.

    Uso no projeto: Ideal para estruturar testes de hipóteses acionados via pipeline de CI/CD.

- Toxiproxy (Shopify)

    O que é: Uma ferramenta para simular falhas de rede (latência, cortes de conexão, perda de pacotes) entre aplicações e suas dependências (como bancos de dados ou APIs).

    Uso no projeto: Excelente para testes de integração e validação de resiliência a falhas de rede sem alterar o código da aplicação.

- Chaos Mesh / LitmusChaos

    O que é: Orquestradores de caos nativos para Kubernetes.

    Uso no projeto: Indicados para simular quedas de pods, estrangulamento de CPU/memória e falhas de disco em ambientes conteinerizados.

- Exemplo de [Script Auxiliar](./scripts/simulador-latencia.sh) e seu [par para reversão do caos](./scripts/reverter-falha.sh)
    
    Para testes locais ou em ambientes de homologação sem dependência de ferramentas complexas, você pode utilizar scripts simples de automação de rede (usando tc no Linux ou comandos Docker).

    Em scripts há um exemplo de script em Bash para simular degradação de rede em um container de teste.
