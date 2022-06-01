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
    "status": "completed",
    "deadline": "2022-06-12",
    "completionDate": "2022-05-12",
    "location": "DK",
    "quantity": 240,
    "qaReportId": 2,
    "oneTimeControlPoints": [
        {
            "id": 1,
            "image": "File1652206892425298.png",
            "frequencyId": 1,
            "inputType": 3,
            "lowerTolerance": null,
            "upperTolerance": null,
            "measurementType": 1,
            "author": "taken",
            "connectionId": 9,
            "answer": "31231",
            "description": "This is a description",
            "expectedValue": "300.00",
            "units": "mm",
            "toleranceText": ""
        },
        {
            "id": 2,
            "image": "File1652206892425298.png",
            "frequencyId": 1,
            "inputType": 3,
            "lowerTolerance": 1,
            "upperTolerance": 1,
            "measurementType": 1,
            "author": "taken",
            "connectionId": 10,
            "answer": "31231",
            "description": "This is a description",
            "expectedValue": "390.00",
            "units": "mm",
            "toleranceText": "+/-1mm"
        },
        {
            "id": 3,
            "image": "File1652206892425298.png",
            "frequencyId": 1,
            "inputType": 3,
            "lowerTolerance": 1,
            "upperTolerance": 6,
            "measurementType": 1,
            "author": "taken",
            "connectionId": 11,
            "answer": "31231",
            "description": "This is a description",
            "expectedValue": "47",
            "units": "mm",
            "toleranceText": "+6/-1mm"
        },
        {
            "id": 4,
            "image": "File1652206892425298.png",
            "frequencyId": 1,
            "inputType": 1,
            "lowerTolerance": null,
            "upperTolerance": null,
            "measurementType": 1,
            "author": "taken",
            "connectionId": 12,
            "answer": "afdaff",
            "description": "This is a description",
            "expectedValue": "ISO ePM10 50%",
            "units": "Text",
            "toleranceText": ""
        },
        {
            "id": 5,
            "image": "File1652206892425298.png",
            "frequencyId": 1,
            "inputType": 0,
            "lowerTolerance": null,
            "upperTolerance": null,
            "measurementType": 1,
            "author": "taken",
            "connectionId": 13,
            "answer": "Yes",
            "description": "This is a description",
            "options": [
                { "id": 1, "controlPointId": 5, "value": "Yes" },
                { "id": 2, "controlPointId": 5, "value": "No" }
            ],
            "expectedValue": "Ja",
            "units": "Yes/No",
            "toleranceText": ""
        },
        {
            "id": 6,
            "image": "File1652206892425298.png",
            "frequencyId": 1,
            "inputType": 0,
            "lowerTolerance": null,
            "upperTolerance": null,
            "measurementType": 1,
            "author": "taken",
            "connectionId": 14,
            "answer": "Yes",
            "description": "This is a description",
            "options": [
                { "id": 3, "controlPointId": 6, "value": "Yes" },
                { "id": 4, "controlPointId": 6, "value": "No" }
            ],
            "expectedValue": "Z-line",
            "units": "Yes/No",
            "toleranceText": ""
        },
        {
            "id": 7,
            "image": "File1652206892425298.png",
            "frequencyId": 1,
            "inputType": 0,
            "lowerTolerance": null,
            "upperTolerance": null,
            "measurementType": 1,
            "author": "taken",
            "connectionId": 15,
            "answer": "Yes",
            "description": "This is a description",
            "options": [
                { "id": 5, "controlPointId": 7, "value": "Yes" },
                { "id": 6, "controlPointId": 7, "value": "No" }
            ],
            "expectedValue": "Fiber",
            "units": "Yes/No",
            "toleranceText": ""
        }
    ],
    "multipleTimeControlPoints": [
        {
            "id": 8,
            "image": "File1652206892425298.png",
            "frequencyId": null,
            "inputType": 3,
            "lowerTolerance": 1,
            "upperTolerance": 6,
            "measurementType": 0,
            "author": "taken",
            "connectionId": 25,
            "answer": "31231",
            "description": "This is a description",
            "expectedValue": "340.00",
            "units": "mm",
            "toleranceText": "+6/-1mm",
            "letter": "A"
        },
        {
            "id": 9,
            "image": "File1652206892425298.png",
            "frequencyId": 1,
            "inputType": 1,
            "lowerTolerance": null,
            "upperTolerance": null,
            "measurementType": 0,
            "author": "taken",
            "connectionId": 29,
            "answer": "afdaff",
            "description": "This is a description",
            "expectedValue": "ISO e",
            "units": "Text",
            "toleranceText": "",
            "letter": "B"
        },
        {
            "id": 10,
            "image": "File1652206892425298.png",
            "frequencyId": 2,
            "inputType": 0,
            "lowerTolerance": null,
            "upperTolerance": null,
            "measurementType": 0,
            "author": "taken",
            "connectionId": 35,
            "answer": "Yes",
            "description": "This is a description",
            "options": [
                { "id": 7, "controlPointId": 10, "value": "Yes" },
                { "id": 8, "controlPointId": 10, "value": "No" }
            ],
            "expectedValue": "Fiber glass",
            "units": "Yes/No",
            "toleranceText": "",
            "letter": "C"
        }
    ],
    "multipleTimeAnswers": [
        [
            {
                "connectionId": 16,
                "id": 8,
                "answer": "31231",
                "inputType": 3,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 19,
                "id": 8,
                "answer": "31231",
                "inputType": 3,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 20,
                "id": 8,
                "answer": "31231",
                "inputType": 3,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 21,
                "id": 8,
                "answer": "31231",
                "inputType": 3,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 22,
                "id": 8,
                "answer": "31231",
                "inputType": 3,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 23,
                "id": 8,
                "answer": "31231",
                "inputType": 3,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 24,
                "id": 8,
                "answer": "31231",
                "inputType": 3,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 25,
                "id": 8,
                "answer": "31231",
                "inputType": 3,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            }
        ],
        [
            {
                "connectionId": 17,
                "id": 9,
                "answer": "afdaff",
                "inputType": 1,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 26,
                "id": 9,
                "answer": "afdaff",
                "inputType": 1,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 27,
                "id": 9,
                "answer": "afdaff",
                "inputType": 1,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 28,
                "id": 9,
                "answer": "afdaff",
                "inputType": 1,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 29,
                "id": 9,
                "answer": "afdaff",
                "inputType": 1,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            }
        ],
        [
            {
                "connectionId": 18,
                "id": 10,
                "answer": "Yes",
                "inputType": 0,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 30,
                "id": 10,
                "answer": "Yes",
                "inputType": 0,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 31,
                "id": 10,
                "answer": "Yes",
                "inputType": 0,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 32,
                "id": 10,
                "answer": "Yes",
                "inputType": 0,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 33,
                "id": 10,
                "answer": "Yes",
                "inputType": 0,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 34,
                "id": 10,
                "answer": "Yes",
                "inputType": 0,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 35,
                "id": 10,
                "answer": "Yes",
                "inputType": 0,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            }
        ]
    ]
}

let unfinishedOrderWithAllInputs = {
    "id": "47827",
    "description": "Panelfilter 390x300x47",
    "categoryCode": "32110",
    "status": "incomplete",
    "deadline": "2022-06-12",
    "completionDate": null,
    "location": "DK",
    "quantity": 240,
    "qaReportId": 2,
    "oneTimeControlPoints": [
        {
            "id": 1,
            "image": "File1652206892425298.png",
            "frequencyId": 1,
            "inputType": 3,
            "lowerTolerance": null,
            "upperTolerance": null,
            "measurementType": 1,
            "author": "taken",
            "connectionId": 9,
            "answer": "31231",
            "description": "This is a description",
            "expectedValue": "300.00",
            "units": "mm",
            "toleranceText": ""
        },
        {
            "id": 2,
            "image": "File1652206892425298.png",
            "frequencyId": 1,
            "inputType": 3,
            "lowerTolerance": 1,
            "upperTolerance": 1,
            "measurementType": 1,
            "author": "taken",
            "connectionId": 10,
            "answer": "31231",
            "description": "This is a description",
            "expectedValue": "390.00",
            "units": "mm",
            "toleranceText": "+/-1mm"
        },
        {
            "id": 3,
            "image": "File1652206892425298.png",
            "frequencyId": 1,
            "inputType": 3,
            "lowerTolerance": 1,
            "upperTolerance": 6,
            "measurementType": 1,
            "author": "taken",
            "connectionId": 11,
            "answer": "31231",
            "description": "This is a description",
            "expectedValue": "47",
            "units": "mm",
            "toleranceText": "+6/-1mm"
        },
        {
            "id": 4,
            "image": "File1652206892425298.png",
            "frequencyId": 1,
            "inputType": 1,
            "lowerTolerance": null,
            "upperTolerance": null,
            "measurementType": 1,
            "author": "taken",
            "connectionId": 12,
            "answer": "afdaff",
            "description": "This is a description",
            "expectedValue": "ISO ePM10 50%",
            "units": "Text",
            "toleranceText": ""
        },
        {
            "id": 5,
            "image": "File1652206892425298.png",
            "frequencyId": 1,
            "inputType": 0,
            "lowerTolerance": null,
            "upperTolerance": null,
            "measurementType": 1,
            "author": "taken",
            "connectionId": 13,
            "answer": "Yes",
            "description": "This is a description",
            "options": [
                { "id": 1, "controlPointId": 5, "value": "Yes" },
                { "id": 2, "controlPointId": 5, "value": "No" }
            ],
            "expectedValue": "Ja",
            "units": "Yes/No",
            "toleranceText": ""
        },
        {
            "id": 6,
            "image": "File1652206892425298.png",
            "frequencyId": 1,
            "inputType": 0,
            "lowerTolerance": null,
            "upperTolerance": null,
            "measurementType": 1,
            "author": "taken",
            "connectionId": 14,
            "answer": "Yes",
            "description": "This is a description",
            "options": [
                { "id": 3, "controlPointId": 6, "value": "Yes" },
                { "id": 4, "controlPointId": 6, "value": "No" }
            ],
            "expectedValue": "Z-line",
            "units": "Yes/No",
            "toleranceText": ""
        },
        {
            "id": 7,
            "image": "File1652206892425298.png",
            "frequencyId": 1,
            "inputType": 0,
            "lowerTolerance": null,
            "upperTolerance": null,
            "measurementType": 1,
            "author": "taken",
            "connectionId": 15,
            "answer": "Yes",
            "description": "This is a description",
            "options": [
                { "id": 5, "controlPointId": 7, "value": "Yes" },
                { "id": 6, "controlPointId": 7, "value": "No" }
            ],
            "expectedValue": "Fiber",
            "units": "Yes/No",
            "toleranceText": ""
        }
    ],
    "multipleTimeControlPoints": [
        {
            "id": 8,
            "image": "File1652206892425298.png",
            "frequencyId": null,
            "inputType": 3,
            "lowerTolerance": 1,
            "upperTolerance": 6,
            "measurementType": 0,
            "author": "taken",
            "connectionId": 25,
            "answer": "31231",
            "description": "This is a description",
            "expectedValue": "340.00",
            "units": "mm",
            "toleranceText": "+6/-1mm",
            "letter": "A"
        },
        {
            "id": 9,
            "image": "File1652206892425298.png",
            "frequencyId": 1,
            "inputType": 1,
            "lowerTolerance": null,
            "upperTolerance": null,
            "measurementType": 0,
            "author": "taken",
            "connectionId": 29,
            "answer": "afdaff",
            "description": "This is a description",
            "expectedValue": "ISO e",
            "units": "Text",
            "toleranceText": "",
            "letter": "B"
        },
        {
            "id": 10,
            "image": "File1652206892425298.png",
            "frequencyId": 2,
            "inputType": 0,
            "lowerTolerance": null,
            "upperTolerance": null,
            "measurementType": 0,
            "author": "taken",
            "connectionId": 35,
            "answer": "Yes",
            "description": "This is a description",
            "options": [
                { "id": 7, "controlPointId": 10, "value": "Yes" },
                { "id": 8, "controlPointId": 10, "value": "No" }
            ],
            "expectedValue": "Fiber glass",
            "units": "Yes/No",
            "toleranceText": "",
            "letter": "C"
        }
    ],
    "multipleTimeAnswers": [
        [
            {
                "connectionId": 16,
                "id": 8,
                "answer": "31231",
                "inputType": 3,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 19,
                "id": 8,
                "answer": "31231",
                "inputType": 3,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 20,
                "id": 8,
                "answer": "31231",
                "inputType": 3,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 21,
                "id": 8,
                "answer": "31231",
                "inputType": 3,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 22,
                "id": 8,
                "answer": "31231",
                "inputType": 3,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 23,
                "id": 8,
                "answer": "31231",
                "inputType": 3,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 24,
                "id": 8,
                "answer": "31231",
                "inputType": 3,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 25,
                "id": 8,
                "answer": "31231",
                "inputType": 3,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            }
        ],
        [
            {
                "connectionId": 17,
                "id": 9,
                "answer": "afdaff",
                "inputType": 1,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 26,
                "id": 9,
                "answer": "afdaff",
                "inputType": 1,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 27,
                "id": 9,
                "answer": "afdaff",
                "inputType": 1,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 28,
                "id": 9,
                "answer": "afdaff",
                "inputType": 1,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 29,
                "id": 9,
                "answer": "afdaff",
                "inputType": 1,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            }
        ],
        [
            {
                "connectionId": 18,
                "id": 10,
                "answer": "Yes",
                "inputType": 0,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 30,
                "id": 10,
                "answer": "Yes",
                "inputType": 0,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 31,
                "id": 10,
                "answer": "Yes",
                "inputType": 0,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 32,
                "id": 10,
                "answer": "Yes",
                "inputType": 0,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 33,
                "id": 10,
                "answer": "Yes",
                "inputType": 0,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 34,
                "id": 10,
                "answer": "Yes",
                "inputType": 0,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 35,
                "id": 10,
                "answer": "Yes",
                "inputType": 0,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            }
        ]
    ]
}

