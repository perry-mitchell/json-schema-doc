module.exports = function(grunt) {

	var globalConfig = {
		filenameBase: "json-schema-doc.js",
		filenameMin: "json-schema-doc.min.js"
	};

	// Files in dependency order
	var jsFiles = [
		"jsd-init.js",
		"jsd-config.js",
		"jsd-tools.js",
		"render/JSDJSONRenderer.js",
		"core/JSONSchemaInstance.js",
		"core/JSONSchema.js"
	];

	// Add directory for files
	for (var i = 0; i < jsFiles.length; i += 1) {
		jsFiles[i] = "source/" + jsFiles[i];
	}

	// Grunt
	grunt.initConfig({
		closurecompiler: {
			minify: {
				files: {
					"build/<%= globalConfig.filenameMin %>": ["build/<%= globalConfig.filenameBase %>"]
				},
				options: {
					"compilation_level": "SIMPLE_OPTIMIZATIONS"
				}
			}
		},
		concat: {
			options: {
				separator: ";\n"
			},
			dist: {
				src: jsFiles,
				dest: "build/<%= globalConfig.filenameBase %>"
			}
		},
		globalConfig: globalConfig,
		jasmine: {
			main: {
				src: "build/<%= globalConfig.filenameBase %>",
				options: {
					specs: "test/specs/*.js"
				}
			}
		},
		pkg: grunt.file.readJSON("package.json"),
		replace: {
			version: {
				src: "build/<%= globalConfig.filenameBase %>",
				overwrite: true,
				replacements: [
					{
						from: /{JSD_VERSION}/g,
						to: "<%= pkg.version %>"
					}
				]
			}
		}
	});

	require('time-grunt')(grunt);

	grunt.loadNpmTasks('grunt-closurecompiler');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-text-replace');

	grunt.registerTask("default", "Default task", function() {
		grunt.log.writeln("JSON Schema Doc - Grunt manifest");
	});

	grunt.registerTask("build", ["concat", "replace:version", "closurecompiler:minify"]);

	grunt.registerTask("test", ["concat", "jasmine"]);

};
