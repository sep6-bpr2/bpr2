// @ts-nocheck
require('dotenv').config()
process.env.GCPDBUSER = "testing" // Initialize testing env
const ordersModel = require('../../models/orders')
const ordersService = require('../../services/orders')
const sinon = require('sinon')

let finishedOrder = {
	"id": "47827",
	"description": "Panelfilter 390x300x47",
	"categoryCode": "32110",
	"status": "incomplete",
	"deadline": "2022-06-12",
	"location": "Denmark, Give",
	"quantity": 240,
	"attributes": [
		{
			"name": "Højde",
			"type": 3,
			"units": "mm",
			"value": "300.00",
			"id": 3
		},
		{
			"name": "Bredde",
			"type": 3,
			"units": "mm",
			"value": "390.00",
			"id": 4
		},
		{ "name": "Dybde", "type": 3, "units": "mm", "value": "47", "id": 49 },
		{
			"name": "ISO 16890",
			"type": 0,
			"units": null,
			"value": "ISO ePM10 50%",
			"id": 51
		},
		{
			"name": "Webshop",
			"type": 0,
			"units": null,
			"value": "Ja",
			"id": 70
		},
		{
			"name": "Paneltype",
			"type": 0,
			"units": null,
			"value": "Z-line",
			"id": 104
		},
		{
			"name": "Ramme (panelfilter)",
			"type": 0,
			"units": null,
			"value": "Fiber",
			"id": 109
		},
		{
			"name": "Number example",
			"type": 3,
			"units": "mm",
			"value": "290.00",
			"id": 110
		},
		{
			"name": "Text example",
			"type": 0,
			"units": null,
			"value": "ISO e",
			"id": 111
		},
		{
			"name": "Option example",
			"type": 0,
			"units": null,
			"value": "Fiber glass",
			"id": 112
		}
	],
	"qaReportId": 1,
	"controlPoints": [
		{
			"id": 1,
			"frequencyId": 1,
			"type": 3,
			"lowerTolerance": null,
			"upperTolerance": null,
			"controlPointType": 1,
			"author": "taken",
			"connectionId": 11,
			"answer": "4",
			"attributes": [{ "id": 3, "maxValue": null, "minValue": null }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 1,
					"to25": 23,
					"to50": 2,
					"to100": 343,
					"to200": 5,
					"to300": 5,
					"to500": 6,
					"to700": 66,
					"to1000": 7,
					"to1500": 5,
					"to2000": 76,
					"to3000": 76,
					"to4000": 766,
					"to5000": 69
				}
			],
			"expectedValue": "300.00",
			"units": "mm",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": ""
		},
		{
			"id": 2,
			"frequencyId": 1,
			"type": 3,
			"lowerTolerance": 1,
			"upperTolerance": 1,
			"controlPointType": 1,
			"author": "taken",
			"connectionId": 12,
			"answer": "4",
			"attributes": [{ "id": 4, "maxValue": 400, "minValue": 300 }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 1,
					"to25": 23,
					"to50": 2,
					"to100": 343,
					"to200": 5,
					"to300": 5,
					"to500": 6,
					"to700": 66,
					"to1000": 7,
					"to1500": 5,
					"to2000": 76,
					"to3000": 76,
					"to4000": 766,
					"to5000": 69
				}
			],
			"expectedValue": "390.00",
			"units": "mm",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": "+/-1mm"
		},
		{
			"id": 3,
			"frequencyId": 1,
			"type": 3,
			"lowerTolerance": 1,
			"upperTolerance": 6,
			"controlPointType": 1,
			"author": "taken",
			"connectionId": 13,
			"answer": "4",
			"attributes": [{ "id": 49, "maxValue": 50, "minValue": 30 }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 1,
					"to25": 23,
					"to50": 2,
					"to100": 343,
					"to200": 5,
					"to300": 5,
					"to500": 6,
					"to700": 66,
					"to1000": 7,
					"to1500": 5,
					"to2000": 76,
					"to3000": 76,
					"to4000": 766,
					"to5000": 69
				}
			],
			"expectedValue": "47",
			"units": "mm",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": "+6/-1mm"
		},
		{
			"id": 4,
			"frequencyId": 1,
			"type": 1,
			"lowerTolerance": null,
			"upperTolerance": null,
			"controlPointType": 1,
			"author": "taken",
			"connectionId": 14,
			"answer": "temp",
			"attributes": [{ "id": 51, "maxValue": null, "minValue": null }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 1,
					"to25": 23,
					"to50": 2,
					"to100": 343,
					"to200": 5,
					"to300": 5,
					"to500": 6,
					"to700": 66,
					"to1000": 7,
					"to1500": 5,
					"to2000": 76,
					"to3000": 76,
					"to4000": 766,
					"to5000": 69
				}
			],
			"expectedValue": "ISO ePM10 50%",
			"units": "Text",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": ""
		},
		{
			"id": 5,
			"frequencyId": 1,
			"type": 0,
			"lowerTolerance": null,
			"upperTolerance": null,
			"controlPointType": 1,
			"author": "taken",
			"connectionId": 15,
			"answer": "Yes",
			"attributes": [{ "id": 70, "maxValue": null, "minValue": null }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 1,
					"to25": 23,
					"to50": 2,
					"to100": 343,
					"to200": 5,
					"to300": 5,
					"to500": 6,
					"to700": 66,
					"to1000": 7,
					"to1500": 5,
					"to2000": 76,
					"to3000": 76,
					"to4000": 766,
					"to5000": 69
				}
			],
			"options": [
				{ "id": 1, "controlPointId": 5, "value": "Yes" },
				{ "id": 2, "controlPointId": 5, "value": "No" }
			],
			"expectedValue": "Ja",
			"units": "Yes/No",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": ""
		},
		{
			"id": 6,
			"frequencyId": 1,
			"type": 0,
			"lowerTolerance": null,
			"upperTolerance": null,
			"controlPointType": 1,
			"author": "taken",
			"connectionId": 16,
			"answer": "Yes",
			"attributes": [{ "id": 104, "maxValue": null, "minValue": null }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 1,
					"to25": 23,
					"to50": 2,
					"to100": 343,
					"to200": 5,
					"to300": 5,
					"to500": 6,
					"to700": 66,
					"to1000": 7,
					"to1500": 5,
					"to2000": 76,
					"to3000": 76,
					"to4000": 766,
					"to5000": 69
				}
			],
			"options": [
				{ "id": 3, "controlPointId": 6, "value": "Yes" },
				{ "id": 4, "controlPointId": 6, "value": "No" }
			],
			"expectedValue": "Z-line",
			"units": "Yes/No",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": ""
		},
		{
			"id": 7,
			"frequencyId": 1,
			"type": 0,
			"lowerTolerance": null,
			"upperTolerance": null,
			"controlPointType": 1,
			"author": "taken",
			"connectionId": 17,
			"answer": "Yes",
			"attributes": [{ "id": 109, "maxValue": null, "minValue": null }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 1,
					"to25": 23,
					"to50": 2,
					"to100": 343,
					"to200": 5,
					"to300": 5,
					"to500": 6,
					"to700": 66,
					"to1000": 7,
					"to1500": 5,
					"to2000": 76,
					"to3000": 76,
					"to4000": 766,
					"to5000": 69
				}
			],
			"options": [
				{ "id": 5, "controlPointId": 7, "value": "Yes" },
				{ "id": 6, "controlPointId": 7, "value": "No" }
			],
			"expectedValue": "Fiber",
			"units": "Yes/No",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": ""
		},
		{
			"id": 8,
			"frequencyId": 1,
			"type": 3,
			"lowerTolerance": 1,
			"upperTolerance": 6,
			"controlPointType": 0,
			"author": "taken",
			"connectionId": 39,
			"answer": "3",
			"attributes": [{ "id": 4, "maxValue": 400, "minValue": 300 }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 1,
					"to25": 23,
					"to50": 2,
					"to100": 343,
					"to200": 5,
					"to300": 5,
					"to500": 6,
					"to700": 66,
					"to1000": 7,
					"to1500": 5,
					"to2000": 76,
					"to3000": 76,
					"to4000": 766,
					"to5000": 69
				}
			],
			"expectedValue": "390.00",
			"units": "mm",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": "+6/-1mm",
			"letter": "A"
		},
		{
			"id": 9,
			"frequencyId": 1,
			"type": 1,
			"lowerTolerance": null,
			"upperTolerance": null,
			"controlPointType": 0,
			"author": "taken",
			"connectionId": 44,
			"answer": "temp2",
			"attributes": [{ "id": 51, "maxValue": null, "minValue": null }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 1,
					"to25": 23,
					"to50": 2,
					"to100": 343,
					"to200": 5,
					"to300": 5,
					"to500": 6,
					"to700": 66,
					"to1000": 7,
					"to1500": 5,
					"to2000": 76,
					"to3000": 76,
					"to4000": 766,
					"to5000": 69
				}
			],
			"expectedValue": "ISO ePM10 50%",
			"units": "Text",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": "",
			"letter": "B"
		},
		{
			"id": 10,
			"frequencyId": 2,
			"type": 0,
			"lowerTolerance": null,
			"upperTolerance": null,
			"controlPointType": 0,
			"author": "taken",
			"connectionId": 51,
			"answer": "Yes",
			"attributes": [{ "id": 109, "maxValue": null, "minValue": null }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 2,
					"to25": 25,
					"to50": 5,
					"to100": 345,
					"to200": 7,
					"to300": 7,
					"to500": 8,
					"to700": 68,
					"to1000": 9,
					"to1500": 7,
					"to2000": 78,
					"to3000": 78,
					"to4000": 768,
					"to5000": 71
				}
			],
			"options": [
				{ "id": 7, "controlPointId": 10, "value": "Yes" },
				{ "id": 8, "controlPointId": 10, "value": "No" }
			],
			"expectedValue": "Fiber",
			"units": "Yes/No",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": "",
			"letter": "C"
		}
	],
	"oneTimeControlPoints": [
		{
			"id": 1,
			"frequencyId": 1,
			"type": 3,
			"lowerTolerance": null,
			"upperTolerance": null,
			"controlPointType": 1,
			"author": "taken",
			"connectionId": 11,
			"answer": "4",
			"attributes": [{ "id": 3, "maxValue": null, "minValue": null }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 1,
					"to25": 23,
					"to50": 2,
					"to100": 343,
					"to200": 5,
					"to300": 5,
					"to500": 6,
					"to700": 66,
					"to1000": 7,
					"to1500": 5,
					"to2000": 76,
					"to3000": 76,
					"to4000": 766,
					"to5000": 69
				}
			],
			"expectedValue": "300.00",
			"units": "mm",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": ""
		},
		{
			"id": 2,
			"frequencyId": 1,
			"type": 3,
			"lowerTolerance": 1,
			"upperTolerance": 1,
			"controlPointType": 1,
			"author": "taken",
			"connectionId": 12,
			"answer": "4",
			"attributes": [{ "id": 4, "maxValue": 400, "minValue": 300 }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 1,
					"to25": 23,
					"to50": 2,
					"to100": 343,
					"to200": 5,
					"to300": 5,
					"to500": 6,
					"to700": 66,
					"to1000": 7,
					"to1500": 5,
					"to2000": 76,
					"to3000": 76,
					"to4000": 766,
					"to5000": 69
				}
			],
			"expectedValue": "390.00",
			"units": "mm",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": "+/-1mm"
		},
		{
			"id": 3,
			"frequencyId": 1,
			"type": 3,
			"lowerTolerance": 1,
			"upperTolerance": 6,
			"controlPointType": 1,
			"author": "taken",
			"connectionId": 13,
			"answer": "4",
			"attributes": [{ "id": 49, "maxValue": 50, "minValue": 30 }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 1,
					"to25": 23,
					"to50": 2,
					"to100": 343,
					"to200": 5,
					"to300": 5,
					"to500": 6,
					"to700": 66,
					"to1000": 7,
					"to1500": 5,
					"to2000": 76,
					"to3000": 76,
					"to4000": 766,
					"to5000": 69
				}
			],
			"expectedValue": "47",
			"units": "mm",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": "+6/-1mm"
		},
		{
			"id": 4,
			"frequencyId": 1,
			"type": 1,
			"lowerTolerance": null,
			"upperTolerance": null,
			"controlPointType": 1,
			"author": "taken",
			"connectionId": 14,
			"answer": "temp",
			"attributes": [{ "id": 51, "maxValue": null, "minValue": null }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 1,
					"to25": 23,
					"to50": 2,
					"to100": 343,
					"to200": 5,
					"to300": 5,
					"to500": 6,
					"to700": 66,
					"to1000": 7,
					"to1500": 5,
					"to2000": 76,
					"to3000": 76,
					"to4000": 766,
					"to5000": 69
				}
			],
			"expectedValue": "ISO ePM10 50%",
			"units": "Text",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": ""
		},
		{
			"id": 5,
			"frequencyId": 1,
			"type": 0,
			"lowerTolerance": null,
			"upperTolerance": null,
			"controlPointType": 1,
			"author": "taken",
			"connectionId": 15,
			"answer": "Yes",
			"attributes": [{ "id": 70, "maxValue": null, "minValue": null }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 1,
					"to25": 23,
					"to50": 2,
					"to100": 343,
					"to200": 5,
					"to300": 5,
					"to500": 6,
					"to700": 66,
					"to1000": 7,
					"to1500": 5,
					"to2000": 76,
					"to3000": 76,
					"to4000": 766,
					"to5000": 69
				}
			],
			"options": [
				{ "id": 1, "controlPointId": 5, "value": "Yes" },
				{ "id": 2, "controlPointId": 5, "value": "No" }
			],
			"expectedValue": "Ja",
			"units": "Yes/No",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": ""
		},
		{
			"id": 6,
			"frequencyId": 1,
			"type": 0,
			"lowerTolerance": null,
			"upperTolerance": null,
			"controlPointType": 1,
			"author": "taken",
			"connectionId": 16,
			"answer": "Yes",
			"attributes": [{ "id": 104, "maxValue": null, "minValue": null }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 1,
					"to25": 23,
					"to50": 2,
					"to100": 343,
					"to200": 5,
					"to300": 5,
					"to500": 6,
					"to700": 66,
					"to1000": 7,
					"to1500": 5,
					"to2000": 76,
					"to3000": 76,
					"to4000": 766,
					"to5000": 69
				}
			],
			"options": [
				{ "id": 3, "controlPointId": 6, "value": "Yes" },
				{ "id": 4, "controlPointId": 6, "value": "No" }
			],
			"expectedValue": "Z-line",
			"units": "Yes/No",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": ""
		},
		{
			"id": 7,
			"frequencyId": 1,
			"type": 0,
			"lowerTolerance": null,
			"upperTolerance": null,
			"controlPointType": 1,
			"author": "taken",
			"connectionId": 17,
			"answer": "Yes",
			"attributes": [{ "id": 109, "maxValue": null, "minValue": null }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 1,
					"to25": 23,
					"to50": 2,
					"to100": 343,
					"to200": 5,
					"to300": 5,
					"to500": 6,
					"to700": 66,
					"to1000": 7,
					"to1500": 5,
					"to2000": 76,
					"to3000": 76,
					"to4000": 766,
					"to5000": 69
				}
			],
			"options": [
				{ "id": 5, "controlPointId": 7, "value": "Yes" },
				{ "id": 6, "controlPointId": 7, "value": "No" }
			],
			"expectedValue": "Fiber",
			"units": "Yes/No",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": ""
		}
	],
	"multipleTimeControlPoints": [
		{
			"id": 8,
			"frequencyId": 1,
			"type": 3,
			"lowerTolerance": 1,
			"upperTolerance": 6,
			"controlPointType": 0,
			"author": "taken",
			"connectionId": 39,
			"answer": "3",
			"attributes": [{ "id": 4, "maxValue": 400, "minValue": 300 }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 1,
					"to25": 23,
					"to50": 2,
					"to100": 343,
					"to200": 5,
					"to300": 5,
					"to500": 6,
					"to700": 66,
					"to1000": 7,
					"to1500": 5,
					"to2000": 76,
					"to3000": 76,
					"to4000": 766,
					"to5000": 69
				}
			],
			"expectedValue": "390.00",
			"units": "mm",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": "+6/-1mm",
			"letter": "A"
		},
		{
			"id": 9,
			"frequencyId": 1,
			"type": 1,
			"lowerTolerance": null,
			"upperTolerance": null,
			"controlPointType": 0,
			"author": "taken",
			"connectionId": 44,
			"answer": "temp2",
			"attributes": [{ "id": 51, "maxValue": null, "minValue": null }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 1,
					"to25": 23,
					"to50": 2,
					"to100": 343,
					"to200": 5,
					"to300": 5,
					"to500": 6,
					"to700": 66,
					"to1000": 7,
					"to1500": 5,
					"to2000": 76,
					"to3000": 76,
					"to4000": 766,
					"to5000": 69
				}
			],
			"expectedValue": "ISO ePM10 50%",
			"units": "Text",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": "",
			"letter": "B"
		},
		{
			"id": 10,
			"frequencyId": 2,
			"type": 0,
			"lowerTolerance": null,
			"upperTolerance": null,
			"controlPointType": 0,
			"author": "taken",
			"connectionId": 51,
			"answer": "Yes",
			"attributes": [{ "id": 109, "maxValue": null, "minValue": null }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 2,
					"to25": 25,
					"to50": 5,
					"to100": 345,
					"to200": 7,
					"to300": 7,
					"to500": 8,
					"to700": 68,
					"to1000": 9,
					"to1500": 7,
					"to2000": 78,
					"to3000": 78,
					"to4000": 768,
					"to5000": 71
				}
			],
			"options": [
				{ "id": 7, "controlPointId": 10, "value": "Yes" },
				{ "id": 8, "controlPointId": 10, "value": "No" }
			],
			"expectedValue": "Fiber",
			"units": "Yes/No",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": "",
			"letter": "C"
		}
	],
	"multipleTimeAnswers": [
		[
			{
				"connectionId": 35,
				"id": 8,
				"answer": "3",
				"type": 3,
				"author": "taken"
			},
			{
				"connectionId": 36,
				"id": 8,
				"answer": "3",
				"type": 3,
				"author": "taken"
			},
			{
				"connectionId": 37,
				"id": 8,
				"answer": "3",
				"type": 3,
				"author": "taken"
			},
			{
				"connectionId": 38,
				"id": 8,
				"answer": "3",
				"type": 3,
				"author": "taken"
			},
			{
				"connectionId": 39,
				"id": 8,
				"answer": "3",
				"type": 3,
				"author": "taken"
			}
		],
		[
			{
				"connectionId": 40,
				"id": 9,
				"answer": "temp2",
				"type": 1,
				"author": "taken"
			},
			{
				"connectionId": 41,
				"id": 9,
				"answer": "temp2",
				"type": 1,
				"author": "taken"
			},
			{
				"connectionId": 42,
				"id": 9,
				"answer": "temp2",
				"type": 1,
				"author": "taken"
			},
			{
				"connectionId": 43,
				"id": 9,
				"answer": "temp2",
				"type": 1,
				"author": "taken"
			},
			{
				"connectionId": 44,
				"id": 9,
				"answer": "temp2",
				"type": 1,
				"author": "taken"
			}
		],
		[
			{
				"connectionId": 45,
				"id": 10,
				"answer": "Yes",
				"type": 0,
				"author": "taken"
			},
			{
				"connectionId": 46,
				"id": 10,
				"answer": "Yes",
				"type": 0,
				"author": "taken"
			},
			{
				"connectionId": 47,
				"id": 10,
				"answer": "Yes",
				"type": 0,
				"author": "taken"
			},
			{
				"connectionId": 48,
				"id": 10,
				"answer": "Yes",
				"type": 0,
				"author": "taken"
			},
			{
				"connectionId": 49,
				"id": 10,
				"answer": "Yes",
				"type": 0,
				"author": "taken"
			},
			{
				"connectionId": 50,
				"id": 10,
				"answer": "Yes",
				"type": 0,
				"author": "taken"
			},
			{
				"connectionId": 51,
				"id": 10,
				"answer": "Yes",
				"type": 0,
				"author": "taken"
			}
		]
	]
}

