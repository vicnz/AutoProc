/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uwj2iofapm50yd6")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "r8dm8aeb",
    "name": "type",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "admin",
        "client",
        "util"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uwj2iofapm50yd6")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "r8dm8aeb",
    "name": "type",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "mod",
        "std",
        "scn"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
