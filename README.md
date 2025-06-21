# 🧠 Analisador Léxico

Este projeto é um **analisador léxico** desenvolvido como uma aplicação web interativa. Ele permite que o usuário adicione palavras válidas a um dicionário e simule, em tempo real, o funcionamento de um **Autômato Finito Determinístico (AFD)** — uma estrutura fundamental na construção de analisadores léxicos e compiladores.

## 🤖 O que é um AFD?

Um **Autômato Finito Determinístico (AFD)** é um modelo computacional usado para reconhecer padrões em cadeias de caracteres. Ele possui:

- Um número finito de **estados**;
- Um **estado inicial**;
- Um ou mais **estados finais (ou de aceitação)**;
- Regras de transição bem definidas: **para cada símbolo de entrada, há no máximo uma transição por estado**.

Ou seja, dado um conjunto de símbolos (como letras), o AFD "caminha" pelos estados de acordo com as letras digitadas, determinando se a palavra pertence ou não à linguagem reconhecida.

## ✨ Funcionalidades

- 📝 **Entrada de palavras**:
  - Apenas **letras** (maiúsculas ou minúsculas) são aceitas;
  - Todas as letras são automaticamente convertidas para **minúsculas**;
  - A palavra é adicionada ao pressionar `Enter`, `Espaço` ou clicando em **Adicionar**;
  - Se a palavra for inválida (contiver números ou símbolos), um **popup** informa o erro.

- 📚 **Dicionário dinâmico**:
  - Palavras válidas são listadas em tempo real;
  - A tabela de transições (estados) é **gerada automaticamente** com base no dicionário;
  - Botão **"Limpar"** remove todas as palavras e reinicia a tabela.

- 🔎 **Campo de busca interativo**:
  - A cada letra digitada, o sistema percorre os estados do AFD;
  - A **tabela de estados** destaca o caminho percorrido em **verde**;
  - Erros no percurso, como acessar estados inexistentes, são destacados em **vermelho**;
  - Ao pressionar `Espaço` ou `Enter`, o sistema verifica se a palavra **pertence à linguagem**.

## 🧮 Como funciona

1. **Construção da linguagem**:
   - Palavras válidas são inseridas e formam o "vocabulário" da linguagem;
   - A tabela de estados é atualizada automaticamente com base nessas palavras.

2. **Simulação do AFD**:
   - O campo de busca simula a leitura da palavra letra por letra;
   - O caminho do AFD é destacado conforme a palavra é digitada;
   - A aceitação da palavra é verificada ao pressionar `Espaço` ou `Enter`.

## 🚀 Como usar

1. Acesse a página no navegador;
2. Digite uma palavra no campo principal e pressione `Enter`, `Espaço` ou clique em **Adicionar**;
3. Veja a palavra aparecer no dicionário e a **tabela de estados** ser construída;
4. No campo de busca, digite uma palavra para visualizar o percurso do AFD em tempo real;
5. Pressione `Espaço` ou `Enter` para saber se a palavra foi reconhecida;
6. Clique em **Limpar** para reiniciar tudo.

## 📌 Observações

- Apenas palavras com letras são aceitas;
- O projeto tem fins **didáticos**, ideal para estudar conceitos de **linguagens formais**, **análise léxica** e **autômatos**;
- A visualização do AFD facilita o entendimento de como funciona a leitura e o reconhecimento de palavras por máquinas.

## 🛠️ Tecnologias utilizadas

- HTML, CSS, JavaScript e JQuery ;
- Interface amigável, responsiva e em dark mode;
- Totalmente executável em qualquer navegador moderno.

🚀 Bora estudar linguagens formais? Testa aí, adiciona umas palavrinhas e veja a mágica dos autômatos acontecendo bem diante dos seus olhos! 😄
