# desafio-rest-api-nodejs
Desafio referente ao módulo: Criando APIs RESTfull com Node.js

Desafio: Daily Diet API
Nesse desafio você praticará o desenvolvimento de uma API REST para controle de dieta diária.


# RF
- [x] Deve ser possível criar um usuário.
- [x] Deve ser possível registrar uma refeição feita.
- [ ] Deve ser possível listar todas as refeições de um usuário.
- [ ] Deve ser possível editar uma refeição, podendo alterar todos os dados.
- [ ] Deve ser possível apagar uma refeição
- [ ] Deve ser possível visualizar uma única refeição

# RN
- [ ] Deve ser possível identificar o usuário entre as requisições
- [ ] As refeições devem ser relacionadas a um usuário.
- [ ] Deve ser possível listar todas as refeições de um usuário.
- [ ] Deve ser possível recuperar as métricas de um usuário
    - [ ] Quantidade total de refeições registradas
    - [ ] Quantidade total de refeições dentro da dieta
    - [ ] Quantidade total de refeições fora da dieta
    - [ ] Melhor sequência de refeições dentro da dieta
- [ ] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou


# Help
- run migration
    - npm run knex -- migrate:make nome_migrate