(function(namespace) {

	"use strict";

	namespace.Tools = {

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
		}

	};

})(window.JSONSchemaDoc);