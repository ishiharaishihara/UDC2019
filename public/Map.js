import { getData } from "./Data.js";
import { getCurrentLocation } from "./Location.js";

const setPin = map => data => {
  console.log(data);
  const { lat, lon, text } = data;
  const coordinate = { lat: lat, lon: lon };
  console.log(coordinate);
  L.marker(coordinate, { title: text }).addTo(map);
  L.circle(coordinate, {
    radius: 200,
    color: "#FF5555",
    fill: true,
    weight: 3
  }).addTo(map);
};

const map = (async () => {
  const map = L.map("mapcontainer", { zoomControl: false });
  const data = await getData();

  const currentLocation = await getCurrentLocation();
  console.log(currentLocation);
  map.setView(currentLocation, 25);

  L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png", {
    attribution:
      "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
  }).addTo(map);
  data.forEach(d => {
    setPin(map)(d);
  });

  return map;
})();

export { map, setPin };
