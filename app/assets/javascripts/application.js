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
//= require bootstrap-sprockets
//= require tablesorter/jquery.tablesorter


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
    });
  });


// Clicking 'Delete' button

  $(document).on('click', '.delete-button', function(event) {
    event.preventDefault();
    if(confirm("Are you sure you want to delete this Round?")) {
      var deleteButton = $(this),
      userIdDiv = $('.user-id-div');
      $.ajax({
        url: '/users/' + userIdDiv.attr('id') + '/rounds/' + deleteButton.attr('id'),
        type: 'delete',
        success: function(result) {
          deleteButton.closest('.round').remove();
        },
        error: function(result) {
          alert("There was an error");
        }
      });
    }
  });
  
});

// TableSorter Plug-in

$(document).on('ready page:load', function() {
   $("#rounds-table").tablesorter();
})




// Filtering Rounds

$(document).ready(function() {
  $(document).on('change', "#round_score_to_par", function(event) {
    var filterScore = $(this).val();
    var better_or_worse = $('#better_or_worse option:selected').val();
    $.map($('.score-to-par'), function(item, index) {
      var $item = $(item)
      var actualScore = $item.data('score');
      if(better_or_worse === "1") {
        if(actualScore > filterScore) {
          $item.closest('.round').hide();
        } else {
          $item.closest('.round').show();
        }
      } else {
        if(actualScore < filterScore) {
          $item.closest('.round').hide();
        } else {
          $item.closest('.round').show();
        }
      }
    });
  });
  
  $(document).on('change', '#better_or_worse', function() {
    $('#round_score_to_par').trigger('change');
  })
  
});