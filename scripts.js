"use strict";

var userInputJob;
var userEnteredAddress;
var company;
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
   $.ajaxPrefilter(function(options) {
        if (options.crossDomain && $.support.cors) {
          options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });

    $.ajax({
        type: this.type,
        url: this.url + 'origin='+ userEnteredAddress + '&destination=' + companies + "+New+York+City",
        crossDomain: this.crossDomain,
        crossOrigin: this.crossOrigin,
        dataType: this.dataType
      }).done(function(response){
        //console.log(response.routes[0].legs[0].distance.text)
          jobCoordinates = response.routes[0].legs[0].end_location;
          jobAddress = response.routes[0].legs[0].end_address;
          destinationDetails = response.routes[0].legs;

          initMarkers(jobCoordinates, companies, jobAddress, destinationDetails);
      });
}

var google = new request('POST', 'https://maps.googleapis.com/maps/api/directions/json?mode=transit&transit_mode=train&key=AIzaSyB0BIRMZlf9e5S-qxixsJrFVLLYUG2sizE&' , true, true, 'json');

request.prototype.jobRequest = function(userInputJob) { 
  $("#question2Overlay").remove();

  $.ajax({
      type: this.type,
      url: this.url,
      crossDomain: this.crossDomain,
      crossOrigin: this.crossOrigin,
      dataType: this.dataType
    }).done(function(response){
      $.each(response.resultItemList, function(key, value){
        for (var jobKey in value) {
        if (value.hasOwnProperty(jobKey)) {
          company = value.company;    
          }         
         }
         companiesArray.push(company);
         $("#jobSideBarList").append('<li><h2>' + company + '</h2>' + value.jobTitle + '<br> ' +  'Posted on: ' + value.date + '<br> ' + '<a class="apply" target="_blank" href="' + value.detailUrl + ' ">Apply on <img src="img/dice-logo@2x.png"></a>' + '</li></ul>');
      });
      for (var c = 0; c < companiesArray.length; c++) {
       google.googleRequest(companiesArray[c], userEnteredAddress);
    }
    initMap();
    });
}



$("#question1Overlay h2, #question1Overlay p, #question1Overlay input, #question2Overlay h2, #question2Overlay p, #question2Overlay input").fadeIn("slow");

$("#question1OverlaySubmit").on("click", function(){

    userInputJob = $("#userEnteredJob").val();

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

      var dice = new request('GET', 'http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=' + userInputJob + '&city=New+York&pgcnt=120' , true, true, 'json');
        dice.jobRequest(userInputJob);
    }

      });

      



    } 

  });