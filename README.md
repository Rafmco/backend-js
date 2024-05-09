# backend-js
This is an example of a basic backend application in Java Script.

 - validar se o usuário tem permissao pra executar a rota
---

### Install
 > yarn

### Configurar .env
 > APP_KEY pode ser gerada com:
 >> gitbash: `$ openssl rand -base64 32`
### Migrate Tables Database
 > yarn migrate

### Check Lint Errors
 > yarn lint

### Start Debug
 > yarn dev

### Start Production
 > yarn start


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
