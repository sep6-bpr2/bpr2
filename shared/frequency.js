module.exports.defaultFrequency = () =>{
	return {
		"id": 0,
		"to25": parseInt(process.env.DEFAULT_FREQUENCY_25),
		"to50": parseInt(process.env.DEFAULT_FREQUENCY_50),
		"to100": parseInt(process.env.DEFAULT_FREQUENCY_100),
		"to200": parseInt(process.env.DEFAULT_FREQUENCY_200),
		"to300": parseInt(process.env.DEFAULT_FREQUENCY_300),
		"to500": parseInt(process.env.DEFAULT_FREQUENCY_500),
		"to700": parseInt(process.env.DEFAULT_FREQUENCY_700),
		"to1000": parseInt(process.env.DEFAULT_FREQUENCY_1000),
		"to1500": parseInt(process.env.DEFAULT_FREQUENCY_1500),
		"to2000": parseInt(process.env.DEFAULT_FREQUENCY_2000),
		"to3000": parseInt(process.env.DEFAULT_FREQUENCY_3000),
		"to4000": parseInt(process.env.DEFAULT_FREQUENCY_4000),
		"to5000": parseInt(process.env.DEFAULT_FREQUENCY_5000)
	}
}