Trabajar javascrip in the backend

# Section 9: Backend - Node Express - MongoDB
Configuración de Mongo
Robo 3T
Conexión entre Mongo y Node
Tip sobre colores de consola
Aprender un poco sobre los errores de respuestas HTTP
Configuración inicial de Express
Establecer las bases de nuestros RESTful services

# npm installations
https://expressjs.com/en/starter/installing.html

npm i express --save
npm i -g nodemon
npm i dotenv
npm i cors
npm i mongoose //  https://mongoosejs.com/
npm i express-validator
npm i bcryptjs  To encrypt password
npm i jsonwebtoken


Create Files:
.env = Variables de entorno
index.js
config.js
.gitignore  and add (Node_modules/)

MongoDB-conn: 
mongodb+srv://easantose:Miperu1808@cluster0.7wzjb2o.mongodb.net/DBHospital

## Repository in Git
git init
git add .
git commit -m "CORS AND Express"
git remote add origin https://github.com/esantose/FHerrera-AdminPro-Backend.git
git push -u origin master

git tag -a v1.0.0 -m "Star Backend"  // (v0.1.0) Desc: CORS y Express configurated
git push --tags

## Steps of this section
1. 	Create package.json 
	npm init -y
	
2. 	Install expressjs. It will create node_modules, too
	npm i express --save
	
3.	Create index.js, database/config.js, .env

4.	Update package.json ==> "scripts": {"start:dev "nodemon index.js"}

5. run:  npm run start:dev



	
	
	





