(function(global) {

	"use strict";

	global.JSONSchemaDoc = {
		version : "0.1.1"
	};

})(window);;
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

})(window.JSONSchemaDoc);;
(function(namespace) {

	"use strict";

	namespace.Tools = {

		argumentsToArray: function(args) {
			return Array.prototype.slice.call(args, 0);
		},

		generateIndentation: function(str, amount) {
			if (amount > 0) {
				var ind = "";
				while (amount > 0) {
					amount -= 1;
					ind += str;
				}
				return ind;
			} else {
				return "";
			}
		},

		isArray: function(item) {
			return (Object.prototype.toString.call(item) === "[object Array]");
		}

	};

})(window.JSONSchemaDoc);;
(function(namespace) {

	"use strict";

	namespace.JSDJSONRenderer = function() {
		
	};

	namespace.JSDJSONRenderer.prototype.closing = function() {
		return '}';
	};

	namespace.JSDJSONRenderer.prototype.footer = function() {
		return '' +
			'	' + this.closing() +
			'</div>';
	};

	namespace.JSDJSONRenderer.prototype.header = function() {
		return '' +
			'<div class="json-schema-doc">' +
			'	' + this.opening();
	};

	namespace.JSDJSONRenderer.prototype.indentation = function() {
		return "\t";
	};

	namespace.JSDJSONRenderer.prototype.opening = function() {
		return '{';
	};

	namespace.JSDJSONRenderer.prototype.filterLine = function(line) {
		return '<pre>' + line + '</pre>' + "\n";
	};

	namespace.JSDJSONRenderer.prototype.filterTitle = function(title) {
		return '"' + title + '"';
	};

})(window.JSONSchemaDoc);;
(function(namespace) {

	"use strict";

	function processInstance() {
		this.title = this._structure.title || "";
		this.type = this._structure.type || namespace.Config.Types.TYPE_OBJECT;
		this.required = this._structure.required || [];
		this.properties = this._structure.properties || {};
	}

	namespace.JSONSchemaInstance = function(structure) {
		this._structure = structure;

		processInstance.call(this);
	};



})(window.JSONSchemaDoc);;
(function(namespace) {

	"use strict";

	function getRendererProperty(renderer, property, args) {
		args = args || [];
		if (!namespace.Tools.isArray(args)) {
			args = [args];
		}
		if (renderer[property]) {
			if (typeof renderer[property] === "function") {
				return renderer[property].apply(renderer, args);
			} else if (typeof renderer[property] === "object") {
				return renderer[property];
			}
		}
		return "";
	}

	namespace.JSONSchema = function(structure, level) {
		this._structure = structure;
		this._level = level || 1;

		this.item = new namespace.JSONSchemaInstance(structure);

		this._renderer = new namespace.JSDJSONRenderer();
	};

	namespace.JSONSchema.prototype.generateLine = function(text) {
		return getRendererProperty(this._renderer, "filterLine", text);
	};

	namespace.JSONSchema.prototype.getLevel = function() {
		return this._level;
	};

	namespace.JSONSchema.prototype.render = function() {
		var output = "",
			indent = getRendererProperty(this._renderer, "indentation"),
			title = getRendererProperty(this._renderer, "filterTitle", this.item.title);
		// render
		output += this.generateLine(
			namespace.Tools.generateIndentation(indent, this.getLevel() - 1) +
			getRendererProperty(this._renderer, "opening")
		);
		output += this.generateLine(
			namespace.Tools.generateIndentation(indent, this.getLevel()) +
			title
		);
		output += this.generateLine(
			namespace.Tools.generateIndentation(indent, this.getLevel() - 1) +
			getRendererProperty(this._renderer, "closing")
		);
		// properties
		var properties = this.item.properties;
		for (var propKey in properties) {
			if (properties.hasOwnProperty(propKey)) {
				var subObj = properties[propKey];
				if (!subObj.hasOwnProperty("title")) {
					subObj.title = propKey;
				}
				var schema = new namespace.JSONSchema(subObj, this.getLevel() + 1);
				output += schema.render();
			}
		}
		// out
		return output;
	};

	namespace.JSONSchema.prototype.setRenderer = function(rend) {
		this._renderer = rend;
	};

})(window.JSONSchemaDoc);