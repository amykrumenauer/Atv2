# Sistema de Cadastro e Login com React e Firebase

Este projeto foi desenvolvido como atividade da disciplina de Desenvolvimento Web. A aplicação consiste em um sistema de cadastro, autenticação e exibição de dados do usuário utilizando React e Firebase.

## Tecnologias utilizadas

- React
- React Router DOM
- Firebase Authentication
- Firebase Firestore
- JavaScript
- CSS

## Funcionalidades

### Cadastro
- Cadastro de usuário com os seguintes campos:
  - E-mail
  - Senha
  - Nome
  - Sobrenome
  - Data de nascimento
- Criação de usuário utilizando Firebase Authentication (provedor e-mail/senha)
- Armazenamento dos dados adicionais no Firebase Firestore
- Associação dos dados com o UID do usuário

### Login
- Autenticação com e-mail e senha
- Validação dos dados no Firebase Authentication
- Redirecionamento para a página principal após login bem-sucedido
- Exibição de mensagem de erro em caso de falha

### Página Principal
- Exibição dos dados do usuário autenticado:
  - Nome
  - Sobrenome
  - Data de nascimento
- Dados recuperados do Firestore a partir do UID do usuário logado

## Estrutura de rotas

- `/` → Página de Login
- `/login` → Página de Login
- `/cadastro` → Página de Cadastro
- `/principal` → Página Principal

## Como executar o projeto

1. Clonar o repositório:
git clone https://github.com/amykrumenauer/Atv2.git

2. Acessar a pasta do projeto:
cd app-react-firebase

3. Instalar as dependências:
npm i

4. Executar o projeto:
npm start


## Configuração do Firebase

1. Acessar o Firebase Console
2. Criar um novo projeto
3. Ativar o Authentication com o provedor "E-mail/Senha"
4. Criar um banco de dados no Firestore em modo de teste
5. Copiar as credenciais do projeto e configurar no arquivo `firebase.js`


## Observações

- O Firestore foi utilizado em modo de teste durante o desenvolvimento
- Para ambientes de produção, é necessário configurar regras de segurança adequadas
- É necessário possuir conexão com a internet para comunicação com o Firebase

## Deploy

A aplicação pode ser publicada utilizando serviços como:
Firebase Hosting 
https://atv2-dec88.web.app/

## Autor

Desenvolvido por: Amanda Krumenauer