let finishedOrderAuthorMain = {
	"id": "47827",
	"description": "Panelfilter 390x300x47",
	"categoryCode": "32110",
	"status": "incomplete",
	"deadline": "2022-06-12",
	"location": "Denmark, Give",
	"quantity": 240,
	"attributes": [
		{
			"name": "Højde",
			"type": 3,
			"units": "mm",
			"value": "300.00",
			"id": 3
		},
		{
			"name": "Bredde",
			"type": 3,
			"units": "mm",
			"value": "390.00",
			"id": 4
		},
		{ "name": "Dybde", "type": 3, "units": "mm", "value": "47", "id": 49 },
		{
			"name": "ISO 16890",
			"type": 0,
			"units": null,
			"value": "ISO ePM10 50%",
			"id": 51
		},
		{
			"name": "Webshop",
			"type": 0,
			"units": null,
			"value": "Ja",
			"id": 70
		},
		{
			"name": "Paneltype",
			"type": 0,
			"units": null,
			"value": "Z-line",
			"id": 104
		},
		{
			"name": "Ramme (panelfilter)",
			"type": 0,
			"units": null,
			"value": "Fiber",
			"id": 109
		},
		{
			"name": "Number example",
			"type": 3,
			"units": "mm",
			"value": "290.00",
			"id": 110
		},
		{
			"name": "Text example",
			"type": 0,
			"units": null,
			"value": "ISO e",
			"id": 111
		},
		{
			"name": "Option example",
			"type": 0,
			"units": null,
			"value": "Fiber glass",
			"id": 112
		}
	],
	"qaReportId": 1,
	"controlPoints": [
		{
			"id": 1,
			"frequencyId": 1,
			"type": 3,
			"lowerTolerance": null,
			"upperTolerance": null,
			"controlPointType": 1,
			"author": "worker",
			"connectionId": 11,
			"answer": "4",
			"attributes": [{ "id": 3, "maxValue": null, "minValue": null }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 1,
					"to25": 23,
					"to50": 2,
					"to100": 343,
					"to200": 5,
					"to300": 5,
					"to500": 6,
					"to700": 66,
					"to1000": 7,
					"to1500": 5,
					"to2000": 76,
					"to3000": 76,
					"to4000": 766,
					"to5000": 69
				}
			],
			"expectedValue": "300.00",
			"units": "mm",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": ""
		},
		{
			"id": 2,
			"frequencyId": 1,
			"type": 3,
			"lowerTolerance": 1,
			"upperTolerance": 1,
			"controlPointType": 1,
			"author": "worker",
			"connectionId": 12,
			"answer": "4",
			"attributes": [{ "id": 4, "maxValue": 400, "minValue": 300 }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 1,
					"to25": 23,
					"to50": 2,
					"to100": 343,
					"to200": 5,
					"to300": 5,
					"to500": 6,
					"to700": 66,
					"to1000": 7,
					"to1500": 5,
					"to2000": 76,
					"to3000": 76,
					"to4000": 766,
					"to5000": 69
				}
			],
			"expectedValue": "390.00",
			"units": "mm",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": "+/-1mm"
		},
		{
			"id": 3,
			"frequencyId": 1,
			"type": 3,
			"lowerTolerance": 1,
			"upperTolerance": 6,
			"controlPointType": 1,
			"author": "worker",
			"connectionId": 13,
			"answer": "4",
			"attributes": [{ "id": 49, "maxValue": 50, "minValue": 30 }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 1,
					"to25": 23,
					"to50": 2,
					"to100": 343,
					"to200": 5,
					"to300": 5,
					"to500": 6,
					"to700": 66,
					"to1000": 7,
					"to1500": 5,
					"to2000": 76,
					"to3000": 76,
					"to4000": 766,
					"to5000": 69
				}
			],
			"expectedValue": "47",
			"units": "mm",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": "+6/-1mm"
		},
		{
			"id": 4,
			"frequencyId": 1,
			"type": 1,
			"lowerTolerance": null,
			"upperTolerance": null,
			"controlPointType": 1,
			"author": "worker",
			"connectionId": 14,
			"answer": "temp",
			"attributes": [{ "id": 51, "maxValue": null, "minValue": null }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 1,
					"to25": 23,
					"to50": 2,
					"to100": 343,
					"to200": 5,
					"to300": 5,
					"to500": 6,
					"to700": 66,
					"to1000": 7,
					"to1500": 5,
					"to2000": 76,
					"to3000": 76,
					"to4000": 766,
					"to5000": 69
				}
			],
			"expectedValue": "ISO ePM10 50%",
			"units": "Text",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": ""
		},
		{
			"id": 5,
			"frequencyId": 1,
			"type": 0,
			"lowerTolerance": null,
			"upperTolerance": null,
			"controlPointType": 1,
			"author": "worker",
			"connectionId": 15,
			"answer": "Yes",
			"attributes": [{ "id": 70, "maxValue": null, "minValue": null }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 1,
					"to25": 23,
					"to50": 2,
					"to100": 343,
					"to200": 5,
					"to300": 5,
					"to500": 6,
					"to700": 66,
					"to1000": 7,
					"to1500": 5,
					"to2000": 76,
					"to3000": 76,
					"to4000": 766,
					"to5000": 69
				}
			],
			"options": [
				{ "id": 1, "controlPointId": 5, "value": "Yes" },
				{ "id": 2, "controlPointId": 5, "value": "No" }
			],
			"expectedValue": "Ja",
			"units": "Yes/No",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": ""
		},
		{
			"id": 6,
			"frequencyId": 1,
			"type": 0,
			"lowerTolerance": null,
			"upperTolerance": null,
			"controlPointType": 1,
			"author": "worker",
			"connectionId": 16,
			"answer": "Yes",
			"attributes": [{ "id": 104, "maxValue": null, "minValue": null }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 1,
					"to25": 23,
					"to50": 2,
					"to100": 343,
					"to200": 5,
					"to300": 5,
					"to500": 6,
					"to700": 66,
					"to1000": 7,
					"to1500": 5,
					"to2000": 76,
					"to3000": 76,
					"to4000": 766,
					"to5000": 69
				}
			],
			"options": [
				{ "id": 3, "controlPointId": 6, "value": "Yes" },
				{ "id": 4, "controlPointId": 6, "value": "No" }
			],
			"expectedValue": "Z-line",
			"units": "Yes/No",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": ""
		},
		{
			"id": 7,
			"frequencyId": 1,
			"type": 0,
			"lowerTolerance": null,
			"upperTolerance": null,
			"controlPointType": 1,
			"author": "worker",
			"connectionId": 17,
			"answer": "Yes",
			"attributes": [{ "id": 109, "maxValue": null, "minValue": null }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 1,
					"to25": 23,
					"to50": 2,
					"to100": 343,
					"to200": 5,
					"to300": 5,
					"to500": 6,
					"to700": 66,
					"to1000": 7,
					"to1500": 5,
					"to2000": 76,
					"to3000": 76,
					"to4000": 766,
					"to5000": 69
				}
			],
			"options": [
				{ "id": 5, "controlPointId": 7, "value": "Yes" },
				{ "id": 6, "controlPointId": 7, "value": "No" }
			],
			"expectedValue": "Fiber",
			"units": "Yes/No",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": ""
		},
		{
			"id": 8,
			"frequencyId": 1,
			"type": 3,
			"lowerTolerance": 1,
			"upperTolerance": 6,
			"controlPointType": 0,
			"author": "worker",
			"connectionId": 39,
			"answer": "3",
			"attributes": [{ "id": 4, "maxValue": 400, "minValue": 300 }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 1,
					"to25": 23,
					"to50": 2,
					"to100": 343,
					"to200": 5,
					"to300": 5,
					"to500": 6,
					"to700": 66,
					"to1000": 7,
					"to1500": 5,
					"to2000": 76,
					"to3000": 76,
					"to4000": 766,
					"to5000": 69
				}
			],
			"expectedValue": "390.00",
			"units": "mm",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": "+6/-1mm",
			"letter": "A"
		},
		{
			"id": 9,
			"frequencyId": 1,
			"type": 1,
			"lowerTolerance": null,
			"upperTolerance": null,
			"controlPointType": 0,
			"author": "worker",
			"connectionId": 44,
			"answer": "temp2",
			"attributes": [{ "id": 51, "maxValue": null, "minValue": null }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 1,
					"to25": 23,
					"to50": 2,
					"to100": 343,
					"to200": 5,
					"to300": 5,
					"to500": 6,
					"to700": 66,
					"to1000": 7,
					"to1500": 5,
					"to2000": 76,
					"to3000": 76,
					"to4000": 766,
					"to5000": 69
				}
			],
			"expectedValue": "ISO ePM10 50%",
			"units": "Text",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": "",
			"letter": "B"
		},
		{
			"id": 10,
			"frequencyId": 2,
			"type": 0,
			"lowerTolerance": null,
			"upperTolerance": null,
			"controlPointType": 0,
			"author": "worker",
			"connectionId": 51,
			"answer": "Yes",
			"attributes": [{ "id": 109, "maxValue": null, "minValue": null }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 2,
					"to25": 25,
					"to50": 5,
					"to100": 345,
					"to200": 7,
					"to300": 7,
					"to500": 8,
					"to700": 68,
					"to1000": 9,
					"to1500": 7,
					"to2000": 78,
					"to3000": 78,
					"to4000": 768,
					"to5000": 71
				}
			],
			"options": [
				{ "id": 7, "controlPointId": 10, "value": "Yes" },
				{ "id": 8, "controlPointId": 10, "value": "No" }
			],
			"expectedValue": "Fiber",
			"units": "Yes/No",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": "",
			"letter": "C"
		}
	],
	"oneTimeControlPoints": [
		{
			"id": 1,
			"frequencyId": 1,
			"type": 3,
			"lowerTolerance": null,
			"upperTolerance": null,
			"controlPointType": 1,
			"author": "worker",
			"connectionId": 11,
			"answer": "4",
			"attributes": [{ "id": 3, "maxValue": null, "minValue": null }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 1,
					"to25": 23,
					"to50": 2,
					"to100": 343,
					"to200": 5,
					"to300": 5,
					"to500": 6,
					"to700": 66,
					"to1000": 7,
					"to1500": 5,
					"to2000": 76,
					"to3000": 76,
					"to4000": 766,
					"to5000": 69
				}
			],
			"expectedValue": "300.00",
			"units": "mm",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": ""
		},
		{
			"id": 2,
			"frequencyId": 1,
			"type": 3,
			"lowerTolerance": 1,
			"upperTolerance": 1,
			"controlPointType": 1,
			"author": "worker",
			"connectionId": 12,
			"answer": "4",
			"attributes": [{ "id": 4, "maxValue": 400, "minValue": 300 }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 1,
					"to25": 23,
					"to50": 2,
					"to100": 343,
					"to200": 5,
					"to300": 5,
					"to500": 6,
					"to700": 66,
					"to1000": 7,
					"to1500": 5,
					"to2000": 76,
					"to3000": 76,
					"to4000": 766,
					"to5000": 69
				}
			],
			"expectedValue": "390.00",
			"units": "mm",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": "+/-1mm"
		},
		{
			"id": 3,
			"frequencyId": 1,
			"type": 3,
			"lowerTolerance": 1,
			"upperTolerance": 6,
			"controlPointType": 1,
			"author": "worker",
			"connectionId": 13,
			"answer": "4",
			"attributes": [{ "id": 49, "maxValue": 50, "minValue": 30 }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 1,
					"to25": 23,
					"to50": 2,
					"to100": 343,
					"to200": 5,
					"to300": 5,
					"to500": 6,
					"to700": 66,
					"to1000": 7,
					"to1500": 5,
					"to2000": 76,
					"to3000": 76,
					"to4000": 766,
					"to5000": 69
				}
			],
			"expectedValue": "47",
			"units": "mm",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": "+6/-1mm"
		},
		{
			"id": 4,
			"frequencyId": 1,
			"type": 1,
			"lowerTolerance": null,
			"upperTolerance": null,
			"controlPointType": 1,
			"author": "worker",
			"connectionId": 14,
			"answer": "temp",
			"attributes": [{ "id": 51, "maxValue": null, "minValue": null }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 1,
					"to25": 23,
					"to50": 2,
					"to100": 343,
					"to200": 5,
					"to300": 5,
					"to500": 6,
					"to700": 66,
					"to1000": 7,
					"to1500": 5,
					"to2000": 76,
					"to3000": 76,
					"to4000": 766,
					"to5000": 69
				}
			],
			"expectedValue": "ISO ePM10 50%",
			"units": "Text",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": ""
		},
		{
			"id": 5,
			"frequencyId": 1,
			"type": 0,
			"lowerTolerance": null,
			"upperTolerance": null,
			"controlPointType": 1,
			"author": "worker",
			"connectionId": 15,
			"answer": "Yes",
			"attributes": [{ "id": 70, "maxValue": null, "minValue": null }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 1,
					"to25": 23,
					"to50": 2,
					"to100": 343,
					"to200": 5,
					"to300": 5,
					"to500": 6,
					"to700": 66,
					"to1000": 7,
					"to1500": 5,
					"to2000": 76,
					"to3000": 76,
					"to4000": 766,
					"to5000": 69
				}
			],
			"options": [
				{ "id": 1, "controlPointId": 5, "value": "Yes" },
				{ "id": 2, "controlPointId": 5, "value": "No" }
			],
			"expectedValue": "Ja",
			"units": "Yes/No",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": ""
		},
		{
			"id": 6,
			"frequencyId": 1,
			"type": 0,
			"lowerTolerance": null,
			"upperTolerance": null,
			"controlPointType": 1,
			"author": "worker",
			"connectionId": 16,
			"answer": "Yes",
			"attributes": [{ "id": 104, "maxValue": null, "minValue": null }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 1,
					"to25": 23,
					"to50": 2,
					"to100": 343,
					"to200": 5,
					"to300": 5,
					"to500": 6,
					"to700": 66,
					"to1000": 7,
					"to1500": 5,
					"to2000": 76,
					"to3000": 76,
					"to4000": 766,
					"to5000": 69
				}
			],
			"options": [
				{ "id": 3, "controlPointId": 6, "value": "Yes" },
				{ "id": 4, "controlPointId": 6, "value": "No" }
			],
			"expectedValue": "Z-line",
			"units": "Yes/No",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": ""
		},
		{
			"id": 7,
			"frequencyId": 1,
			"type": 0,
			"lowerTolerance": null,
			"upperTolerance": null,
			"controlPointType": 1,
			"author": "worker",
			"connectionId": 17,
			"answer": "Yes",
			"attributes": [{ "id": 109, "maxValue": null, "minValue": null }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 1,
					"to25": 23,
					"to50": 2,
					"to100": 343,
					"to200": 5,
					"to300": 5,
					"to500": 6,
					"to700": 66,
					"to1000": 7,
					"to1500": 5,
					"to2000": 76,
					"to3000": 76,
					"to4000": 766,
					"to5000": 69
				}
			],
			"options": [
				{ "id": 5, "controlPointId": 7, "value": "Yes" },
				{ "id": 6, "controlPointId": 7, "value": "No" }
			],
			"expectedValue": "Fiber",
			"units": "Yes/No",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": ""
		}
	],
	"multipleTimeControlPoints": [
		{
			"id": 8,
			"frequencyId": 1,
			"type": 3,
			"lowerTolerance": 1,
			"upperTolerance": 6,
			"controlPointType": 0,
			"author": "worker",
			"connectionId": 39,
			"answer": "3",
			"attributes": [{ "id": 4, "maxValue": 400, "minValue": 300 }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 1,
					"to25": 23,
					"to50": 2,
					"to100": 343,
					"to200": 5,
					"to300": 5,
					"to500": 6,
					"to700": 66,
					"to1000": 7,
					"to1500": 5,
					"to2000": 76,
					"to3000": 76,
					"to4000": 766,
					"to5000": 69
				}
			],
			"expectedValue": "390.00",
			"units": "mm",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": "+6/-1mm",
			"letter": "A"
		},
		{
			"id": 9,
			"frequencyId": 1,
			"type": 1,
			"lowerTolerance": null,
			"upperTolerance": null,
			"controlPointType": 0,
			"author": "worker",
			"connectionId": 44,
			"answer": "temp2",
			"attributes": [{ "id": 51, "maxValue": null, "minValue": null }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 1,
					"to25": 23,
					"to50": 2,
					"to100": 343,
					"to200": 5,
					"to300": 5,
					"to500": 6,
					"to700": 66,
					"to1000": 7,
					"to1500": 5,
					"to2000": 76,
					"to3000": 76,
					"to4000": 766,
					"to5000": 69
				}
			],
			"expectedValue": "ISO ePM10 50%",
			"units": "Text",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": "",
			"letter": "B"
		},
		{
			"id": 10,
			"frequencyId": 2,
			"type": 0,
			"lowerTolerance": null,
			"upperTolerance": null,
			"controlPointType": 0,
			"author": "worker",
			"connectionId": 51,
			"answer": "Yes",
			"attributes": [{ "id": 109, "maxValue": null, "minValue": null }],
			"descriptions": "",
			"description": "This is a description",
			"frequency": [
				{
					"id": 2,
					"to25": 25,
					"to50": 5,
					"to100": 345,
					"to200": 7,
					"to300": 7,
					"to500": 8,
					"to700": 68,
					"to1000": 9,
					"to1500": 7,
					"to2000": 78,
					"to3000": 78,
					"to4000": 768,
					"to5000": 71
				}
			],
			"options": [
				{ "id": 7, "controlPointId": 10, "value": "Yes" },
				{ "id": 8, "controlPointId": 10, "value": "No" }
			],
			"expectedValue": "Fiber",
			"units": "Yes/No",
			"image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
			"toleranceText": "",
			"letter": "C"
		}
	],
	"multipleTimeAnswers": [
		[
			{
				"connectionId": 35,
				"id": 8,
				"answer": "3",
				"type": 3,
				"author": "worker"
			},
			{
				"connectionId": 36,
				"id": 8,
				"answer": "3",
				"type": 3,
				"author": "worker"
			},
			{
				"connectionId": 37,
				"id": 8,
				"answer": "3",
				"type": 3,
				"author": "worker"
			},
			{
				"connectionId": 38,
				"id": 8,
				"answer": "3",
				"type": 3,
				"author": "worker"
			},
			{
				"connectionId": 39,
				"id": 8,
				"answer": "3",
				"type": 3,
				"author": "worker"
			}
		],
		[
			{
				"connectionId": 40,
				"id": 9,
				"answer": "temp2",
				"type": 1,
				"author": "worker"
			},
			{
				"connectionId": 41,
				"id": 9,
				"answer": "temp2",
				"type": 1,
				"author": "worker"
			},
			{
				"connectionId": 42,
				"id": 9,
				"answer": "temp2",
				"type": 1,
				"author": "worker"
			},
			{
				"connectionId": 43,
				"id": 9,
				"answer": "temp2",
				"type": 1,
				"author": "worker"
			},
			{
				"connectionId": 44,
				"id": 9,
				"answer": "temp2",
				"type": 1,
				"author": "worker"
			}
		],
		[
			{
				"connectionId": 45,
				"id": 10,
				"answer": "Yes",
				"type": 0,
				"author": "worker"
			},
			{
				"connectionId": 46,
				"id": 10,
				"answer": "Yes",
				"type": 0,
				"author": "worker"
			},
			{
				"connectionId": 47,
				"id": 10,
				"answer": "Yes",
				"type": 0,
				"author": "worker"
			},
			{
				"connectionId": 48,
				"id": 10,
				"answer": "Yes",
				"type": 0,
				"author": "worker"
			},
			{
				"connectionId": 49,
				"id": 10,
				"answer": "Yes",
				"type": 0,
				"author": "worker"
			},
			{
				"connectionId": 50,
				"id": 10,
				"answer": "Yes",
				"type": 0,
				"author": "worker"
			},
			{
				"connectionId": 51,
				"id": 10,
				"answer": "Yes",
				"type": 0,
				"author": "worker"
			}
		]
	]
}

