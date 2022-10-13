import {MapContainer, TileLayer, Marker, Polyline} from 'react-leaflet';
import {useState} from 'react';
import classNames from 'classnames/bind';
import GoogleMapReact from 'google-map-react';

import images from '~/assets';
import style from './style.module.scss';
import {LatLngExpression, PathOptions} from 'leaflet';

type CustomStyle = {
  mapContainer?: string;
};

type GoogleMapProps = {
  mode?: string;
  style?: React.CSSProperties;
  customStyle?: CustomStyle;
  markers?: LatLngExpression[];
  lines?: LatLngExpression[][];
};

const cx = classNames.bind(style);
const limeOptions: PathOptions = {color: 'rgb(0, 51, 255)', opacity: 0.6, weight: 8};

const Markers = (props: any) => {
  return <div className={cx('marker')} style={{backgroundImage: `url(${images.circleMarkerEnd})`}}></div>;
};

const GoogleMap: React.FC<GoogleMapProps> = props => {
  const mode = useState(props.mode && ['leaflet', 'google'].includes(props.mode) ? props.mode : 'leaflet')[0];

  const map = {
    google: (
      <div className={cx('map')}>
        <GoogleMapReact
          options={{
            controlSize: 20,
            scaleControl: true
          }}
          bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_SECRET as string}}
          defaultCenter={{
            lat: 10.762622,
            lng: 106.660172
          }}
          defaultZoom={17}>
          <Markers lat={10.762622} lng={106.660172} />
        </GoogleMapReact>
      </div>
    ),
    leaflet: (
      <MapContainer
        className={cx('map')}
        center={props.markers && props.markers.length ? props.markers[0] : [10.762622, 106.660172]}
        zoom={8}
        scrollWheelZoom={true}
        zoomControl={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {!props.markers && <Marker position={[10.762622, 106.660172]} />}
        {props.markers && props.markers.map((marker, i) => <Marker key={i} position={marker} />)}
        {props.lines && props.lines.map((line, i) => <Polyline key={i} pathOptions={limeOptions} positions={line} />)}
      </MapContainer>
    )
  }[mode];
  return (
    <div className={cx('map-container') + ' ' + props.customStyle?.mapContainer} style={props.style}>
      {map}
    </div>
  );
};

export default GoogleMap;
