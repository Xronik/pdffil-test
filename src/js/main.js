const inputEmail = document.querySelector('#email')
const inputPassword = document.querySelector('#password')
const currenceConverterResult = document.querySelector('.converter-result')
let btn = document.querySelectorAll('.converter-btn')

btn.forEach(el => {
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
        currenceConverterResult.innerHTML = data
      })
      .catch(err => {
        console.error(err);
      });
  })
})

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
    submitHandler: (form, values, ajax) => {
      console.log('POST data: ', values)
      ajax({
        url: '/',
        method: 'POST',
        data: values,
        async: true,
        callback: function (response) {
          console.log(response)
        }
      });
    },
  })
}

validateForms('.form')