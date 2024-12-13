# Movies_task

- **E**xpress (sometimes referred to as Express.js): Back-end web application framework running on top of Node.js
- **N**ode.js : JavaScript runtime environment – lets you implement your application back-end in JavaScript

### Pre-requisites
- git - [Installation guide](https://www.linode.com/docs/development/version-control/how-to-install-git-on-linux-mac-and-windows/) .  
- node.js - [Download page](https://nodejs.org/en/download/) .  
- npm - comes with node or download yarn - [Download page](https://yarnpkg.com/lang/en/docs/install) .  

### Token Generation 
```
 Navigate to (https://www.themoviedb.org/)
 Create an account and request for the API key from this (https://www.themoviedb.org/settings/api).
 You will get the API Read Access Token.
```
 
### Installation 
``` 
 git clone https://github.com/skothi2022/movies_data.git
 cd movies_data
 npm install
 Create a .env file and add the bearer token and port
 npm start (for development)
 http://localhost:3000/api/movies?year={year}
```
