/*eslint no-console: 0, no-unused-vars: 0*/
"use strict";

const express = require("express");

var app = express();

app.get("/", function (req, res) {

	const bpService = require("@sap/cloud-sdk-vdm-business-partner-service");

	function getAllBusinessPartners() {
		return bpService.BusinessPartner.requestBuilder()
			.getAll()
			.top(10)
			.select(
				bpService.BusinessPartner.BUSINESS_PARTNER,
				bpService.BusinessPartner.FIRST_NAME,
				bpService.BusinessPartner.LAST_NAME
			)
			.filter(
				bpService.BusinessPartner.FIRST_NAME.equals("John")
			)
			
			.withCustomHeaders({
				"APIKey": "tyysDyd3MpHiV5AcChVbkdN4k38sT5Ep"
			})
			.execute({
				url: "https://sandbox.api.sap.com/s4hanacloud"
			
			/*
			.execute({
				destinationName: "S4"
			*/
			})
	};

	getAllBusinessPartners()
		.then(results => {
			res.status(200).json(results);
		})
		.catch(error => {
			res.status(500).send(error.message);
		});

});

var server = require("http").createServer();
var port = process.env.PORT || 3000;

server.on("request", app);

server.listen(port, function () {
	console.info("srv: " + server.address().port);
});