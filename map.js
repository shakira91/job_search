var map;
var marker; 
      
  var highlightJob = function(companies){
      $(".highlight").removeClass("highlight");
      $("li:contains(" + companies + "):first").addClass("highlight");
      $(".highlight:first").each(function(){
          $("#jobSideBar").animate({

           scrollTop: $(this).position().top += $("#jobSideBar").scrollTop()
        }, 500); 
    });

  }
  var initDestinationPopUp = function(destinationDetails, companies) {
    console.log(companies)
    $(".modal").addClass("grow");
    var distance;
    var duration;
    var trainLine;
    var trainName;
    var transitAgency;
    var finalStop;
    var details = [];


    if (destinationDetails[0].steps.length > 1 && destinationDetails[0].steps[1].transit_details !== null) {
      var sliced = Array.prototype.slice.call(destinationDetails[0].steps, destinationDetails[0].steps.length - 2);
      
      for (var s = 0; s < 1; s++)
        var finalObject = sliced[sliced.length - 2]
      }
      else {
        $(".destinationDetails").html("<span class='details'> Sweet! You're so close to this new place, you won't need to take public transportation. Try biking!</span>");

      highlightJob(companies);
      }
   
      distance = destinationDetails[0].distance.text;
      duration = destinationDetails[0].duration.text;
      trainLine = finalObject.transit_details.line.name;
      trainName = finalObject.transit_details.line.short_name;
      transitAgency = finalObject.transit_details.line.agencies[0].name
      finalStop = finalObject.transit_details.arrival_stop.name;
  
      details.push("From the location previously entered, you'd reach " + companies +"'s location in about <strong>" + distance + "</strong> and " + duration + ". <br>You'd have to take " + transitAgency +"\'s "+ trainLine, trainName + " line to " + finalStop + ".");


      var jobDest = ""; 
      for (var g = 0; g < details.length; g++) {
        if (details[g]) {
          jobDest += "  " + details[g];
          $(".destinationDetails").html("<span class='details'>" + jobDest + "</span>");
        } 
      } 
   
      $(".details").text($(".details").text().replace(/undefined/g, ""));
    }


    var initMap = function() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.7529108, lng: -73.98735169999999 },
        zoom: 14,
        styles: [
            {
                "featureType": "administrative",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#000000"
                    },
                    {
                        "lightness": -100
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#dddddd"
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": -3
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "labels",
                "stylers": [
                    {
                        "hue": "#000000"
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": -100
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#000000"
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": -100
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#bbbbbb"
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 26
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [
                    {
                        "hue": "#ffffff"
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 100
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#ffffff"
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 100
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels",
                "stylers": [
                    {
                        "hue": "#000000"
                    },
                    {
                        "lightness": -100
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#ffffff"
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 100
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [
                    {
                        "hue": "#000000"
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": -100
                    },
                    {
                        "visibility": "off"
                    }
                ]
            }
        ],
        disableDefaultUI: true,
        backgroundColor: 'white',
      });
    }
    function initMarkers(jobCoordinates, companies, jobAddress, destinationDetails) {
      var marker = new google.maps.Marker({
        position: jobCoordinates,
        map: map,
        icon: 'https://www.hias.org/sites/default/files/icons8-marker-48.png'
      });
      var infowindow = new google.maps.InfoWindow({
          content: "<strong>" + companies + "</strong>  " + jobAddress
      });


      google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map,marker);

        initDestinationPopUp(destinationDetails,companies);

      highlightJob(companies);
            
     });
      
   }