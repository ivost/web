var FakeJson = require('fake-json');

var schema1 = {
    "type": "array",
    "items": {
        "type": "number",
        "minimum": 1,
        "maximum": 100
    },
    "minItems": 5,
    "maxItems": 10
};

var schema2 = {
    "type": "object",
    "name": "mediaLibrarySourceObject",
    "resource": "medialibrary.sources",
    "properties": {
        "id": {
            "description": "identifier",
            "type": "string",
            "format": "uuid"
        },
        "name": {
            "description": "source name",
            "type": "string"
        },
        "uri": {
            "description": "object uri",
            "type": "string",
            "format": "uri"
        }
    }
};
// valid?, no generation
var schemaNested = {
    "title": "root",
    "type": "object",
    "name": "a",
    "otherSchema": {
        "title": "nested",
        "type": "object",
        "name": "b",
        "anotherSchema": {
            "title": "alsoNested",
            "type": "string",
            "name": "c",
            "pattern": "hello+ (world|to you)"
        }
    }
};

var schemaN = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
        "/": {}
    },
    "patternProperties": {
        "^(/[^/]+)+$": {}
    },
    "additionalProperties": false,
    "required": ["/"]
};

var schemaC = {
    "api": {
        "cdn": {
            "description": "The content delivery network is implemented as a service on the headunit to deliver static content like images, music, video etc. It can be understood as the ‘external media interface’.",
            "resources": {
                "images": {
                    "model": {
                        "resource": "cdn.images"
                    },
                    "description": "Retrieve binary image data. The server will not scale content, but instead deliver the closest match.",
                    "endpoints": {
                        "resource": {
                            "post": {
                                "parameters": {},
                                "Process": "for(file in files){var added = res.getInterfaceByName(\"cdn\").images.set.add({'name' :files[file].name, 'type':files[file].type});var data= fs.readFileSync(files[file].path);var ee= fs.writeFileSync('./binary/cdn/images/'+added.id,data);}response.status(201);var location = request.url;if( location.indexOf('/', location.length - 1) === -1) {location += '/';}location += added.id;response.location(location);"
                            },
                            "get": {
                                "parameters": {
                                    "resource": "cdn.images",
                                    "method": "get",
                                    "description": "",
                                    "properties": {
                                        "w": {
                                            "description": "desired image width",
                                            "type": "Integer",
                                            "unit": "px"
                                        },
                                        "h": {
                                            "description": "desired image height",
                                            "type": "Integer",
                                            "unit": "px"
                                        }
                                    }
                                }
                            }
                        },
                        "element": {
                            "get": {
                                "parameters": {
                                    "resource": "cdn.images",
                                    "method": "get",
                                    "description": "The server will not scale content, but instead deliver the closest match.",
                                    "properties": {
                                        "w": {
                                            "description": "desired image width",
                                            "type": "Integer",
                                            "unit": "px"
                                        },
                                        "h": {
                                            "description": "desired image height",
                                            "type": "Integer",
                                            "unit": "px"
                                        }
                                    }
                                },
                                "Process": "var sendFile =fs.readFileSync('binary/cdn/images/'+element.id);response.type(element.type);response.send(sendFile);"
                            },
                            "put": {
                                "parameters": {},
                                "description": "Store new binary image data. (extra permissions necessary: createImages)"
                            },
                            "delete": {
                                "parameters": {},
                                "description": "Delete binary image data. (extra permissions necessary: deleteImages)"
                            }
                        }
                    }
                }
            }
        }
    }
};

