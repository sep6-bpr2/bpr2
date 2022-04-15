const translations = {
    "This is a description for a control point": {
        "gb": "This is a description for a control point",
        "lt": "Cia yra kontroles tasko aprasymas",
        "dk": "Dette er beskrivelsen af kontrolpunktet",
    },
    "Control point management": {
        "gb": "Control point management",
        "lt": "Kontroles tasku valdymas",
        "dk": "Styring af kontrolpunkter",
    },
    "Control Points": {
        "gb": "Control Points",
        "lt": "Kontroles taskai",
        "dk": "Kontrolpunkter",
    },
    "Completed Orders": {
        "gb": "Completed Orders",
        "lt": "Pabaigti uzakymai",
        "dk": "Afsluttede ordrer",
    },
    "Item Categories": {
        "gb": "Item Categories",
        "lt": "Daiktu kategorijos",
        "dk": "Varekategorier",
    },
    "Users": {
        "gb": "Users",
        "lt": "Naudotojai",
        "dk": "Brugere",
    },
    "Released Orders": {
        "gb": "Released Orders",
        "lt": "Paleisti uzsakymai",
        "dk": "Frigivne ordrer",
    },
    "Logout": {
        "gb": "Logout",
        "lt": "Atsijungti",
        "dk": "Log ud",
    },
    "Description": {
        "gb": "Description",
        "lt": "Aprasymas",
        "dk": "Beskrivelse",
    },
    "Create control point": {
        "gb": "Create control point",
        "lt": "Sukurti kontroles taska",
        "dk": "Opret kontrolpunkt",
    },
    "Control points map the characteristics of items to what things the employee has to check on the item": {
        "gb": "Control points map the characteristics of items to what things the employee has to check on the item.",
        "lt": "Bla bla bla",
        "dk": "Bla bla bla",
    },
    "username": {
        "gb": "username",
        "lt": "vartotojo vardas",
        "dk": "brugernavn",
    },
    "choose location": {
        "gb": "choose location",
        "lt": "pasirinkti vieta",
        "dk": "vælge placering",
    },
    "Login": {
        "gb": "Login",
        "lt": "Prisijungti",
        "dk": "Log på",
    },
	//---------------------- Control point details
	// Main information card
	"Main information": {
		"gb": "Main information",
		"lt": "bla bla",
		"dk": "bla bla"
	},
	"Name": {
		"gb": "Name",
		"lt": "bla bla",
		"dk": "bla bla"
	},
	"Value":{
		"gb": "Value",
		"lt": "bla bla",
		"dk": "bla bla"
	},
	"Type":{
		"gb": "Type",
		"lt": "bla bla",
		"dk": "bla bla"
	},
	"Option":{
		"gb": "Option",
		"lt": "bla bla",
		"dk": "bla bla"
	},
	"new option":{
		"gb": "new option",
		"lt": "bla bla",
		"dk": "bla bla"
	},



	"Delete Control Point":{
		"gb": "Delete Control Point",
		"lt": "bla bla",
		"dk": "bla bla"
	},
	"Submit":{
		"gb": "Submit",
		"lt": "bla bla",
		"dk": "bla bla"
	},
	// Image card
	"Image": {
		"gb": "Image",
		"lt": "bla bla",
		"dk": "bla bla"
	},

	// Check frequency card
	"Check frequency": {
		"gb": "Check frequency",
		"lt": "bla bla",
		"dk": "bla bla"
	},

	// Relationship with category items and attributes card
	"Relationship with category items and attributes": {
		"gb": "Relationship with category items and attributes",
		"lt": "bla bla",
		"dk": "bla bla"
	},
	"Attributes":{
		"gb": "Attributes",
		"lt": "bla bla",
		"dk": "bla bla"
	},
	"Min value": {
		"gb": "Min value",
		"lt": "bla bla",
		"dk": "bla bla"
	},
	"Max value": {
		"gb": "Max value",
		"lt": "bla bla",
		"dk": "bla bla"
	},

	"new attribute": {
		"gb": "new attribute",
		"lt": "bla bla",
		"dk": "bla bla"
	},

	"Category Item Codes": {
		"gb": "Category Item Codes",
		"lt": "bla bla",
		"dk": "bla bla"
	},
	"Code": {
		"gb": "Code",
		"lt": "bla bla",
		"dk": "bla bla"
	},
	"new code": {
		"gb": "new code",
		"lt": "bla bla",
		"dk": "bla bla"
	}

	// ---------------------
}

const translateFunction = (text, flag) => {
    if (text && translations[text]) {
        try {
            const translated =
                translations[text][flag];
            if (translated) {
                return translated;
            } else {
                return text;
            }
        } catch (err) {
            return text;
        }
    } else {
        return text;
    }
}

export default { translateFunction, translations }
