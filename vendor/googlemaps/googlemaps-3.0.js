/**
 * @version 3.0
 * @author	J. Tangelder
 * @date	12-04-2010
 */

/**
 * create a new googlemaps v3 object
 *
 * @access	public
 * @param	HTMLElement	element
 * @param   MapOptions  options for the Map constructor
 */
function GoogleMaps( element , map_options )
{
	var self = this;

	// google.maps.* objects
	var Map;
    var LatLng = google.maps.LatLng;
	var DirectionsService;
    var DirectionsRender;
	var Geocoder;
    var StreetViewPanorama;


	// @access  public
	// easier creaton of a marker
	this.LatLng = google.maps.LatLng;

	// @access	public
	// holds all the markers
	this.markers = [];

	// @access	public
	// available languages
	// can be extended with other languages
	this.languages = {
		nl	: {
			DIRECTIONS_LINK			: 'Routebeschrijving', 											// html
			DIRECTIONS_FROM			: 'Vertrekpunt',  												// html
			DIRECTIONS_TO				: 'Bestemming', 												// html
			DIRECTIONS_BUTTON		: 'Routebeschrijving', 											// html
			DIRECTIONS_ERROR		: 'Helaas, de routebeschrijving kon niet worden berekend',
			STREETVIEW_LINK			: 'Straatweergave', 											// html
			STREETVIEW_ERROR		: 'Helaas, er is geen straatweergave beschikbaar',
			NOT_COMPATIBLE			: 'Helaas, uw browser biedt geen ondersteuning voor Google Maps',
			URL                     : '//maps.google.nl'
		},
		de	: {
			DIRECTIONS_LINK			: 'Route berechnen',
			DIRECTIONS_FROM			: 'Startadresse',
			DIRECTIONS_TO				: 'Zieladresse',
			DIRECTIONS_BUTTON		: 'Route berechnen',
			DIRECTIONS_ERROR		: 'Leider konnten die Route nicht berechnet werden',
			STREETVIEW_LINK			: 'Street View',
			STREETVIEW_ERROR		: 'Es gibt keine verf�gbaren Street View',
			NOT_COMPATIBLE			: 'Sorry, Ihr Browser ist nicht kompatibel mit Google Maps',
			URL                     : '//maps.google.de'
		},
		fr	: {
			DIRECTIONS_LINK			: 'Itin&eacute;raire',
			DIRECTIONS_FROM			: 'Lieu de d&eacute;part',
			DIRECTIONS_TO				: 'Lieu d\'arriv&eacute;e',
			DIRECTIONS_BUTTON		: 'Itin&eacute;raire',
			DIRECTIONS_ERROR		: 'D�sol�, les directions n\'ont pas pu �tre calcul�s',
			STREETVIEW_LINK			: 'Street View',
			STREETVIEW_ERROR		: 'D�sol�, il n\'y a pas disponible Street View',
			NOT_COMPATIBLE			: 'D�sol�, votre navigateur n\'est pas compatible avec Google Maps',
			URL                     : '//maps.google.fr'
		},
		en	: {
			DIRECTIONS_LINK			: 'Directions',
			DIRECTIONS_FROM			: 'Start address',
			DIRECTIONS_TO				: 'End address',
			DIRECTIONS_BUTTON		: 'Directions',
			DIRECTIONS_ERROR		: 'Sorry, the directions could not be calculated',
			STREETVIEW_LINK			: 'Street View',
			STREETVIEW_ERROR		: 'Sorry, there is no Street View available',
			NOT_COMPATIBLE			: 'Sorry, your browser is not compatible with Google Maps',
			URL                     : '//maps.google.com'
		},
		it	: {
			DIRECTIONS_LINK			: 'Calcola Percorso',
			DIRECTIONS_FROM			: 'Punto di Partenza',
			DIRECTIONS_TO				: 'Punto di Arrivo',
			DIRECTIONS_BUTTON		: 'Calcola',
			DIRECTIONS_ERROR		: 'Spiecenti il percorso non pu&ograve; essere calcolato',
			STREETVIEW_LINK			: 'Street View',
			STREETVIEW_ERROR		: 'Spiacenti il servizio Street View non può essere caricato',
			NOT_COMPATIBLE			: 'Spiacenti il tuo browser non &grave; compatible con Google Maps',
			URL                     : '//maps.google.com'
		},
		es	: {
			DIRECTIONS_LINK			: 'Direcciones',
			DIRECTIONS_FROM			: 'Viaje de ida',
			DIRECTIONS_TO				: 'Viaje de regreso',
			DIRECTIONS_BUTTON		: 'Itinerario',
			DIRECTIONS_ERROR		: 'Lo sentimos, las direcciones no se pudo calcular',
			STREETVIEW_LINK			: 'Street View',
			STREETVIEW_ERROR		: 'Lo sentimos, no hay Street View disponibles',
			NOT_COMPATIBLE			: 'Lo sentimos, su navegador no es compatible con Google Maps',
			URL                     : '//maps.google.es'
		},
		pt	: {
			DIRECTIONS_LINK			: 'Instru&#xE7;&#xF5;es',
			DIRECTIONS_FROM			: 'Endere&#xE7;o inicial',
			DIRECTIONS_TO				: 'Destino',
			DIRECTIONS_BUTTON		: 'Instru&#xE7;&#xF5;es',
			DIRECTIONS_ERROR		: 'Desculpe, as indica&#xE7;&#xF5;es n&#xE3;o poderia ser Calculado',
			STREETVIEW_LINK			: 'Street View',
			STREETVIEW_ERROR		: 'Desculpe, n&#xE3;o h&#xE1; Street View dispon&#xED;vel',
			NOT_COMPATIBLE			: 'Desculpe, seu navegador n&#xE3;o &#xE9; compat&#xED;vel com o Google Maps',
			URL                     : '//maps.google.pt'
		},
		pl	: {
			DIRECTIONS_LINK			: 'wskaz&#xF3;wki',
			DIRECTIONS_FROM			: 'Zacznij adres',
			DIRECTIONS_TO				: 'adres ko&#x144;cowy',
			DIRECTIONS_BUTTON		: 'wskaz&#xF3;wki',
			DIRECTIONS_ERROR		: 'Niestety, kierunki nie mo&#x17C;e by&#x107; obliczona',
			STREETVIEW_LINK			: 'street View',
			STREETVIEW_ERROR		: 'Niestety, nie ma dost&#x119;pny Street View',
			NOT_COMPATIBLE			: 'Niestety, Twoja przegl&#x105;darka nie jest kompatybilna z Google Maps',
			URL                     : '//maps.google.pl'
		},
		ru	: {
			DIRECTIONS_LINK			: '&#x41F;&#x440;&#x43E;&#x435;&#x437;&#x434;',
			DIRECTIONS_FROM			: '&#x41D;&#x430;&#x447;&#x430;&#x43B;&#x44C;&#x43D;&#x44B;&#x439; &#x430;&#x434;&#x440;&#x435;&#x441;',
			DIRECTIONS_TO				: '&#x41A;&#x43E;&#x43D;&#x435;&#x447;&#x43D;&#x44B;&#x439; &#x430;&#x434;&#x440;&#x435;&#x441;',
			DIRECTIONS_BUTTON		: '&#x41F;&#x440;&#x43E;&#x435;&#x437;&#x434;',
			DIRECTIONS_ERROR		: '&#x41A; &#x441;&#x43E;&#x436;&#x430;&#x43B;&#x435;&#x43D;&#x438;&#x44E;, &#x43D;&#x430;&#x43F;&#x440;&#x430;&#x432;&#x43B;&#x435;&#x43D;&#x438;&#x44F; &#x43D;&#x435; &#x43C;&#x43E;&#x433;&#x43B;&#x438; &#x431;&#x44B;&#x442;&#x44C; &#x440;&#x430;&#x441;&#x441;&#x447;&#x438;&#x442;&#x430;&#x43D;&#x44B;',
			STREETVIEW_LINK			: '&#x41F;&#x440;&#x43E;&#x441;&#x43C;&#x43E;&#x442;&#x440; &#x443;&#x43B;&#x438;&#x446;',
			STREETVIEW_ERROR		: '&#x41A; &#x441;&#x43E;&#x436;&#x430;&#x43B;&#x435;&#x43D;&#x438;&#x44E;, &#x43D;&#x435;&#x442; Street View &#x434;&#x43E;&#x441;&#x442;&#x443;&#x43F;&#x43D;&#x44B;',
			NOT_COMPATIBLE			: '&#x41A; &#x441;&#x43E;&#x436;&#x430;&#x43B;&#x435;&#x43D;&#x438;&#x44E;, &#x432;&#x430;&#x448; &#x431;&#x440;&#x430;&#x443;&#x437;&#x435;&#x440; &#x43D;&#x435; &#x441;&#x43E;&#x432;&#x43C;&#x435;&#x441;&#x442;&#x438;&#x43C; &#x441; Google Maps',
			URL                     : '//maps.google.ru'
		}
	};


	// @access	public
	// current language
	this.language;



	/**
	 * constructor
	 * init the map
	 *
	 * @access	private
	 */
	function constructor()
	{
		if(map_options)
		{
			Map = new google.maps.Map(element, map_options);
		}
		else
		{
			Map = new google.maps.Map(element);
		}

        this.setLanguage();
	};


	/**
	 * API
	 * get the Map object
	 *
	 * @access	public
	 * @return	object 		Map
	 */
	this.API = function()
	{
		return Map;
	};


	/**
	 * bind
	 * bind events to the map
	 *
	 * @access	public
	 * @param	string		event
	 * @param	object		callback
	 */
	this.bind = function( event, callback )
	{
		google.maps.event.addListener(Map, event, function()
		{
			callback.apply(self, arguments);
		});
	};


	/**
	 * unbind
	 * unbind events from the map
	 *
	 * @access	public
	 * @param	string		event
	 */
	this.unbind = function( event )
	{
		google.maps.event.clearListeners(Map, event);
	};


	/**
	 * trigger
	 * trigger events from the map
	 *
	 * @access	public
	 * @param	string		event
	 * @param	mixed		[data]		optional event data
	 */
	this.trigger = function( event, data )
	{
		google.maps.event.trigger(Map, event, data );
	};


	/**
	 * setLanguage
	 * set the language of the googlemaps labels etc
	 *
	 * @access	public
	 * @param	string		[language]		default is the language of the user, detected by google
	 */
	this.setLanguage = function( lang )
	{
		// get language
		if(!lang)
		{
			lang = (navigator.language) ? navigator.language : navigator.userLanguage;
		}

		// set the default language, if there are no labels available for the given language
		if (!this.languages[ lang.toString().toLowerCase() ])
		{
			lang = 'en';
		}

		// set as the current language
		this.language = lang.toLowerCase();
		if(typeof googmapslanguagedefinition == "undefined")
		{
			// create the language vars
			for (var name in this.languages[this.language])
			{
				this[name] = this.languages[this.language][name];
			}
		}
		else
		{
			// create the language vars
			for (var name in googmapslanguagedefinition)
			{
				this[name] = googmapslanguagedefinition[name];
			}
		}
	};


	/**
	 * setMapType
	 * set the default map type
	 * see http://code.google.com/intl/nl/apis/maps/documentation/javascript/reference.html#MapTypeId for available types
	 *
	 * @access	public
	 * @param	string  	map_type
	 */
	this.setMapType = function( map_type )
	{
		Map.setMapTypeId( google.maps.MapTypeId[ map_type ] );
	};


	/**
	 * setCenter
	 * center the map at a point
	 *
	 * @access	public
	 * @param	LatLng		latlng
	 * @param	int			[zoom]
	 * @param   bool        [animate]
	 */
	this.setCenter = function( latlng, zoom, animate )
	{
		if(animate)
		{
			Map.panTo( latlng );
		}
		else
		{
			Map.setCenter( latlng );
		}

        if(zoom)
        {
            Map.setZoom( zoom );
        }
	};


	/**
	 * getLatLng
	 * fetch the latlng for a query string
	 *
	 * @access	public
	 * @param	string		query
	 * @param	object		callback:(LatLng latlng, string query)
	 */
	this.getLatLng = function( query, callback )
	{
		if(!Geocoder)
			Geocoder = new google.maps.Geocoder();

		Geocoder.geocode({ address: query }, function(result, status)
		{
            if(status == google.maps.GeocoderStatus.OK)
            {
                callback.call( Map, true, result[0].geometry.location, query );
            }
            else
            {
                callback.call( Map, status, null, query );
            }
		});
	};


	/**
	 * setZoom
	 * zoom in at the map
	 *
	 * @access	public
	 * @param	int			zoom
	 */
	this.setZoom = function( zoom )
	{
		Map.setZoom( zoom );
	};


	/**
	 * fittToMarkers
	 * move and zoom the map to a position when all the current markers are visible
	 *
	 * @access	public
	 */
	this.fittToMarkers = function( )
	{
		var bounds = new google.maps.LatLngBounds();

		for(var m in this.markers)
		{
			if( typeof(this.markers[m]) == 'object' )
			{
				if(this.markers[m].API().getVisible() !== false)
				{
					bounds.extend( this.markers[m].LatLng );
				}
			}
		}

		Map.fitBounds( bounds );
	};


	/**
	 * removeMarkers
	 * Remove all markers from map
	 *
	 * @acces	public
	 * @return	void
	 */
	this.removeMarkers = function()
    {
	    for(var m in this.markers)
		{
			this.markers[m].API().setMap(null);
		}

        this.markers = [];
    };


	/**
	 * addMarker
	 * create marker object
	 *
	 * @access	public
	 * @param	LatLng		latlng
	 * @param	object		[markerOptions]		available options: http://code.google.com/intl/nl/apis/maps/documentation/reference.html#GMarkerOptions
	 * @return	object		GoogleMaps_Marker
	 */
	this.addMarker = function( latlng, markerOptions )
	{
		var marker = new this.Marker( this, latlng, markerOptions );

		this.markers.push(marker);

		return marker;
	};


	/**
	 * getDirections
	 * receive the directions between points
	 * callback returns the GDirections object. See http://code.google.com/intl/nl/apis/maps/documentation/reference.html#GDirections for more info
	 *
	 * @access	public
	 * @param	string|LatLng	from
	 * @param	string|LatLng	to
	 * @param	object		    [callback]:(status, DirectionsRoute, DirectionsRender)
	 */
	this.getDirections = function( from, to, callback )
	{
        if(!DirectionsService || !DirectionsRender)
        {
            DirectionsService = new google.maps.DirectionsService();
            DirectionsRender = new google.maps.DirectionsRenderer();
            DirectionsRender.setMap( Map );
        }

        var options = {
            origin              : from,
            destination         : to,
            optimizeWaypoints   : true,
            travelMode          : google.maps.DirectionsTravelMode.DRIVING
        };

        DirectionsService.route(options, function(result, status)
        {
            if(status == google.maps.DirectionsStatus.OK)
            {
                var DirectionsRoute = result.routes[0];

                DirectionsRender.setDirections( result );

                if(typeof callback == 'function')
                {
                    callback.call(DirectionsService, true, DirectionsRoute, DirectionsRender);
                }
            }
            else
            {
                if(typeof callback == 'function')
                {
                    callback.call(DirectionsService, status);
                }
            }
        });
	};

    /**
     * openDirectionsPopup
     * open a popup window with the directions
     *
     * @param   object  [DirectionsRender]
     * @return  self
     */
    this.openDirectionsPopup = function( render )
    {
        if(!render)
            render = DirectionsRender;

	    var directions = document.createElement('div');
	    render.setMap( Map );
	    render.setPanel(directions);

        // popup dimensions and position
        var popup = {
            pos: {	left	: 0,
                    top		: 0	},
            size: { width	: 600,
                    height	: 500 }
        };

	    // center the popup
        popup.pos.left = Math.round((window.screen.width - popup.size.width) / 2);
        popup.pos.top = Math.round((window.screen.height - popup.size.height) / 2);

        var win = window.open(	'', 'googlemaps_directions',
                                'width='+ popup.size.width +',	\
                                height='+ popup.size.height +',	\
                                left='+ popup.pos.left +',	\
                                top='+ popup.pos.top +',	\
                                toolbar=0,scrollbars=1');

	    // check if window is opened, sometimes it is blocked
	    if(win)
	    {
			win.document.writeln('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">');
			win.document.writeln('<html xmlns="http://www.w3.org/1999/xhtml"><head><title>'+ self.DIRECTIONS_LINK +'</title>');
			win.document.writeln('<style type="text/css"> ');
			win.document.writeln('body, td, th { font: 12px/17px Arial; } table { width: 100%; border-collapse: collapse; } ');
			win.document.writeln('table.adp-placemark td { padding: 5px 0; font-weight: bold; font-size: 13px; } table.adp-placemark td:first-child { width: 35px; } ');
			win.document.writeln('table.adp-directions { margin-bottom: 10px; } table.adp-directions td { cursor: pointer; border-bottom: solid 1px #ccc; padding: 3px; } table.adp-directions .adp-distance { white-space: nowrap; } ');
			win.document.writeln('div.adp-summary { background: #eee; padding: 3px; margin-bottom: 10px; font-weight: bold; border-bottom: solid 1px #ccc; border-top: solid 1px #ccc; } ');
			win.document.writeln('div.adp-legal { color: #999; text-align: right; font-size: 11px; } ');
			win.document.writeln('</style>');
			win.document.writeln('</head><body></body></html>');
			win.document.close();
			win.focus();

			// with some IE versions there is a bug with appending nodes to popup
			try {
				win.document.body.appendChild( directions );
			}
			catch(e) {
				setTimeout(function()  {
					win.document.body.innerHTML = directions.innerHTML;
				}, 100);
			}

			// print after 1 second
			setTimeout(function(){ win.print(); }, 1000);
	    }

		// avoid memoryleak
		directions = null;
    };


	/**
	 * clearDirections
	 * remove the directions from the map
     *
	 * @param   object  [DirectionsRender]
	 * @return	self
	 */
	this.clearDirections = function( render )
	{
		if(!render)
            render = DirectionsRender;

        render.setMap(null);
	};

	/**
	 * has streetview
	 * check if a latlng has streetview data
	 * @param   LatLng      latlng
	 * @param   callback    callback:( bool has_streetview, StreetViewPanoramaData )
	 */
	this.hasStreetView = function( latlng, callback )
	{
		var StreetViewService  = new google.maps.StreetViewService();
		StreetViewService.getPanoramaByLocation(latlng, 50, function(StreetViewPanoramaData, StreetViewStatus)
		{
			if(StreetViewStatus == google.maps.StreetViewStatus.OK)
			{
				var has_streetview = true;
			}
			else
			{
				var has_streetview = false;
			}

			callback.call(latlng, has_streetview, StreetViewPanoramaData);
		})
	};


	/**
	 * showStreetView
	 * show the streetview overlay
	 *
	 * @param 	LatLng		latlng
	 * @param	int			[heading]	rotation of the view horizontal
	 * @param	int			[pitch]		rotation of the view vertical
	 * @param	int			[zoom]		zoom level of the view
	 */
	this.showStreetView = function( latlng, heading, pitch, zoom )
	{
		// check if streetview is available at the given location
        if(!StreetViewPanorama)
        {
            StreetViewPanorama = new google.maps.StreetViewPanorama( element, {
	            enableCloseButton   : true
            });
            Map.setStreetView( StreetViewPanorama );
        }

        StreetViewPanorama.setPosition( latlng );
        StreetViewPanorama.setPov({
            heading : (heading ? heading : 0),
            pitch   : (pitch ? pitch : 0),
            zoom    : (zoom ? zoom : 0)
        });

		StreetViewPanorama.setVisible(true);
		google.maps.event.trigger(StreetViewPanorama, 'resize');
	};


	/**
	 * getStaticMap
	 * create a static image map version of the current view
	 * max size is 640x480, default is the map size
	 *
	 * @param	int			[width]
	 * @param	int			[height]
	 * @return	string		url
	 */
	this.getStaticMap = function( width, height )
	{
		var url = "//maps.google.com/maps/api/staticmap?";

		var params = [];

		// default is the size of the map
		if(!width && !height)
		{
			width = Map.getDiv().offsetWidth;
			height = Map.getDiv().offsetHeight;
		}

		// collect all the settings
		params.push("sensor=false");
		params.push("size="+ width +"x"+ height);
		params.push("center="+ Map.getCenter().toUrlValue() );
		params.push("zoom="+ Map.getZoom() );
		params.push("maptype="+ Map.getMapTypeId() ); // doesnt work


		// add the markers
		var markersLatLng = [];
		for(var m in self.markers)
		{
			markersLatLng.push( self.markers[m].LatLng.toUrlValue() );
		}
		params.push("markers="+ markersLatLng.join("|"));


		// add directions polygon
		var directionsLatLng = [];
		var path = DirectionsRender.getDirections().overview_path;
		for(var p in path)
		{
			directionsLatLng.push( path[p].toUrlValue() );
		}
		params.push("path=color:0x0000ff|weight:5|"+ directionsLatLng.join("|"));


		// join all the params and return the url..
		return url + params.join("&");
	};


	constructor.call(this);
}


