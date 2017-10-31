"use strict";

var userInputJob;
var userEnteredAddress;
var company;
var title;
var date;
var url;
var companiesArray = [];
var jobCoordinates;
var jobAddress;
var destinationDetails;


var request = function(type, url, crossDomain, crossOrigin, dataType) {

  this.type = type;
  this.url = url;
  this.crossDomain = crossDomain;
  this.crossOrigin = crossOrigin;
  this.dataType = dataType;

}

request.prototype.googleRequest = function(companies, userEnteredAddress) {
  jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});
    $.ajax({
        type: this.type,
        url: this.url + 'origin='+ userEnteredAddress + '&destination=' + companies + "+New+York+City",
        crossDomain: this.crossDomain,
        dataType: this.dataType,
      }).done(function(response){
        console.log(response)
        //console.log(response.routes[0].legs[0].distance.text)
          jobCoordinates = response.routes[0].legs[0].end_location;
          jobAddress = response.routes[0].legs[0].end_address;
          destinationDetails = response.routes[0].legs;

          initMarkers(jobCoordinates, companies, jobAddress, destinationDetails);
      });
}

var google = new request('POST', 'https://maps.googleapis.com/maps/api/directions/json?mode=transit&transit_mode=train&key=AIzaSyAkqHQ3ubxqS1SznXw9h92FJMlzvE0njQ8&' , true, 'json');

request.prototype.jobRequest = function(userInputJob) { 
  $("#question2Overlay").remove();
  jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});

  $.ajax({
      type: this.type,
      url: this.url,
      crossDomain: this.crossDomain,
      dataType: this.dataType,
    }).done(function(response){
      $.each(response.listings.listing, function(key, value){
        for (var jobKey in value) {
        if (value.hasOwnProperty(jobKey)) {
          company = value.company;
          title = value.title;
          date = value.post_date;
          url = value.url  
          }         
         }
         companiesArray.push(company.name);
         $("#jobSideBarList").append('<li><h2>' + company.name + '</h2>' + title + '<br> ' +  'Posted on: ' + date + '<br> ' + '<a class="apply" target="_blank" href="' + url + ' ">Apply on <img class="align" src="img/dice-logo@2x.png"></a>' + '</li></ul>');
      });
      for (var c = 0; c < companiesArray.length; c++) {
       google.googleRequest(companiesArray[c], userEnteredAddress);
    }
    initMap();
    $("#loader").remove();
    });
}

var submitData = function(dataInput, dataButton) {
 $(dataInput).keydown(function(e){    
    if(e.keyCode === 13){
       $(dataButton).trigger("click");
    }
  });
}


$("#question1Overlay h2, #question1Overlay p, #question1Overlay input, #question2Overlay h2, #question2Overlay p, #question2Overlay input").fadeIn("slow");

submitData("#userEnteredJob", "#question1OverlaySubmit");

$("#question1OverlaySubmit").on("click", function(){

    userInputJob = $("#userEnteredJob option:selected").val();

    var validateInput = function() {
      if (!userInputJob == " ") {
        return true;
      } else {
        alert("Please enter a keyword");
      }
    }

    if (validateInput()) {

      $("#question1Overlay").remove();
      $("#question2Overlay").fadeIn("slow");

      submitData("#userEnteredAddress", "#question2OverlaySubmit");

      $("#question2OverlaySubmit").on("click", function(){

        userEnteredAddress = $("#userEnteredAddress").val();

        var validateAddress = function() {
          if (!userEnteredAddress == " ") {
            return true;
          } else {
            alert("Please enter an address");
      }
    }
    if (validateAddress()) {
      $("body").append("<img id='loader' src='img/30.gif'>");

      $("#jobSideBar, .modal").css("display", "block");

      var dice = new request('GET', 'https://authenticjobs.com/api/?api_key=8273c26a4d07129e28a678e48772893d&method=aj.jobs.search&keywords='+ userInputJob +'&perpage=100&format=json&location="NY"', true, 'jsonp');
        dice.jobRequest(userInputJob);
    }

      });

      



    } 

  });