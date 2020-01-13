import { getCurrentLocation } from "./Location.js";
import { postData, getData } from "./Data.js";
import { map, setPin } from "./Map.js";
import appInit from "./appInit.js";

const nichibi = [35.383915, 136.608293];
const circles = [];
const pins = [];

const handleOnClickSendButton = async () => {
  const comment = document.getElementById("comment");
  const currentLocation = await getCurrentLocation();
  const data = Object.assign(currentLocation, comment.value);
  postData(data).then(() => {
    comment.value = "";
    setPin(map)(data);
    alert("送信されました");
  });
};

document.addEventListener("DOMContentLoaded", () => {
  appInit();
  const sendButton = document.getElementById("send__button");
  sendButton.addEventListener("click", handleOnClickSendButton);
});
