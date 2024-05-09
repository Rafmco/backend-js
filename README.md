<a name="readme-top"></a>
  <h1 align="center">backend-js</h1>
<p align="center">
</p>


### Basic backend application in NodeJS

- validar se o usuário tem permissao pra executar a rota


## 🚀 Instalação
1. `yarn` e `yarn install`
2. Configurar .env
 > APP_KEY pode ser gerada com:
 >> gitbash: `$ openssl rand -base64 32`
3. Migrate Tables Database
  `yarn migrate`
4. Check Lint Errors
  `yarn lint`
5. Start Debug
  `yarn dev`
6. Start Production
  `yarn start`


## 💻 Requests
- POST
  - `http://localhost:5000/login`
  ```
  {
	   "login": "",
	   "password": ""
   }
  ```

- GET
  - `http://localhost:5000/user/listar`
  ```
  {}
  ```
  - Auth Bearer TOKEN: ""
