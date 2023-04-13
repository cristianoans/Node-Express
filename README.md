apiDesafioNodeJs
Esta API foi desenvolvida para gerenciar dados de alunos armazenados em um banco de dados MySQL.

A seguir estão as informações para usar a API.

GET
pesquisarUsuarios
http://localhost:3000/usuarios
Listar usuários
GET /usuarios

Este endpoint lista todos os usuários cadastrados no banco de dados. É possível filtrar a listagem usando os parâmetros matricula, nome, media e aprovado. Se não houver filtro, todos os usuários serão retornados.

Parâmetros
Nome	Tipo	Descrição
matricula	number	Número da matrícula do usuário a buscar.
nome	string	Parte do nome do usuário a buscar.
media	number	Média das notas do usuário a buscar.
aprovado	boolean	Aprovação do usuário a buscar.
Respostas
Código	Descrição	Corpo
200	Usuários encontrados com sucesso.	Objeto JSON com a lista de usuários.
400	Requisição inválida.	Objeto JSON com uma mensagem de erro.
500	Erro interno do servidor.	Objeto JSON com uma mensagem de erro.
Exemplo
plaintext
http://localhost:3000/usuarios?nome=joao
View More
json
[
  {
    "id": 1,
    "Matricula": 123,
    "NomeCompleto": "Joao da Silva",
    "Nota1": 8,
    "Nota2": 7,
    "Media": 7.5,
    "Aprovado": 1
  },
  {
    "id": 2,
    "Matricula": 456,
    "NomeCompleto": "Maria Joana",
    "Nota1": 7,
    "Nota2": 9,
    "Media": 8,
    "Aprovado": 1
  }
]
Query Params
nome
cristiano

matricula
09012023

media
9

aprovado
true

POST
criarUsuarios
http://localhost:3000/usuarios
StartFragment

Este endpoint cria um novo usuário no banco de dados.

Parâmetros
Nome	Tipo	Descrição
matricula	number	Obrigatório. Número da matrícula do usuário.
nome	string	Obrigatório. Nome completo do usuário.
nota1	number	Obrigatório. Primeira nota do usuário.
nota2	number	Obrigatório. Segunda nota do usuário.
Respostas
Código	Descrição	Corpo
201	Usuário criado com sucesso.	Objeto JSON com uma mensagem de sucesso.
400	Requisição inválida.	Objeto JSON com uma mensagem de erro.
500	Erro interno do servidor.	Objeto JSON com uma mensagem de erro.
Body
raw (json)
json
{   
    "matricula": "11012023",
    "nome": "Flávio Galvão",
    "nota1": "6",
    "nota2": "9"
}
PUT
atualizarUsuario
http://localhost:3000/usuarios
Este endpoint atualiza os dados de um usuário já cadastrado no banco de dados.

Parâmetros
Nome	Tipo	Descrição
id	number	Obrigatório. Identificador único do usuário a ser atualizado.
matricula	number	Número da matrícula do usuário.
nome	string	Nome completo do usuário.
nota1	number	Primeira nota do usuário.
nota2	number	Segunda nota do usuário.
Respostas
Código	Descrição	Corpo
200	Usuário atualizado com sucesso.	Objeto JSON com os dados do usuário atualizado.
400	Requisição inválida.	Objeto JSON com uma mensagem de erro.
500	Erro interno do servidor.	Objeto JSON com uma mensagem de erro.
Body
raw (json)
json
{   
    "id": "22",
    "matricula": "11012023",
    "nome": "Flávio Galvão",
    "nota1": "9",
    "nota2": "3"
}
DELETE
deleteUsuario
http://localhost:3000/usuarios
StartFragment

Este endpoint deleta um usuário específico do banco de dados pelo seu ID.

Parâmetros
Nome	Tipo	Descrição
id	number	Obrigatório. ID do usuário a ser deletado.
Respostas
Código	Descrição	Corpo
200	Usuário deletado com sucesso.	N/A
404	Requisição inválida.	Id inexistente.
500	Erro interno do servidor.	Objeto JSON com uma mensagem de erro.
EndFragment

Body
raw (json)
json
{   
    "id": "22"
}