/*
    Google MAP jQuery Plugin by Stephen Yeung, Hong Kong, 2018/1/3
*/ 
(function ($) {

    // DEFINE METHOD
    $.fn.jGmap = function (settings) {

        // DEFAULT OPTIONS
        var config = {
            marker: '',
            address: '',
            latlng: '',
            streetview: false,
            zoom: 17,
            style: ''
        };

        var canvas;
       
        // EXTEND OPTIONS
        var settings = $.extend(config, settings);

        function displayMap(latlng) { 
            var option = {
                zoom: settings.zoom,
                center: latlng,
                streetViewControl: settings.streetview,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var map = new google.maps.Map(canvas, option);

            var marker = new google.maps.Marker({
                position: latlng,
                map: map,
                icon: settings.marker
            });

            if (settings.style) {
                map.mapTypes.set('styled_map', settings.style);
                map.setMapTypeId('styled_map');
            }
        }

        return this.each(function () {
            canvas = this;
            var geocoder = new google.maps.Geocoder();

            if (!settings.latlng) {
                geocoder.geocode({ "address": settings.address }, function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        displayMap(results[0].geometry.location);
                    } 
                });
            }
            else {
                var sll = settings.latlng.split(',');
                var latlng = new google.maps.LatLng(parseFloat(sll[0]), parseFloat(sll[1]));

                displayMap(latlng);
            }
        });
    };

})(jQuery);
