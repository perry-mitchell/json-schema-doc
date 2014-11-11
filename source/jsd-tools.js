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

})(window.JSONSchemaDoc);