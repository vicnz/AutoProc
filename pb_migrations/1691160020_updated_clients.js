/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uwj2iofapm50yd6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "94wsxrl4",
    "name": "office",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "4jr7ooxjp277qtz",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "name"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uwj2iofapm50yd6")

  // remove
  collection.schema.removeField("94wsxrl4")

  return dao.saveCollection(collection)
})
