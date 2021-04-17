import React from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import './Map.css';
import { mapDataCountries, showDataOnMap } from './util';

function Map({casesType, countries,center, zoom}) {

    function ChangeView({ center, zoom }) {
        const map = useMap();
        map.setView(center, zoom);
        return null;
      }
    return (
        <div className="map">
            <MapContainer className="map-container" casesType={casesType} center={center} zoom={zoom} scrollWheelZoom={false}>
            <ChangeView center={center} zoom={zoom} />
                <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
                {console.log(casesType)}
                {showDataOnMap(countries, casesType)};
            </MapContainer>
        </div>
    )
}

export default Map;