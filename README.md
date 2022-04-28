# CosmeticsWebsite
This is a project for learning purpose.
We try to build a website for users to easily find the functions of the ingredients from some cosmetic products.

# Guidelines to checkout project
1. git clone https://github.com/sebaena/CosmeticsWebsite
2. cd CosmeticsWebsite/cosmeticapp/
3. npm install
4. npm start (start frontend)
4. npm server (start server)
4. npm build (build frontend into package into build/)
5. cd backend/
6. npm install
7. npm run start (start run backend server)
7. npm run dev (start run backend server in development mode)
7. npm run build:ui (build frontend into package and copy it into backend)
7. npm run deploy (deploy everything into heroku)
7. npm run deploy:full (buid frontend, copy into backend and deploy everything into heroku)
7. npm run test (run test)

# Guidelines to deploy the tests
1. cd backend
2. npm run deploy:full

# Guidelines to run database test
1. cd backend
2. npm run test

# Directory structure
- /cosmeticapp/public/ --- for index.html and manifest.json
- /cosmeticapp/src/ --- for component and index.js
- /cosmeticapp/public/pictures/ --- for test pictures, temporary files
- /cosmeticapp/src/testdata/ --- for test data, temporary files

- /backend/ --- for backend server
- /backend/build/ --- for frontend build
- /backend/controllers --- for models RESTful functions
- /backend/models --- for models
- /backend/requests/ --- for testing server RESTFUL functions, install REST client from vscode to use it
- /backend/temp --- for temporary testing object array
- /backend/tests/ --- for autometic supertest
- /backend/utils --- for helper functions and middleware and config

# TODO:
0. error catch for promisese should be added
1. ingredent function should be freshed if user changes product
2. check and filter function in cosmetic componet should be in backend???
6. to be continued ...

# Released features:
1. dynamic search cosmetics by name
2. click cosmetic ingredient to show its function
3. fake json-sever added to package.json (start it with 'npm server')
4. fetch data 'promises' is added in index.js, console.log can see the response
5. put promises into components, so that data will be displayed in frontend
6. add services, add index.css
7. add backend server index.js, implement REST functions for cosmtic
8. add ingredient REST functions
9. connect backend with frontend
10. connect to mango database
11. added some tests 