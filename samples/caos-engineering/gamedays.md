# Roteiro para Planejamento e Execução de GameDays

Um **GameDay** é um evento estruturado onde equipes simulam falhas controladas em ambientes de produção ou staging para testar a resiliência dos sistemas e a capacidade de resposta operacional.

---

## 1. Fase Pré-GameDay (Planejamento)

O sucesso de um GameDay depende diretamente da qualidade do planejamento e da segurança do escopo.

* **Definição do Escopo:** Escolha um componente ou fluxo específico (ex: serviço de autenticação, gateway de pagamento, latência em banco de dados). Evite testar sistemas inteiros na primeira vez.
* **Formulação de Hipóteses:** Estabeleça o que você espera que aconteça. 
  * *Exemplo:* "Se derrubarmos a instância primária do banco de dados, a chave de failover assumirá em até 30 segundos sem perda de transações ativas."
* **Definição de Métricas de Estado Estável:** Determine quais indicadores (latência, taxa de erro, requisições por segundo) indicarão se o sistema está saudável ou falhando.
* **Estabelecimento de "Safety Guards" (Botões de Pânico):** Defina critérios claros de interrupção imediata do experimento (ex: se a taxa de erros ultrapassar 5% por mais de 2 minutos, o teste é cancelado e o sistema é revertido).
* **Alinhamento da Equipe:** Garanta que os engenheiros de plantão, desenvolvedores e stakeholders saibam da janela do teste para evitar alarmes falsos em ferramentas de monitoramento.

---

## 2. Durante o GameDay (Execução)

No dia do evento, a prioridade é a observação e a segurança operacional.

* **Canal de Comunicação Dedicado:** Abra uma sala de voz ou canal de chat exclusivo para acompanhar a simulação em tempo real.
* **Injeção Controlada:** Aplique a falha planejada seguindo o roteiro do experimento.
* **Monitoramento Ativo:** Acompanhe os dashboards de observabilidade para verificar se a hipótese inicial se confirma.
* **Registro de Observações:** Anote o comportamento real do sistema, o tempo de detecção do problema pelos alertas e a clareza dos logs.

---

## 3. Fase Pós-GameDay (Debriefing e Melhoria)

O valor real de um GameDay não está na falha em si, mas na análise posterior (*debriefing*).

* **Sessão de Debriefing Imediata:** Reúna a equipe logo após o teste (enquanto os fatos estão frescos) para discutir:
  * O que funcionou conforme o esperado?
  * Onde o "trabalho real" diferiu do "trabalho imaginado" (arquitetura teórica)?
  * Os alertas dispararam no tempo correto?
* **Elaboração de Ações de Melhoria:** Crie *issues* ou tarefas técnicas baseadas nos pontos cegos descobertos (ex: ajustar timeouts, criar novos alertas, refatorar pontos de acoplamento rígido).
* **Documentação:** Atualize os registros do repositório com os aprendizados do experimento.