# 20232BSET03P2
Inteli - Engenharia de Software | Avaliação 2023-2B P2 - Ana Clara Loureiro Muller Zaidan

## Barema

a) Criar um fork do repositório para a sua conta do github; ok

b) Sanitizar e validar dados de entrada para evitar SQL Injection. ok

c) Corrigir a lógica de votação para que verifique se o registro do animal existe antes de adicionar um voto. ok

d) Implementar e tratar erros de maneira adequada, sem vazar detalhes de implementação. ok

e) Implementar todos os métodos que possuem assinatura no código. ok

f) No readme, descreva as vulnerabilidades identificadas e as medidas adotadas para corrigir cada uma delas. ok


# Vulnerabilidades identificadas e medidas adotadas
-> principalmente vulnerabilidades de segurança, além de erros na construção da lógica de alguns trechos do código.

### 1. Id não estava sendo criado de forma autoincremental, sendo salvo como "null" na requisição

<img width="1242" alt="image" src="/assets/Captura de Tela 2023-12-15 às 14.29.55.png">

<img width="1242" alt="image" src="/assets/Captura de Tela 2023-12-15 às 14.30.44.png">

### 2. POST de criação de dogs estava incompleto

<img width="1242" alt="image" src="/assets/Captura de Tela 2023-12-15 às 14.32.15.png">
<img width="1242" alt="image" src="/assets/Captura de Tela 2023-12-15 às 14.32.39.png">

### 3. POST de votação dos animais não estava funcinando
- código estava incompleto
- faltava tratamento de erros (mesmo quando a requisição falhava, ele retornava que o voto havia sido computado
- ausencia de verificação se o ID existia na tabela especificada

<img width="1242" alt="image" src="/assets/Captura de Tela 2023-12-15 às 14.36.05.png">
<img width="1242" alt="image" src="/assets/Captura de Tela 2023-12-15 às 14.56.15.png">

### 4. Não havia uma sanitização nem validação dos dados de entrada, deixando o sistema expostos a SQL injections
- foram criadas formas de validar o tipo de entrada nas requisições, impedindo a criacao de elementos vazios, ou a criação de votos em animalTypes que não existem, por exemplo.

<img width="1242" alt="image" src="/assets/Captura de Tela 2023-12-15 às 14.37.31.png">

<img width="1242" alt="image" src="/assets/Captura de Tela 2023-12-15 às 14.37.53.png">