let unfinishedOrderAuthorMain = {
    "id": "47827",
    "description": "Panelfilter 390x300x47",
    "categoryCode": "32110",
    "status": "incomplete",
    "deadline": "2022-06-12",
    "completionDate": null,
    "location": "DK",
    "quantity": 240,
    "qaReportId": 2,
    "oneTimeControlPoints": [
        {
            "id": 1,
            "image": "File1652206892425298.png",
            "frequencyId": 1,
            "inputType": 3,
            "lowerTolerance": null,
            "upperTolerance": null,
            "measurementType": 1,
            "author": "worker",
            "connectionId": 9,
            "answer": "31231",
            "description": "This is a description",
            "expectedValue": "300.00",
            "units": "mm",
            "toleranceText": ""
        },
        {
            "id": 2,
            "image": "File1652206892425298.png",
            "frequencyId": 1,
            "inputType": 3,
            "lowerTolerance": 1,
            "upperTolerance": 1,
            "measurementType": 1,
            "author": "worker",
            "connectionId": 10,
            "answer": "31231",
            "description": "This is a description",
            "expectedValue": "390.00",
            "units": "mm",
            "toleranceText": "+/-1mm"
        },
        {
            "id": 3,
            "image": "File1652206892425298.png",
            "frequencyId": 1,
            "inputType": 3,
            "lowerTolerance": 1,
            "upperTolerance": 6,
            "measurementType": 1,
            "author": "worker",
            "connectionId": 11,
            "answer": "31231",
            "description": "This is a description",
            "expectedValue": "47",
            "units": "mm",
            "toleranceText": "+6/-1mm"
        },
        {
            "id": 4,
            "image": "File1652206892425298.png",
            "frequencyId": 1,
            "inputType": 1,
            "lowerTolerance": null,
            "upperTolerance": null,
            "measurementType": 1,
            "author": "worker",
            "connectionId": 12,
            "answer": "afdaff",
            "description": "This is a description",
            "expectedValue": "ISO ePM10 50%",
            "units": "Text",
            "toleranceText": ""
        },
        {
            "id": 5,
            "image": "File1652206892425298.png",
            "frequencyId": 1,
            "inputType": 0,
            "lowerTolerance": null,
            "upperTolerance": null,
            "measurementType": 1,
            "author": "worker",
            "connectionId": 13,
            "answer": "Yes",
            "description": "This is a description",
            "options": [
                { "id": 1, "controlPointId": 5, "value": "Yes" },
                { "id": 2, "controlPointId": 5, "value": "No" }
            ],
            "expectedValue": "Ja",
            "units": "Yes/No",
            "toleranceText": ""
        },
        {
            "id": 6,
            "image": "File1652206892425298.png",
            "frequencyId": 1,
            "inputType": 0,
            "lowerTolerance": null,
            "upperTolerance": null,
            "measurementType": 1,
            "author": "worker",
            "connectionId": 14,
            "answer": "Yes",
            "description": "This is a description",
            "options": [
                { "id": 3, "controlPointId": 6, "value": "Yes" },
                { "id": 4, "controlPointId": 6, "value": "No" }
            ],
            "expectedValue": "Z-line",
            "units": "Yes/No",
            "toleranceText": ""
        },
        {
            "id": 7,
            "image": "File1652206892425298.png",
            "frequencyId": 1,
            "inputType": 0,
            "lowerTolerance": null,
            "upperTolerance": null,
            "measurementType": 1,
            "author": "worker",
            "connectionId": 15,
            "answer": "Yes",
            "description": "This is a description",
            "options": [
                { "id": 5, "controlPointId": 7, "value": "Yes" },
                { "id": 6, "controlPointId": 7, "value": "No" }
            ],
            "expectedValue": "Fiber",
            "units": "Yes/No",
            "toleranceText": ""
        }
    ],
    "multipleTimeControlPoints": [
        {
            "id": 8,
            "image": "File1652206892425298.png",
            "frequencyId": null,
            "inputType": 3,
            "lowerTolerance": 1,
            "upperTolerance": 6,
            "measurementType": 0,
            "author": "worker",
            "connectionId": 25,
            "answer": "31231",
            "description": "This is a description",
            "expectedValue": "340.00",
            "units": "mm",
            "toleranceText": "+6/-1mm",
            "letter": "A"
        },
        {
            "id": 9,
            "image": "File1652206892425298.png",
            "frequencyId": 1,
            "inputType": 1,
            "lowerTolerance": null,
            "upperTolerance": null,
            "measurementType": 0,
            "author": "worker",
            "connectionId": 29,
            "answer": "afdaff",
            "description": "This is a description",
            "expectedValue": "ISO e",
            "units": "Text",
            "toleranceText": "",
            "letter": "B"
        },
        {
            "id": 10,
            "image": "File1652206892425298.png",
            "frequencyId": 2,
            "inputType": 0,
            "lowerTolerance": null,
            "upperTolerance": null,
            "measurementType": 0,
            "author": "worker",
            "connectionId": 35,
            "answer": "Yes",
            "description": "This is a description",
            "options": [
                { "id": 7, "controlPointId": 10, "value": "Yes" },
                { "id": 8, "controlPointId": 10, "value": "No" }
            ],
            "expectedValue": "Fiber glass",
            "units": "Yes/No",
            "toleranceText": "",
            "letter": "C"
        }
    ],
    "multipleTimeAnswers": [
        [
            {
                "connectionId": 16,
                "id": 8,
                "answer": "31231",
                "inputType": 3,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 19,
                "id": 8,
                "answer": "31231",
                "inputType": 3,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 20,
                "id": 8,
                "answer": "31231",
                "inputType": 3,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 21,
                "id": 8,
                "answer": "31231",
                "inputType": 3,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 22,
                "id": 8,
                "answer": "31231",
                "inputType": 3,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 23,
                "id": 8,
                "answer": "31231",
                "inputType": 3,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 24,
                "id": 8,
                "answer": "31231",
                "inputType": 3,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 25,
                "id": 8,
                "answer": "31231",
                "inputType": 3,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            }
        ],
        [
            {
                "connectionId": 17,
                "id": 9,
                "answer": "afdaff",
                "inputType": 1,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 26,
                "id": 9,
                "answer": "afdaff",
                "inputType": 1,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 27,
                "id": 9,
                "answer": "afdaff",
                "inputType": 1,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 28,
                "id": 9,
                "answer": "afdaff",
                "inputType": 1,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 29,
                "id": 9,
                "answer": "afdaff",
                "inputType": 1,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            }
        ],
        [
            {
                "connectionId": 18,
                "id": 10,
                "answer": "Yes",
                "inputType": 0,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 30,
                "id": 10,
                "answer": "Yes",
                "inputType": 0,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 31,
                "id": 10,
                "answer": "Yes",
                "inputType": 0,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 32,
                "id": 10,
                "answer": "Yes",
                "inputType": 0,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 33,
                "id": 10,
                "answer": "Yes",
                "inputType": 0,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 34,
                "id": 10,
                "answer": "Yes",
                "inputType": 0,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
            },
            {
                "connectionId": 35,
                "id": 10,
                "answer": "Yes",
                "inputType": 0,
                "author": "taken",
                "timestamp": "2022-05-25 10:20"
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
    "completionDate": null,
    "location": "DK",
    "quantity": 240,
    "qaReportId": 2,
    "oneTimeControlPoints": [
        {
            "id": 1,
            "image": "File1652206892425298.png",
            "frequencyId": 1,
            "inputType": 3,
            "lowerTolerance": null,
            "upperTolerance": null,
            "measurementType": 1,
            "author": "",
            "connectionId": 9,
            "answer": "",
            "description": "This is a description",
            "expectedValue": "300.00",
            "units": "mm",
            "toleranceText": ""
        },
        {
            "id": 2,
            "image": "File1652206892425298.png",
            "frequencyId": 1,
            "inputType": 3,
            "lowerTolerance": 1,
            "upperTolerance": 1,
            "measurementType": 1,
            "author": "",
            "connectionId": 10,
            "answer": "",
            "description": "This is a description",
            "expectedValue": "390.00",
            "units": "mm",
            "toleranceText": "+/-1mm"
        },
        {
            "id": 3,
            "image": "File1652206892425298.png",
            "frequencyId": 1,
            "inputType": 3,
            "lowerTolerance": 1,
            "upperTolerance": 6,
            "measurementType": 1,
            "author": "",
            "connectionId": 11,
            "answer": "",
            "description": "This is a description",
            "expectedValue": "47",
            "units": "mm",
            "toleranceText": "+6/-1mm"
        },
        {
            "id": 4,
            "image": "File1652206892425298.png",
            "frequencyId": 1,
            "inputType": 1,
            "lowerTolerance": null,
            "upperTolerance": null,
            "measurementType": 1,
            "author": "",
            "connectionId": 12,
            "answer": "",
            "description": "This is a description",
            "expectedValue": "ISO ePM10 50%",
            "units": "Text",
            "toleranceText": ""
        },
        {
            "id": 5,
            "image": "File1652206892425298.png",
            "frequencyId": 1,
            "inputType": 0,
            "lowerTolerance": null,
            "upperTolerance": null,
            "measurementType": 1,
            "author": "",
            "connectionId": 13,
            "answer": "",
            "description": "This is a description",
            "options": [
                { "id": 1, "controlPointId": 5, "value": "Yes" },
                { "id": 2, "controlPointId": 5, "value": "No" }
            ],
            "expectedValue": "Ja",
            "units": "Yes/No",
            "toleranceText": ""
        },
        {
            "id": 6,
            "image": "File1652206892425298.png",
            "frequencyId": 1,
            "inputType": 0,
            "lowerTolerance": null,
            "upperTolerance": null,
            "measurementType": 1,
            "author": "",
            "connectionId": 14,
            "answer": "",
            "description": "This is a description",
            "options": [
                { "id": 3, "controlPointId": 6, "value": "Yes" },
                { "id": 4, "controlPointId": 6, "value": "No" }
            ],
            "expectedValue": "Z-line",
            "units": "Yes/No",
            "toleranceText": ""
        },
        {
            "id": 7,
            "image": "File1652206892425298.png",
            "frequencyId": 1,
            "inputType": 0,
            "lowerTolerance": null,
            "upperTolerance": null,
            "measurementType": 1,
            "author": "",
            "connectionId": 15,
            "answer": "",
            "description": "This is a description",
            "options": [
                { "id": 5, "controlPointId": 7, "value": "Yes" },
                { "id": 6, "controlPointId": 7, "value": "No" }
            ],
            "expectedValue": "Fiber",
            "units": "Yes/No",
            "toleranceText": ""
        }
    ],
    "multipleTimeControlPoints": [
        {
            "id": 8,
            "image": "File1652206892425298.png",
            "frequencyId": null,
            "inputType": 3,
            "lowerTolerance": 1,
            "upperTolerance": 6,
            "measurementType": 0,
            "author": "",
            "connectionId": 25,
            "answer": "",
            "description": "This is a description",
            "expectedValue": "340.00",
            "units": "mm",
            "toleranceText": "+6/-1mm",
            "letter": "A"
        },
        {
            "id": 9,
            "image": "File1652206892425298.png",
            "frequencyId": 1,
            "inputType": 1,
            "lowerTolerance": null,
            "upperTolerance": null,
            "measurementType": 0,
            "author": "",
            "connectionId": 29,
            "answer": "",
            "description": "This is a description",
            "expectedValue": "ISO e",
            "units": "Text",
            "toleranceText": "",
            "letter": "B"
        },
        {
            "id": 10,
            "image": "File1652206892425298.png",
            "frequencyId": 2,
            "inputType": 0,
            "lowerTolerance": null,
            "upperTolerance": null,
            "measurementType": 0,
            "author": "",
            "connectionId": 35,
            "answer": "",
            "description": "This is a description",
            "options": [
                { "id": 7, "controlPointId": 10, "value": "Yes" },
                { "id": 8, "controlPointId": 10, "value": "No" }
            ],
            "expectedValue": "Fiber glass",
            "units": "Yes/No",
            "toleranceText": "",
            "letter": "C"
        }
    ],
    "multipleTimeAnswers": [
        [
            {
                "connectionId": 16,
                "id": 8,
                "answer": "",
                "inputType": 3,
                "author": "",
                "timestamp": null
            },
            {
                "connectionId": 19,
                "id": 8,
                "answer": "",
                "inputType": 3,
                "author": "",
                "timestamp": null
            },
            {
                "connectionId": 20,
                "id": 8,
                "answer": "",
                "inputType": 3,
                "author": "",
                "timestamp": null
            },
            {
                "connectionId": 21,
                "id": 8,
                "answer": "",
                "inputType": 3,
                "author": "",
                "timestamp": null
            },
            {
                "connectionId": 22,
                "id": 8,
                "answer": "",
                "inputType": 3,
                "author": "",
                "timestamp": null
            },
            {
                "connectionId": 23,
                "id": 8,
                "answer": "",
                "inputType": 3,
                "author": "",
                "timestamp": null
            },
            {
                "connectionId": 24,
                "id": 8,
                "answer": "",
                "inputType": 3,
                "author": "",
                "timestamp": null
            },
            {
                "connectionId": 25,
                "id": 8,
                "answer": "",
                "inputType": 3,
                "author": "",
                "timestamp": null
            }
        ],
        [
            {
                "connectionId": 17,
                "id": 9,
                "answer": "",
                "inputType": 1,
                "author": "",
                "timestamp": null
            },
            {
                "connectionId": 26,
                "id": 9,
                "answer": "",
                "inputType": 1,
                "author": "",
                "timestamp": null
            },
            {
                "connectionId": 27,
                "id": 9,
                "answer": "",
                "inputType": 1,
                "author": "",
                "timestamp": null
            },
            {
                "connectionId": 28,
                "id": 9,
                "answer": "",
                "inputType": 1,
                "author": "",
                "timestamp": null
            },
            {
                "connectionId": 29,
                "id": 9,
                "answer": "",
                "inputType": 1,
                "author": "",
                "timestamp": null
            }
        ],
        [
            {
                "connectionId": 18,
                "id": 10,
                "answer": "",
                "inputType": 0,
                "author": "",
                "timestamp": null
            },
            {
                "connectionId": 30,
                "id": 10,
                "answer": "",
                "inputType": 0,
                "author": "",
                "timestamp": null
            },
            {
                "connectionId": 31,
                "id": 10,
                "answer": "",
                "inputType": 0,
                "author": "",
                "timestamp": null
            },
            {
                "connectionId": 32,
                "id": 10,
                "answer": "",
                "inputType": 0,
                "author": "",
                "timestamp": null
            },
            {
                "connectionId": 33,
                "id": 10,
                "answer": "",
                "inputType": 0,
                "author": "",
                "timestamp": null
            },
            {
                "connectionId": 34,
                "id": 10,
                "answer": "",
                "inputType": 0,
                "author": "",
                "timestamp": null
            },
            {
                "connectionId": 35,
                "id": 10,
                "answer": "",
                "inputType": 0,
                "author": "",
                "timestamp": null
            }
        ]
    ]
}


let unfinishedOrder = JSON.parse(JSON.stringify(unfinishedOrderMain))
let finishedOrderAuthor = JSON.parse(JSON.stringify(unfinishedOrderAuthorMain))

let order = JSON.parse(JSON.stringify(finishedOrder))

describe("Orders service testing", () => {

    afterEach(function () {
        sinon.restore()
        order = JSON.parse(JSON.stringify(finishedOrder))
        unfinishedOrder = JSON.parse(JSON.stringify(unfinishedOrderMain))
        finishedOrderAuthor = JSON.parse(JSON.stringify(unfinishedOrderAuthorMain))
    })

    describe("releasedOrders", () => {
        it("OK", async () => {

            sinon.stub(ordersModel, "getReleasedOrders").returns([{ id: "1", }, { id: "2" }, { id: "3" }])
            // CHeck input for this function

            sinon.stub(ordersModel, "getMultipleQAReports").returns([{ itemId: "1", status: 0 }, { itemId: "2", status: 1 }])

            const data = await ordersService.releasedOrders("denmark")

            assertEquals(data.length, 2)
            assertEquals(data[0].id, '1')
            assertEquals(data[1].id, '3')
        })

        it("OK no released orders", async () => {

            sinon.stub(ordersModel, "getReleasedOrders").returns([])
            // CHeck input for this function

            sinon.stub(ordersModel, "getMultipleQAReports").returns([{ itemId: "1", status: 0 }, { itemId: "2", status: 1 }])

            const data = await ordersService.releasedOrders("denmark")

            assertEquals(data.length, 0)
        })
    })

    describe("completed orders", () => {
        it("OK", async () => {

            sinon.stub(ordersModel, "getCompletedQAReports").returns([{ itemId: "1", }, { itemId: "2" }])
            // CHeck input for this function
            sinon.stub(ordersModel, "getOrdersByIdList").returns([{ itemId: "1", deadline: "Sun Jun 12 2022 19:00:00 GMT+0200" }, { itemId: "2", deadline: "Sun Jun 12 2022 19:00:00 GMT+0200" }])

            const data = await ordersService.completedOrders("denmark")

            assertEquals(data.length, 2)
            assertEquals(data[0].itemId, '1')
            assertEquals(data[1].itemId, '2')
        })

        it("OK no completed orders", async () => {

            sinon.stub(ordersModel, "getCompletedQAReports").returns([])
            // CHeck input for this function

            const data = await ordersService.completedOrders("denmark")

            assertEquals(data.length, 0)
        })


        it("OK all location", async () => {

            sinon.stub(ordersModel, "getCompletedQAReports").returns([{ itemId: "1", }, { itemId: "2" }])
            // CHeck input for this function
            sinon.stub(ordersModel, "getOrdersByIdListAllLocations").returns([{ itemId: "1", deadline: "Sun Jun 12 2022 19:00:00 GMT+0200" }, { itemId: "2", deadline: "Sun Jun 12 2022 19:00:00 GMT+0200" }])

            const data = await ordersService.completedOrders("all")

            assertEquals(data.length, 2)
            assertEquals(data[0].itemId, '1')
            assertEquals(data[1].itemId, '2')
        })
    })

    describe("saveQAReport", () => {
        // ERROR Order does not exist in the database
        it("ERROR Order does not exist in the database", async () => {

            sinon.stub(ordersService, "getQAReport").returns(null)

            const data = await ordersService.saveQAReport(
                { data: "data" },
                'worker'
            )

            assertEquals(data.response, 0)
        })

        // ERROR Order does not match some basic fields
        it("ERROR Order does not match some basic fields", async () => {
            sinon.stub(ordersService, "getQAReport").returns(order)

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
            assertEquals(test6.response, 0)
            assertEquals(test7.response, 0)
            assertEquals(test8.response, 0)
            assertEquals(test9.response, 0)
            assertEquals(test10.response, 0)
            // message is not tested for because it may change latter. It just gives information ot end user of the system.
        })

        // ERROR Order does not match control point id's of answers
        it("ERROR Order does not match control point id's of answers", async () => {
            sinon.stub(ordersService, "getQAReport").returns(order)

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

        // WARNING Invalid inputs
        it("WARNING Invalid inputs", async () => {

            // CHeck input for this function

            sinon.stub(ordersModel, "alterMeasurement").returns("Completed")

            sinon.stub(ordersService, "getQAReport").returns(unfinishedOrderWithAllInputs)

            // // ONE TIME values
            // Test one time number value
            let orderTest = JSON.parse(JSON.stringify(unfinishedOrderWithAllInputs))
            orderTest.oneTimeControlPoints[0].answer = "dasdasd"
            const test1 = await ordersService.saveQAReport(
                orderTest,
                'worker'
            )
            assertEquals(test1.response, 2)

            // Test one time text value
            orderTest = JSON.parse(JSON.stringify(unfinishedOrderWithAllInputs))
            orderTest.oneTimeControlPoints[3].answer = 1
            const test2 = await ordersService.saveQAReport(
                orderTest,
                'worker'
            )
            assertEquals(test2.response, 2)

            // Test one time option value
            orderTest = JSON.parse(JSON.stringify(unfinishedOrderWithAllInputs))
            orderTest.oneTimeControlPoints[4].answer = 1
            const test3 = await ordersService.saveQAReport(
                orderTest,
                'worker'
            )
            assertEquals(test3.response, 2)

            // // MULTI TIME values
            // Test multi time number value
            orderTest = JSON.parse(JSON.stringify(unfinishedOrderWithAllInputs))
            orderTest.multipleTimeAnswers[0][0].answer = "dasdasd"
            const test4 = await ordersService.saveQAReport(
                orderTest,
                'worker'
            )
            assertEquals(test4.response, 2)

            // Test multi time text value
            orderTest = JSON.parse(JSON.stringify(unfinishedOrderWithAllInputs))
            orderTest.multipleTimeAnswers[1][0].answer = 1
            const test5 = await ordersService.saveQAReport(
                orderTest,
                'worker'
            )
            assertEquals(test5.response, 2)

            // Test multi time option value
            orderTest = JSON.parse(JSON.stringify(unfinishedOrderWithAllInputs))
            orderTest.multipleTimeAnswers[2][0].answer = 1
            const test6 = await ordersService.saveQAReport(
                orderTest,
                'worker'
            )
            assertEquals(test6.response, 2)
        })

        // WARNING No data was updated
        it("WARNING No data was updated", async () => {

            sinon.stub(ordersModel, "alterMeasurement").returns("Completed")

            sinon.stub(ordersService, "getQAReport").returns(unfinishedOrder)

            const data = await ordersService.saveQAReport(
                unfinishedOrder,
                'worker'
            )

            assertEquals(data.response, 2)
        })
        // OK 
        it("OK", async () => {

            sinon.stub(ordersModel, "alterMeasurement").returns("Completed")

            sinon.stub(ordersService, "getQAReport").returns(unfinishedOrder)

            const data = await ordersService.saveQAReport(
                finishedOrderAuthor,
                'worker'
            )

            assertEquals(data.response, 1)
        })
    })

    describe("completeQAReport", () => {
        it("OK", async () => {

            sinon.stub(ordersModel, "setQaReportStatusToFinished").returns("Completed")

            sinon.stub(ordersService, "saveQAReport").returns({ response: 1, message: "Data is not valid" })

            const data = await ordersService.completeQAReport(
                order,
                'worker'
            )

            assertEquals(data.response, 1)
        })

        it("ERROR missing values in order", async () => {
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

        it("ERROR not all values filled in", async () => {
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

        it("ERROR error from saving", async () => {

            sinon.stub(ordersService, "saveQAReport").returns({ response: 0, message: "Data is not valid" })

            const test1 = await ordersService.completeQAReport(
                order,
                'worker'
            )
            assertEquals(test1.response, 0)
        })
    })

    describe("getQAReport", () => {
        // Order not exists
        it("ERROR Order not exists", async () => {

            sinon.stub(ordersModel, "getOrderInformation").returns([])

            const test1 = await ordersService.getQAReport("12213", "111414", "english", false, false)
            assertEquals(test1.response, 0)
        })

        // Order is completed
        it("ERROR Order is completed", async () => {

            sinon.stub(ordersModel, "getOrderInformation").returns([{
                id: '47827',
                description: 'Panelfilter 390x300x47',
                categoryCode: '32110',
                deadline: "Sun Jun 12 2022 19:00:00 GMT+0200",
                location: 'DK',
                quantity: 240,
                status: 3
            }])
            sinon.stub(ordersModel, "getReleasedOrderReport").returns([{ status: 1 }])

            const test1 = await ordersService.getQAReport("12213", "111414", "english", false, false)
            assertEquals(test1.response, 0)
        })

        // Order is not completed
        it("ERROR Order is not completed", async () => {

            sinon.stub(ordersModel, "getOrderInformation").returns([{
                id: '47827',
                description: 'Panelfilter 390x300x47',
                categoryCode: '32110',
                deadline: "Sun Jun 12 2022 19:00:00 GMT+0200",
                location: 'DK',
                quantity: 240,
                status: 3
            }])
            sinon.stub(ordersModel, "getReleasedOrderReport").returns([{ status: 0 }])

            const test1 = await ordersService.getQAReport("12213", "111414", "english", false, true)
            assertEquals(test1.response, 0)
        })

        // Order is not initialized and not completed
        it("ERROR Order is not initialized and not completed", async () => {

            sinon.stub(ordersModel, "getOrderInformation").returns([{
                id: '47827',
                description: 'Panelfilter 390x300x47',
                categoryCode: '32110',
                deadline: "Sun Jun 12 2022 19:00:00 GMT+0200",
                location: 'DK',
                quantity: 240,
                status: 3
            }])
            sinon.stub(ordersModel, "getReleasedOrderReport").returns([])

            const test1 = await ordersService.getQAReport("12213", "111414", "english", false, true)
            assertEquals(test1.response, 0)
        })

        // Order is not released
        it("ERROR Order is not released", async () => {

            sinon.stub(ordersModel, "getOrderInformation").returns([{
                id: '47827',
                description: 'Panelfilter 390x300x47',
                categoryCode: '32110',
                deadline: "Sun Jun 12 2022 19:00:00 GMT+0200",
                location: 'DK',
                quantity: 240,
                status: 2
            }])
            sinon.stub(ordersModel, "getReleasedOrderReport").returns([])

            const test1 = await ordersService.getQAReport("12213", "111414", "english", false, false)
            assertEquals(test1.response, 0)
        })

        // Order doesn't have attributes
        it("ERROR Order doesn't have attributes", async () => {

            sinon.stub(ordersModel, "getOrderInformation").returns([{
                id: '47827',
                description: 'Panelfilter 390x300x47',
                categoryCode: '32110',
                deadline: "Sun Jun 12 2022 19:00:00 GMT+0200",
                location: 'DK',
                quantity: 240,
                status: 3
            }])
            sinon.stub(ordersModel, "getReleasedOrderReport").returns([])
            sinon.stub(ordersModel, "getReleasedOrderAttributes").returns([])

            const test1 = await ordersService.getQAReport("12213", "111414", "english", false, false)
            assertEquals(test1.response, 0)
        })

        // Order doesn't have control points
        it("ERROR Order doesn't have control points", async () => {

            sinon.stub(ordersModel, "getOrderInformation").returns([{
                id: '47827',
                description: 'Panelfilter 390x300x47',
                categoryCode: '32110',
                deadline: "Sun Jun 12 2022 19:00:00 GMT+0200",
                location: 'DK',
                quantity: 240,
                status: 3
            }])
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
            sinon.stub(ordersModel, "getControlPointsCategoryNoAtrributes").returns([])

            sinon.stub(ordersModel, "getSpecificControlPoints").returns([])

            const test1 = await ordersService.getQAReport("12213", "english", false, false)
            assertEquals(test1.response, 0)
        })

        // Qa report has not been yet created
        it("OK Qa report has not been yet created", async () => {
            sinon.stub(ordersModel, "getOrderInformation").returns([
                {
                    id: '47827',
                    description: 'Panelfilter 390x300x47',
                    categoryCode: '32110',
                    deadline: "Sun Jun 12 2022 19:00:00 GMT+0200",
                    location: 'DK',
                    quantity: 240,
                    status: 3
                }
            ])

            sinon.stub(ordersModel, "getControlPointsCategoryNoAtrributes").returns([])

            sinon.stub(ordersModel, "getReleasedOrderReport").returns([])

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
                        "value": "340.00",
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
                        "image": "File1652206892425298.png",
                        "inputType": 3,
                        "description": "This is a description",
                        "lowerTolerance": null,
                        "upperTolerance": null
                    },
                    {
                        "id": 2,
                        "frequencyId": 1,
                        "image": "File1652206892425298.png",
                        "inputType": 3,
                        "description": "This is a description",
                        "lowerTolerance": 1,
                        "upperTolerance": 1
                    },
                    {
                        "id": 3,
                        "frequencyId": 1,
                        "image": "File1652206892425298.png",
                        "inputType": 3,
                        "description": "This is a description",
                        "lowerTolerance": 1,
                        "upperTolerance": 6
                    },
                    {
                        "id": 4,
                        "frequencyId": 1,
                        "image": "File1652206892425298.png",
                        "inputType": 1,
                        "description": "This is a description",
                        "lowerTolerance": null,
                        "upperTolerance": null
                    },
                    {
                        "id": 5,
                        "frequencyId": 1,
                        "image": "File1652206892425298.png",
                        "inputType": 0,
                        "description": "This is a description",
                        "lowerTolerance": null,
                        "upperTolerance": null
                    },
                    {
                        "id": 6,
                        "frequencyId": 1,
                        "image": "File1652206892425298.png",
                        "inputType": 0,
                        "description": "This is a description",
                        "lowerTolerance": null,
                        "upperTolerance": null
                    },
                    {
                        "id": 7,
                        "frequencyId": 1,
                        "image": "File1652206892425298.png",
                        "inputType": 0,
                        "description": "This is a description",
                        "lowerTolerance": null,
                        "upperTolerance": null
                    },
                    {
                        "id": 8,
                        "frequencyId": null,
                        "image": "File1652206892425298.png",
                        "inputType": 3,
                        "description": "This is a description",
                        "lowerTolerance": 1,
                        "upperTolerance": 6
                    },
                    {
                        "id": 9,
                        "frequencyId": 1,
                        "image": "File1652206892425298.png",
                        "inputType": 1,
                        "description": "This is a description",
                        "lowerTolerance": null,
                        "upperTolerance": null
                    },
                    {
                        "id": 10,
                        "frequencyId": 2,
                        "image": "File1652206892425298.png",
                        "inputType": 0,
                        "description": "This is a description",
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
            getControlPointAttributes.onCall(7).returns([{ "id": 110, "maxValue": 400, "minValue": 300 }]);
            getControlPointAttributes.onCall(8).returns([{ "id": 111, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(9).returns([{ "id": 112, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(10).returns([{ "id": 3, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(11).returns([{ "id": 4, "maxValue": 400, "minValue": 300 }]);
            getControlPointAttributes.onCall(12).returns([{ "id": 49, "maxValue": 50, "minValue": 30 }]);
            getControlPointAttributes.onCall(13).returns([{ "id": 51, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(14).returns([{ "id": 70, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(15).returns([{ "id": 104, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(16).returns([{ "id": 109, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(17).returns([{ "id": 110, "maxValue": 400, "minValue": 300 }]);
            getControlPointAttributes.onCall(18).returns([{ "id": 111, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(19).returns([{ "id": 112, "maxValue": null, "minValue": null }]);

            sinon.stub(ordersModel, "createQAReport").returns([{ "id": 2, "itemId": 47827, "status": false, "completionDate": null }])
            sinon.stub(ordersModel, "insertControlPointConnection").returns("Success")
            sinon.stub(ordersModel, "getFrequenciesForCategory").returns([
                { "id": [1, 3], "code": "32110", "frequencyId": 3, "to25": 63, "to50": 2, "to100": 343, "to200": 3, "to300": 8, "to500": 6, "to700": 66, "to1000": 7, "to1500": 5, "to2000": 76, "to3000": 76, "to4000": 766, "to5000": 69 }
            ])

            sinon.stub(ordersModel, "getReleasedOrderControlPoints").returns(
                [
                    {
                        "id": 1,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 3,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "measurementType": 1,
                        "author": "",
                        "connectionId": 9,
                        "answer": "",
                        "description": "This is a description",
                    },
                    {
                        "id": 2,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 1,
                        "measurementType": 1,
                        "author": "",
                        "connectionId": 10,
                        "answer": "",
                        "description": "This is a description",
                    },
                    {
                        "id": 3,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 6,
                        "measurementType": 1,
                        "author": "",
                        "connectionId": 11,
                        "answer": "",
                        "description": "This is a description",
                    },
                    {
                        "id": 4,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 1,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "measurementType": 1,
                        "author": "",
                        "connectionId": 12,
                        "answer": "",
                        "description": "This is a description",
                    },
                    {
                        "id": 5,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "measurementType": 1,
                        "author": "",
                        "connectionId": 13,
                        "answer": "",
                        "description": "This is a description",
                    },
                    {
                        "id": 6,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "measurementType": 1,
                        "author": "",
                        "connectionId": 14,
                        "answer": "",
                        "description": "This is a description",
                    },
                    {
                        "id": 7,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "measurementType": 1,
                        "author": "",
                        "connectionId": 15,
                        "answer": "",
                        "description": "This is a description",
                    },
                    {
                        "id": 8,
                        "image": "File1652206892425298.png",
                        "frequencyId": null,
                        "inputType": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 6,
                        "measurementType": 0,
                        "author": "",
                        "connectionId": 25,
                        "answer": "",
                        "description": "This is a description",
                    },
                    {
                        "id": 9,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 1,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "measurementType": 0,
                        "author": "",
                        "connectionId": 29,
                        "answer": "",
                        "description": "This is a description",
                    },
                    {
                        "id": 10,
                        "image": "File1652206892425298.png",
                        "frequencyId": 2,
                        "inputType": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "measurementType": 0,
                        "author": "",
                        "connectionId": 35,
                        "answer": "",
                        "description": "This is a description",
                    }
                ]
            )

            let getReleasedOrderControlPointsDescriptions = sinon.stub(ordersModel, "getReleasedOrderControlPointsDescriptions").returns([{ "id": 1, "language": "english", "description": "This is a description" }])
            getReleasedOrderControlPointsDescriptions.onCall(0).returns([{ "id": 1, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(1).returns([{ "id": 2, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(2).returns([{ "id": 3, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(3).returns([{ "id": 4, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(4).returns([{ "id": 5, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(5).returns([{ "id": 6, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(6).returns([{ "id": 7, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(7).returns([{ "id": 8, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(8).returns([{ "id": 9, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(9).returns([{ "id": 10, "language": "english", "description": "This is a description" }]);


            let getFrequencies = sinon.stub(ordersModel, "getFrequencies").returns([{ "id": 1, "to25": 23, "to50": 2, "to100": 343, "to200": 5, "to300": 5, "to500": 6, "to700": 66, "to1000": 7, "to1500": 5, "to2000": 76, "to3000": 76, "to4000": 766, "to5000": 69 }])
            getFrequencies.onCall(7).returns([]);
            getFrequencies.onCall(8).returns([{ "id": 1, "to25": 23, "to50": 2, "to100": 343, "to200": 5, "to300": 5, "to500": 6, "to700": 66, "to1000": 7, "to1500": 5, "to2000": 76, "to3000": 76, "to4000": 766, "to5000": 69 }]);
            getFrequencies.onCall(9).returns([{ "id": 2, "to25": 25, "to50": 5, "to100": 345, "to200": 7, "to300": 7, "to500": 8, "to700": 68, "to1000": 9, "to1500": 7, "to2000": 78, "to3000": 78, "to4000": 768, "to5000": 71 }]);



            let getReleasedOrderControlPointsOptions = sinon.stub(ordersModel, "getReleasedOrderControlPointsOptions").returns([{ "id": 1, "controlPointId": 5, "value": "Yes" }, { "id": 2, "controlPointId": 5, "value": "No" }])
            getReleasedOrderControlPointsOptions.onCall(0).returns([{ "id": 1, "controlPointId": 5, "value": "Yes" }, { "id": 2, "controlPointId": 5, "value": "No" }]);
            getReleasedOrderControlPointsOptions.onCall(1).returns([{ "id": 3, "controlPointId": 6, "value": "Yes" }, { "id": 4, "controlPointId": 6, "value": "No" }]);
            getReleasedOrderControlPointsOptions.onCall(2).returns([{ "id": 5, "controlPointId": 7, "value": "Yes" }, { "id": 6, "controlPointId": 7, "value": "No" }]);
            getReleasedOrderControlPointsOptions.onCall(3).returns([{ "id": 7, "controlPointId": 10, "value": "Yes" }, { "id": 8, "controlPointId": 10, "value": "No" }]);


            sinon.stub(ordersModel, "qaReportControlPointResults").returns(
                [
                    {
                        "answer": "",
                        "connectionId": 16,
                        "controlPointId": 8,
                        "qaReportId": 2,
                        "author": "",
                        "timestamp": null
                    },
                    {
                        "answer": "",
                        "connectionId": 17,
                        "controlPointId": 9,
                        "qaReportId": 2,
                        "author": "",
                        "timestamp": null
                    },
                    {
                        "answer": "",
                        "connectionId": 18,
                        "controlPointId": 10,
                        "qaReportId": 2,
                        "author": "",
                        "timestamp": null
                    }
                ]
            )

            let insertMultipleTimeMeasurement = sinon.stub(ordersModel, "insertMultipleTimeMeasurement").returns([])
            for (let i = 0; i < 17; i++) {
                insertMultipleTimeMeasurement.onCall(i).returns([{ id: i + 19 }]);
            }

            const test1 = await ordersService.getQAReport("12213", "111414", "english", false, false)

            // This key bounces around and disrupts the string  

            assertEquals(test1.qaReportId, unfinishedOrder.qaReportId)
            assertEquals(test1.status, unfinishedOrder.status)
            assertEquals(test1.completionDate, unfinishedOrder.completionDate)

            delete unfinishedOrder.status
            delete test1.status
            delete unfinishedOrder.completionDate
            delete test1.completionDate
            delete unfinishedOrder.qaReportId
            delete test1.qaReportId
            assertEquals(JSON.stringify(test1), JSON.stringify(unfinishedOrder))
        })

        // Qa report is already created
        it("OK Qa report is already created", async () => {
            sinon.stub(ordersModel, "getOrderInformation").returns([
                {
                    id: '47827',
                    description: 'Panelfilter 390x300x47',
                    categoryCode: '32110',
                    deadline: "Sun Jun 12 2022 19:00:00 GMT+0200",
                    location: 'DK',
                    quantity: 240,
                    status: 3
                }
            ])

            sinon.stub(ordersModel, "getReleasedOrderReport").returns([{ "id": 2, "itemId": 47827, "status": false, "completionDate": null }])

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
                        "value": "340.00",
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
                        "image": "File1652206892425298.png",
                        "inputType": 3,
                        "description": "This is a description",
                        "lowerTolerance": null,
                        "upperTolerance": null
                    },
                    {
                        "id": 2,
                        "frequencyId": 1,
                        "image": "File1652206892425298.png",
                        "inputType": 3,
                        "description": "This is a description",
                        "lowerTolerance": 1,
                        "upperTolerance": 1
                    },
                    {
                        "id": 3,
                        "frequencyId": 1,
                        "image": "File1652206892425298.png",
                        "inputType": 3,
                        "description": "This is a description",
                        "lowerTolerance": 1,
                        "upperTolerance": 6
                    },
                    {
                        "id": 4,
                        "frequencyId": 1,
                        "image": "File1652206892425298.png",
                        "inputType": 1,
                        "description": "This is a description",
                        "lowerTolerance": null,
                        "upperTolerance": null
                    },
                    {
                        "id": 5,
                        "frequencyId": 1,
                        "image": "File1652206892425298.png",
                        "inputType": 0,
                        "description": "This is a description",
                        "lowerTolerance": null,
                        "upperTolerance": null
                    },
                    {
                        "id": 6,
                        "frequencyId": 1,
                        "image": "File1652206892425298.png",
                        "inputType": 0,
                        "description": "This is a description",
                        "lowerTolerance": null,
                        "upperTolerance": null
                    },
                    {
                        "id": 7,
                        "frequencyId": 1,
                        "image": "File1652206892425298.png",
                        "inputType": 0,
                        "description": "This is a description",
                        "lowerTolerance": null,
                        "upperTolerance": null
                    },
                    {
                        "id": 8,
                        "frequencyId": null,
                        "image": "File1652206892425298.png",
                        "inputType": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 6
                    },
                    {
                        "id": 9,
                        "frequencyId": 1,
                        "image": "File1652206892425298.png",
                        "inputType": 1,
                        "lowerTolerance": null,
                        "upperTolerance": null
                    },
                    {
                        "id": 10,
                        "frequencyId": 2,
                        "image": "File1652206892425298.png",
                        "inputType": 0,
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
            getControlPointAttributes.onCall(7).returns([{ "id": 110, "maxValue": 400, "minValue": 300 }]);
            getControlPointAttributes.onCall(8).returns([{ "id": 111, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(9).returns([{ "id": 112, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(10).returns([{ "id": 3, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(11).returns([{ "id": 4, "maxValue": 400, "minValue": 300 }]);
            getControlPointAttributes.onCall(12).returns([{ "id": 49, "maxValue": 50, "minValue": 30 }]);
            getControlPointAttributes.onCall(13).returns([{ "id": 51, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(14).returns([{ "id": 70, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(15).returns([{ "id": 104, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(16).returns([{ "id": 109, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(17).returns([{ "id": 110, "maxValue": 400, "minValue": 300 }]);
            getControlPointAttributes.onCall(18).returns([{ "id": 111, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(19).returns([{ "id": 112, "maxValue": null, "minValue": null }]);

            sinon.stub(ordersModel, "createQAReport").returns([{ "id": 2, "itemId": 47827, "status": false, "completionDate": null }])
            sinon.stub(ordersModel, "insertControlPointConnection").returns("Success")
            sinon.stub(ordersModel, "getFrequenciesForCategory").returns([
                { "id": [1, 3], "code": "32110", "frequencyId": 3, "to25": 63, "to50": 2, "to100": 343, "to200": 3, "to300": 8, "to500": 6, "to700": 66, "to1000": 7, "to1500": 5, "to2000": 76, "to3000": 76, "to4000": 766, "to5000": 69 }
            ])

            sinon.stub(ordersModel, "getReleasedOrderControlPoints").returns(
                [
                    {
                        "id": 1,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 3,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "measurementType": 1,
                        "author": "",
                        "connectionId": 9,
                        "answer": "",
                        "description": "This is a description",
                    },
                    {
                        "id": 2,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 1,
                        "measurementType": 1,
                        "author": "",
                        "connectionId": 10,
                        "answer": "",
                        "description": "This is a description",
                    },
                    {
                        "id": 3,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 6,
                        "measurementType": 1,
                        "author": "",
                        "connectionId": 11,
                        "answer": "",
                        "description": "This is a description",
                    },
                    {
                        "id": 4,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 1,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "measurementType": 1,
                        "author": "",
                        "connectionId": 12,
                        "answer": "",
                        "description": "This is a description",
                    },
                    {
                        "id": 5,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "measurementType": 1,
                        "author": "",
                        "connectionId": 13,
                        "answer": "",
                        "description": "This is a description",
                    },
                    {
                        "id": 6,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "measurementType": 1,
                        "author": "",
                        "connectionId": 14,
                        "answer": "",
                        "description": "This is a description",
                    },
                    {
                        "id": 7,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "measurementType": 1,
                        "author": "",
                        "connectionId": 15,
                        "answer": "",
                        "description": "This is a description",
                    },
                    {
                        "id": 8,
                        "image": "File1652206892425298.png",
                        "frequencyId": null,
                        "inputType": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 6,
                        "measurementType": 0,
                        "author": "",
                        "connectionId": 25,
                        "answer": "",
                        "description": "This is a description",
                    },
                    {
                        "id": 9,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 1,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "measurementType": 0,
                        "author": "",
                        "connectionId": 29,
                        "answer": "",
                        "description": "This is a description",
                    },
                    {
                        "id": 10,
                        "image": "File1652206892425298.png",
                        "frequencyId": 2,
                        "inputType": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "measurementType": 0,
                        "author": "",
                        "connectionId": 35,
                        "answer": "",
                        "description": "This is a description",
                    }
                ]
            )

            let getReleasedOrderControlPointsDescriptions = sinon.stub(ordersModel, "getReleasedOrderControlPointsDescriptions").returns([{ "id": 1, "language": "english", "description": "This is a description" }])
            getReleasedOrderControlPointsDescriptions.onCall(0).returns([{ "id": 1, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(1).returns([{ "id": 2, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(2).returns([{ "id": 3, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(3).returns([{ "id": 4, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(4).returns([{ "id": 5, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(5).returns([{ "id": 6, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(6).returns([{ "id": 7, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(7).returns([{ "id": 8, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(8).returns([{ "id": 9, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(9).returns([{ "id": 10, "language": "english", "description": "This is a description" }]);


            let getFrequencies = sinon.stub(ordersModel, "getFrequencies").returns([{ "id": 1, "to25": 23, "to50": 2, "to100": 343, "to200": 5, "to300": 5, "to500": 6, "to700": 66, "to1000": 7, "to1500": 5, "to2000": 76, "to3000": 76, "to4000": 766, "to5000": 69 }])
            getFrequencies.onCall(7).returns([]);
            getFrequencies.onCall(8).returns([{ "id": 1, "to25": 23, "to50": 2, "to100": 343, "to200": 5, "to300": 5, "to500": 6, "to700": 66, "to1000": 7, "to1500": 5, "to2000": 76, "to3000": 76, "to4000": 766, "to5000": 69 }]);
            getFrequencies.onCall(9).returns([{ "id": 2, "to25": 25, "to50": 5, "to100": 345, "to200": 7, "to300": 7, "to500": 8, "to700": 68, "to1000": 9, "to1500": 7, "to2000": 78, "to3000": 78, "to4000": 768, "to5000": 71 }]);



            let getReleasedOrderControlPointsOptions = sinon.stub(ordersModel, "getReleasedOrderControlPointsOptions").returns([{ "id": 1, "controlPointId": 5, "value": "Yes" }, { "id": 2, "controlPointId": 5, "value": "No" }])
            getReleasedOrderControlPointsOptions.onCall(0).returns([{ "id": 1, "controlPointId": 5, "value": "Yes" }, { "id": 2, "controlPointId": 5, "value": "No" }]);
            getReleasedOrderControlPointsOptions.onCall(1).returns([{ "id": 3, "controlPointId": 6, "value": "Yes" }, { "id": 4, "controlPointId": 6, "value": "No" }]);
            getReleasedOrderControlPointsOptions.onCall(2).returns([{ "id": 5, "controlPointId": 7, "value": "Yes" }, { "id": 6, "controlPointId": 7, "value": "No" }]);
            getReleasedOrderControlPointsOptions.onCall(3).returns([{ "id": 7, "controlPointId": 10, "value": "Yes" }, { "id": 8, "controlPointId": 10, "value": "No" }]);


            sinon.stub(ordersModel, "qaReportControlPointResults").returns(
                [
                    {
                        "answer": "",
                        "connectionId": 16,
                        "controlPointId": 8,
                        "qaReportId": 2,
                        "author": "",
                        "timestamp": null
                    },
                    {
                        "answer": "",
                        "connectionId": 17,
                        "controlPointId": 9,
                        "qaReportId": 2,
                        "author": "",
                        "timestamp": null
                    },
                    {
                        "answer": "",
                        "connectionId": 18,
                        "controlPointId": 10,
                        "qaReportId": 2,
                        "author": "",
                        "timestamp": null
                    }
                ]
            )

            let insertMultipleTimeMeasurement = sinon.stub(ordersModel, "insertMultipleTimeMeasurement").returns([])
            for (let i = 0; i < 17; i++) {
                insertMultipleTimeMeasurement.onCall(i).returns([{ id: i + 19 }]);
            }

            const test1 = await ordersService.getQAReport("12213", "111414", "english", false, false)

            // This key bounces around and disrupts the string  

            assertEquals(test1.qaReportId, unfinishedOrder.qaReportId)
            assertEquals(test1.status, unfinishedOrder.status)
            assertEquals(test1.completionDate, unfinishedOrder.completionDate)

            delete unfinishedOrder.status
            delete test1.status
            delete unfinishedOrder.completionDate
            delete test1.completionDate
            delete unfinishedOrder.qaReportId
            delete test1.qaReportId
            assertEquals(JSON.stringify(test1), JSON.stringify(unfinishedOrder))
        })

        // QA report is already created with values filled in
        it("OK QA report is already created with values filled in", async () => {
            sinon.stub(ordersModel, "getOrderInformation").returns([
                {
                    id: '47827',
                    description: 'Panelfilter 390x300x47',
                    categoryCode: '32110',
                    deadline: "Sun Jun 12 2022 19:00:00 GMT+0200",
                    location: 'DK',
                    quantity: 240,
                    status: 3
                }
            ])

            sinon.stub(ordersModel, "getReleasedOrderReport").returns([{ "id": 2, "itemId": 47827, "status": false, "completionDate": null }])

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
                        "value": "340.00",
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
                        "image": "File1652206892425298.png",
                        "inputType": 3,
                        "lowerTolerance": null,
                        "upperTolerance": null
                    },
                    {
                        "id": 2,
                        "frequencyId": 1,
                        "image": "File1652206892425298.png",
                        "inputType": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 1
                    },
                    {
                        "id": 3,
                        "frequencyId": 1,
                        "image": "File1652206892425298.png",
                        "inputType": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 6
                    },
                    {
                        "id": 4,
                        "frequencyId": 1,
                        "image": "File1652206892425298.png",
                        "inputType": 1,
                        "lowerTolerance": null,
                        "upperTolerance": null
                    },
                    {
                        "id": 5,
                        "frequencyId": 1,
                        "image": "File1652206892425298.png",
                        "inputType": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null
                    },
                    {
                        "id": 6,
                        "frequencyId": 1,
                        "image": "File1652206892425298.png",
                        "inputType": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null
                    },
                    {
                        "id": 7,
                        "frequencyId": 1,
                        "image": "File1652206892425298.png",
                        "inputType": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null
                    },
                    {
                        "id": 8,
                        "frequencyId": null,
                        "image": "File1652206892425298.png",
                        "inputType": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 6
                    },
                    {
                        "id": 9,
                        "frequencyId": 1,
                        "image": "File1652206892425298.png",
                        "inputType": 1,
                        "lowerTolerance": null,
                        "upperTolerance": null
                    },
                    {
                        "id": 10,
                        "frequencyId": 2,
                        "image": "File1652206892425298.png",
                        "inputType": 0,
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
            getControlPointAttributes.onCall(7).returns([{ "id": 110, "maxValue": 400, "minValue": 300 }]);
            getControlPointAttributes.onCall(8).returns([{ "id": 111, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(9).returns([{ "id": 112, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(10).returns([{ "id": 3, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(11).returns([{ "id": 4, "maxValue": 400, "minValue": 300 }]);
            getControlPointAttributes.onCall(12).returns([{ "id": 49, "maxValue": 50, "minValue": 30 }]);
            getControlPointAttributes.onCall(13).returns([{ "id": 51, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(14).returns([{ "id": 70, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(15).returns([{ "id": 104, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(16).returns([{ "id": 109, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(17).returns([{ "id": 110, "maxValue": 400, "minValue": 300 }]);
            getControlPointAttributes.onCall(18).returns([{ "id": 111, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(19).returns([{ "id": 112, "maxValue": null, "minValue": null }]);

            sinon.stub(ordersModel, "createQAReport").returns([{ "id": 2, "itemId": 47827, "status": false, "completionDate": null }])
            sinon.stub(ordersModel, "insertControlPointConnection").returns("Success")
            sinon.stub(ordersModel, "getFrequenciesForCategory").returns([
                { "id": [1, 3], "code": "32110", "frequencyId": 3, "to25": 63, "to50": 2, "to100": 343, "to200": 3, "to300": 8, "to500": 6, "to700": 66, "to1000": 7, "to1500": 5, "to2000": 76, "to3000": 76, "to4000": 766, "to5000": 69 }
            ])

            sinon.stub(ordersModel, "getReleasedOrderControlPoints").returns(
                [
                    {
                        "id": 1,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 3,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "measurementType": 1,
                        "author": "taken",
                        "connectionId": 9,
                        "answer": "31231",
                        "description": "This is a description",
                    },
                    {
                        "id": 2,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 1,
                        "measurementType": 1,
                        "author": "taken",
                        "connectionId": 10,
                        "answer": "31231",
                        "description": "This is a description",
                    },
                    {
                        "id": 3,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 6,
                        "measurementType": 1,
                        "author": "taken",
                        "connectionId": 11,
                        "answer": "31231",
                        "description": "This is a description",
                    },
                    {
                        "id": 4,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 1,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "measurementType": 1,
                        "author": "taken",
                        "connectionId": 12,
                        "answer": "afdaff",
                        "description": "This is a description",
                    },
                    {
                        "id": 5,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "measurementType": 1,
                        "author": "taken",
                        "connectionId": 13,
                        "answer": "Yes",
                        "description": "This is a description",
                    },
                    {
                        "id": 6,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "measurementType": 1,
                        "author": "taken",
                        "connectionId": 14,
                        "answer": "Yes",
                        "description": "This is a description",
                    },
                    {
                        "id": 7,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "measurementType": 1,
                        "author": "taken",
                        "connectionId": 15,
                        "answer": "Yes",
                        "description": "This is a description",
                    },
                    {
                        "id": 8,
                        "image": "File1652206892425298.png",
                        "frequencyId": null,
                        "inputType": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 6,
                        "measurementType": 0,
                        "author": "taken",
                        "connectionId": 25,
                        "answer": "31231",
                        "description": "This is a description",
                    },
                    {
                        "id": 9,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 1,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "measurementType": 0,
                        "author": "taken",
                        "connectionId": 29,
                        "answer": "afdaff",
                        "description": "This is a description",
                    },
                    {
                        "id": 10,
                        "image": "File1652206892425298.png",
                        "frequencyId": 2,
                        "inputType": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "measurementType": 0,
                        "author": "taken",
                        "connectionId": 35,
                        "answer": "Yes",
                        "description": "This is a description",
                    }
                ]
            )

            let getReleasedOrderControlPointsDescriptions = sinon.stub(ordersModel, "getReleasedOrderControlPointsDescriptions").returns([{ "id": 1, "language": "english", "description": "This is a description" }])
            getReleasedOrderControlPointsDescriptions.onCall(0).returns([{ "id": 1, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(1).returns([{ "id": 2, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(2).returns([{ "id": 3, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(3).returns([{ "id": 4, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(4).returns([{ "id": 5, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(5).returns([{ "id": 6, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(6).returns([{ "id": 7, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(7).returns([{ "id": 8, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(8).returns([{ "id": 9, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(9).returns([{ "id": 10, "language": "english", "description": "This is a description" }]);


            let getFrequencies = sinon.stub(ordersModel, "getFrequencies").returns([{ "id": 1, "to25": 23, "to50": 2, "to100": 343, "to200": 5, "to300": 5, "to500": 6, "to700": 66, "to1000": 7, "to1500": 5, "to2000": 76, "to3000": 76, "to4000": 766, "to5000": 69 }])
            getFrequencies.onCall(7).returns([]);
            getFrequencies.onCall(8).returns([{ "id": 1, "to25": 23, "to50": 2, "to100": 343, "to200": 5, "to300": 5, "to500": 6, "to700": 66, "to1000": 7, "to1500": 5, "to2000": 76, "to3000": 76, "to4000": 766, "to5000": 69 }]);
            getFrequencies.onCall(9).returns([{ "id": 2, "to25": 25, "to50": 5, "to100": 345, "to200": 7, "to300": 7, "to500": 8, "to700": 68, "to1000": 9, "to1500": 7, "to2000": 78, "to3000": 78, "to4000": 768, "to5000": 71 }]);



            let getReleasedOrderControlPointsOptions = sinon.stub(ordersModel, "getReleasedOrderControlPointsOptions").returns([{ "id": 1, "controlPointId": 5, "value": "Yes" }, { "id": 2, "controlPointId": 5, "value": "No" }])
            getReleasedOrderControlPointsOptions.onCall(0).returns([{ "id": 1, "controlPointId": 5, "value": "Yes" }, { "id": 2, "controlPointId": 5, "value": "No" }]);
            getReleasedOrderControlPointsOptions.onCall(1).returns([{ "id": 3, "controlPointId": 6, "value": "Yes" }, { "id": 4, "controlPointId": 6, "value": "No" }]);
            getReleasedOrderControlPointsOptions.onCall(2).returns([{ "id": 5, "controlPointId": 7, "value": "Yes" }, { "id": 6, "controlPointId": 7, "value": "No" }]);
            getReleasedOrderControlPointsOptions.onCall(3).returns([{ "id": 7, "controlPointId": 10, "value": "Yes" }, { "id": 8, "controlPointId": 10, "value": "No" }]);


            sinon.stub(ordersModel, "qaReportControlPointResults").returns(
                [
                    {
                        "answer": "31231",
                        "connectionId": 16,
                        "controlPointId": 8,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "afdaff",
                        "connectionId": 17,
                        "controlPointId": 9,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "Yes",
                        "connectionId": 18,
                        "controlPointId": 10,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "31231",
                        "connectionId": 19,
                        "controlPointId": 8,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "31231",
                        "connectionId": 20,
                        "controlPointId": 8,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "31231",
                        "connectionId": 21,
                        "controlPointId": 8,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "31231",
                        "connectionId": 22,
                        "controlPointId": 8,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "31231",
                        "connectionId": 23,
                        "controlPointId": 8,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "31231",
                        "connectionId": 24,
                        "controlPointId": 8,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "31231",
                        "connectionId": 25,
                        "controlPointId": 8,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "afdaff",
                        "connectionId": 26,
                        "controlPointId": 9,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "afdaff",
                        "connectionId": 27,
                        "controlPointId": 9,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "afdaff",
                        "connectionId": 28,
                        "controlPointId": 9,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "afdaff",
                        "connectionId": 29,
                        "controlPointId": 9,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "Yes",
                        "connectionId": 30,
                        "controlPointId": 10,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "Yes",
                        "connectionId": 31,
                        "controlPointId": 10,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "Yes",
                        "connectionId": 32,
                        "controlPointId": 10,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "Yes",
                        "connectionId": 33,
                        "controlPointId": 10,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "Yes",
                        "connectionId": 34,
                        "controlPointId": 10,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "Yes",
                        "connectionId": 35,
                        "controlPointId": 10,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    }
                ]
            )

            let insertMultipleTimeMeasurement = sinon.stub(ordersModel, "insertMultipleTimeMeasurement").returns([])
            for (let i = 0; i < 17; i++) {
                insertMultipleTimeMeasurement.onCall(i).returns([{ id: i + 19 }]);
            }

            const test1 = await ordersService.getQAReport("12213", "111414", "english", false, false)

            // This key bounces around and disrupts the string  

            assertEquals(test1.qaReportId, unfinishedOrderWithAllInputs.qaReportId)
            assertEquals(test1.status, unfinishedOrderWithAllInputs.status)
            assertEquals(test1.completionDate, unfinishedOrderWithAllInputs.completionDate)

            delete unfinishedOrderWithAllInputs.status
            delete test1.status
            delete unfinishedOrderWithAllInputs.completionDate
            delete test1.completionDate
            delete unfinishedOrderWithAllInputs.qaReportId
            delete test1.qaReportId
            assertEquals(JSON.stringify(test1), JSON.stringify(unfinishedOrderWithAllInputs))
        })
        // Qa report is already created with valued filled in AND AUTHOR SHOWN
        it("OK Qa report is already created with valued filled in AND AUTHOR SHOWN", async () => {
            sinon.stub(ordersModel, "getOrderInformation").returns([
                {
                    id: '47827',
                    description: 'Panelfilter 390x300x47',
                    categoryCode: '32110',
                    deadline: "Sun Jun 12 2022 19:00:00 GMT+0200",
                    location: 'DK',
                    quantity: 240,
                    status: 3
                }
            ])

            sinon.stub(ordersModel, "getReleasedOrderReport").returns([{ "id": 2, "itemId": 47827, "status": false, "completionDate": null }])

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
                        "value": "340.00",
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
                        "image": "File1652206892425298.png",
                        "inputType": 3,
                        "lowerTolerance": null,
                        "upperTolerance": null
                    },
                    {
                        "id": 2,
                        "frequencyId": 1,
                        "image": "File1652206892425298.png",
                        "inputType": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 1
                    },
                    {
                        "id": 3,
                        "frequencyId": 1,
                        "image": "File1652206892425298.png",
                        "inputType": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 6
                    },
                    {
                        "id": 4,
                        "frequencyId": 1,
                        "image": "File1652206892425298.png",
                        "inputType": 1,
                        "lowerTolerance": null,
                        "upperTolerance": null
                    },
                    {
                        "id": 5,
                        "frequencyId": 1,
                        "image": "File1652206892425298.png",
                        "inputType": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null
                    },
                    {
                        "id": 6,
                        "frequencyId": 1,
                        "image": "File1652206892425298.png",
                        "inputType": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null
                    },
                    {
                        "id": 7,
                        "frequencyId": 1,
                        "image": "File1652206892425298.png",
                        "inputType": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null
                    },
                    {
                        "id": 8,
                        "frequencyId": null,
                        "image": "File1652206892425298.png",
                        "inputType": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 6
                    },
                    {
                        "id": 9,
                        "frequencyId": 1,
                        "image": "File1652206892425298.png",
                        "inputType": 1,
                        "lowerTolerance": null,
                        "upperTolerance": null
                    },
                    {
                        "id": 10,
                        "frequencyId": 2,
                        "image": "File1652206892425298.png",
                        "inputType": 0,
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
            getControlPointAttributes.onCall(7).returns([{ "id": 110, "maxValue": 400, "minValue": 300 }]);
            getControlPointAttributes.onCall(8).returns([{ "id": 111, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(9).returns([{ "id": 112, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(10).returns([{ "id": 3, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(11).returns([{ "id": 4, "maxValue": 400, "minValue": 300 }]);
            getControlPointAttributes.onCall(12).returns([{ "id": 49, "maxValue": 50, "minValue": 30 }]);
            getControlPointAttributes.onCall(13).returns([{ "id": 51, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(14).returns([{ "id": 70, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(15).returns([{ "id": 104, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(16).returns([{ "id": 109, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(17).returns([{ "id": 110, "maxValue": 400, "minValue": 300 }]);
            getControlPointAttributes.onCall(18).returns([{ "id": 111, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(19).returns([{ "id": 112, "maxValue": null, "minValue": null }]);

            sinon.stub(ordersModel, "createQAReport").returns([{ "id": 2, "itemId": 47827, "status": false, "completionDate": null }])
            sinon.stub(ordersModel, "insertControlPointConnection").returns("Success")
            sinon.stub(ordersModel, "getFrequenciesForCategory").returns([
                { "id": [1, 3], "code": "32110", "frequencyId": 3, "to25": 63, "to50": 2, "to100": 343, "to200": 3, "to300": 8, "to500": 6, "to700": 66, "to1000": 7, "to1500": 5, "to2000": 76, "to3000": 76, "to4000": 766, "to5000": 69 }
            ])

            sinon.stub(ordersModel, "getReleasedOrderControlPointsAuthors").returns(
                [
                    {
                        "id": 1,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 3,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "measurementType": 1,
                        "author": "worker",
                        "connectionId": 9,
                        "answer": "31231",
                        "description": "This is a description",
                    },
                    {
                        "id": 2,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 1,
                        "measurementType": 1,
                        "author": "worker",
                        "connectionId": 10,
                        "answer": "31231",
                        "description": "This is a description",
                    },
                    {
                        "id": 3,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 6,
                        "measurementType": 1,
                        "author": "worker",
                        "connectionId": 11,
                        "answer": "31231",
                        "description": "This is a description",
                    },
                    {
                        "id": 4,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 1,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "measurementType": 1,
                        "author": "worker",
                        "connectionId": 12,
                        "answer": "afdaff",
                        "description": "This is a description",
                    },
                    {
                        "id": 5,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "measurementType": 1,
                        "author": "worker",
                        "connectionId": 13,
                        "answer": "Yes",
                        "description": "This is a description",
                    },
                    {
                        "id": 6,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "measurementType": 1,
                        "author": "worker",
                        "connectionId": 14,
                        "answer": "Yes",
                        "description": "This is a description",
                    },
                    {
                        "id": 7,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "measurementType": 1,
                        "author": "worker",
                        "connectionId": 15,
                        "answer": "Yes",
                        "description": "This is a description",
                    },
                    {
                        "id": 8,
                        "image": "File1652206892425298.png",
                        "frequencyId": null,
                        "inputType": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 6,
                        "measurementType": 0,
                        "author": "worker",
                        "connectionId": 25,
                        "answer": "31231",
                        "description": "This is a description",
                    },
                    {
                        "id": 9,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 1,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "measurementType": 0,
                        "author": "worker",
                        "connectionId": 29,
                        "answer": "afdaff",
                        "description": "This is a description",
                    },
                    {
                        "id": 10,
                        "image": "File1652206892425298.png",
                        "frequencyId": 2,
                        "inputType": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "measurementType": 0,
                        "author": "worker",
                        "connectionId": 35,
                        "answer": "Yes",
                        "description": "This is a description",
                    }
                ]
            )

            let getReleasedOrderControlPointsDescriptions = sinon.stub(ordersModel, "getReleasedOrderControlPointsDescriptions").returns([{ "id": 1, "language": "english", "description": "This is a description" }])
            getReleasedOrderControlPointsDescriptions.onCall(0).returns([{ "id": 1, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(1).returns([{ "id": 2, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(2).returns([{ "id": 3, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(3).returns([{ "id": 4, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(4).returns([{ "id": 5, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(5).returns([{ "id": 6, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(6).returns([{ "id": 7, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(7).returns([{ "id": 8, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(8).returns([{ "id": 9, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(9).returns([{ "id": 10, "language": "english", "description": "This is a description" }]);


            let getFrequencies = sinon.stub(ordersModel, "getFrequencies").returns([{ "id": 1, "to25": 23, "to50": 2, "to100": 343, "to200": 5, "to300": 5, "to500": 6, "to700": 66, "to1000": 7, "to1500": 5, "to2000": 76, "to3000": 76, "to4000": 766, "to5000": 69 }])
            getFrequencies.onCall(7).returns([]);
            getFrequencies.onCall(8).returns([{ "id": 1, "to25": 23, "to50": 2, "to100": 343, "to200": 5, "to300": 5, "to500": 6, "to700": 66, "to1000": 7, "to1500": 5, "to2000": 76, "to3000": 76, "to4000": 766, "to5000": 69 }]);
            getFrequencies.onCall(9).returns([{ "id": 2, "to25": 25, "to50": 5, "to100": 345, "to200": 7, "to300": 7, "to500": 8, "to700": 68, "to1000": 9, "to1500": 7, "to2000": 78, "to3000": 78, "to4000": 768, "to5000": 71 }]);



            let getReleasedOrderControlPointsOptions = sinon.stub(ordersModel, "getReleasedOrderControlPointsOptions").returns([{ "id": 1, "controlPointId": 5, "value": "Yes" }, { "id": 2, "controlPointId": 5, "value": "No" }])
            getReleasedOrderControlPointsOptions.onCall(0).returns([{ "id": 1, "controlPointId": 5, "value": "Yes" }, { "id": 2, "controlPointId": 5, "value": "No" }]);
            getReleasedOrderControlPointsOptions.onCall(1).returns([{ "id": 3, "controlPointId": 6, "value": "Yes" }, { "id": 4, "controlPointId": 6, "value": "No" }]);
            getReleasedOrderControlPointsOptions.onCall(2).returns([{ "id": 5, "controlPointId": 7, "value": "Yes" }, { "id": 6, "controlPointId": 7, "value": "No" }]);
            getReleasedOrderControlPointsOptions.onCall(3).returns([{ "id": 7, "controlPointId": 10, "value": "Yes" }, { "id": 8, "controlPointId": 10, "value": "No" }]);


            sinon.stub(ordersModel, "qaReportControlPointResultsAuthors").returns(
                [
                    {
                        "answer": "31231",
                        "connectionId": 16,
                        "controlPointId": 8,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "afdaff",
                        "connectionId": 17,
                        "controlPointId": 9,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "Yes",
                        "connectionId": 18,
                        "controlPointId": 10,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "31231",
                        "connectionId": 19,
                        "controlPointId": 8,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "31231",
                        "connectionId": 20,
                        "controlPointId": 8,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "31231",
                        "connectionId": 21,
                        "controlPointId": 8,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "31231",
                        "connectionId": 22,
                        "controlPointId": 8,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "31231",
                        "connectionId": 23,
                        "controlPointId": 8,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "31231",
                        "connectionId": 24,
                        "controlPointId": 8,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "31231",
                        "connectionId": 25,
                        "controlPointId": 8,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "afdaff",
                        "connectionId": 26,
                        "controlPointId": 9,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "afdaff",
                        "connectionId": 27,
                        "controlPointId": 9,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "afdaff",
                        "connectionId": 28,
                        "controlPointId": 9,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "afdaff",
                        "connectionId": 29,
                        "controlPointId": 9,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "Yes",
                        "connectionId": 30,
                        "controlPointId": 10,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "Yes",
                        "connectionId": 31,
                        "controlPointId": 10,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "Yes",
                        "connectionId": 32,
                        "controlPointId": 10,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "Yes",
                        "connectionId": 33,
                        "controlPointId": 10,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "Yes",
                        "connectionId": 34,
                        "controlPointId": 10,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "Yes",
                        "connectionId": 35,
                        "controlPointId": 10,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    }
                ]
            )

            let insertMultipleTimeMeasurement = sinon.stub(ordersModel, "insertMultipleTimeMeasurement").returns([])
            for (let i = 0; i < 17; i++) {
                insertMultipleTimeMeasurement.onCall(i).returns([{ id: i + 19 }]);
            }

            const test1 = await ordersService.getQAReport("12213", "111414", "english", true, false)

            // This key bounces around and disrupts the string  

            assertEquals(test1.qaReportId, unfinishedOrderAuthorMain.qaReportId)
            assertEquals(test1.status, unfinishedOrderAuthorMain.status)
            assertEquals(test1.completionDate, unfinishedOrderAuthorMain.completionDate)

            delete unfinishedOrderAuthorMain.status
            delete test1.status
            delete unfinishedOrderAuthorMain.completionDate
            delete test1.completionDate
            delete unfinishedOrderAuthorMain.qaReportId
            delete test1.qaReportId
            assertEquals(JSON.stringify(test1), JSON.stringify(unfinishedOrderAuthorMain))
        })
        // Completed order doesn't have enough answers
        it("ERROR Completed order doesn't have enough answers", async () => {
            sinon.stub(ordersModel, "getOrderInformation").returns([
                {
                    id: '47827',
                    description: 'Panelfilter 390x300x47',
                    categoryCode: '32110',
                    deadline: "Sun Jun 12 2022 19:00:00 GMT+0200",
                    location: 'DK',
                    quantity: 240,
                    status: 3
                }
            ])

            sinon.stub(ordersModel, "getReleasedOrderReport").returns([{ "id": 2, "itemId": 47827, "status": false, "completionDate": "Sun May 12 2022 19:00:00 GMT+0200" }])

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
                        "value": "340.00",
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
                        "image": "File1652206892425298.png",
                        "inputType": 3,
                        "lowerTolerance": null,
                        "upperTolerance": null
                    },
                    {
                        "id": 2,
                        "frequencyId": 1,
                        "image": "File1652206892425298.png",
                        "inputType": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 1
                    },
                    {
                        "id": 3,
                        "frequencyId": 1,
                        "image": "File1652206892425298.png",
                        "inputType": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 6
                    },
                    {
                        "id": 4,
                        "frequencyId": 1,
                        "image": "File1652206892425298.png",
                        "inputType": 1,
                        "lowerTolerance": null,
                        "upperTolerance": null
                    },
                    {
                        "id": 5,
                        "frequencyId": 1,
                        "image": "File1652206892425298.png",
                        "inputType": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null
                    },
                    {
                        "id": 6,
                        "frequencyId": 1,
                        "image": "File1652206892425298.png",
                        "inputType": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null
                    },
                    {
                        "id": 7,
                        "frequencyId": 1,
                        "image": "File1652206892425298.png",
                        "inputType": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null
                    },
                    {
                        "id": 8,
                        "frequencyId": null,
                        "image": "File1652206892425298.png",
                        "inputType": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 6
                    },
                    {
                        "id": 9,
                        "frequencyId": 1,
                        "image": "File1652206892425298.png",
                        "inputType": 1,
                        "lowerTolerance": null,
                        "upperTolerance": null
                    },
                    {
                        "id": 10,
                        "frequencyId": 2,
                        "image": "File1652206892425298.png",
                        "inputType": 0,
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
            getControlPointAttributes.onCall(7).returns([{ "id": 110, "maxValue": 400, "minValue": 300 }]);
            getControlPointAttributes.onCall(8).returns([{ "id": 111, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(9).returns([{ "id": 112, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(10).returns([{ "id": 3, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(11).returns([{ "id": 4, "maxValue": 400, "minValue": 300 }]);
            getControlPointAttributes.onCall(12).returns([{ "id": 49, "maxValue": 50, "minValue": 30 }]);
            getControlPointAttributes.onCall(13).returns([{ "id": 51, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(14).returns([{ "id": 70, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(15).returns([{ "id": 104, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(16).returns([{ "id": 109, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(17).returns([{ "id": 110, "maxValue": 400, "minValue": 300 }]);
            getControlPointAttributes.onCall(18).returns([{ "id": 111, "maxValue": null, "minValue": null }]);
            getControlPointAttributes.onCall(19).returns([{ "id": 112, "maxValue": null, "minValue": null }]);

            sinon.stub(ordersModel, "createQAReport").returns([{ "id": 2, "itemId": 47827, "status": false, "completionDate": null }])
            sinon.stub(ordersModel, "insertControlPointConnection").returns("Success")
            sinon.stub(ordersModel, "getFrequenciesForCategory").returns([
                { "id": [1, 3], "code": "32110", "frequencyId": 3, "to25": 63, "to50": 2, "to100": 343, "to200": 3, "to300": 8, "to500": 6, "to700": 66, "to1000": 7, "to1500": 5, "to2000": 76, "to3000": 76, "to4000": 766, "to5000": 69 }
            ])

            sinon.stub(ordersModel, "getReleasedOrderControlPointsAuthors").returns(
                [
                    {
                        "id": 1,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 3,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "measurementType": 1,
                        "author": "worker",
                        "connectionId": 9,
                        "answer": "31231",
                        "description": "This is a description",
                    },
                    {
                        "id": 2,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 1,
                        "measurementType": 1,
                        "author": "worker",
                        "connectionId": 10,
                        "answer": "31231",
                        "description": "This is a description",
                    },
                    {
                        "id": 3,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 6,
                        "measurementType": 1,
                        "author": "worker",
                        "connectionId": 11,
                        "answer": "31231",
                        "description": "This is a description",
                    },
                    {
                        "id": 4,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 1,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "measurementType": 1,
                        "author": "worker",
                        "connectionId": 12,
                        "answer": "afdaff",
                        "description": "This is a description",
                    },
                    {
                        "id": 5,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "measurementType": 1,
                        "author": "worker",
                        "connectionId": 13,
                        "answer": "Yes",
                        "description": "This is a description",
                    },
                    {
                        "id": 6,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "measurementType": 1,
                        "author": "worker",
                        "connectionId": 14,
                        "answer": "Yes",
                        "description": "This is a description",
                    },
                    {
                        "id": 7,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "measurementType": 1,
                        "author": "worker",
                        "connectionId": 15,
                        "answer": "Yes",
                        "description": "This is a description",
                    },
                    {
                        "id": 8,
                        "image": "File1652206892425298.png",
                        "frequencyId": null,
                        "inputType": 3,
                        "lowerTolerance": 1,
                        "upperTolerance": 6,
                        "measurementType": 0,
                        "author": "worker",
                        "connectionId": 25,
                        "answer": "31231",
                        "description": "This is a description",
                    },
                    {
                        "id": 9,
                        "image": "File1652206892425298.png",
                        "frequencyId": 1,
                        "inputType": 1,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "measurementType": 0,
                        "author": "worker",
                        "connectionId": 29,
                        "answer": "afdaff",
                        "description": "This is a description",
                    },
                    {
                        "id": 10,
                        "image": "File1652206892425298.png",
                        "frequencyId": 2,
                        "inputType": 0,
                        "lowerTolerance": null,
                        "upperTolerance": null,
                        "measurementType": 0,
                        "author": "worker",
                        "connectionId": 35,
                        "answer": "Yes",
                        "description": "This is a description",
                    }
                ]
            )

            let getReleasedOrderControlPointsDescriptions = sinon.stub(ordersModel, "getReleasedOrderControlPointsDescriptions").returns([{ "id": 1, "language": "english", "description": "This is a description" }])
            getReleasedOrderControlPointsDescriptions.onCall(0).returns([{ "id": 1, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(1).returns([{ "id": 2, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(2).returns([{ "id": 3, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(3).returns([{ "id": 4, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(4).returns([{ "id": 5, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(5).returns([{ "id": 6, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(6).returns([{ "id": 7, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(7).returns([{ "id": 8, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(8).returns([{ "id": 9, "language": "english", "description": "This is a description" }]);
            getReleasedOrderControlPointsDescriptions.onCall(9).returns([{ "id": 10, "language": "english", "description": "This is a description" }]);


            let getFrequencies = sinon.stub(ordersModel, "getFrequencies").returns([{ "id": 1, "to25": 23, "to50": 2, "to100": 343, "to200": 5, "to300": 5, "to500": 6, "to700": 66, "to1000": 7, "to1500": 5, "to2000": 76, "to3000": 76, "to4000": 766, "to5000": 69 }])
            getFrequencies.onCall(7).returns([]);
            getFrequencies.onCall(8).returns([{ "id": 1, "to25": 23, "to50": 2, "to100": 343, "to200": 5, "to300": 5, "to500": 6, "to700": 66, "to1000": 7, "to1500": 5, "to2000": 76, "to3000": 76, "to4000": 766, "to5000": 69 }]);
            getFrequencies.onCall(9).returns([{ "id": 2, "to25": 25, "to50": 5, "to100": 345, "to200": 7, "to300": 7, "to500": 8, "to700": 68, "to1000": 9, "to1500": 7, "to2000": 78, "to3000": 78, "to4000": 768, "to5000": 71 }]);



            let getReleasedOrderControlPointsOptions = sinon.stub(ordersModel, "getReleasedOrderControlPointsOptions").returns([{ "id": 1, "controlPointId": 5, "value": "Yes" }, { "id": 2, "controlPointId": 5, "value": "No" }])
            getReleasedOrderControlPointsOptions.onCall(0).returns([{ "id": 1, "controlPointId": 5, "value": "Yes" }, { "id": 2, "controlPointId": 5, "value": "No" }]);
            getReleasedOrderControlPointsOptions.onCall(1).returns([{ "id": 3, "controlPointId": 6, "value": "Yes" }, { "id": 4, "controlPointId": 6, "value": "No" }]);
            getReleasedOrderControlPointsOptions.onCall(2).returns([{ "id": 5, "controlPointId": 7, "value": "Yes" }, { "id": 6, "controlPointId": 7, "value": "No" }]);
            getReleasedOrderControlPointsOptions.onCall(3).returns([{ "id": 7, "controlPointId": 10, "value": "Yes" }, { "id": 8, "controlPointId": 10, "value": "No" }]);


            sinon.stub(ordersModel, "qaReportControlPointResultsAuthors").returns(
                [
                    {
                        "answer": "afdaff",
                        "connectionId": 17,
                        "controlPointId": 9,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "Yes",
                        "connectionId": 18,
                        "controlPointId": 10,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "31231",
                        "connectionId": 19,
                        "controlPointId": 8,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "31231",
                        "connectionId": 20,
                        "controlPointId": 8,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "31231",
                        "connectionId": 21,
                        "controlPointId": 8,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "31231",
                        "connectionId": 22,
                        "controlPointId": 8,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "31231",
                        "connectionId": 23,
                        "controlPointId": 8,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "31231",
                        "connectionId": 24,
                        "controlPointId": 8,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "31231",
                        "connectionId": 25,
                        "controlPointId": 8,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "afdaff",
                        "connectionId": 26,
                        "controlPointId": 9,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "afdaff",
                        "connectionId": 27,
                        "controlPointId": 9,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "afdaff",
                        "connectionId": 28,
                        "controlPointId": 9,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "afdaff",
                        "connectionId": 29,
                        "controlPointId": 9,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "Yes",
                        "connectionId": 30,
                        "controlPointId": 10,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "Yes",
                        "connectionId": 31,
                        "controlPointId": 10,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "Yes",
                        "connectionId": 32,
                        "controlPointId": 10,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "Yes",
                        "connectionId": 33,
                        "controlPointId": 10,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "Yes",
                        "connectionId": 34,
                        "controlPointId": 10,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    },
                    {
                        "answer": "Yes",
                        "connectionId": 35,
                        "controlPointId": 10,
                        "qaReportId": 2,
                        "author": "taken",
                        "timestamp": "2022-05-25 10:20"
                    }
                ]
            )

            let insertMultipleTimeMeasurement = sinon.stub(ordersModel, "insertMultipleTimeMeasurement").returns([])
            for (let i = 0; i < 17; i++) {
                insertMultipleTimeMeasurement.onCall(i).returns([{ id: i + 19 }]);
            }

            const test1 = await ordersService.getQAReport("12213", "111414", "english", true, true)

            // This key bounces around and disrupts the string  

            assertEquals(test1.response, 0)
        })
    })

    describe("listToCommaString", () => {
        it("OK", async () => {

            const listOfObjects = [
                { someId: 34 },
                { someId: 44 },
                { someId: 3 },
                { someId: 2 },
                { someId: 75 },
                { someId: 6 },
                { someId: 23 },
                { someId: 9 },
                { someId: 31 },

            ]
            const response = await ordersService.listToCommaString(listOfObjects, "someId")
            assertEquals(response, "34,44,3,2,75,6,23,9,31")
        })
    })
})

function assertEquals(value1, value2) {
    if (value1 != value2) throw Error("Failed assert values: \n" + value1 + "\n is not \n" + value2 + "")
}