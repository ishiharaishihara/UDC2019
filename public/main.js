import getCurrentLocation from "./Location.js";
import { postData, getData } from "./Data.js";
import appInit from "./appInit.js";

const nichibi = [35.383915, 136.608293];
const circles = [];
const pins = [];

const setLayer2Group = map => (group, layers) => {
  layers.forEach(function(layer) {
    group.addLayer(layer).addTo(map);
  });
};
//ピンを立てる処理
const setPin = map => (coordinate, title) => {
  circles.push(
    L.circle(coordinate, {
      radius: 200,
      color: "#FF5555",
      fill: true,
      weight: 3
    }).addTo(map)
  );
  pins.push(L.marker(coordinate, { title: title }).addTo(map));
  const circleGroup = L.layerGroup();
  const pinGroup = L.layerGroup();
  setLayer2Group(map)(circleGroup, circles);
  setLayer2Group(map)(pinGroup, pins);
};

const map = (async () => {
  const map = L.map("mapcontainer", { zoomControl: false });
  const currentLocation = await getCurrentLocation();
  console.log(currentLocation);
  map.setView(currentLocation, 25);

  L.tileLayer("https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png", {
    attribution:
      "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
  }).addTo(map);

  setPin(map)(nichibi, "NICHIGI");
  const data = await getData();
  data.forEach(doc => {
    const { lat, lon } = doc.data();
    setPin(map)({ lat: lat, lon: lon }, "");
  });
  return map;
})();

const handleOnClickSendButton = async () => {
  const comment = document.getElementById("comment");
  const currentLocation = await getCurrentLocation();
  const data = Object.assign(currentLocation, comment.value);
  postData(data).then(() => {
    comment.value = "";
    setPin(currentLocation);
    alert("送信されました");
  });
};

document.addEventListener("DOMContentLoaded", () => {
  appInit();
  const sendButton = document.getElementById("send__button");
  sendButton.addEventListener("click", handleOnClickSendButton);
});
