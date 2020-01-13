const getCurrentLocation = async () => {
  // Geolocation APIに対応している
  if (!navigator.geolocation) {
    throw Error("この端末では位置情報が取得できません");
  }

  // 現在地を取得
  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };
  const position = await getCurrentPosition().catch(error => {
    /// 取得失敗した場合
    switch (error.code) {
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
        alert("その他のエラー(エラーコード:" + error.code + ")");
        break;
    }
  });
  return {
    lat: position.coords.latitude,
    lon: position.coords.longitude
  };
};

export { getCurrentLocation };
