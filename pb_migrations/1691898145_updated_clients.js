/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uwj2iofapm50yd6")

  collection.listRule = "@request.auth.id != \"\" && (@request.auth.type = 'admin' && @request.auth.deactivate = false)"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uwj2iofapm50yd6")

  collection.listRule = null

  return dao.saveCollection(collection)
})
