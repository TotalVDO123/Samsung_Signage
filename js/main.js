var timeout = null;
function makeSliderPlaylist(arg) {
  var final = {};
  final['time'] = arg[0].duration;
  final['imageList'] = [];
  for (var r = 0; r < arg.length; r++) {
    if (arg[r].isIncluded) {
      var tmp = arg[r].mediaId;
      tmp = encodeURI(tmp);
      final['imageList'].push(tmp);
    }
  }
  return final;
}

function startSlider(arg) {
  document.getElementById("image-slider").style.display = "block";
  var index = 0;
  document.getElementById("slider-image").src = arg.imageList[arg.imageList.length - 1];
  timeout = setInterval(() => {
    document.getElementById("slider-image").src = arg.imageList[index];
    index = (index + 1);
    if (index == arg.imageList.length) index = 0;
  }, arg.time * 1000);
}

function stopSlider() {
  if (timeout) {
    clearInterval(timeout);
    timeout = null;
  }
}

function updateNetworkStatus() {
  const isOnline = navigator.onLine;
  if (isOnline) {
    document.getElementById("internet-status").textContent = "ONLINE";
  } else {
    document.getElementById("internet-status").textContent = "OFFLINE";
  }
}
