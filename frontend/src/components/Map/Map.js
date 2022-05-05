import {
  Box,
  Button,
  ButtonGroup,
  SkeletonText
} from '@chakra-ui/react';

import './GymForm.css';
import StrongestLinkApi from '../../api/StrongestLinkApi'
import {
  useJsApiLoader,
  GoogleMap,
  InfoWindow,
  Marker,
  Autocomplete,
} from '@react-google-maps/api';

import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

import GymForm from './GymForm';

import { useRef, useState } from 'react';

import MapStyles from './MapStyles';

const REACT_APP_GOOGLE_MAPS_API_KEY = "AIzaSyCNzw2Ysw63-Ms5CsqT1EpxRRTvFrHKiEw";

function Map() {

  const [lat, setLat] = useState(48.8584);
  const [lng, setLng] = useState(2.2945);
  const [status, setStatus] = useState(null);
  const [map, setMap] = useState(/** @type google.maps.Map */(null));
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const center = { lat: lat, lng: lng };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  });



  
  if (!isLoaded) {
    return <SkeletonText />
  }

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      }, () => {
        setStatus('Unable to retrieve your location');
      });
    }
  };

  const getMapMarkers = async () => {
    const markerData = await StrongestLinkApi.getPins()
    console.log(markerData)
  }


  return (
    <div style={{ height: '100vh' }} >
      <Box position='absolute' left={0} top={40} h='80%' w='100%'>
        {/* Google Map Box */}
        <GoogleMap
          onClick={(event) => {
            setMarkers(curent => [...curent, {
              lat: event.latLng.lat(), lng: event.latLng.lng(), time: new Date(), 
            }]);
          }}
          center={{ lat, lng }}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            styles: MapStyles
          }}
          onLoad={map => setMap(map)}>
          {markers.map(marker => <Marker
            icon={{
              url: './scg.svg',
              scaledSize: new window.google.maps.Size(40, 40),
              origin: new window.google.maps.Point(0, 0)
            }}
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => { setSelected(marker); }}
          />)}
          {selected ?
            <InfoWindow style={{ backgroundColor: 'red' }} onCloseClick={() => setSelected(null)} position={{ lat: selected.lat, lng: selected.lng }}><GymForm lat={selected.lat} lng={selected.lng} /></InfoWindow> : null}
          <Marker
            icon={{
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0)
            }} position={{ lat, lng }} />
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius='lg'
        m={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'>
        <ButtonGroup>
          <Button onClick={getLocation}>Click to find location</Button>
          <Button onClick={() => getMapMarkers()}>Click for data</Button>
        </ButtonGroup>
      </Box>
    </div>
  );
}

export default Map;
