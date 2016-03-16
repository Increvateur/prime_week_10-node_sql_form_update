$(document).ready(function() {

    $('#submit-button').on('click', postData);
    $('.database-button').on('click', getData);

});

function postData() {
    event.preventDefault();

    var values = {};
    $.each($('#sql-form').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    console.log(values);

    $.ajax({
        type: 'POST',
        url: '/people',
        data: values,
        success: function(data) {
            if(data) {
                // everything went ok
                console.log('from server:', data);
                getData();
            } else {
                console.log('error');
            }
        }
    });

}

function getData() {
    $.ajax({
        type: 'GET',
        url: '/people',
        success: function(data) {
            console.log(data);
            appendDOM(data);
        }
    });
}

function appendDOM(data) {

  $(".information").empty();

  for (var i = 0; i < data.length; i++) {

  var person = i;

  $(".information").append('<div class="person-' + (person + 1) + '">');
  var $el = $(".information").children().last();

  $el.append('<br>' + data[i].name);
  $el.append('<br>' + data[i].address);
  $el.append('<br>' + data[i].city);
  $el.append('<br>' + data[i].state);
  $el.append('<br>' + data[i].zip_code);
  }
}
