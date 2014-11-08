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

})(window.JSONSchemaDoc);