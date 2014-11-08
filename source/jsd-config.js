(function(namespace) {

	"use strict";

	var Config = {
		Types: {
			TYPE_ARRAY: "array",
			TYPE_BOOLEAN: "boolean",
			TYPE_INTEGER: "integer",
			TYPE_NULL: "null",
			TYPE_NUMBER: "number",
			TYPE_OBJECT: "object",
			TYPE_STRING: "string"
		}
	};

	Config.PrimitiveTypes = [];
	(function(p, t) {
		p.push(
			t.TYPE_ARRAY,
			t.TYPE_BOOLEAN,
			t.TYPE_INTEGER,
			t.TYPE_NULL,
			t.TYPE_NUMBER,
			t.TYPE_OBJECT,
			t.TYPE_STRING
		);
	})(Config.PrimitiveTypes, Config.Types);

	namespace.Config = Config;

})(window.JSONSchemaDoc);