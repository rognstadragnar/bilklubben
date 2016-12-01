import React from 'react';
import GoogleMap from 'google-map-react';

export default (props) => {
    const defaultCenter =[Number(props.bilen.poslat), Number(props.bilen.poslng)];
    const Marker = (props) => <span style={{position: 'absolute', bottom: '0', right: '0', height: '30px', width: '20px', backgroundImage: 'url("/assets/img/icons/mapmarker.svg")', backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}></span>

    return (
        <div className='map-wrapper'>
            <GoogleMap
                center={defaultCenter}
                defaultZoom={13}
                options={{scrollwheel: false, styles: [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#79add8"
            },
            {
                "visibility": "on"
            }
        ]
    }
]}}
                >
                <Marker lat={Number(props.bilen.poslat)} lng={Number(props.bilen.poslng)} text={props.bilen.make + ' ' + props.bilen.model}/>
            </GoogleMap>      
        </div>
    )
}