const mapInit = () => {
	const map = L.map('mapcontainer',{zoomControl:false});
	L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
		attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
	}).addTo(map);
	return map;
}
const nichibi = [35.383915,136.608293];
const mpoint = {
	lat:0,
	lon:0
  };
const testCollection = {
		text: '',
		lat: 0,
		lon: 0
};
const map = mapInit(mpoint);
const circles = [];
const pins = [];
// Geolocation APIに対応している
if (navigator.geolocation) 
{
	console.log("この端末では位置情報が取得できます");
  // Geolocation APIに対応していない
  } else {
	console.log("この端末では位置情報が取得できません");
  }

	// 現在地を取得
	navigator.geolocation.getCurrentPosition
	(
	  // 取得成功した場合
	  function(position) 
	  {
		mpoint.lat = position.coords.latitude;
		mpoint.lon = position.coords.longitude;
		map.setView(mpoint, 25);

		// alert("緯度:"+position.coords.latitude+",経度"+position.coords.longitude);
		
		setPin(nichibi,'NICHIGI');
	  },
	  // 取得失敗した場合
	  function(error) 
	  {
		switch(error.code) 
		{
		  case 1: //PERMISSION_DENIED
			alert("位置情報の利用が許可されていません");
			break;
		  case 2: //POSITION_UNAVAILABLE
			alert("現在位置が取得できませんでした");
			break;
		  case 3: //TIMEOUT
			alert("タイムアウトになりました");
			break;
		  default:
			alert("その他のエラー(エラーコード:"+error.code+")");
			break;
		}
	  }
	);
const mapRender	= ()=>{

}	


//ピンを立てる処理
const setPin = (coordinate,title)=>{
	circles.push(L.circle(coordinate,{ radius: 200, color: "#FF5555", fill: true, weight: 3 }).addTo(map));
	pins.push(L.marker(coordinate,{title:title}).addTo(map));
	const circleGroup = L.layerGroup();
	const pinGroup = L.layerGroup();
	setLayer2Group(circleGroup,circles);
	setLayer2Group(pinGroup,pins);	
}

const setLayer2Group = (group,layers)=>{
	layers.forEach(function(layer){
		group.addLayer(layer).addTo(map);
	});
}
	