let unfinishedOrderMain = {
    "id": "47827",
    "description": "Panelfilter 390x300x47",
    "categoryCode": "32110",
    "status": "incomplete",
    "deadline": "2022-06-12",
    "location": "Denmark, Give",
    "quantity": 240,
    "attributes": [
        {
            "name": "Højde",
            "type": 3,
            "units": "mm",
            "value": "300.00",
            "id": 3
        },
        {
            "name": "Bredde",
            "type": 3,
            "units": "mm",
            "value": "390.00",
            "id": 4
        },
        { "name": "Dybde", "type": 3, "units": "mm", "value": "47", "id": 49 },
        {
            "name": "ISO 16890",
            "type": 0,
            "units": null,
            "value": "ISO ePM10 50%",
            "id": 51
        },
        {
            "name": "Webshop",
            "type": 0,
            "units": null,
            "value": "Ja",
            "id": 70
        },
        {
            "name": "Paneltype",
            "type": 0,
            "units": null,
            "value": "Z-line",
            "id": 104
        },
        {
            "name": "Ramme (panelfilter)",
            "type": 0,
            "units": null,
            "value": "Fiber",
            "id": 109
        },
        {
            "name": "Number example",
            "type": 3,
            "units": "mm",
            "value": "290.00",
            "id": 110
        },
        {
            "name": "Text example",
            "type": 0,
            "units": null,
            "value": "ISO e",
            "id": 111
        },
        {
            "name": "Option example",
            "type": 0,
            "units": null,
            "value": "Fiber glass",
            "id": 112
        }
    ],
    "qaReportId": 1,
    "controlPoints": [
        {
            "id": 1,
            "frequencyId": 1,
            "type": 3,
            "lowerTolerance": null,
            "upperTolerance": null,
            "controlPointType": 1,
            "author": null,
            "connectionId": 1,
            "answer": "",
            "attributes": [{ "id": 3, "maxValue": null, "minValue": null }],
            "descriptions": "",
            "description": "This is a description",
            "frequency": [
                {
                    "id": 1,
                    "to25": 23,
                    "to50": 2,
                    "to100": 343,
                    "to200": 5,
                    "to300": 5,
                    "to500": 6,
                    "to700": 66,
                    "to1000": 7,
                    "to1500": 5,
                    "to2000": 76,
                    "to3000": 76,
                    "to4000": 766,
                    "to5000": 69
                }
            ],
            "expectedValue": "300.00",
            "units": "mm",
            "image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
            "toleranceText": ""
        },
        {
            "id": 2,
            "frequencyId": 1,
            "type": 3,
            "lowerTolerance": 1,
            "upperTolerance": 1,
            "controlPointType": 1,
            "author": null,
            "connectionId": 2,
            "answer": "",
            "attributes": [{ "id": 4, "maxValue": 400, "minValue": 300 }],
            "descriptions": "",
            "description": "This is a description",
            "frequency": [
                {
                    "id": 1,
                    "to25": 23,
                    "to50": 2,
                    "to100": 343,
                    "to200": 5,
                    "to300": 5,
                    "to500": 6,
                    "to700": 66,
                    "to1000": 7,
                    "to1500": 5,
                    "to2000": 76,
                    "to3000": 76,
                    "to4000": 766,
                    "to5000": 69
                }
            ],
            "expectedValue": "390.00",
            "units": "mm",
            "image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
            "toleranceText": "+/-1mm"
        },
        {
            "id": 3,
            "frequencyId": 1,
            "type": 3,
            "lowerTolerance": 1,
            "upperTolerance": 6,
            "controlPointType": 1,
            "author": null,
            "connectionId": 3,
            "answer": "",
            "attributes": [{ "id": 49, "maxValue": 50, "minValue": 30 }],
            "descriptions": "",
            "description": "This is a description",
            "frequency": [
                {
                    "id": 1,
                    "to25": 23,
                    "to50": 2,
                    "to100": 343,
                    "to200": 5,
                    "to300": 5,
                    "to500": 6,
                    "to700": 66,
                    "to1000": 7,
                    "to1500": 5,
                    "to2000": 76,
                    "to3000": 76,
                    "to4000": 766,
                    "to5000": 69
                }
            ],
            "expectedValue": "47",
            "units": "mm",
            "image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
            "toleranceText": "+6/-1mm"
        },
        {
            "id": 4,
            "frequencyId": 1,
            "type": 1,
            "lowerTolerance": null,
            "upperTolerance": null,
            "controlPointType": 1,
            "author": null,
            "connectionId": 4,
            "answer": "",
            "attributes": [{ "id": 51, "maxValue": null, "minValue": null }],
            "descriptions": "",
            "description": "This is a description",
            "frequency": [
                {
                    "id": 1,
                    "to25": 23,
                    "to50": 2,
                    "to100": 343,
                    "to200": 5,
                    "to300": 5,
                    "to500": 6,
                    "to700": 66,
                    "to1000": 7,
                    "to1500": 5,
                    "to2000": 76,
                    "to3000": 76,
                    "to4000": 766,
                    "to5000": 69
                }
            ],
            "expectedValue": "ISO ePM10 50%",
            "units": "Text",
            "image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
            "toleranceText": ""
        },
        {
            "id": 5,
            "frequencyId": 1,
            "type": 0,
            "lowerTolerance": null,
            "upperTolerance": null,
            "controlPointType": 1,
            "author": null,
            "connectionId": 5,
            "answer": "",
            "attributes": [{ "id": 70, "maxValue": null, "minValue": null }],
            "descriptions": "",
            "description": "This is a description",
            "frequency": [
                {
                    "id": 1,
                    "to25": 23,
                    "to50": 2,
                    "to100": 343,
                    "to200": 5,
                    "to300": 5,
                    "to500": 6,
                    "to700": 66,
                    "to1000": 7,
                    "to1500": 5,
                    "to2000": 76,
                    "to3000": 76,
                    "to4000": 766,
                    "to5000": 69
                }
            ],
            "options": [
                { "id": 1, "controlPointId": 5, "value": "Yes" },
                { "id": 2, "controlPointId": 5, "value": "No" }
            ],
            "expectedValue": "Ja",
            "units": "Yes/No",
            "image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
            "toleranceText": ""
        },
        {
            "id": 6,
            "frequencyId": 1,
            "type": 0,
            "lowerTolerance": null,
            "upperTolerance": null,
            "controlPointType": 1,
            "author": null,
            "connectionId": 6,
            "answer": "",
            "attributes": [{ "id": 104, "maxValue": null, "minValue": null }],
            "descriptions": "",
            "description": "This is a description",
            "frequency": [
                {
                    "id": 1,
                    "to25": 23,
                    "to50": 2,
                    "to100": 343,
                    "to200": 5,
                    "to300": 5,
                    "to500": 6,
                    "to700": 66,
                    "to1000": 7,
                    "to1500": 5,
                    "to2000": 76,
                    "to3000": 76,
                    "to4000": 766,
                    "to5000": 69
                }
            ],
            "options": [
                { "id": 3, "controlPointId": 6, "value": "Yes" },
                { "id": 4, "controlPointId": 6, "value": "No" }
            ],
            "expectedValue": "Z-line",
            "units": "Yes/No",
            "image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
            "toleranceText": ""
        },
        {
            "id": 7,
            "frequencyId": 1,
            "type": 0,
            "lowerTolerance": null,
            "upperTolerance": null,
            "controlPointType": 1,
            "author": null,
            "connectionId": 7,
            "answer": "",
            "attributes": [{ "id": 109, "maxValue": null, "minValue": null }],
            "descriptions": "",
            "description": "This is a description",
            "frequency": [
                {
                    "id": 1,
                    "to25": 23,
                    "to50": 2,
                    "to100": 343,
                    "to200": 5,
                    "to300": 5,
                    "to500": 6,
                    "to700": 66,
                    "to1000": 7,
                    "to1500": 5,
                    "to2000": 76,
                    "to3000": 76,
                    "to4000": 766,
                    "to5000": 69
                }
            ],
            "options": [
                { "id": 5, "controlPointId": 7, "value": "Yes" },
                { "id": 6, "controlPointId": 7, "value": "No" }
            ],
            "expectedValue": "Fiber",
            "units": "Yes/No",
            "image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
            "toleranceText": ""
        },
        {
            "id": 8,
            "frequencyId": 1,
            "type": 3,
            "lowerTolerance": 1,
            "upperTolerance": 6,
            "controlPointType": 0,
            "author": null,
            "connectionId": 8,
            "answer": "",
            "attributes": [{ "id": 4, "maxValue": 400, "minValue": 300 }],
            "descriptions": "",
            "description": "This is a description",
            "frequency": [
                {
                    "id": 1,
                    "to25": 23,
                    "to50": 2,
                    "to100": 343,
                    "to200": 5,
                    "to300": 5,
                    "to500": 6,
                    "to700": 66,
                    "to1000": 7,
                    "to1500": 5,
                    "to2000": 76,
                    "to3000": 76,
                    "to4000": 766,
                    "to5000": 69
                }
            ],
            "expectedValue": "390.00",
            "units": "mm",
            "image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
            "toleranceText": "+6/-1mm",
            "letter": "A"
        },
        {
            "id": 9,
            "frequencyId": 1,
            "type": 1,
            "lowerTolerance": null,
            "upperTolerance": null,
            "controlPointType": 0,
            "author": null,
            "connectionId": 9,
            "answer": "",
            "attributes": [{ "id": 51, "maxValue": null, "minValue": null }],
            "descriptions": "",
            "description": "This is a description",
            "frequency": [
                {
                    "id": 1,
                    "to25": 23,
                    "to50": 2,
                    "to100": 343,
                    "to200": 5,
                    "to300": 5,
                    "to500": 6,
                    "to700": 66,
                    "to1000": 7,
                    "to1500": 5,
                    "to2000": 76,
                    "to3000": 76,
                    "to4000": 766,
                    "to5000": 69
                }
            ],
            "expectedValue": "ISO ePM10 50%",
            "units": "Text",
            "image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
            "toleranceText": "",
            "letter": "B"
        },
        {
            "id": 10,
            "frequencyId": 2,
            "type": 0,
            "lowerTolerance": null,
            "upperTolerance": null,
            "controlPointType": 0,
            "author": null,
            "connectionId": 10,
            "answer": "",
            "attributes": [{ "id": 109, "maxValue": null, "minValue": null }],
            "descriptions": "",
            "description": "This is a description",
            "frequency": [
                {
                    "id": 2,
                    "to25": 25,
                    "to50": 5,
                    "to100": 345,
                    "to200": 7,
                    "to300": 7,
                    "to500": 8,
                    "to700": 68,
                    "to1000": 9,
                    "to1500": 7,
                    "to2000": 78,
                    "to3000": 78,
                    "to4000": 768,
                    "to5000": 71
                }
            ],
            "options": [
                { "id": 7, "controlPointId": 10, "value": "Yes" },
                { "id": 8, "controlPointId": 10, "value": "No" }
            ],
            "expectedValue": "Fiber",
            "units": "Yes/No",
            "image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
            "toleranceText": "",
            "letter": "C"
        }
    ],
    "oneTimeControlPoints": [
        {
            "id": 1,
            "frequencyId": 1,
            "type": 3,
            "lowerTolerance": null,
            "upperTolerance": null,
            "controlPointType": 1,
            "author": null,
            "connectionId": 1,
            "answer": "",
            "attributes": [{ "id": 3, "maxValue": null, "minValue": null }],
            "descriptions": "",
            "description": "This is a description",
            "frequency": [
                {
                    "id": 1,
                    "to25": 23,
                    "to50": 2,
                    "to100": 343,
                    "to200": 5,
                    "to300": 5,
                    "to500": 6,
                    "to700": 66,
                    "to1000": 7,
                    "to1500": 5,
                    "to2000": 76,
                    "to3000": 76,
                    "to4000": 766,
                    "to5000": 69
                }
            ],
            "expectedValue": "300.00",
            "units": "mm",
            "image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
            "toleranceText": ""
        },
        {
            "id": 2,
            "frequencyId": 1,
            "type": 3,
            "lowerTolerance": 1,
            "upperTolerance": 1,
            "controlPointType": 1,
            "author": null,
            "connectionId": 2,
            "answer": "",
            "attributes": [{ "id": 4, "maxValue": 400, "minValue": 300 }],
            "descriptions": "",
            "description": "This is a description",
            "frequency": [
                {
                    "id": 1,
                    "to25": 23,
                    "to50": 2,
                    "to100": 343,
                    "to200": 5,
                    "to300": 5,
                    "to500": 6,
                    "to700": 66,
                    "to1000": 7,
                    "to1500": 5,
                    "to2000": 76,
                    "to3000": 76,
                    "to4000": 766,
                    "to5000": 69
                }
            ],
            "expectedValue": "390.00",
            "units": "mm",
            "image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
            "toleranceText": "+/-1mm"
        },
        {
            "id": 3,
            "frequencyId": 1,
            "type": 3,
            "lowerTolerance": 1,
            "upperTolerance": 6,
            "controlPointType": 1,
            "author": null,
            "connectionId": 3,
            "answer": "",
            "attributes": [{ "id": 49, "maxValue": 50, "minValue": 30 }],
            "descriptions": "",
            "description": "This is a description",
            "frequency": [
                {
                    "id": 1,
                    "to25": 23,
                    "to50": 2,
                    "to100": 343,
                    "to200": 5,
                    "to300": 5,
                    "to500": 6,
                    "to700": 66,
                    "to1000": 7,
                    "to1500": 5,
                    "to2000": 76,
                    "to3000": 76,
                    "to4000": 766,
                    "to5000": 69
                }
            ],
            "expectedValue": "47",
            "units": "mm",
            "image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
            "toleranceText": "+6/-1mm"
        },
        {
            "id": 4,
            "frequencyId": 1,
            "type": 1,
            "lowerTolerance": null,
            "upperTolerance": null,
            "controlPointType": 1,
            "author": null,
            "connectionId": 4,
            "answer": "",
            "attributes": [{ "id": 51, "maxValue": null, "minValue": null }],
            "descriptions": "",
            "description": "This is a description",
            "frequency": [
                {
                    "id": 1,
                    "to25": 23,
                    "to50": 2,
                    "to100": 343,
                    "to200": 5,
                    "to300": 5,
                    "to500": 6,
                    "to700": 66,
                    "to1000": 7,
                    "to1500": 5,
                    "to2000": 76,
                    "to3000": 76,
                    "to4000": 766,
                    "to5000": 69
                }
            ],
            "expectedValue": "ISO ePM10 50%",
            "units": "Text",
            "image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
            "toleranceText": ""
        },
        {
            "id": 5,
            "frequencyId": 1,
            "type": 0,
            "lowerTolerance": null,
            "upperTolerance": null,
            "controlPointType": 1,
            "author": null,
            "connectionId": 5,
            "answer": "",
            "attributes": [{ "id": 70, "maxValue": null, "minValue": null }],
            "descriptions": "",
            "description": "This is a description",
            "frequency": [
                {
                    "id": 1,
                    "to25": 23,
                    "to50": 2,
                    "to100": 343,
                    "to200": 5,
                    "to300": 5,
                    "to500": 6,
                    "to700": 66,
                    "to1000": 7,
                    "to1500": 5,
                    "to2000": 76,
                    "to3000": 76,
                    "to4000": 766,
                    "to5000": 69
                }
            ],
            "options": [
                { "id": 1, "controlPointId": 5, "value": "Yes" },
                { "id": 2, "controlPointId": 5, "value": "No" }
            ],
            "expectedValue": "Ja",
            "units": "Yes/No",
            "image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
            "toleranceText": ""
        },
        {
            "id": 6,
            "frequencyId": 1,
            "type": 0,
            "lowerTolerance": null,
            "upperTolerance": null,
            "controlPointType": 1,
            "author": null,
            "connectionId": 6,
            "answer": "",
            "attributes": [{ "id": 104, "maxValue": null, "minValue": null }],
            "descriptions": "",
            "description": "This is a description",
            "frequency": [
                {
                    "id": 1,
                    "to25": 23,
                    "to50": 2,
                    "to100": 343,
                    "to200": 5,
                    "to300": 5,
                    "to500": 6,
                    "to700": 66,
                    "to1000": 7,
                    "to1500": 5,
                    "to2000": 76,
                    "to3000": 76,
                    "to4000": 766,
                    "to5000": 69
                }
            ],
            "options": [
                { "id": 3, "controlPointId": 6, "value": "Yes" },
                { "id": 4, "controlPointId": 6, "value": "No" }
            ],
            "expectedValue": "Z-line",
            "units": "Yes/No",
            "image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
            "toleranceText": ""
        },
        {
            "id": 7,
            "frequencyId": 1,
            "type": 0,
            "lowerTolerance": null,
            "upperTolerance": null,
            "controlPointType": 1,
            "author": null,
            "connectionId": 7,
            "answer": "",
            "attributes": [{ "id": 109, "maxValue": null, "minValue": null }],
            "descriptions": "",
            "description": "This is a description",
            "frequency": [
                {
                    "id": 1,
                    "to25": 23,
                    "to50": 2,
                    "to100": 343,
                    "to200": 5,
                    "to300": 5,
                    "to500": 6,
                    "to700": 66,
                    "to1000": 7,
                    "to1500": 5,
                    "to2000": 76,
                    "to3000": 76,
                    "to4000": 766,
                    "to5000": 69
                }
            ],
            "options": [
                { "id": 5, "controlPointId": 7, "value": "Yes" },
                { "id": 6, "controlPointId": 7, "value": "No" }
            ],
            "expectedValue": "Fiber",
            "units": "Yes/No",
            "image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
            "toleranceText": ""
        }
    ],
    "multipleTimeControlPoints": [
        {
            "id": 8,
            "frequencyId": 1,
            "type": 3,
            "lowerTolerance": 1,
            "upperTolerance": 6,
            "controlPointType": 0,
            "author": null,
            "connectionId": 8,
            "answer": "",
            "attributes": [{ "id": 4, "maxValue": 400, "minValue": 300 }],
            "descriptions": "",
            "description": "This is a description",
            "frequency": [
                {
                    "id": 1,
                    "to25": 23,
                    "to50": 2,
                    "to100": 343,
                    "to200": 5,
                    "to300": 5,
                    "to500": 6,
                    "to700": 66,
                    "to1000": 7,
                    "to1500": 5,
                    "to2000": 76,
                    "to3000": 76,
                    "to4000": 766,
                    "to5000": 69
                }
            ],
            "expectedValue": "390.00",
            "units": "mm",
            "image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
            "toleranceText": "+6/-1mm",
            "letter": "A"
        },
        {
            "id": 9,
            "frequencyId": 1,
            "type": 1,
            "lowerTolerance": null,
            "upperTolerance": null,
            "controlPointType": 0,
            "author": null,
            "connectionId": 9,
            "answer": "",
            "attributes": [{ "id": 51, "maxValue": null, "minValue": null }],
            "descriptions": "",
            "description": "This is a description",
            "frequency": [
                {
                    "id": 1,
                    "to25": 23,
                    "to50": 2,
                    "to100": 343,
                    "to200": 5,
                    "to300": 5,
                    "to500": 6,
                    "to700": 66,
                    "to1000": 7,
                    "to1500": 5,
                    "to2000": 76,
                    "to3000": 76,
                    "to4000": 766,
                    "to5000": 69
                }
            ],
            "expectedValue": "ISO ePM10 50%",
            "units": "Text",
            "image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
            "toleranceText": "",
            "letter": "B"
        },
        {
            "id": 10,
            "frequencyId": 2,
            "type": 0,
            "lowerTolerance": null,
            "upperTolerance": null,
            "controlPointType": 0,
            "author": null,
            "connectionId": 10,
            "answer": "",
            "attributes": [{ "id": 109, "maxValue": null, "minValue": null }],
            "descriptions": "",
            "description": "This is a description",
            "frequency": [
                {
                    "id": 2,
                    "to25": 25,
                    "to50": 5,
                    "to100": 345,
                    "to200": 7,
                    "to300": 7,
                    "to500": 8,
                    "to700": 68,
                    "to1000": 9,
                    "to1500": 7,
                    "to2000": 78,
                    "to3000": 78,
                    "to4000": 768,
                    "to5000": 71
                }
            ],
            "options": [
                { "id": 7, "controlPointId": 10, "value": "Yes" },
                { "id": 8, "controlPointId": 10, "value": "No" }
            ],
            "expectedValue": "Fiber",
            "units": "Yes/No",
            "image": "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg",
            "toleranceText": "",
            "letter": "C"
        }
    ],
    "multipleTimeAnswers": [
        [
            {
                "connectionId": 8,
                "id": 8,
                "answer": "",
                "type": 3,
                "author": ""
            },
            {
                "connectionId": "",
                "id": 8,
                "answer": "",
                "type": 3,
                "author": ""
            },
            {
                "connectionId": "",
                "id": 8,
                "answer": "",
                "type": 3,
                "author": ""
            },
            {
                "connectionId": "",
                "id": 8,
                "answer": "",
                "type": 3,
                "author": ""
            },
            {
                "connectionId": "",
                "id": 8,
                "answer": "",
                "type": 3,
                "author": ""
            }
        ],
        [
            {
                "connectionId": 9,
                "id": 9,
                "answer": "",
                "type": 1,
                "author": ""
            },
            {
                "connectionId": "",
                "id": 9,
                "answer": "",
                "type": 1,
                "author": ""
            },
            {
                "connectionId": "",
                "id": 9,
                "answer": "",
                "type": 1,
                "author": ""
            },
            {
                "connectionId": "",
                "id": 9,
                "answer": "",
                "type": 1,
                "author": ""
            },
            {
                "connectionId": "",
                "id": 9,
                "answer": "",
                "type": 1,
                "author": ""
            }
        ],
        [
            {
                "connectionId": 10,
                "id": 10,
                "answer": "",
                "type": 0,
                "author": ""
            },
            {
                "connectionId": "",
                "id": 10,
                "answer": "",
                "type": 0,
                "author": ""
            },
            {
                "connectionId": "",
                "id": 10,
                "answer": "",
                "type": 0,
                "author": ""
            },
            {
                "connectionId": "",
                "id": 10,
                "answer": "",
                "type": 0,
                "author": ""
            },
            {
                "connectionId": "",
                "id": 10,
                "answer": "",
                "type": 0,
                "author": ""
            },
            {
                "connectionId": "",
                "id": 10,
                "answer": "",
                "type": 0,
                "author": ""
            },
            {
                "connectionId": "",
                "id": 10,
                "answer": "",
                "type": 0,
                "author": ""
            }
        ]
    ]
}

