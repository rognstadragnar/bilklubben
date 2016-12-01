import React from 'react';
import GoogleMap from 'google-map-react';

export default (props) => {
    const bilen = props.valgtBil ? props.biler.filter(cv => cv.id === props.valgtBil) : null;
    const defaultCenter =[Number(props.bil.poslat), Number(props.bil.poslng)];
    const Marker = (props) => <span style={{position: 'absolute', bottom: '0', right: '0', height: '30px', width: '20px', backgroundImage: 'url("/assets/img/icons/mapmarker.svg")', backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}></span>

    return (
        <div className='bil-info-container' onClick={(e => e.stopPropagation())} >
            <h2 className='bil-info-header'>{props.bil.year} {props.bil.make} {props.bil.model}</h2>
            <div className='img-container' style={{background: 'url("/assets/img/' + props.bil.id + '/' + props.bil.imglg + '")'}}></div>
            <span className='bil-info-poeng'>{props.bil.price}</span>
            <span className='bil-info-dogn'>bkp/døgn</span>
            <table>
                <tbody>
                    <tr>
                        <th>Spesifikasjoner</th>
                    </tr>
                    <tr>
                        <td>Biltype</td>
                        <td>{props.bil.category}</td>
                    </tr>
                    <tr>
                        <td>Stand</td>
                        <td>{props.bil.status}</td>
                    </tr>
                    <tr>
                        <td>Årsmodell</td>
                        <td>{props.bil.year}</td>
                    </tr>
                    <tr>
                        <td>Motor</td>
                        <td>{props.bil.motor}</td>
                    </tr>
                    <tr>
                        <td>Kmstand</td>
                        <td>{props.bil.km}</td>
                    </tr>
                    <tr>
                        <td>Hestekrefter</td>
                        <td>{props.bil.bhp}</td>
                    </tr>
                </tbody>
            </table>
            <div className='map-container'>
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
                <Marker lat={Number(props.bil.poslat)} lng={Number(props.bil.poslng)} text={props.bil.make + ' ' + props.bil.model}/>
            </GoogleMap>   </div>        
            <span onClick={()=> props.handleLukk(false)}>Lukk</span>
        </div>
    )
}