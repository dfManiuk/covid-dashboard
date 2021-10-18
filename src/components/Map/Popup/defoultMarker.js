import { Icon } from "leaflet";
import image from '../../../assets/img/virus_corona.svg';

export const defaultMarker = new Icon({
  iconUrl: image,
  iconSize: [25, 41],
  iconAnchor: [10, 31],
});
