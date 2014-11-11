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