var schemaM = {
    "type": "object",
    "name": "trackObject",
    "resource": "medialibrary.tracks",
    "properties": {
        "id": {
            "description": "identifier",
            "type": "string",
            "format": "uuid"
        },
        "name": {
            "description": "Track title",
            "type": "string"
        },
        "uri": {
            "description": "object uri",
            "type": "string",
            "format": "uri"
        },
        "image": {
            "description": "cover art",
            "type": "string",
            "format": "uri"
        },
        "genres": {
            "description": "track genre",
            "type": "array",
            "items": {
                "type": "object",
                "oneOf": [
                    {
                        "#ref": "medialibrary.genres.genreObject"
                    }
                  ]
            }
        },
        "folders": {
            "description": "actual folder the item resides in",
            "type": "array",
            "items": {
                "type": "object",
                "oneOf": [
                    {
                        "#ref": "medialibrary.folders.folderObject"
                    }
                  ]
            }
        },
        "rating": {
            "description": "owner rating",
            "type": "integer",
            "minimum": 0
        },
        "albums": {
            "description": "albums containing this track",
            "type": "array",
            "items": {
                "type": "object",
                "oneOf": [
                    {
                        "#ref": "medialibrary.albums.albumObject"
                    }
                  ]
            }
        },
        "artists": {
            "description": "track artists",
            "type": "array",
            "items": {
                "type": "object",
                "oneOf": [
                    {
                        "#ref": "medialibrary.artists.artistObject"
                    }
                  ]
            }
        },
        "date": {
            "description": "release date",
            "type": "string",
            "format": "date-time"
        },
        "disc": {
            "description": "disc of album",
            "type": "integer",
            "minimum": 0
        },
        "duration": {
            "description": "track duration",
            "type": "integer",
            "minimum": 0,
            "unit": "s"
        },
        "source": {
            "description": "Source of the file",
            "type": "object",
            "oneOf": [
                {
                    "#ref": "medialibrary.sources.mediaLibrarySourceObject"
                  }
                ]
        }
    }
};

// http://jsonschema.net/#/
var schema3 = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "id": "http://jsonschema.net",
    "type": "object",
    "properties": {
        "address": {
            "id": "http://jsonschema.net/address",
            "type": "object",
            "properties": {
                "streetAddress": {
                    "id": "http://jsonschema.net/address/streetAddress",
                    "type": "string"
                },
                "city": {
                    "id": "http://jsonschema.net/address/city",
                    "type": "string"
                }
            },
            "required": [
        "streetAddress",
        "city"
      ]
        },
        "phoneNumber": {
            "id": "http://jsonschema.net/phoneNumber",
            "type": "array",
            "items": {
                "id": "http://jsonschema.net/phoneNumber/0",
                "type": "object",
                "properties": {
                    "location": {
                        "id": "http://jsonschema.net/phoneNumber/0/location",
                        "type": "string"
                    },
                    "code": {
                        "id": "http://jsonschema.net/phoneNumber/0/code",
                        "type": "integer"
                    }
                }
            }
        }
    },
    "required": [
    "address",
    "phoneNumber"
  ]
}

//http://json-schema.org/example2.html
var schema4 = {
    "id": "http://some.site.somewhere/entry-schema#",
    "$schema": "http://json-schema.org/draft-04/schema#",
    "description": "schema for an fstab entry",
    "type": "object",
    "required": ["storage"],
    "properties": {
        "storage": {
            "type": "object",
            "oneOf": [
                {
                    "$ref": "#/definitions/diskDevice"
                },
                {
                    "$ref": "#/definitions/diskUUID"
                },
                {
                    "$ref": "#/definitions/nfs"
                },
                {
                    "$ref": "#/definitions/tmpfs"
                }
            ]
        },
        "fstype": {
            "enum": ["ext3", "ext4", "btrfs"]
        },
        "options": {
            "type": "array",
            "minItems": 1,
            "items": {
                "type": "string"
            },
            "uniqueItems": true
        },
        "readonly": {
            "type": "boolean"
        }
    },
    "definitions": {
        "diskDevice": {
            "properties": {
                "type": {
                    "enum": ["disk"]
                },
                "device": {
                    "type": "string",
                    "pattern": "^/dev/[^/]+(/[^/]+)*$"
                }
            },
            "required": ["type", "device"],
            "additionalProperties": false
        },
        "diskUUID": {
            "properties": {
                "type": {
                    "enum": ["disk"]
                },
                "label": {
                    "type": "string",
                    "pattern": "^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$"
                }
            },
            "required": ["type", "label"],
            "additionalProperties": false
        },
        "nfs": {
            "properties": {
                "type": {
                    "enum": ["nfs"]
                },
                "remotePath": {
                    "type": "string",
                    "pattern": "^(/[^/]+)+$"
                },
                "server": {
                    "type": "string",
                    "oneOf": [
                        {
                            "format": "host-name"
                        },
                        {
                            "format": "ipv4"
                        },
                        {
                            "format": "ipv6"
                        }
                    ]
                }
            },
            "required": ["type", "server", "remotePath"],
            "additionalProperties": false
        },
        "tmpfs": {
            "properties": {
                "type": {
                    "enum": ["tmpfs"]
                },
                "sizeInMB": {
                    "type": "integer",
                    "minimum": 16,
                    "maximum": 512
                }
            },
            "required": ["type", "sizeInMB"],
            "additionalProperties": false
        }
    }
};

