/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "uwj2iofapm50yd6",
    "created": "2023-08-04 14:12:12.664Z",
    "updated": "2023-08-04 14:12:12.664Z",
    "name": "clients",
    "type": "auth",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "vs4hm0pp",
        "name": "fname",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 3,
          "max": 100,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "fegtlpcu",
        "name": "mname",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 3,
          "max": 100,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "bvlaooyt",
        "name": "lname",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 3,
          "max": 100,
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
    "options": {
      "allowEmailAuth": true,
      "allowOAuth2Auth": true,
      "allowUsernameAuth": true,
      "exceptEmailDomains": [],
      "manageRule": null,
      "minPasswordLength": 8,
      "onlyEmailDomains": [],
      "requireEmail": false
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("uwj2iofapm50yd6");

  return dao.deleteCollection(collection);
})
