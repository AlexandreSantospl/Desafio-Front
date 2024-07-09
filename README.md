# Sistema de Controle de Usuários

# Instrução de inicialização
- Yarn Start
- Yarn Mock

## Descrição do Sistema
Este sistema gerencia diferentes tipos de usuários com permissões específicas para operações CRUD (Create, Read, Update, Delete) em uma plataforma web.

## Tipos de Usuários e Permissões

### 1. Usuário Tipo 1 (Leitura)
- **Permissões**:
  - Listar usuários

### 2. Usuário Tipo 2 (Leitura)
- **Permissões**:
  - Listar usuários

### 3. Usuário Tipo 3 (Criação)
- **Permissões**:
  - Criar novos usuários

### 4. Usuário Tipo 4 (Edição e Exclusão)
- **Permissões**:
  - Editar usuários
  - Excluir usuários

### 5. Usuário Tipo 5 (Edição e Exclusão)
- **Permissões**:
  - Editar usuários
  - Excluir usuários

## Rotas HTTP

### GET `/usuarios/:id`
- **Descrição**: Retorna os detalhes do usuário com o ID especificado.
- **Parâmetros**: `id` - ID único do usuário.
- **Permissões Necessárias**: Todos os tipos de usuários podem acessar esta rota para visualizar detalhes de usuários específicos.

### POST `/usuarios`
- **Descrição**: Cria um novo usuário com base nos dados fornecidos.
- **Corpo da Requisição**: Dados do novo usuário a serem criados.
- **Permissões Necessárias**: Apenas o Usuário Tipo 3 pode criar novos usuários.

### PUT `/usuarios/:id`
- **Descrição**: Atualiza os dados de um usuário existente com o ID especificado.
- **Parâmetros**: `id` - ID único do usuário a ser atualizado.
- **Permissões Necessárias**: Apenas os Usuários Tipos 4 e 5 podem editar usuários.

### DELETE `/usuarios/:id`
- **Descrição**: Exclui o usuário com o ID especificado do sistema.
- **Parâmetros**: `id` - ID único do usuário a ser excluído.
- **Permissões Necessárias**: Apenas os Usuários Tipos 4 e 5 podem excluir usuários.



## Exemplo de Uso

### Requisição GET:
- GET http://localhost:3333/usuarios/123
Retorna os detalhes do usuário com ID `123`.

### Requisição POST:
- POST http://localhost:3333/usuarios
{
"nome": "Teste",
"email": "teste@example.com",
"level": "1 | 2 | 3 | 4 | 5",
"password: "12345"
}
Cria um novo usuário com os dados fornecidos.


### Requisição PUT:
PUT http://localhost:3333/usuarios/123
{
"cargo": "Analista de Sistemas"
}

Atualiza o cargo do usuário com ID `123`.


### Requisição DELETE:
DELETE http://localhost:3333/usuarios/123

Exclui o usuário com ID `123`.