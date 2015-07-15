// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

// Clicking 'Submit' button for a New Round

$(document).ready(function() {
  $(document).on('submit', '.new-round-form form', function(event) {
    event.preventDefault();
    var form = $(this)
    $.ajax(form.attr('action'), {
    type: 'post',
    data: form.serialize(),
    success: function(newRound) {
      $('.rounds').append(newRound);
      form.find('input').val("");
      form.find('#round_comments').val("");
      form.find('.submit-button').val("Submit");
    }
    })
  })
})

// Clicking 'Delete' button

$(document).ready(function() {
  $(document).on('click', '.delete-button', function(event) {
    event.preventDefault();
    confirm("Are you sure you want to delete this Round?");
    var deleteButton = $(this)
    deleteButton.closest('.round').remove()
  })
})

// Clicking 'Comments' link

$(document).ready(function() {
  $(document).on('click', '.comments', function(event) {
    event.preventDefault();
    var commentButton = $(this);
    confirm(commentButton.data);
  })
})