module.exports.validateInput = (value, inputType, options, lowerTolerance, upperTolerance, expectedValue) => {
    let inputValidated = 0;

    if (this.validateEmpty(value)) {
        inputValidated = 1
    } else if (this.validateLengthOverMax(value)) {
        inputValidated = 0
    } else if (inputType == 0 && this.validateOption(value, options)) {
        inputValidated = 1
    } else if (inputType == 1 && this.validateText(value)) {
        inputValidated = 1
    } else if (inputType == 3 && this.validateNumber(value)) {
        inputValidated = 1
    }

    if (
        inputValidated == 1 &&
        inputType == 3 &&
        lowerTolerance &&
        upperTolerance &&
        value != "" &&
        this.validateNumberOutTolerance(value, expectedValue, lowerTolerance, upperTolerance)
    ) {
        inputValidated = 2
    } else if (
        inputValidated == 1 &&
        inputType == 3 &&
        lowerTolerance == null &&
        upperTolerance == null &&
        value != "" &&
        this.validateNumberNotAsExpected(value, expectedValue)
    ) {
        inputValidated = 2
    }

    return inputValidated
}


module.exports.validateEmpty = (value) => {
    return value == null || value == ""
}

module.exports.validateText = (value) => {
    return (
        typeof value === "string"
    )
}

module.exports.validateNumber = (value) => {
    value = value.toString()
    return (
        !isNaN(value) &&
        !isNaN(parseFloat(value)) &&
        Number(value) >= 0
    );
}

module.exports.validateOption = (value, options) => {
    for (let i = 0; i < options.length; i++)
        if (options[i].value == value)
            return true

    return false
}

module.exports.validateLengthOverMax = (value) => {
    value = value.toString()
    return value.length > 50
}

module.exports.validateNumberOutTolerance = (value, expectedValue, lowerTolerance, upperTolerance) => {
    let max = parseFloat(expectedValue) + parseFloat(upperTolerance)
    let min = parseFloat(expectedValue) - parseFloat(lowerTolerance)
    let number = parseFloat(value)

    return (max < number || min > number)
}

module.exports.validateNumberNotAsExpected = (value, expectedValue) => {
    let expected = parseFloat(expectedValue)
    let number = parseFloat(value)
    return (expected != number)
}



