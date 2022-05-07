const ingredientsRouter = require('express').Router()
const Ingredient = require('../models/ingredient')

ingredientsRouter.get('/', (request, response) => {
  Ingredient.find({}).then(ingredients => {
    response.json(ingredients)
  })
})

ingredientsRouter.get('/:id', (request, response, next) => {
  Ingredient.findById(request.params.id)
    .then(ingredient => {
      if (ingredient) {
        response.json(ingredient)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

ingredientsRouter.post('/', (request, response, next) => {
  const body = request.body
  if(body.name == undefined){
    return response.status(400).json({error : 'Name missing'});
  }

  const ingredient = new Ingredient(body)

  ingredient.save()
    .then(savedIngredient => {
      response.status(201).json(savedIngredient)
    })
    .catch(error => next(error))
})

ingredientsRouter.delete('/:id', (request, response, next) => {
  Ingredient.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

ingredientsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const ingredient = body

  Ingredient.findByIdAndUpdate(request.params.id, ingredient, { new: true })
    .then(updatedIngredient => {
      response.json(updatedIngredient)
    })
    .catch(error => next(error))
})

module.exports = ingredientsRouter