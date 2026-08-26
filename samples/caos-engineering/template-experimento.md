# Template de Experimento / GameDay

Use este modelo para documentar e planejar simulações de falhas controladas.

## 📋 1. Metadados
* **Nome do Experimento:** (Ex: Indução de alta latência no serviço de pagamento)
* **Responsável:** 
* **Data da Execução:** 

---

## 🔍 2. Hipótese e Estado Estável
* **Métrica de Estado Estável:** (Ex: Taxa de sucesso de requisições de compra $\ge 99.5\%$)
* **Hipótese:** *(Ex: Se introduzirmos 500ms de atraso na API externa de pagamento, o mecanismo de timeout acionará o fallback local sem impactar a finalização do carrinho).*

---

## ⚡ 3. Execução e Escopo
* **Componente Alvo:** 
* **Tipo de Falha Injetada:** (Ex: Perda de pacotes, queda de instância, timeout de banco de dados)
* **Raio de Explosão:** (Qual o escopo máximo afetado? Ex: 5% do tráfego ou ambiente de staging)

---

## 📊 4. Resultados e Aprendizados
* **O que aconteceu de fato?** A hipótese foi confirmada?
* **Efeitos colaterais não esperados:** O sistema se comportou conforme o "trabalho imaginado" ou revelou novas fragilidades do "trabalho real"?
* **Ações de Melhoria:** (Ex: Ajustar o tempo de timeout, melhorar alertas).