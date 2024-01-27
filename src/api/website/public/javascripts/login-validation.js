var valid = 'form-control is-valid mb-2'
var invalid = 'form-control is-invalid'

$(document).ready(function() {

    var email = $('#login-email')

    if (isEmail(email.value())) {
       if (email.hasClass(invalid)) {
         email.removeClass(invalid)
         email.addClass(valid)
       }
    } else {
      if (email.hasClass(valid)) {
        email.removeClass(valid)
        email.addClass(invalid)
      }
    }

    var password = $('#login-password')
    if (password.value().length() <= 8) {
       if (password.hasClass(valid)) {
         password.removeClass(valid)
         password.addClass(invalid)
       }
    } else {
      if (password.hasClass(invalid)) {
        password.removeClass(invalid)
        password.addClass(valid)
      }
    }
})

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