let unfinishedOrder = JSON.parse(JSON.stringify(unfinishedOrderMain))
let finishedOrderAuthor = JSON.parse(JSON.stringify(finishedOrderAuthorMain))

let order = JSON.parse(JSON.stringify(finishedOrder))

describe("Orders service testing", () => {

    afterEach(function () {
        sinon.restore()
        order = JSON.parse(JSON.stringify(finishedOrder))
        unfinishedOrder = JSON.parse(JSON.stringify(unfinishedOrderMain))
        finishedOrderAuthor = JSON.parse(JSON.stringify(finishedOrderAuthorMain))
    })

    describe("released orders", () => {
        it("released orders OK", async () => {

            sinon.stub(ordersModel, "getReleasedOrders").returns([{ id: "1", }, { id: "2" }, { id: "3" }])
            // CHeck input for this function

            sinon.stub(ordersModel, "getMultipleQAReports").returns([{ itemId: "1", status: 0 }, { itemId: "2", status: 1 }])

            const data = await ordersService.releasedOrders("denmark")

            assertEquals(data.length, 2)
            assertEquals(data[0].id, '1')
            assertEquals(data[1].id, '3')
        })
    })

    describe("released order", () => {
        it("released order OK", async () => {

            sinon.stub(ordersModel, "getReleasedOrders").returns([{ id: "1", }, { id: "2" }, { id: "3" }])
            // CHeck input for this function

            sinon.stub(ordersModel, "getMultipleQAReports").returns([{ itemId: "1", status: 0 }, { itemId: "2", status: 1 }])

            const data = await ordersService.releasedOrders("denmark")

            assertEquals(data.length, 2)
            assertEquals(data[0].id, '1')
            assertEquals(data[1].id, '3')
        })
    })

    describe("save order", () => {
        it("save order OK", async () => {

            // CHeck input for this function

            sinon.stub(ordersModel, "deleteQAReportConnection").returns("Completed")

            sinon.stub(ordersModel, "insertOrReplaceOneTimeMeasurement").returns("Completed")

            sinon.stub(ordersService, "releasedOrderFull").returns(order)

            const data = await ordersService.saveQAReport(
                order,
                'worker'
            )

            assertEquals(data.response, 1)
        })

        it("save order ERROR No mirror data", async () => {

            sinon.stub(ordersService, "releasedOrderFull").returns(null)

            const data = await ordersService.saveQAReport(
                { data: "data" },
                'worker'
            )

            assertEquals(data.response, 0)
        })

        it("save order ERROR data does not match fields", async () => {
            sinon.stub(ordersService, "releasedOrderFull").returns(order)

            let orderTest = JSON.parse(JSON.stringify(order))

            // Aim is to test each one of these scenarios

            orderTest.multipleTimeAnswers.push({ data: "data" })
            const test1 = await ordersService.saveQAReport(
                orderTest,
                'worker'
            )

            orderTest.multipleTimeControlPoints.push({ data: "data" })
            const test2 = await ordersService.saveQAReport(
                orderTest,
                'worker'
            )

            orderTest.oneTimeControlPoints.push({ data: "data" })
            const test3 = await ordersService.saveQAReport(
                orderTest,
                'worker'
            )

            orderTest.controlPoints.push({ data: "data" })
            const test4 = await ordersService.saveQAReport(
                orderTest,
                'worker'
            )

            orderTest.attributes.push({ data: "data" })
            const test5 = await ordersService.saveQAReport(
                orderTest,
                'worker'
            )

            orderTest.status = "Complete"
            const test6 = await ordersService.saveQAReport(
                orderTest,
                'worker'
            )

            orderTest.qaReportId = 5425452
            const test7 = await ordersService.saveQAReport(
                orderTest,
                'worker'
            )

            orderTest.quantity = 5425452
            const test8 = await ordersService.saveQAReport(
                orderTest,
                'worker'
            )

            orderTest.categoryCode = "Complete"
            const test9 = await ordersService.saveQAReport(
                orderTest,
                'worker'
            )

            orderTest.id = "Complete"
            const test10 = await ordersService.saveQAReport(
                orderTest,
                'worker'
            )

            assertEquals(test1.response, 0)
            assertEquals(test2.response, 0)
            assertEquals(test3.response, 0)
            assertEquals(test4.response, 0)
            assertEquals(test5.response, 0)
            assertEquals(test6.response, 0)
            assertEquals(test7.response, 0)
            assertEquals(test8.response, 0)
            assertEquals(test9.response, 0)
            assertEquals(test10.response, 0)
            // message is not tested for because it may change latter. It just gives information ot end user of the system.
        })

        it("save order ERROR answer control point id's dont match", async () => {
            sinon.stub(ordersService, "releasedOrderFull").returns(order)

            let orderTest = JSON.parse(JSON.stringify(order))

            orderTest.oneTimeControlPoints[0].id = "sdadasdasd"

            const test1 = await ordersService.saveQAReport(
                orderTest,
                'worker'
            )

            orderTest = JSON.parse(JSON.stringify(order))
            orderTest.multipleTimeAnswers[0][0].id = "sdadasdasd"

            const test2 = await ordersService.saveQAReport(
                orderTest,
                'worker'
            )

            assertEquals(test1.response, 0)
            assertEquals(test2.response, 0)

        })

        it("save order ERROR wrong value types", async () => {

            // CHeck input for this function

            sinon.stub(ordersModel, "deleteQAReportConnection").returns("Completed")

            sinon.stub(ordersModel, "insertOrReplaceOneTimeMeasurement").returns("Completed")

            sinon.stub(ordersService, "releasedOrderFull").returns(order)

            // // ONE TIME values
            // Test one time number value
            let orderTest = JSON.parse(JSON.stringify(order))
            orderTest.oneTimeControlPoints[0].answer = "dasdasd"
            const test1 = await ordersService.saveQAReport(
                orderTest,
                'worker'
            )
            assertEquals(test1.response, 2)

            // Test one time text value
            orderTest = JSON.parse(JSON.stringify(order))
            orderTest.oneTimeControlPoints[3].answer = 1
            const test2 = await ordersService.saveQAReport(
                orderTest,
                'worker'
            )
            assertEquals(test2.response, 2)

            // Test one time option value
            orderTest = JSON.parse(JSON.stringify(order))
            orderTest.oneTimeControlPoints[4].answer = 1
            const test3 = await ordersService.saveQAReport(
                orderTest,
                'worker'
            )
            assertEquals(test3.response, 2)

            // // MULTI TIME values
            // Test multi time number value
            orderTest = JSON.parse(JSON.stringify(order))
            orderTest.multipleTimeAnswers[0][0].answer = "dasdasd"
            const test4 = await ordersService.saveQAReport(
                orderTest,
                'worker'
            )
            assertEquals(test4.response, 2)

            // Test multi time text value
            orderTest = JSON.parse(JSON.stringify(order))
            orderTest.multipleTimeAnswers[1][0].answer = 1
            const test5 = await ordersService.saveQAReport(
                orderTest,
                'worker'
            )
            assertEquals(test5.response, 2)

            // Test multi time option value
            orderTest = JSON.parse(JSON.stringify(order))
            orderTest.multipleTimeAnswers[2][0].answer = 1
            const test6 = await ordersService.saveQAReport(
                orderTest,
                'worker'
            )
            assertEquals(test6.response, 2)
        })
    })

    describe("complete order", () => {
        it("complete order OK", async () => {

            sinon.stub(ordersModel, "setQaReportStatusToFinished").returns("Completed")

            sinon.stub(ordersService, "saveQAReport").returns({ response: 1, message: "Data is not valid" })

            const data = await ordersService.completeQAReport(
                order,
                'worker'
            )

            assertEquals(data.response, 1)
        })

        it("complete order ERROR missing values in order", async () => {
            order.multipleTimeAnswers = []
            const test1 = await ordersService.completeQAReport(
                order,
                'worker'
            )
            assertEquals(test1.response, 0)

            order.multipleTimeAnswers = null
            const test2 = await ordersService.completeQAReport(
                order,
                'worker'
            )
            assertEquals(test2.response, 0)

            order.oneTimeControlPoints = []
            const test3 = await ordersService.completeQAReport(
                order,
                'worker'
            )
            assertEquals(test3.response, 0)

            order.oneTimeControlPoints = null
            const test4 = await ordersService.completeQAReport(
                order,
                'worker'
            )
            assertEquals(test4.response, 0)

            order = null
            const test5 = await ordersService.completeQAReport(
                order,
                'worker'
            )
            assertEquals(test5.response, 0)
        })

        it("complete order ERROR not all values filled in", async () => {
            let orderTest = JSON.parse(JSON.stringify(order))

            orderTest.oneTimeControlPoints[0].answer = ''
            const test1 = await ordersService.completeQAReport(
                orderTest,
                'worker'
            )
            assertEquals(test1.response, 0)

            orderTest = JSON.parse(JSON.stringify(order))
            orderTest.multipleTimeAnswers[0][0] = ''
            const test2 = await ordersService.completeQAReport(
                orderTest,
                'worker'
            )
            assertEquals(test2.response, 0)
        })

        it("complete order ERROR error from saving", async () => {

            sinon.stub(ordersService, "saveQAReport").returns({ response: 0, message: "Data is not valid" })

            const test1 = await ordersService.completeQAReport(
                order,
                'worker'
            )
            assertEquals(test1.response, 0)
        })
    })

    describe("get order", () => {
        it("get order ERROR item does not exist", async () => {

            sinon.stub(ordersModel, "getReleasedOrderInformation").returns([])

            const test1 = await ordersService.releasedOrderFull("12213", "gb")
            assertEquals(test1, null)
        })

        it("get order ERROR qa repport", async () => {

            sinon.stub(ordersModel, "getReleasedOrderInformation").returns([
                {
                    id: '47827',
                    description: 'Panelfilter 390x300x47',
                    categoryCode: '32110',
                    status: 3,
                    deadline: "Sun Jun 12 2022 19:00:00 GMT+0200",
                    location: 'Denmark, Give',
                    quantity: 240
                }
            ])

            sinon.stub(ordersModel, "getReleasedOrderReport").returns([{ data: "data", status: 1 }])

            const test1 = await ordersService.releasedOrderFull("12213", "gb")
            assertEquals(test1.result, 0)
        })

        it("get order OK qa report is not yet created", async () => {
            sinon.stub(ordersModel, "getReleasedOrderInformation").returns([
                {
                    id: '47827',
                    description: 'Panelfilter 390x300x47',
                    categoryCode: '32110',
                    status: 3,
                    deadline: "Sun Jun 12 2022 19:00:00 GMT+0200",
                    location: 'Denmark, Give',
                    quantity: 240,
                    "qaReportId": 1,
                }
            ])

            sinon.stub(ordersModel, "getReleasedOrderReport").returns([])

            sinon.stub(ordersModel, "getReleasedOrderAttributes").returns(

                [
                    {
                        "name": "Højde",
                        "type": 3,
                        "units": "mm",
                        "value": "300.00",
                        "id": 3
                    },
                    {
                        "name": "Bredde",
                        "type": 3,
                        "units": "mm",
                        "value": "390.00",
                        "id": 4
                    },
                    { "name": "Dybde", "type": 3, "units": "mm", "value": "47", "id": 49 },
                    {
                        "name": "ISO 16890",
                        "type": 0,
                        "units": null,
                        "value": "ISO ePM10 50%",
                        "id": 51
                    },
                    {
                        "name": "Webshop",
                        "type": 0,
                        "units": null,
                        "value": "Ja",
                        "id": 70
                    },
                    {
                        "name": "Paneltype",
                        "type": 0,
                        "units": null,
                        "value": "Z-line",
                        "id": 104
                    },
                    {
                        "name": "Ramme (panelfilter)",
                        "type": 0,
                        "units": null,
                        "value": "Fiber",
                        "id": 109
                    },
                    {
                        "name": "Number example",
                        "type": 3,
                        "units": "mm",
                        "value": "290.00",
                        "id": 110
                    },
                    {
                        "name": "Text example",
                        "type": 0,
                        "units": null,
                        "value": "ISO e",
                        "id": 111
                    },
                    {
                        "name": "Option example",
                        "type": 0,
                        "units": null,
                        "value": "Fiber glass",
                        "id": 112
                    }
                ]
            )
            sinon.stub(ordersModel, "getSpecificControlPoints").returns(

                [
                    {
                        "id": 1,
                        "frequencyId": 1,
                        "image": null,
                        "type": 3,
                        "lowerTolerance": null,
                        "upperTolerance": null
                    },
                    {
                        "id": 2,
                        "frequencyId": 1,
                        "image": null,
                        "type": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 1
                    },
                    {
                        "id": 3,
                        "frequencyId": 1,
                        "image": null,
                        "type": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 6
                    },
                    {
                        "id": 4,
                        "frequencyId": 1,
                        "image": null,
                        "type": 1,
                        "lowerTolerance": null,
                        "upperTolerance": null
                    },
                    {
                        "id": 5,
                        "frequencyId": 1,
                        "image": null,
                        "type": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null
                    },
                    {
                        "id": 6,
                        "frequencyId": 1,
                        "image": null,
                        "type": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null
                    },
                    {
                        "id": 7,
                        "frequencyId": 1,
                        "image": null,
                        "type": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null
                    },
                    {
                        "id": 8,
                        "frequencyId": 1,
                        "image": null,
                        "type": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 6
                    },
                    {
                        "id": 9,
                        "frequencyId": 1,
                        "image": null,
                        "type": 1,
                        "lowerTolerance": null,
                        "upperTolerance": null
                    },
                    {
                        "id": 10,
                        "frequencyId": 2,
                        "image": null,
                        "type": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null
                    }
                ]
            )

            let getControlPointAttributes = sinon.stub(ordersModel, "getControlPointAttributes").returns([])
            getControlPointAttributes.onCall(0).returns([{ "id": 3, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(1).returns([{ "id": 4, "maxValue": 400, "minValue": 300 }]);
            getControlPointAttributes.onCall(2).returns([{ "id": 49, "maxValue": 50, "minValue": 30 }]);
            getControlPointAttributes.onCall(3).returns([{ "id": 51, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(4).returns([{ "id": 70, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(5).returns([{ "id": 104, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(6).returns([{ "id": 109, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(7).returns([{ "id": 4, "maxValue": 400, "minValue": 300 }]);
            getControlPointAttributes.onCall(8).returns([{ "id": 51, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(9).returns([{ "id": 109, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(10).returns([{ "id": 3, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(11).returns([{ "id": 4, "maxValue": 400, "minValue": 300 }]);
            getControlPointAttributes.onCall(12).returns([{ "id": 49, "maxValue": 50, "minValue": 30 }]);
            getControlPointAttributes.onCall(13).returns([{ "id": 51, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(14).returns([{ "id": 70, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(15).returns([{ "id": 104, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(16).returns([{ "id": 109, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(17).returns([{ "id": 4, "maxValue": 400, "minValue": 300 }]);
            getControlPointAttributes.onCall(18).returns([{ "id": 51, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(19).returns([{ "id": 109, "maxValue": null, "minValue": null }]);

            sinon.stub(ordersModel, "createQAReport").returns([{ "id": 1, "itemId": 47827, "status": false }])
            sinon.stub(ordersModel, "insertControlPointConnection").returns("Success")

            sinon.stub(ordersModel, "getReleasedOrderControlPoints").returns(
                [
                    {
                        "id": 1,
                        "frequencyId": 1,
                        "type": 3,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "controlPointType": 1,
                        "author": null,
                        "connectionId": 1,
                        "answer": ""
                    },
                    {
                        "id": 2,
                        "frequencyId": 1,
                        "type": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 1,
                        "controlPointType": 1,
                        "author": null,
                        "connectionId": 2,
                        "answer": ""
                    },
                    {
                        "id": 3,
                        "frequencyId": 1,
                        "type": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 6,
                        "controlPointType": 1,
                        "author": null,
                        "connectionId": 3,
                        "answer": ""
                    },
                    {
                        "id": 4,
                        "frequencyId": 1,
                        "type": 1,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "controlPointType": 1,
                        "author": null,
                        "connectionId": 4,
                        "answer": ""
                    },
                    {
                        "id": 5,
                        "frequencyId": 1,
                        "type": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "controlPointType": 1,
                        "author": null,
                        "connectionId": 5,
                        "answer": ""
                    },
                    {
                        "id": 6,
                        "frequencyId": 1,
                        "type": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "controlPointType": 1,
                        "author": null,
                        "connectionId": 6,
                        "answer": ""
                    },
                    {
                        "id": 7,
                        "frequencyId": 1,
                        "type": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "controlPointType": 1,
                        "author": null,
                        "connectionId": 7,
                        "answer": ""
                    },
                    {
                        "id": 8,
                        "frequencyId": 1,
                        "type": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 6,
                        "controlPointType": 0,
                        "author": null,
                        "connectionId": 8,
                        "answer": ""
                    },
                    {
                        "id": 9,
                        "frequencyId": 1,
                        "type": 1,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "controlPointType": 0,
                        "author": null,
                        "connectionId": 9,
                        "answer": ""
                    },
                    {
                        "id": 10,
                        "frequencyId": 2,
                        "type": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "controlPointType": 0,
                        "author": null,
                        "connectionId": 10,
                        "answer": ""
                    }
                ]
            )

            let getReleasedOrderControlPointsDescriptions = sinon.stub(ordersModel, "getReleasedOrderControlPointsDescriptions").returns([{ "id": 1, "language": "gb", "description": "This is a description" }])
            getReleasedOrderControlPointsDescriptions.onCall(0).returns([{ "id": 1, "language": "gb", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(1).returns([{ "id": 2, "language": "gb", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(2).returns([{ "id": 3, "language": "gb", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(3).returns([{ "id": 4, "language": "gb", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(4).returns([{ "id": 5, "language": "gb", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(5).returns([{ "id": 6, "language": "gb", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(6).returns([{ "id": 7, "language": "gb", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(7).returns([{ "id": 8, "language": "gb", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(8).returns([{ "id": 9, "language": "gb", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(9).returns([{ "id": 10, "language": "gb", "description": "This is a description" }]);

            let getReleasedOrderControlPointsFrequencies = sinon.stub(ordersModel, "getReleasedOrderControlPointsFrequencies").returns([{ "id": 1, "to25": 23, "to50": 2, "to100": 343, "to200": 5, "to300": 5, "to500": 6, "to700": 66, "to1000": 7, "to1500": 5, "to2000": 76, "to3000": 76, "to4000": 766, "to5000": 69 }])
            getReleasedOrderControlPointsFrequencies.onCall(9).returns([{ "id": 2, "to25": 25, "to50": 5, "to100": 345, "to200": 7, "to300": 7, "to500": 8, "to700": 68, "to1000": 9, "to1500": 7, "to2000": 78, "to3000": 78, "to4000": 768, "to5000": 71 }]);

            let getReleasedOrderControlPointsOptions = sinon.stub(ordersModel, "getReleasedOrderControlPointsOptions").returns([{ "id": 1, "controlPointId": 5, "value": "Yes" }, { "id": 2, "controlPointId": 5, "value": "No" }])
            getReleasedOrderControlPointsOptions.onCall(0).returns([{ "id": 1, "controlPointId": 5, "value": "Yes" }, { "id": 2, "controlPointId": 5, "value": "No" }]);
            getReleasedOrderControlPointsOptions.onCall(1).returns([{ "id": 3, "controlPointId": 6, "value": "Yes" }, { "id": 4, "controlPointId": 6, "value": "No" }]);
            getReleasedOrderControlPointsOptions.onCall(2).returns([{ "id": 5, "controlPointId": 7, "value": "Yes" }, { "id": 6, "controlPointId": 7, "value": "No" }]);
            getReleasedOrderControlPointsOptions.onCall(3).returns([{ "id": 7, "controlPointId": 10, "value": "Yes" }, { "id": 8, "controlPointId": 10, "value": "No" }]);

            sinon.stub(ordersModel, "qaReportControlPointResults").returns(
                [{ "answer": "", "connectionId": 8, "controlPointId": 8, "qaReportId": 1, "author": "" }, { "answer": "", "connectionId": 9, "controlPointId": 9, "qaReportId": 1, "author": "" }, { "answer": "", "connectionId": 10, "controlPointId": 10, "qaReportId": 1, "author": "" }]
            )

            const test1 = await ordersService.releasedOrderFull("12213", "gb")

            // This key bounces around and disrupts the string  
            delete unfinishedOrder.qaReportId
            delete test1.qaReportId

            assertEquals(JSON.stringify(test1), JSON.stringify(unfinishedOrder))
        })

        it("get order OK qa report is already created", async () => {
            sinon.stub(ordersModel, "getReleasedOrderInformation").returns([
                {
                    id: '47827',
                    description: 'Panelfilter 390x300x47',
                    categoryCode: '32110',
                    status: 3,
                    deadline: "Sun Jun 12 2022 19:00:00 GMT+0200",
                    location: 'Denmark, Give',
                    quantity: 240,
                    "qaReportId": 1,
                }
            ])

            sinon.stub(ordersModel, "getReleasedOrderReport").returns([{ "id": 1, "itemId": 47827, "status": false }])

            sinon.stub(ordersModel, "getReleasedOrderAttributes").returns(
                [
                    { "name": "Højde", "type": 3, "units": "mm", "value": "300.00", "id": 3 },
                    { "name": "Bredde", "type": 3, "units": "mm", "value": "390.00", "id": 4 },
                    { "name": "Dybde", "type": 3, "units": "mm", "value": "47", "id": 49 },
                    {
                        "name": "ISO 16890",
                        "type": 0,
                        "units": null,
                        "value": "ISO ePM10 50%",
                        "id": 51
                    },
                    { "name": "Webshop", "type": 0, "units": null, "value": "Ja", "id": 70 },
                    {
                        "name": "Paneltype",
                        "type": 0,
                        "units": null,
                        "value": "Z-line",
                        "id": 104
                    },
                    {
                        "name": "Ramme (panelfilter)",
                        "type": 0,
                        "units": null,
                        "value": "Fiber",
                        "id": 109
                    },
                    {
                        "name": "Number example",
                        "type": 3,
                        "units": "mm",
                        "value": "290.00",
                        "id": 110
                    },
                    {
                        "name": "Text example",
                        "type": 0,
                        "units": null,
                        "value": "ISO e",
                        "id": 111
                    },
                    {
                        "name": "Option example",
                        "type": 0,
                        "units": null,
                        "value": "Fiber glass",
                        "id": 112
                    }
                ]
            )

            sinon.stub(ordersModel, "getReleasedOrderControlPoints").returns(
                [
                    {
                        "id": 1,
                        "frequencyId": 1,
                        "type": 3,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "controlPointType": 1,
                        "author": null,
                        "connectionId": 1,
                        "answer": ""
                    },
                    {
                        "id": 2,
                        "frequencyId": 1,
                        "type": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 1,
                        "controlPointType": 1,
                        "author": null,
                        "connectionId": 2,
                        "answer": ""
                    },
                    {
                        "id": 3,
                        "frequencyId": 1,
                        "type": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 6,
                        "controlPointType": 1,
                        "author": null,
                        "connectionId": 3,
                        "answer": ""
                    },
                    {
                        "id": 4,
                        "frequencyId": 1,
                        "type": 1,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "controlPointType": 1,
                        "author": null,
                        "connectionId": 4,
                        "answer": ""
                    },
                    {
                        "id": 5,
                        "frequencyId": 1,
                        "type": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "controlPointType": 1,
                        "author": null,
                        "connectionId": 5,
                        "answer": ""
                    },
                    {
                        "id": 6,
                        "frequencyId": 1,
                        "type": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "controlPointType": 1,
                        "author": null,
                        "connectionId": 6,
                        "answer": ""
                    },
                    {
                        "id": 7,
                        "frequencyId": 1,
                        "type": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "controlPointType": 1,
                        "author": null,
                        "connectionId": 7,
                        "answer": ""
                    },
                    {
                        "id": 8,
                        "frequencyId": 1,
                        "type": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 6,
                        "controlPointType": 0,
                        "author": null,
                        "connectionId": 8,
                        "answer": ""
                    },
                    {
                        "id": 9,
                        "frequencyId": 1,
                        "type": 1,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "controlPointType": 0,
                        "author": null,
                        "connectionId": 9,
                        "answer": ""
                    },
                    {
                        "id": 10,
                        "frequencyId": 2,
                        "type": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "controlPointType": 0,
                        "author": null,
                        "connectionId": 10,
                        "answer": ""
                    }
                ]                
            )

            let getControlPointAttributes = sinon.stub(ordersModel, "getControlPointAttributes").returns([])
            getControlPointAttributes.onCall(0).returns([{ "id": 3, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(1).returns([{ "id": 4, "maxValue": 400, "minValue": 300 }]);
            getControlPointAttributes.onCall(2).returns([{ "id": 49, "maxValue": 50, "minValue": 30 }]);
            getControlPointAttributes.onCall(3).returns([{ "id": 51, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(4).returns([{ "id": 70, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(5).returns([{ "id": 104, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(6).returns([{ "id": 109, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(7).returns([{ "id": 4, "maxValue": 400, "minValue": 300 }]);
            getControlPointAttributes.onCall(8).returns([{ "id": 51, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(9).returns([{ "id": 109, "maxValue": null, "minValue": null }]);

            sinon.stub(ordersModel, "createQAReport").returns([{ "id": 1, "itemId": 47827, "status": false }])
            sinon.stub(ordersModel, "insertControlPointConnection").returns("Success")

            let getReleasedOrderControlPointsDescriptions = sinon.stub(ordersModel, "getReleasedOrderControlPointsDescriptions").returns([{ "id": 1, "language": "gb", "description": "This is a description" }])
            getReleasedOrderControlPointsDescriptions.onCall(0).returns([{ "id": 1, "language": "gb", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(1).returns([{ "id": 2, "language": "gb", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(2).returns([{ "id": 3, "language": "gb", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(3).returns([{ "id": 4, "language": "gb", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(4).returns([{ "id": 5, "language": "gb", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(5).returns([{ "id": 6, "language": "gb", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(6).returns([{ "id": 7, "language": "gb", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(7).returns([{ "id": 8, "language": "gb", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(8).returns([{ "id": 9, "language": "gb", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(9).returns([{ "id": 10, "language": "gb", "description": "This is a description" }]);

            let getReleasedOrderControlPointsFrequencies = sinon.stub(ordersModel, "getReleasedOrderControlPointsFrequencies").returns([{ "id": 1, "to25": 23, "to50": 2, "to100": 343, "to200": 5, "to300": 5, "to500": 6, "to700": 66, "to1000": 7, "to1500": 5, "to2000": 76, "to3000": 76, "to4000": 766, "to5000": 69 }])
            getReleasedOrderControlPointsFrequencies.onCall(9).returns([{ "id": 2, "to25": 25, "to50": 5, "to100": 345, "to200": 7, "to300": 7, "to500": 8, "to700": 68, "to1000": 9, "to1500": 7, "to2000": 78, "to3000": 78, "to4000": 768, "to5000": 71 }]);

            let getReleasedOrderControlPointsOptions = sinon.stub(ordersModel, "getReleasedOrderControlPointsOptions").returns([{ "id": 1, "controlPointId": 5, "value": "Yes" }, { "id": 2, "controlPointId": 5, "value": "No" }])
            getReleasedOrderControlPointsOptions.onCall(0).returns([{ "id": 1, "controlPointId": 5, "value": "Yes" }, { "id": 2, "controlPointId": 5, "value": "No" }]);
            getReleasedOrderControlPointsOptions.onCall(1).returns([{ "id": 3, "controlPointId": 6, "value": "Yes" }, { "id": 4, "controlPointId": 6, "value": "No" }]);
            getReleasedOrderControlPointsOptions.onCall(2).returns([{ "id": 5, "controlPointId": 7, "value": "Yes" }, { "id": 6, "controlPointId": 7, "value": "No" }]);
            getReleasedOrderControlPointsOptions.onCall(3).returns([{ "id": 7, "controlPointId": 10, "value": "Yes" }, { "id": 8, "controlPointId": 10, "value": "No" }]);

            sinon.stub(ordersModel, "qaReportControlPointResults").returns(
                [{ "answer": "", "connectionId": 8, "controlPointId": 8, "qaReportId": 1, "author": "" }, { "answer": "", "connectionId": 9, "controlPointId": 9, "qaReportId": 1, "author": "" }, { "answer": "", "connectionId": 10, "controlPointId": 10, "qaReportId": 1, "author": "" }]
            )

            const test1 = await ordersService.releasedOrderFull("12213", "gb")

            // This key bounces around and disrupts the string  
            delete unfinishedOrder.qaReportId
            delete test1.qaReportId

            assertEquals(JSON.stringify(test1), JSON.stringify(unfinishedOrder))
        })

        it("get order OK qa report with values filled in", async () => {
            sinon.stub(ordersModel, "getReleasedOrderInformation").returns([
                {
                    id: '47827',
                    description: 'Panelfilter 390x300x47',
                    categoryCode: '32110',
                    status: 3,
                    deadline: "Sun Jun 12 2022 19:00:00 GMT+0200",
                    location: 'Denmark, Give',
                    quantity: 240,
                    "qaReportId": 1,
                }
            ])

            sinon.stub(ordersModel, "getReleasedOrderReport").returns([{ "id": 1, "itemId": 47827, "status": false }])

            sinon.stub(ordersModel, "getReleasedOrderAttributes").returns(
                [
                    { "name": "Højde", "type": 3, "units": "mm", "value": "300.00", "id": 3 },
                    { "name": "Bredde", "type": 3, "units": "mm", "value": "390.00", "id": 4 },
                    { "name": "Dybde", "type": 3, "units": "mm", "value": "47", "id": 49 },
                    {
                        "name": "ISO 16890",
                        "type": 0,
                        "units": null,
                        "value": "ISO ePM10 50%",
                        "id": 51
                    },
                    { "name": "Webshop", "type": 0, "units": null, "value": "Ja", "id": 70 },
                    {
                        "name": "Paneltype",
                        "type": 0,
                        "units": null,
                        "value": "Z-line",
                        "id": 104
                    },
                    {
                        "name": "Ramme (panelfilter)",
                        "type": 0,
                        "units": null,
                        "value": "Fiber",
                        "id": 109
                    },
                    {
                        "name": "Number example",
                        "type": 3,
                        "units": "mm",
                        "value": "290.00",
                        "id": 110
                    },
                    {
                        "name": "Text example",
                        "type": 0,
                        "units": null,
                        "value": "ISO e",
                        "id": 111
                    },
                    {
                        "name": "Option example",
                        "type": 0,
                        "units": null,
                        "value": "Fiber glass",
                        "id": 112
                    }
                ]
            )

            sinon.stub(ordersModel, "getReleasedOrderControlPoints").returns(
                [
                    {
                        "id": 1,
                        "frequencyId": 1,
                        "type": 3,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "controlPointType": 1,
                        "author": "taken",
                        "connectionId": 11,
                        "answer": "4"
                    },
                    {
                        "id": 2,
                        "frequencyId": 1,
                        "type": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 1,
                        "controlPointType": 1,
                        "author": "taken",
                        "connectionId": 12,
                        "answer": "4"
                    },
                    {
                        "id": 3,
                        "frequencyId": 1,
                        "type": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 6,
                        "controlPointType": 1,
                        "author": "taken",
                        "connectionId": 13,
                        "answer": "4"
                    },
                    {
                        "id": 4,
                        "frequencyId": 1,
                        "type": 1,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "controlPointType": 1,
                        "author": "taken",
                        "connectionId": 14,
                        "answer": "temp"
                    },
                    {
                        "id": 5,
                        "frequencyId": 1,
                        "type": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "controlPointType": 1,
                        "author": "taken",
                        "connectionId": 15,
                        "answer": "Yes"
                    },
                    {
                        "id": 6,
                        "frequencyId": 1,
                        "type": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "controlPointType": 1,
                        "author": "taken",
                        "connectionId": 16,
                        "answer": "Yes"
                    },
                    {
                        "id": 7,
                        "frequencyId": 1,
                        "type": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "controlPointType": 1,
                        "author": "taken",
                        "connectionId": 17,
                        "answer": "Yes"
                    },
                    {
                        "id": 8,
                        "frequencyId": 1,
                        "type": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 6,
                        "controlPointType": 0,
                        "author": "taken",
                        "connectionId": 39,
                        "answer": "3"
                    },
                    {
                        "id": 9,
                        "frequencyId": 1,
                        "type": 1,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "controlPointType": 0,
                        "author": "taken",
                        "connectionId": 44,
                        "answer": "temp2"
                    },
                    {
                        "id": 10,
                        "frequencyId": 2,
                        "type": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "controlPointType": 0,
                        "author": "taken",
                        "connectionId": 51,
                        "answer": "Yes"
                    }
                ]
                                
            )

            let getControlPointAttributes = sinon.stub(ordersModel, "getControlPointAttributes").returns([])
            getControlPointAttributes.onCall(0).returns([{ "id": 3, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(1).returns([{ "id": 4, "maxValue": 400, "minValue": 300 }]);
            getControlPointAttributes.onCall(2).returns([{ "id": 49, "maxValue": 50, "minValue": 30 }]);
            getControlPointAttributes.onCall(3).returns([{ "id": 51, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(4).returns([{ "id": 70, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(5).returns([{ "id": 104, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(6).returns([{ "id": 109, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(7).returns([{ "id": 4, "maxValue": 400, "minValue": 300 }]);
            getControlPointAttributes.onCall(8).returns([{ "id": 51, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(9).returns([{ "id": 109, "maxValue": null, "minValue": null }]);

            sinon.stub(ordersModel, "createQAReport").returns([{ "id": 1, "itemId": 47827, "status": false }])
            sinon.stub(ordersModel, "insertControlPointConnection").returns("Success")

            let getReleasedOrderControlPointsDescriptions = sinon.stub(ordersModel, "getReleasedOrderControlPointsDescriptions").returns([{ "id": 1, "language": "gb", "description": "This is a description" }])
            getReleasedOrderControlPointsDescriptions.onCall(0).returns([{ "id": 1, "language": "gb", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(1).returns([{ "id": 2, "language": "gb", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(2).returns([{ "id": 3, "language": "gb", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(3).returns([{ "id": 4, "language": "gb", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(4).returns([{ "id": 5, "language": "gb", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(5).returns([{ "id": 6, "language": "gb", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(6).returns([{ "id": 7, "language": "gb", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(7).returns([{ "id": 8, "language": "gb", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(8).returns([{ "id": 9, "language": "gb", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(9).returns([{ "id": 10, "language": "gb", "description": "This is a description" }]);

            let getReleasedOrderControlPointsFrequencies = sinon.stub(ordersModel, "getReleasedOrderControlPointsFrequencies").returns([{ "id": 1, "to25": 23, "to50": 2, "to100": 343, "to200": 5, "to300": 5, "to500": 6, "to700": 66, "to1000": 7, "to1500": 5, "to2000": 76, "to3000": 76, "to4000": 766, "to5000": 69 }])
            getReleasedOrderControlPointsFrequencies.onCall(9).returns([{ "id": 2, "to25": 25, "to50": 5, "to100": 345, "to200": 7, "to300": 7, "to500": 8, "to700": 68, "to1000": 9, "to1500": 7, "to2000": 78, "to3000": 78, "to4000": 768, "to5000": 71 }]);

            let getReleasedOrderControlPointsOptions = sinon.stub(ordersModel, "getReleasedOrderControlPointsOptions").returns([{ "id": 1, "controlPointId": 5, "value": "Yes" }, { "id": 2, "controlPointId": 5, "value": "No" }])
            getReleasedOrderControlPointsOptions.onCall(0).returns([{ "id": 1, "controlPointId": 5, "value": "Yes" }, { "id": 2, "controlPointId": 5, "value": "No" }]);
            getReleasedOrderControlPointsOptions.onCall(1).returns([{ "id": 3, "controlPointId": 6, "value": "Yes" }, { "id": 4, "controlPointId": 6, "value": "No" }]);
            getReleasedOrderControlPointsOptions.onCall(2).returns([{ "id": 5, "controlPointId": 7, "value": "Yes" }, { "id": 6, "controlPointId": 7, "value": "No" }]);
            getReleasedOrderControlPointsOptions.onCall(3).returns([{ "id": 7, "controlPointId": 10, "value": "Yes" }, { "id": 8, "controlPointId": 10, "value": "No" }]);

            sinon.stub(ordersModel, "qaReportControlPointResults").returns(
                [
                    {
                        "answer": "3",
                        "connectionId": 35,
                        "controlPointId": 8,
                        "qaReportId": 1,
                        "author": "taken"
                    },
                    {
                        "answer": "temp2",
                        "connectionId": 40,
                        "controlPointId": 9,
                        "qaReportId": 1,
                        "author": "taken"
                    },
                    {
                        "answer": "Yes",
                        "connectionId": 45,
                        "controlPointId": 10,
                        "qaReportId": 1,
                        "author": "taken"
                    },
                    {
                        "answer": "3",
                        "connectionId": 36,
                        "controlPointId": 8,
                        "qaReportId": 1,
                        "author": "taken"
                    },
                    {
                        "answer": "3",
                        "connectionId": 37,
                        "controlPointId": 8,
                        "qaReportId": 1,
                        "author": "taken"
                    },
                    {
                        "answer": "3",
                        "connectionId": 38,
                        "controlPointId": 8,
                        "qaReportId": 1,
                        "author": "taken"
                    },
                    {
                        "answer": "3",
                        "connectionId": 39,
                        "controlPointId": 8,
                        "qaReportId": 1,
                        "author": "taken"
                    },
                    {
                        "answer": "temp2",
                        "connectionId": 41,
                        "controlPointId": 9,
                        "qaReportId": 1,
                        "author": "taken"
                    },
                    {
                        "answer": "temp2",
                        "connectionId": 42,
                        "controlPointId": 9,
                        "qaReportId": 1,
                        "author": "taken"
                    },
                    {
                        "answer": "temp2",
                        "connectionId": 43,
                        "controlPointId": 9,
                        "qaReportId": 1,
                        "author": "taken"
                    },
                    {
                        "answer": "temp2",
                        "connectionId": 44,
                        "controlPointId": 9,
                        "qaReportId": 1,
                        "author": "taken"
                    },
                    {
                        "answer": "Yes",
                        "connectionId": 46,
                        "controlPointId": 10,
                        "qaReportId": 1,
                        "author": "taken"
                    },
                    {
                        "answer": "Yes",
                        "connectionId": 47,
                        "controlPointId": 10,
                        "qaReportId": 1,
                        "author": "taken"
                    },
                    {
                        "answer": "Yes",
                        "connectionId": 48,
                        "controlPointId": 10,
                        "qaReportId": 1,
                        "author": "taken"
                    },
                    {
                        "answer": "Yes",
                        "connectionId": 49,
                        "controlPointId": 10,
                        "qaReportId": 1,
                        "author": "taken"
                    },
                    {
                        "answer": "Yes",
                        "connectionId": 50,
                        "controlPointId": 10,
                        "qaReportId": 1,
                        "author": "taken"
                    },
                    {
                        "answer": "Yes",
                        "connectionId": 51,
                        "controlPointId": 10,
                        "qaReportId": 1,
                        "author": "taken"
                    }
                ]
            )

            const test1 = await ordersService.releasedOrderFull("12213", "gb")

            delete order.qaReportId
            delete test1.qaReportId

            assertEquals(JSON.stringify(test1), JSON.stringify(order))
        })

        it("get order OK qa report with values filled in. Author", async () => {
            sinon.stub(ordersModel, "getReleasedOrderInformation").returns([
                {
                    id: '47827',
                    description: 'Panelfilter 390x300x47',
                    categoryCode: '32110',
                    status: 3,
                    deadline: "Sun Jun 12 2022 19:00:00 GMT+0200",
                    location: 'Denmark, Give',
                    quantity: 240,
                    "qaReportId": 1,
                }
            ])

            sinon.stub(ordersModel, "getReleasedOrderReport").returns([{ "id": 1, "itemId": 47827, "status": false }])

            sinon.stub(ordersModel, "getReleasedOrderAttributes").returns(
                [
                    { "name": "Højde", "type": 3, "units": "mm", "value": "300.00", "id": 3 },
                    { "name": "Bredde", "type": 3, "units": "mm", "value": "390.00", "id": 4 },
                    { "name": "Dybde", "type": 3, "units": "mm", "value": "47", "id": 49 },
                    {
                        "name": "ISO 16890",
                        "type": 0,
                        "units": null,
                        "value": "ISO ePM10 50%",
                        "id": 51
                    },
                    { "name": "Webshop", "type": 0, "units": null, "value": "Ja", "id": 70 },
                    {
                        "name": "Paneltype",
                        "type": 0,
                        "units": null,
                        "value": "Z-line",
                        "id": 104
                    },
                    {
                        "name": "Ramme (panelfilter)",
                        "type": 0,
                        "units": null,
                        "value": "Fiber",
                        "id": 109
                    },
                    {
                        "name": "Number example",
                        "type": 3,
                        "units": "mm",
                        "value": "290.00",
                        "id": 110
                    },
                    {
                        "name": "Text example",
                        "type": 0,
                        "units": null,
                        "value": "ISO e",
                        "id": 111
                    },
                    {
                        "name": "Option example",
                        "type": 0,
                        "units": null,
                        "value": "Fiber glass",
                        "id": 112
                    }
                ]
            )

            sinon.stub(ordersModel, "getReleasedOrderControlPointsAuthors").returns(
                [
                    {
                        "id": 1,
                        "frequencyId": 1,
                        "type": 3,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "controlPointType": 1,
                        "author": "worker",
                        "connectionId": 11,
                        "answer": "4"
                    },
                    {
                        "id": 2,
                        "frequencyId": 1,
                        "type": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 1,
                        "controlPointType": 1,
                        "author": "worker",
                        "connectionId": 12,
                        "answer": "4"
                    },
                    {
                        "id": 3,
                        "frequencyId": 1,
                        "type": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 6,
                        "controlPointType": 1,
                        "author": "worker",
                        "connectionId": 13,
                        "answer": "4"
                    },
                    {
                        "id": 4,
                        "frequencyId": 1,
                        "type": 1,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "controlPointType": 1,
                        "author": "worker",
                        "connectionId": 14,
                        "answer": "temp"
                    },
                    {
                        "id": 5,
                        "frequencyId": 1,
                        "type": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "controlPointType": 1,
                        "author": "worker",
                        "connectionId": 15,
                        "answer": "Yes"
                    },
                    {
                        "id": 6,
                        "frequencyId": 1,
                        "type": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "controlPointType": 1,
                        "author": "worker",
                        "connectionId": 16,
                        "answer": "Yes"
                    },
                    {
                        "id": 7,
                        "frequencyId": 1,
                        "type": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "controlPointType": 1,
                        "author": "worker",
                        "connectionId": 17,
                        "answer": "Yes"
                    },
                    {
                        "id": 8,
                        "frequencyId": 1,
                        "type": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 6,
                        "controlPointType": 0,
                        "author": "worker",
                        "connectionId": 39,
                        "answer": "3"
                    },
                    {
                        "id": 9,
                        "frequencyId": 1,
                        "type": 1,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "controlPointType": 0,
                        "author": "worker",
                        "connectionId": 44,
                        "answer": "temp2"
                    },
                    {
                        "id": 10,
                        "frequencyId": 2,
                        "type": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "controlPointType": 0,
                        "author": "worker",
                        "connectionId": 51,
                        "answer": "Yes"
                    }
                ]
                                
            )

            let getControlPointAttributes = sinon.stub(ordersModel, "getControlPointAttributes").returns([])
            getControlPointAttributes.onCall(0).returns([{ "id": 3, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(1).returns([{ "id": 4, "maxValue": 400, "minValue": 300 }]);
            getControlPointAttributes.onCall(2).returns([{ "id": 49, "maxValue": 50, "minValue": 30 }]);
            getControlPointAttributes.onCall(3).returns([{ "id": 51, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(4).returns([{ "id": 70, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(5).returns([{ "id": 104, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(6).returns([{ "id": 109, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(7).returns([{ "id": 4, "maxValue": 400, "minValue": 300 }]);
            getControlPointAttributes.onCall(8).returns([{ "id": 51, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(9).returns([{ "id": 109, "maxValue": null, "minValue": null }]);

            sinon.stub(ordersModel, "createQAReport").returns([{ "id": 1, "itemId": 47827, "status": false }])
            sinon.stub(ordersModel, "insertControlPointConnection").returns("Success")

            let getReleasedOrderControlPointsDescriptions = sinon.stub(ordersModel, "getReleasedOrderControlPointsDescriptions").returns([{ "id": 1, "language": "gb", "description": "This is a description" }])
            getReleasedOrderControlPointsDescriptions.onCall(0).returns([{ "id": 1, "language": "gb", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(1).returns([{ "id": 2, "language": "gb", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(2).returns([{ "id": 3, "language": "gb", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(3).returns([{ "id": 4, "language": "gb", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(4).returns([{ "id": 5, "language": "gb", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(5).returns([{ "id": 6, "language": "gb", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(6).returns([{ "id": 7, "language": "gb", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(7).returns([{ "id": 8, "language": "gb", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(8).returns([{ "id": 9, "language": "gb", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(9).returns([{ "id": 10, "language": "gb", "description": "This is a description" }]);

            let getReleasedOrderControlPointsFrequencies = sinon.stub(ordersModel, "getReleasedOrderControlPointsFrequencies").returns([{ "id": 1, "to25": 23, "to50": 2, "to100": 343, "to200": 5, "to300": 5, "to500": 6, "to700": 66, "to1000": 7, "to1500": 5, "to2000": 76, "to3000": 76, "to4000": 766, "to5000": 69 }])
            getReleasedOrderControlPointsFrequencies.onCall(9).returns([{ "id": 2, "to25": 25, "to50": 5, "to100": 345, "to200": 7, "to300": 7, "to500": 8, "to700": 68, "to1000": 9, "to1500": 7, "to2000": 78, "to3000": 78, "to4000": 768, "to5000": 71 }]);

            let getReleasedOrderControlPointsOptions = sinon.stub(ordersModel, "getReleasedOrderControlPointsOptions").returns([{ "id": 1, "controlPointId": 5, "value": "Yes" }, { "id": 2, "controlPointId": 5, "value": "No" }])
            getReleasedOrderControlPointsOptions.onCall(0).returns([{ "id": 1, "controlPointId": 5, "value": "Yes" }, { "id": 2, "controlPointId": 5, "value": "No" }]);
            getReleasedOrderControlPointsOptions.onCall(1).returns([{ "id": 3, "controlPointId": 6, "value": "Yes" }, { "id": 4, "controlPointId": 6, "value": "No" }]);
            getReleasedOrderControlPointsOptions.onCall(2).returns([{ "id": 5, "controlPointId": 7, "value": "Yes" }, { "id": 6, "controlPointId": 7, "value": "No" }]);
            getReleasedOrderControlPointsOptions.onCall(3).returns([{ "id": 7, "controlPointId": 10, "value": "Yes" }, { "id": 8, "controlPointId": 10, "value": "No" }]);

            sinon.stub(ordersModel, "qaReportControlPointResultsAuthors").returns(
                [
                    {
                        "answer": "3",
                        "connectionId": 35,
                        "controlPointId": 8,
                        "qaReportId": 1,
                        "author": "worker"
                    },
                    {
                        "answer": "temp2",
                        "connectionId": 40,
                        "controlPointId": 9,
                        "qaReportId": 1,
                        "author": "worker"
                    },
                    {
                        "answer": "Yes",
                        "connectionId": 45,
                        "controlPointId": 10,
                        "qaReportId": 1,
                        "author": "worker"
                    },
                    {
                        "answer": "3",
                        "connectionId": 36,
                        "controlPointId": 8,
                        "qaReportId": 1,
                        "author": "worker"
                    },
                    {
                        "answer": "3",
                        "connectionId": 37,
                        "controlPointId": 8,
                        "qaReportId": 1,
                        "author": "worker"
                    },
                    {
                        "answer": "3",
                        "connectionId": 38,
                        "controlPointId": 8,
                        "qaReportId": 1,
                        "author": "worker"
                    },
                    {
                        "answer": "3",
                        "connectionId": 39,
                        "controlPointId": 8,
                        "qaReportId": 1,
                        "author": "worker"
                    },
                    {
                        "answer": "temp2",
                        "connectionId": 41,
                        "controlPointId": 9,
                        "qaReportId": 1,
                        "author": "worker"
                    },
                    {
                        "answer": "temp2",
                        "connectionId": 42,
                        "controlPointId": 9,
                        "qaReportId": 1,
                        "author": "worker"
                    },
                    {
                        "answer": "temp2",
                        "connectionId": 43,
                        "controlPointId": 9,
                        "qaReportId": 1,
                        "author": "worker"
                    },
                    {
                        "answer": "temp2",
                        "connectionId": 44,
                        "controlPointId": 9,
                        "qaReportId": 1,
                        "author": "worker"
                    },
                    {
                        "answer": "Yes",
                        "connectionId": 46,
                        "controlPointId": 10,
                        "qaReportId": 1,
                        "author": "worker"
                    },
                    {
                        "answer": "Yes",
                        "connectionId": 47,
                        "controlPointId": 10,
                        "qaReportId": 1,
                        "author": "worker"
                    },
                    {
                        "answer": "Yes",
                        "connectionId": 48,
                        "controlPointId": 10,
                        "qaReportId": 1,
                        "author": "worker"
                    },
                    {
                        "answer": "Yes",
                        "connectionId": 49,
                        "controlPointId": 10,
                        "qaReportId": 1,
                        "author": "worker"
                    },
                    {
                        "answer": "Yes",
                        "connectionId": 50,
                        "controlPointId": 10,
                        "qaReportId": 1,
                        "author": "worker"
                    },
                    {
                        "answer": "Yes",
                        "connectionId": 51,
                        "controlPointId": 10,
                        "qaReportId": 1,
                        "author": "worker"
                    }
                ]
            )

            const test1 = await ordersService.releasedOrderFull("12213", "gb", true)

            delete finishedOrderAuthor.qaReportId
            delete test1.qaReportId

            assertEquals(JSON.stringify(test1), JSON.stringify(finishedOrderAuthor))
        })
    })
})

function assertEquals(value1, value2) {
    if (value1 != value2) throw Error("Failed assert values: '" + value1 + "' is not '" + value2 + "'")
}