// https://github.com/fge/sample-json-schemas/blob/master/avro/avro-schema.json
var schemaA = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "avro-schema",
    "description": "JSON Schema for an Apache Avro schema, version 1.7.3",
    "oneOf": [
        { "type": "string" },
        {
            "type": "object",
            "required": [ "type" ],
            "properties": {
                "type": { "$ref": "#/definitions/primitiveTypes" }
            }
        },
        { "$ref": "#/definitions/record" },
        { "$ref": "#/definitions/enum" },
        { "$ref": "#/definitions/array" },
        { "$ref": "#/definitions/map" },
        { "$ref": "#/definitions/union" },
        { "$ref": "#/definitions/fixed" }
    ],
    "definitions": {
        "primitiveTypes": {
            "description": "One primitive type",
            "enum": [ "null", "boolean", "int", "long", "float", "double", "bytes", "string" ]
        },
        "record": {
            "description": "A record",
            "type": "object",
            "required": [ "type", "name", "fields" ],
            "properties": {
                "type": { "enum": [ "record" ] },
                "name": { "$ref": "#/definitions/nameOrNamespace" },
                "nameOrNamespace": { "$ref": "#/definitions/namespace" },
                "doc": { "type": "string" },
                "aliases": { "$ref": "#/definitions/aliases" },
                "fields": {
                    "type": "array",
                    "items": { "$ref": "#/definitions/field" }
                }
            }
        },
        "enum": {
            "description": "an enum as defined by the Avro specification",
            "type": "object",
            "required": [ "type", "name", "symbols" ],
            "properties": {
                "type": { "enum": [ "enum" ] },
                "name": { "$ref": "#/definitions/nameOrNamespace" },
                "nameOrNamespace": { "$ref": "#/definitions/namespace" },
                "aliases": { "$ref": "#/definitions/aliases" },
                "doc": { "type": "string" },
                "symbols": {
                    "type": "array",
                    "minItems": 1,
                    "items": {
                        "type": "string",
                        "minLength": 1,
                        "pattern": "^(?![_\\d])\\w+$"
                    },
                    "uniqueItems": true
                }
            }
        },
        "array": {
            "description": "An array as defined by the Avro specification",
            "notes": [ "spec doesn't say whether \"items\" is required!" ],
            "type": "object",
            "required": [ "type" ],
            "properties": {
                "type": { "enum": [ "array" ] },
                "items": { "$ref": "#" }
            }
        },
        "map": {
            "description": "A map as defined by the Avro specification",
            "notes": [ "spec doesn't say whether \"values\" is required!" ],
            "type": "object",
            "required": [ "type" ],
            "properties": {
                "type": { "enum": [ "map" ] },
                "values": { "$ref": "#" }
            }
        },
        "union": {
            "description": "A union of schemas",
            "type": "array",
            "uniqueItems": true,
            "items": {
                "allOf": [
                    { "$ref": "#" },
                    { "not": { "$ref": "#/definitions/union" } }
                ]
            }
        },
        "fixed": {
            "description": "A fixed type, as defined by the Avro specification",
            "type": "object",
            "required": [ "type", "name", "size" ],
            "properties": {
                "type": { "enum": [ "fixed" ] },
                "name": { "$ref": "#/definitions/nameOrNamespace" },
                "nameOrNamespace": { "$ref": "#/definitions/namespace" },
                "size": {
                    "type": "integer",
                    "minimum": 0,
                    "exclusiveMinimum": true
                },
                "aliases": { "$ref": "#/definitions/aliases" }
            }
        },
        "nameOrNamespace": {
            "description": "what a nameOrNamespace can be",
            "type": "string",
            "pattern": "^[A-Za-z_][A-Za-z0-9_]*(\\.[A-Za-z_][A-Za-z0-9_]*)*$"
        },
        "aliases": {
            "type": "array",
            "minItems": 1,
            "uniqueItems": true,
            "items": {"$ref": "#/definitions/nameOrNamespace" }
        },
        "field": {
            "description": "One field in a record",
            "type": "object",
            "required": [ "name", "type" ],
            "properties": {
                "name": { "$ref": "#/definitions/nameOrNamespace" },
                "doc": { "type": "string" },
                "type": { "$ref": "#" },
                "default": {
                    "description": "default value, depending on the type"
                },
                "order": {
                    "enum": [ "ascending", "descending", "ignore" ]
                },
                "aliases": { "$ref": "#/definitions/aliases" }
            }
        }
    }

};

///////////////////
var generator = new FakeJson(schemaA);
var a = generator.generate();
console.log(a);
