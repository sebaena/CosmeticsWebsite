const cosmeticsRouter = require('express').Router()
const Cosmetic = require('../models/cosmetic')

cosmeticsRouter.get('/', (request, response) => {
  Cosmetic.find({}).then(cosmetics => {
    response.json(cosmetics)
  })
})

cosmeticsRouter.get('/:id', (request, response, next) => {
  Cosmetic.findById(request.params.id)
    .then(cosmetic => {
      if (cosmetic) {
        response.json(cosmetic)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

cosmeticsRouter.post('/', (request, response, next) => {
  const body = request.body

  const cosmetic = new Cosmetic(body)

  cosmetic.save()
    .then(savedCosmetic => {
      response.json(savedCosmetic)
    })
    .catch(error => next(error))
})

cosmeticsRouter.delete('/:id', (request, response, next) => {
  Cosmetic.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

cosmeticsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const cosmetic = body

  Cosmetic.findByIdAndUpdate(request.params.id, cosmetic, { new: true })
    .then(updatedCosmetic => {
      response.json(updatedCosmetic)
    })
    .catch(error => next(error))
})

module.exports = cosmeticsRouter