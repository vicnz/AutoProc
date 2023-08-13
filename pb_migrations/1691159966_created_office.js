/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "4jr7ooxjp277qtz",
    "created": "2023-08-04 14:39:26.515Z",
    "updated": "2023-08-04 14:39:26.515Z",
    "name": "office",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "imcnax8q",
        "name": "name",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "1yhheabf",
        "name": "section",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("4jr7ooxjp277qtz");

  return dao.deleteCollection(collection);
})
