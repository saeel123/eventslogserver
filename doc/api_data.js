define({ "api": [
  {
    "type": "get",
    "url": "/event/",
    "title": "Get Events",
    "name": "Get_Events",
    "group": "Events",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "verb",
            "description": "<p>verb.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "author",
            "description": "<p>author.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "target_year",
            "description": "<p>target_year.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>startDate.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>endDate.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sortBy",
            "description": "<p>sortBy.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "page",
            "description": "<p>page.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "limit",
            "description": "<p>limit.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Json",
            "optional": false,
            "field": "Events",
            "description": "<p>information.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\tHTTP/1.1 200 OK\n\t{\n    \"success\": true,\n    \"data\": [\n        {\n            \"_id\": \"5f2ed4af5fc9830e5fd89fa1\",\n            \"subject\": \"Product\",\n            \"message\": \"Developer Tools published a product on Online Store: <a href=\\\"https://full-stack-dev-test.myshopify.com/admin/products/5580038996118\\\">DIY Bath Bomb</a>.\",\n            \"author\": \"Developer Tools\",\n            \"event_created_at\": \"2020-08-06T10:53:56.000Z\",\n            \"event_id\": \"56306074878102\",\n            \"verb\": \"published\",\n            \"__v\": 0\n        },\n        {\n            \"_id\": \"5f2ed4af5fc9830e5fd89fa3\",\n            \"subject\": \"Product\",\n            \"message\": \"Developer Tools published a product on Online Store: <a href=\\\"https://full-stack-dev-test.myshopify.com/admin/products/5580039028886\\\">Bangle Bracelet With Jewels</a>.\",\n            \"author\": \"Developer Tools\",\n            \"event_created_at\": \"2020-08-06T10:53:56.000Z\",\n            \"event_id\": \"56306075173014\",\n            \"verb\": \"published\",\n            \"__v\": 0\n        },\n        {\n            \"_id\": \"5f2ed4ac5fc9830e5fd89f9a\",\n            \"subject\": \"Product\",\n            \"message\": \"Developer Tools created a new product: <a href=\\\"https://full-stack-dev-test.myshopify.com/admin/products/5580038799510\\\">Coffee Beans And Cup</a>.\",\n            \"author\": \"Developer Tools\",\n            \"event_created_at\": \"2020-08-06T10:53:55.000Z\",\n            \"event_id\": \"56306073010326\",\n            \"verb\": \"create\",\n            \"__v\": 0\n        },\n        {\n            \"_id\": \"5f2ed4ac5fc9830e5fd89f99\",\n            \"subject\": \"Product\",\n            \"message\": \"Developer Tools published a product on Online Store: <a href=\\\"https://full-stack-dev-test.myshopify.com/admin/products/5580038701206\\\">Pink Patterned iPhone Case</a>.\",\n            \"author\": \"Developer Tools\",\n            \"event_created_at\": \"2020-08-06T10:53:55.000Z\",\n            \"event_id\": \"56306072813718\",\n            \"verb\": \"published\",\n            \"__v\": 0\n        },\n        {\n            \"_id\": \"5f2ed4ac5fc9830e5fd89f97\",\n            \"subject\": \"Product\",\n            \"message\": \"Developer Tools published a product on Online Store: <a href=\\\"https://full-stack-dev-test.myshopify.com/admin/products/5580038668438\\\">4 Ounce Soy Candle</a>.\",\n            \"author\": \"Developer Tools\",\n            \"event_created_at\": \"2020-08-06T10:53:55.000Z\",\n            \"event_id\": \"56306072551574\",\n            \"verb\": \"published\",\n            \"__v\": 0\n        },\n        {\n            \"_id\": \"5f2ed4ac5fc9830e5fd89f9c\",\n            \"subject\": \"Product\",\n            \"message\": \"Developer Tools created a new product: <a href=\\\"https://full-stack-dev-test.myshopify.com/admin/products/5580038832278\\\">Fitness Product Blue Roller Details</a>.\",\n            \"author\": \"Developer Tools\",\n            \"event_created_at\": \"2020-08-06T10:53:55.000Z\",\n            \"event_id\": \"56306073436310\",\n            \"verb\": \"create\",\n            \"__v\": 0\n        },\n        {\n            \"_id\": \"5f2ed4ac5fc9830e5fd89f98\",\n            \"subject\": \"Product\",\n            \"message\": \"Developer Tools created a new product: <a href=\\\"https://full-stack-dev-test.myshopify.com/admin/products/5580038701206\\\">Pink Patterned iPhone Case</a>.\",\n            \"author\": \"Developer Tools\",\n            \"event_created_at\": \"2020-08-06T10:53:55.000Z\",\n            \"event_id\": \"56306072617110\",\n            \"verb\": \"create\",\n            \"__v\": 0\n        },\n        {\n            \"_id\": \"5f2ed4ac5fc9830e5fd89f9d\",\n            \"subject\": \"Product\",\n            \"message\": \"Developer Tools published a product on Online Store: <a href=\\\"https://full-stack-dev-test.myshopify.com/admin/products/5580038832278\\\">Fitness Product Blue Roller Details</a>.\",\n            \"author\": \"Developer Tools\",\n            \"event_created_at\": \"2020-08-06T10:53:55.000Z\",\n            \"event_id\": \"56306073600150\",\n            \"verb\": \"published\",\n            \"__v\": 0\n        },\n        {\n            \"_id\": \"5f2ed4ac5fc9830e5fd89f96\",\n            \"subject\": \"Product\",\n            \"message\": \"Developer Tools created a new product: <a href=\\\"https://full-stack-dev-test.myshopify.com/admin/products/5580038668438\\\">4 Ounce Soy Candle</a>.\",\n            \"author\": \"Developer Tools\",\n            \"event_created_at\": \"2020-08-06T10:53:55.000Z\",\n            \"event_id\": \"56306072518806\",\n            \"verb\": \"create\",\n            \"__v\": 0\n        },\n        {\n            \"_id\": \"5f2ed4ac5fc9830e5fd89f9b\",\n            \"subject\": \"Product\",\n            \"message\": \"Developer Tools published a product on Online Store: <a href=\\\"https://full-stack-dev-test.myshopify.com/admin/products/5580038799510\\\">Coffee Beans And Cup</a>.\",\n            \"author\": \"Developer Tools\",\n            \"event_created_at\": \"2020-08-06T10:53:55.000Z\",\n            \"event_id\": \"56306073206934\",\n            \"verb\": \"published\",\n            \"__v\": 0\n        }\n    ],\n    \"count\": 10,\n    \"error\": []\n    }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/event-router.js",
    "groupTitle": "Events"
  }
] });
