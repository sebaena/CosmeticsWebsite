# CosmeticsWebsite
This is a project for learning purpose.
We try to build a website for users to easily find the functions of the ingredients from some cosmetic products.

# Guidelines to checkout project
1.  git clone https://github.com/sebaena/CosmeticsWebsite
2.  cd CosmeticsWebsite/cosmeticapp/
3.  npm install
4.  npm start (start frontend)
5.  npm server (start server)

# Directory structure
- CosmeticsWebsite/cosmeticapp/public/
  - for index.html and manifest.json
- CosmeticsWebsite/cosmeticapp/src
  - for component and index.js
- CosmeticsWebsite/cosmeticapp/public/pictures
  - for test pictures, temporary files
- CosmeticsWebsite/cosmeticapp/src/testdata
  - for test data, temporary files

# TODO:
0. error catch for promisese should be added
1. ingredent function should be freshed if user changes product
2. check and filter function in cosmetic componet should be in backend???
3. start to build backend server with express.js
4. to be continued ...

# Released features:
1. dynamic search cosmetics by name
2. click cosmetic ingredient to show its function
3. fake json-sever added to package.json (start it with 'npm server')
4. fetch data 'promises' is added in index.js, console.log can see the response
5. put promises into components, so that data will be displayed in frontend
6. add services, add index.css