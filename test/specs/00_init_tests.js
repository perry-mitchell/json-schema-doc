describe("JSONSchema Initialisation", function() {

	it("builds namespace", function() {
		expect(window.JSONSchemaDoc).toBeDefined();
		expect(typeof window.JSONSchemaDoc).toBe("object");
	});

});