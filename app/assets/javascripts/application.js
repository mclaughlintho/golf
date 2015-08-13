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
//= require moment
//= require underscore




// Clicking 'Submit' button for a New Round

$(document).ready(function() {
  
  $(document).on('submit', '#new_round', function(event) {
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




// TableSorter Plug-in //

$(document).on('ready page:load', function() {
   $("#rounds-table").tablesorter();
})




// Filtering Rounds Event Handlers //




$(document).ready(function() {
  
  
  $(document).on('change', '.filter-item', function() {
    checkAllFilters();
  });
  
  $(document).on('click', '.this-week', function(event) {
    event.preventDefault();
    var thisWeekButton = $(this);
    thisWeekButton.toggleClass('active');
    if(thisWeekButton.hasClass('active')) {
      $('.this-month').removeClass('active');
      $('.this-year').removeClass('active');
    }
    checkAllFilters();
  })
  
    $(document).on('click', '.this-month', function(event) {
    event.preventDefault();
    var thisMonthButton = $(this);
    thisMonthButton.toggleClass('active');
    if(thisMonthButton.hasClass('active')) {
      $('.this-week').removeClass('active');
      $('.this-year').removeClass('active');
    }
    checkAllFilters();
  })
  
    $(document).on('click', '.this-year', function(event) {
    event.preventDefault();
    var thisYearButton = $(this);
    thisYearButton.toggleClass('active');
    if(thisYearButton.hasClass('active')) {
      $('.this-week').removeClass('active');
      $('.this-month').removeClass('active');
    }
    checkAllFilters();
  })
  
  $(document).on('click', '.course-search', function(event) {
    event.preventDefault();
    checkAllFilters();
  })
  

  
  
});

// Check All Filters Function //

  var checkAllFilters = function() {
    $('.round').map(function(index, round) {
      var $round = $(round);
      if(_.every([scoreFilterMatches($round), scoreToParFilterMatches($round), parFilterMatches($round), holesFilterMatches($round), courseFilterMatches($round),
                drinkingFilterMatches($round), dateFilterMatches($round), thisWeekFilterMatches($round), thisMonthFilterMatches($round), thisYearFilterMatches($round)])) {
        $round.show();
      } else {
        $round.hide();
      }
    });
  }

// Score Filter //

  var scoreFilterMatches = function(round) {
   var filterScore = parseInt($('#filter_score').val(), 10);
    var score_selector = $('#score_selector option:selected').text();
      var actualScore = round.children('.score').data('score');
      if(isNaN(filterScore)) {
        return true;
        } else if(score_selector === "Greater Than") {
        return (actualScore > filterScore); 
      } else {
        return (actualScore < filterScore);
      }
  };
  
  // Score-To-Par Filter //

  var scoreToParFilterMatches = function(round) {
    var filterScoreToPar = parseInt($("#filter_score_to_par").val(), 10);
    var score_to_par_selector = $('#score_to_par_selector option:selected').text();
    var actualScoreToPar = round.children('.score-to-par').data('score-to-par');
    
    if(isNaN(filterScoreToPar)) {
      return true;
    } else if(score_to_par_selector === "Better Than") {
      return(actualScoreToPar < filterScoreToPar);
    } else {
        return(actualScoreToPar > filterScoreToPar);
    }
  }; 
   


// Par Filter

  var parFilterMatches = function(round) {
    var filterPar = parseInt($("#filter_par").val(), 10);
    var par_selector = $('#par_selector option:selected').text();
    var actualPar = round.children('.par').data('par');
    
    if(isNaN(filterPar)) {
      return true;
    } else if(par_selector === "Greater Than") {
      return(actualPar > filterPar);
    } else {
      return(actualPar < filterPar);
    }
  };



// Holes Filter //


  var holesFilterMatches = function(round) {
    var holes_selector = $('#holes_selector option:selected').text();
    var actualHoles = round.children('.holes').data('holes');
      if(holes_selector === "All") {
        return true;
      } else if(holes_selector === "18") {
        return(actualHoles === 18);
      } else if(holes_selector === "9") {
        return(actualHoles === 9);
      } else if(holes_selector === "Other") {
        return(actualHoles === "Other");
      }
  };

// Date Filters

    var dateFilterMatches = function(round) {
      var filterDate = $("#played_on_date").val();
      var date_selector = $('#date_selector option:selected').text();
      var actualDate = moment(round.children('.date').data('date'));
        if(filterDate === "") {
          return true;
        } else {
          filterDate = moment($("#played_on_date").val());
          if(date_selector === "Before") {
            return(actualDate < filterDate) ;
          } else if(date_selector === "After") {
            return(actualDate > filterDate) ;
          } else if(date_selector === "On") {
            return(actualDate === filterDate);
          }
        }
    }
  
  // Week, Month and Year Filters //
  
  
  var thisWeekFilterMatches = function(round) {
    var thisWeekButton = $('.this-week');
    if(thisWeekButton.hasClass('active')) {
      var startOfWeek = moment().startOf('week');
      var dateOfRound = moment(round.children('.date').data('date'));
      return(dateOfRound > startOfWeek);
    } else {
      return true;
    }
  };
  
  var thisMonthFilterMatches = function(round) {
    var thisMonthButton = $('.this-month');
    if(thisMonthButton.hasClass('active')) {
      var startOfMonth = moment().startOf('month');
      var dateOfRound = moment(round.children('.date').data('date'));
      return(dateOfRound > startOfMonth);
    } else {
      return true;
    }
  };
  
  var thisYearFilterMatches = function(round) {
    var thisYearButton = $('.this-year');
    if(thisYearButton.hasClass('active')) {
      var startOfYear = moment().startOf('year');
      var dateOfRound = moment(round.children('.date').data('date'));
      return(dateOfRound > startOfYear);
    } else {
      return true;
    }
  };

// COurse Filter //

  var courseFilterMatches = function(round) {
    var filterCourse = $('#course').val();
    var actualCourse = round.children('.course').data('course');
    if(filterCourse === "") {
      return true;
    } else if(actualCourse === filterCourse) {
      return true;
    } else {
      return false;
    }
  }

// Drinking FIlter //
  
  var drinkingFilterMatches = function(round) {
    var drinkingSelector = $('#drinking_selector option:selected').text();
    var actualDrinking = round.children('.drinking').data('drinking');
      if(drinkingSelector === "True") {
        return(actualDrinking);
      } else if(drinkingSelector === "False") {
        return(!actualDrinking);
      } else {
        return true;
      }
  }
  
  
  
  

// Switching between Add-Round-View and Filter-View //

$(document).ready(function() {
  
  $(document).on('click', '#filter-round-button', function(event) {
    event.preventDefault();
    $('.add-round-view').slideUp();
    $('.filter-round-view').show();
  })
  
   $(document).on('click', '#add-round-button', function(event) {
    event.preventDefault();
    $('.filter-round-view').hide();
    $('.add-round-view').fadeIn();
  })
  
})