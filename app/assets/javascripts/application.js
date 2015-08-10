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




// Clicking 'Submit' button for a New Round //

$(document).ready(function() {
  
  $(document).on('submit', '.new-round-form form', function(event) {
    event.preventDefault();
    var form = $(this);
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


// Clicking 'Delete' button //

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




// TableSorter Plug-in //

$(document).on('ready page:load', function() {
   $("#rounds-table").tablesorter();
})




// Filtering Rounds //



// Score-To-Par Filter //

$(document).ready(function() {
  $(document).on('change', "#filter_score_to_par", function(event) {
    var filterScoreToPar = $(this).val();
    var score_to_par_selector = $('#score_to_par_selector option:selected').val();
    $.map($('.score-to-par'), function(item, index) {
      var $item = $(item)
      var actualScoreToPar = $item.data('score');
      if(score_to_par_selector === "1") {
        if(actualScoreToPar > filterScoreToPar) {
          $item.closest('.round').hide();
        } else {
          $item.closest('.round').show();
        }
      } else {
        if(actualScoreToPar < filterScoreToPar) {
          $item.closest('.round').hide();
        } else {
          $item.closest('.round').show();
        }
      }
    });
  });
  
  $(document).on('change', '#score_to_par_selector', function() {
    $('#filter_score_to_par').trigger('change');
  })
  
});

// Par Filter

$(document).ready(function() {
    $(document).on('change', "#filter_par", function(event) {
    var filterPar = $(this).val();
    var par_selector = $('#par_selector option:selected').val();
    $.map($('.par'), function(item, index) {
      var $item = $(item)
      var actualPar = $item.data('par');
      if(par_selector === "1") {
        if(actualPar < filterPar) {
          $item.closest('.round').hide();
        } else {
          $item.closest('.round').show();
        }
      } else {
        if(actualPar > filterPar) {
          $item.closest('.round').hide();
        } else {
          $item.closest('.round').show();
        }
      }
    });
  });
  
  $(document).on('change', '#par_selector', function() {
    $('#filter_par').trigger('change');
  })
})

// Score Filter

$(document).ready(function() {
    $(document).on('change', "#filter_score", function(event) {
    var filterScore = $(this).val();
    var score_selector = $('#score_selector option:selected').val();
    $.map($('.score'), function(item, index) {
      var $item = $(item)
      var actualScore = $item.data('par');
      if(score_selector === "1") {
        if(actualScore < filterScore) {
          $item.closest('.round').hide();
        } else {
          $item.closest('.round').show();
        }
      } else {
        if(actualScore > filterScore) {
          $item.closest('.round').hide();
        } else {
          $item.closest('.round').show();
        }
      }
    });
  });
  
  $(document).on('change', '#score_selector', function() {
    $('#filter_score').trigger('change');
  });
});

// Holes Filter //

$(document).ready(function() {
  $(document).on('change', '#holes_selector', function(event) {
    var holes_selector = $(this).val();
    $.map($('.holes'), function(item, index) {
      var $item = $(item);
      var actualHoles = $item.data('holes');
      if(holes_selector === "1") {
        $item.closest('.round').show();
      } else if(holes_selector === "2") {
        if(actualHoles === 18) {
          $item.closest('.round').show();
        } else {
          $item.closest('.round').hide();
        }
      } else if(holes_selector === "3") {
        if(actualHoles === 9) {
          $item.closest('.round').show();
        } else {
          $item.closest('.round').hide();
        }
      } else if(holes_selector === "4") {
        if(actualHoles === "Other") {
          $item.closest('.round').show();
        } else {
          $item.closest('.round').hide();
        }
      }
    });
  });
});

// Date Filters

$(document).ready(function() {
    $(document).on('change', '#played_on_date', function(event) {
      var filterDate = $(this).val();
      var date_selector = $('#date_selector option:selected').val();
      $.map($('.date'), function(item, index) {
        var $item = $(item);
        var actualDate = $item.data('date');
        console.log(actualDate);
        if(date_selector === "1") {
          if(actualDate > filterDate) {
            $item.closest('.round').hide();
          } else {
            $item.closest('.round').show();
          }
        } else if(date_selector === "2") {
          if(actualDate < filterDate) {
            $item.closest('.round').hide();
          } else {
            $item.closest('.round').show();
          }
        } else if(date_selector === "3") {
          if(actualDate === filterDate) {
            $item.closest('.round').show();
          } else {
            $item.closest('.round').hide();
          }
          }
        });
    });
    
  $(document).on('change', '#date_selector', function() {
    $('#played_on_date').trigger('change');
  });

});

// COurse Filter //

$(document).ready(function() {
  $(document).on('click', ".course-search", function(event) {
    event.preventDefault();
    var filterCourse = $('#course').val();
    $.map($('.course'), function(item, index) {
      var $item = $(item);
      var actualCourse = $item.data('course');
      if(actualCourse === filterCourse) {
        $item.closest('.round').show();
      } else {
        $item.closest('.round').hide();
      }
    });
  });
});

// Drinking FIlter //

$(document).ready(function() {
  $(document).on('change', '#drinking_selector', function() {
    var drinkingSelector = $('#drinking_selector option:selected').val();
    $.map($('.drinking'), function(item, index) {
      var $item = $(item);
      var actualDrinking = $item.data('drinking');
      if(drinkingSelector === "2") {
        if(actualDrinking === true) {
          $item.closest('.round').show();
        } else {
          $item.closest('.round').hide();
        }
      } else if(drinkingSelector === "3") {
        if(actualDrinking === false) {
          $item.closest('.round').show();
        } else {
          $item.closest('.round').hide();
        }
      } else {
        $item.closest('.round').show();
      }
    });
  });
});