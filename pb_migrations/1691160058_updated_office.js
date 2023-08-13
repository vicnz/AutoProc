/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4jr7ooxjp277qtz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dbuqih3q",
    "name": "description",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4jr7ooxjp277qtz")

  // remove
  collection.schema.removeField("dbuqih3q")

  return dao.saveCollection(collection)
})
