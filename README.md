# CosmeticsWebsite
This is a project for learning purpose.
We try to build a website for users to easily find the functions of the ingredients from some cosmetic products.

# Guidelines to checkout project
1.  git clone https://github.com/sebaena/CosmeticsWebsite
2.  cd CosmeticsWebsite/cosmeticapp/
3.  npm install
4.  npm start

# directory structure
CosmeticsWebsite/cosmeticapp/public/
  1. for index.html and manifest.json
CosmeticsWebsite/cosmeticapp/src
  1. for component and index.js
CosmeticsWebsite/cosmeticapp/public/pictures
  1. for test pictures, temporary files
CosmeticsWebsite/cosmeticapp/src/testdata
  1. for test data, temporary files

# Released features:
1. dynamic search cosmetics by name
2. click cosmetic ingredient to show its function

# TODO:
1. use npx to start json server e.g. npx json-server --port 3001 --watch testdata/cosmetics.json
2. use axios and promises to fetch data from json-server to frontend (instead of loading data directly from testdata/)
3. to be continued ...