/**
 * create a googlemaps marker
 * should only be created by GoogleMaps::Marker
 *
 * @access	private
 * @param	object		Googlemaps	instance of GoogleMaps
 * @param	LatLng		latlng
 * @param	object		[markerOptions]		available options: http://code.google.com/intl/nl/apis/maps/documentation/reference.html#GMarkerOptions
 */
GoogleMaps.prototype.Marker = function( map, latlng, markerOptions )
{
	var self = this;

	// gmarker object
	var marker;

	// marker options
	var markerOptions;

	// overlay
	var overlay;

	// infowindow data
	var infoWindow_data;

	// InfoWindow object
	var InfoWindow;

	// if the marker has streetview
	var has_streetview = null;


	// latlng object
	this.LatLng = latlng;


	/**
	 * constructor
	 * init the marker
	 *
	 * @access	private
	 */
	function constructor()
	{
		if(!markerOptions)
			markerOptions = {};

		// new GMarker object
		marker = new google.maps.Marker({ position: latlng });

		if(markerOptions.addToMap !== false)
		{
			// add marker to the map
			marker.setMap( map.API() );
		}

		if(markerOptions)
		{
			marker.setOptions( markerOptions );
		}
	}


	/**
	 * API
	 * get the GMarker object
	 *
	 * @access	public
	 * @return	object 		GMarker
	 */
	this.API = function()
	{
		return marker;
	};


	/**
	 * bind
	 * bind events to the marker
	 * see http://code.google.com/intl/nl/apis/maps/documentation/reference.html#GMarker.Events for available events
	 *
	 * @access	public
	 * @param	string		event
	 * @param	object		callback
	 */
	this.bind = function(event, callback)
	{
		google.maps.event.addListener(marker, event, function()
		{
			callback.apply(self, arguments);
		});
	};


	/**
	 * unbind
	 * unbind events from the marker
	 * see http://code.google.com/intl/nl/apis/maps/documentation/reference.html#GMarker.Events for available events
	 *
	 * @access	public
	 * @param	string		event
	 */
	this.unbind = function(event)
	{
		google.maps.event.clearListeners(marker, event);
	};


	/**
	 * trigger
	 * trigger events from the marker
	 * see http://code.google.com/intl/nl/apis/maps/documentation/reference.html#GMarker.Events for available events
	 *
	 * @access	public
	 * @param	string		event
	 * @param	mixed		[data]	event data
	 */
	this.trigger = function(event, data)
	{
		google.maps.event.trigger(marker, event, data);
	};


	/**
	 * remove marker
	 *
	 * @access	public
	 */
	this.remove = function()
	{
		// remove from map
		marker.setMap(null);

		// remove from collection
		for(var m in map.markers)
		{
			if(map.markers[m] === this)
			{
				map.markers.splice(m, 1);
			}
		}
	};


	/**
	 * center the map to the marker
	 *
	 * @access	public
	 * @param   bool    animate
	 */
	this.setCenter = function( animate )
	{
		if(animate)
		{
			map.API().panTo(this.LatLng);
		}
		else
		{
			map.API().setCenter(this.LatLng);
		}
	};


	/**
	 * check if the marker has streetview
	 *
	 * @access	public
	 * @param	object		callback:( bool has_streetview, StreetViewPanoramaData )
	 * @return  bool        has_streetview
	 */
	this.hasStreetView = function( callback )
	{
		if(callback)
		{
			map.hasStreetView( this.LatLng, callback);

			return has_streetview;
		}
		else
		{
			if(has_streetview !== null)
			{
				return has_streetview;
			}
			else
			{
				map.hasStreetView( this.LatLng, function(got_it)
				{
					has_streetview = got_it;
				});

				return null;
			}
		}
	};


	/**
	 * add an info window to the marker
	 *
	 * @access	public
	 * @param	mixed		html/node/array		html string, DOM node object, or an array to create tabs with an object [{ title: 'Tab Title', content: 'Content' }, ...]
	 * @param	object		[options]			GInfoWindowOptions, extended with { directions: bool, streetview: object{ yaw: number, pitch: number, zoom: number }}
	 * @param	string		[event]				default is click, if false, no initial event is set
	 * @return	self
	 */
	this.setInfoWindow = function( info, options, event )
	{
		// default event is onclick
		if(!event && event !== false)
			event = 'click';

		if(!options)
			options = {};

		// save the info data
		infoWindow_data = {
			content		: info,
			options		: options };

		// start infowindow object
		InfoWindow = new google.maps.InfoWindow({
			position    : this.LatLng
		});


		InfoWindow.setOptions(options);

		// check if the marker has streetview
		if(options.streetview)
		{
			this.hasStreetView();
		}

		// add event
		if(event)
		{
			this.bind(event, function()
			{
				for(var m in map.markers){
					map.markers[m].closeInfoWindow();
				}

				self.openInfoWindow();
			});
		}
	};


	/**
	 * show the marker's info window
	 *
	 * @access	public
	 * @return	self
	 */
	this.openInfoWindow = function()
	{
		// content for the info window
		var content = document.createElement('div');

		// info is an object (DOM node)
		if(typeof(infoWindow_data.content) == 'object')
		{
			content.appendChild(infoWindow_data.content);
		}
		// something else, mostly a HTML string
		else
		{
			content.innerHTML = infoWindow_data.content.toString();
		}

		var directions_streetview_links = this.directionsAndStreetviewLinks();
		if(directions_streetview_links)
		{
			content.appendChild(directions_streetview_links);
		}

		InfoWindow.setContent( content );
		InfoWindow.open( map.API() );

		// avoid memoryleak
		content = null;
	};


	/**
	 * directions html form for the info window
	 * @access  private
	 * @param   bool    to_google_maps      post to google maps in a new window
	 */
	this.openDirectionsInfoWindow = function( to_google_maps )
	{
		// we place all the directions form html in this element
		var directions_el = document.createElement('div');

		// directions form html
		directions_el.innerHTML = '<form action="" method="get">	\
			<!-- <a href="#" class="from" style="font-weight:bold;">'+ map.DIRECTIONS_FROM +'</a> &nbsp; 	\
			<a href="#" class="to">'+ map.DIRECTIONS_TO +'</a><br /><br />	\
			--><p class="map-info-title">Inserisci l\'indirizzo di partenza</p><input type="text" name="saddr" size="30" value="" /><br />	\
			<input type="hidden" name="daddr" value="'+ latlng.toUrlValue() +'" />	\
			<input type="submit" name="getDirections" value="'+ map.DIRECTIONS_BUTTON +'" />	\
		</form>';

		// bind click event to the a tags
		var a_tags      = directions_el.getElementsByTagName('a');
		var input_tags  = directions_el.getElementsByTagName('input');
		var form_tag    = directions_el.getElementsByTagName('form')[0];
		for(var a in a_tags)
		{
			a_tags[a].onclick = function()
			{
				// weird IE problem...
				var input_tags = directions_el.getElementsByTagName('input');
				var a_tags     = directions_el.getElementsByTagName('a');

				switch(this.className)
				{
					case 'from':
						input_tags[0].name = "saddr";
						input_tags[1].name = "daddr";
					break;

					default:
						input_tags[1].name = "saddr";
						input_tags[0].name = "daddr";
					break;
				}

				a_tags[0].style.fontWeight = 'normal';
				a_tags[1].style.fontWeight = 'normal';

				this.style.fontWeight = 'bold';

				// avoid memoryleak
				input_tags = null;
				a_tags = null;

				return false;
			}
		}

		// open in google maps
		if(to_google_maps)
		{
			form_tag.action = map.URL;
			form_tag.target = '_blank';
		}

		// show route on the map
		else
		{
			// on submit of the form we request the directions
			form_tag.onsubmit = function()
			{
				map.getDirections(
					this.saddr.value,
					this.daddr.value,
					function(status, DirectionsRoute, DirectionsRender)
					{
						if(status)
						{
							map.openDirectionsPopup( DirectionsRender );
						}
					});
				self.closeInfoWindow();
				return false;
			};
		}

		// open the infowindow
		if(!InfoWindow)
		{
			InfoWindow = new google.maps.InfoWindow({
				position    : this.LatLng
			});
		}

		InfoWindow.setContent( directions_el );
		InfoWindow.open( map.API() );

		// avoid memoryleak
		a_tags = input_tags = form_tag = null;
	};


	/**
	 * hide the marker's info window
	 *
	 * @access	public
	 * @return	self
	 */
	this.closeInfoWindow = function()
	{
		// hides all the info windows on the map
		InfoWindow.close();
	};


	/**
	 * generate directions and streetview links
	 * @return  object  directions_streetview_links or null
	 */
	this.directionsAndStreetviewLinks = function()
	{
		// build links for the first tab/info windows to switch to directions or open streetview
		var directions_streetview_links = null;

		if(infoWindow_data.options.directions || infoWindow_data.options.streetview)
		{
			directions_streetview_links = document.createElement('div');
			directions_streetview_links.setAttribute("class", "map-btn");

			if(infoWindow_data.options.directions)
			{
				var a = document.createElement('a');
				a.setAttribute('href', '#directions');
				a.innerHTML = map.DIRECTIONS_LINK;

				a.onclick = function()
				{
					self.openDirectionsInfoWindow( infoWindow_data.options.directions_popup );
					return false;
				};

				directions_streetview_links.appendChild(a);
				a = null;
			}

			if(infoWindow_data.options.streetview && (infoWindow_data.options.streetview.position != null || has_streetview == true || has_streetview === null))
			{
				var latlng = infoWindow_data.options.streetview.position || self.LatLng;

				var a = document.createElement('a');
				a.setAttribute('href', '#streetview');
				a.innerHTML = map.STREETVIEW_LINK;

				a.onclick = function()	{
					if (typeof(infoWindow_data.options.streetview) == 'object')
					{
						map.showStreetView( latlng,
							infoWindow_data.options.streetview.heading,
							infoWindow_data.options.streetview.pitch,
							infoWindow_data.options.streetview.zoom);
					}
					else
					{
						map.showStreetView( self.LatLng );
					}
					return false;
				};

				directions_streetview_links.appendChild(a);
				a = null;
			}
		}

		return directions_streetview_links;
	};


	constructor.call(this);
};
