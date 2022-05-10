import { Box, Button, ButtonGroup, SkeletonText } from "@chakra-ui/react";
import "./GymForm.css";
import StrongestLinkApi from "../../api/StrongestLinkApi";
import {
  useJsApiLoader,
  GoogleMap,
  InfoWindow,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

import { NavLink, useNavigate } from "react-router-dom";

import { navData } from "../../components/Navbar/nav-data";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import GymForm from "./GymForm";

import { useState } from "react";

import MapStyles from "./MapStyles";

import GymImage from "./GymImage";

import "./GymForm.css";
import { ChakraProvider } from "@chakra-ui/react";

import "./Map.css";

const REACT_APP_GOOGLE_MAPS_API_KEY = "AIzaSyCNzw2Ysw63-Ms5CsqT1EpxRRTvFrHKiEw";

function Map(props) {
  const [lat, setLat] = useState(48.8584);
  const [lng, setLng] = useState(2.2945);
  const [status, setStatus] = useState(null);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [markers, setMarkers] = useState([]);
  const [gymmarkers, setGymarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedGym, setSelectedGym] = useState(null);
  const center = { lat: lat, lng: lng };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) {
    return <SkeletonText />;
  }

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          getMapMarkers();
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  const getMapMarkers = async () => {
    const markerData = await StrongestLinkApi.getPins();
    console.log(markerData);
    let gymMaterialMarker = [];
    markerData.map((data) =>
      gymMaterialMarker.push({
        id: data.id,
        lat: data.latitude,
        lng: data.longitude,
        time: new Date(),
        name: data.name,
        description: data.description,
        type: data.type,
      })
    );
    setGymarkers(gymMaterialMarker);
  };

  const icon = "./scg.svg";

  return (
    <ChakraProvider>
      <div style={{ width: "95%", height: "500px" }}>
        <Box position="absolute" left={0} top={40} h="80%" w="100%">
          {/* Google Map Box */}
          <GoogleMap
            onClick={(event) => {
              setMarkers([
                {
                  lat: event.latLng.lat(),
                  lng: event.latLng.lng(),
                  time: new Date(),
                },
              ]);
              setSelectedGym(null);
              setSelected(null);
            }}
            center={{ lat, lng }}
            zoom={15}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
              styles: MapStyles,
            }}
            onLoad={(map) => setMap(map)}
          >
            {/* ////////////////////// (Gym Pin Locations) ////////////////////////// */}
            {gymmarkers.map((marker) => (
              <Marker
                icon={{
                  url: icon,
                  scaledSize: new window.google.maps.Size(40, 40),
                  origin: new window.google.maps.Point(0, 0),
                }}
                key={marker.time.toISOString()}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => {
                  setSelectedGym(marker);
                  setSelected(null);
                  setMarkers([]);
                }}
              />
            ))}
            {selectedGym ? (
              <InfoWindow
                className="infoWindow"
                onCloseClick={() => setSelectedGym(null)}
                position={{ lat: selectedGym.lat, lng: selectedGym.lng }}
              >
                <div className="info-data">
                  <h1>{selectedGym.name.toUpperCase()}</h1>
                  <GymImage selectedGym={selectedGym} />
                  <p>{selectedGym.type}</p>
                  <div className="button-group">
                    <Button className="info-btn">
                      <NavLink
                        className="gymLink"
                        to={`location/${selectedGym.id}`}
                      >
                        Link to location page
                      </NavLink>
                    </Button>
                  </div>
                </div>
              </InfoWindow>
            ) : null}
            {/* ////////////////////// (Location of User ) ////////////////////////// */}
            {markers.map((marker) => (
              <Marker
                icon={{
                  // url: './scg.svg',
                  scaledSize: new window.google.maps.Size(40, 40),
                  origin: new window.google.maps.Point(0, 0),
                }}
                key={marker.time.toISOString()}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => {
                  setSelected(marker);
                }}
              />
            ))}
            {selected ? (
              <InfoWindow
                onCloseClick={() => {
                  setSelected(null);
                  setMarkers([]);
                }}
                position={{ lat: selected.lat, lng: selected.lng }}
              >
                <GymForm
                  refresh={getLocation}
                  removePin={setMarkers}
                  closeinfoWindow={setSelected}
                  lat={selected.lat}
                  lng={selected.lng}
                  username={props.user}
                />
              </InfoWindow>
            ) : null}
            <Marker
              icon={{
                scaledSize: new window.google.maps.Size(30, 30),
                origin: new window.google.maps.Point(0, 0),
              }}
              position={{ lat, lng }}
            />

            {/* ////////////////////// () ////////////////////////// */}
          </GoogleMap>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          p={0}
          borderRadius="lg"
          mt={4}
          zIndex="1"
        >
          <ButtonGroup
            display="flex"
            justifyContent="center"
            alignItems="center"
            flex="1"
            width="100%"
          >
            <Button className="btn-ivan" onClick={getLocation}>
              Click to find location
            </Button>
          </ButtonGroup>
        </Box>
      </div>
    </ChakraProvider>
  );
}

export default Map;
