const converterResult = document.querySelector('.converter-result')
const btnsEl = document.querySelectorAll('.converter-btn')

// Validation and submit form

let validateForms = (selector) => {
  new window.JustValidate(selector, {
    rules: {
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minLength: 5
      }
    },
    focusWrongField: true,
    submitHandler: (form, values) => {
      console.log('POST data: ', values)
    },
  })
}

validateForms('.form')

// Fetch queries for currency converter

btnsEl.forEach(el => {
  el.addEventListener('click', (e) => {
    let valueTo = e.currentTarget.dataset.valueto
    let valueFrom = e.currentTarget.dataset.valuefrom
    fetch(`https://currency-exchange.p.rapidapi.com/exchange?to=${valueTo}&from=${valueFrom}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "7a998b5da0msh2aeaf7ecb754373p18a88fjsnf26dc7e7c2c3",
        "x-rapidapi-host": "currency-exchange.p.rapidapi.com"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        converterResult.innerHTML = data
      })
      .catch(err => {
        console.error(err);
      });
  })
})