// "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
import React from "react";
import { compose, lifecycle, withProps } from "recompose";
import { withScriptjs } from "react-google-maps";
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";
import Config from "../../../../app/config";

const PlacesWithStandaloneSearchBox = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${Config.googleMapToken}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `200%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs: any = {};

      this.setState({
        places: [],
        onSearchBoxMounted: (ref: any) => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();

          this.setState({
            places,
          });
        },
      });
    },
  }),
  withScriptjs
)((props: any) => {
  const { onSearchBoxMounted, bounds, onPlacesChanged } = props;
  return (
    <div data-standalone-searchbox="">
      <StandaloneSearchBox
        ref={onSearchBoxMounted}
        bounds={bounds}
        onPlacesChanged={onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Search Google Maps"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
          }}
        />
      </StandaloneSearchBox>
    </div>
  );
});

export default PlacesWithStandaloneSearchBox;
