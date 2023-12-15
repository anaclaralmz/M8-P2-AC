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

### Id não estava sendo criado de forma autoincremental, sendo salvo como "null" na requisição

<img width="1242" alt="image" src="https://github.com/anaclaralmz/M8-P2-AC/blob/64de9212f4fd329a312739e7bdd00bd3379d97f6/assets/Captura%20de%20Tela%202023-12-15%20%C3%A0s%2014.29.55.png
">

<img width="1242" alt="image" src="https://github.com/anaclaralmz/M8-P2-AC/blob/64de9212f4fd329a312739e7bdd00bd3379d97f6/assets/Captura%20de%20Tela%202023-12-15%20%C3%A0s%2014.30.44.png
">

### POST de criação de dogs estava incompleto

img

img

### POST de votação dos animais não estava funcinando
- código incompleto
- falta de tratamento de erros (mesmo quando a requisição falhava, ele retornava que o voto havia sido computado
- ausencia de verificação se o ID existia na tabela especificada

  img

  ### Não havia uma sanitização nem validação dos dados de entrada, deixando o sistema expostos a SQL injections
  - foram criadas formas de validar o tipo de entrada nas requisições, impedindo a criacao de elementos vazios, ou a criação de votos em anumalTypes que não existem, por exemplo.
  img

  img


