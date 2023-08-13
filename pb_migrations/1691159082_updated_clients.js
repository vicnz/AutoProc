/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uwj2iofapm50yd6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wpqm0zlc",
    "name": "deactivated",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "r7wzxtd8",
    "name": "profile",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [
        "image/png",
        "image/vnd.mozilla.apng",
        "image/jpeg"
      ],
      "thumbs": [],
      "protected": false
    }
  }))

  // add
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uwj2iofapm50yd6")

  // remove
  collection.schema.removeField("wpqm0zlc")

  // remove
  collection.schema.removeField("r7wzxtd8")

  // remove
  collection.schema.removeField("r8dm8aeb")

  return dao.saveCollection(collection)
})
