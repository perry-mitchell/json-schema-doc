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



})(window.JSONSchemaDoc);