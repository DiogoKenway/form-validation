const fields = document.querySelectorAll("[required]")

function validateField(field) {

    function verifyErrors() {
        let foundError = false

        for (let key in field.validity) {

            if (field.validity[key] && !field.validity.valid) {
                foundError = key
            }
        }

        return foundError
    }
     

    function customMessage (typeError) {
            const messages =  {
                text: {valueMissing: "por favor, preencha esse campo"
               },
               email: {
                   valueMissing:  "Email é Obrigatório",
                   typeMismatch: "por Favor, preencha um email Valido"
               }
            }

            return messages[field.type][typeError]
    }


    function setCustomMessage(message) {

        const spanError = field.parentNode.querySelector("span.error")

        if (message) {
            spanError.classList.add("active")
            spanError.innerHTML = message
        } else {
            spanError.classList.remove("active")
            spanError.innerHTML = ""
        }
    }

    return function () {
        
        const error = verifyErrors()
        const message = customMessage(error)


        if (error) {
            const message = customMessage(error)
            setCustomMessage(message)

        } else {
            field.style.borderColor = "green"
            setCustomMessage()
        }
    }
}


function custonValidation(event) {

    const field = event.target
    const validation = validateField(field)

    validation()

}



for (let field of fields) {
    field.addEventListener("invalid", event => {

        event.preventDefault()
        custonValidation(event)
    })
    field.addEventListener("blur", custonValidation)
}


document.querySelector("form").onsubmit = event => {
    event.preventDefault()
    console.log("form env....")
}
