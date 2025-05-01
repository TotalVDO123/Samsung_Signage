var timeout = null;
function makeSliderPlaylist(arg) {
  var final = {};
  final['time'] = arg[0].duration;
  final['mediaList'] = []; 

  for (var r = 0; r < arg.length; r++) {
    if (arg[r].isIncluded) {
      final.mediaList.push({
        url: encodeURI(arg[r].mediaId),
        type: arg[r].contentType,r:r
      });
    }
  }
  console.log("final",final);
  return final;
  
}
function startSlider(arg) {
  const displayArea = document.getElementById("image-slider");
  displayArea.style.display = "block";
  let idx = 0;

  function showMedia(item) {
    const previous = displayArea.firstChild;

    if (item.type === "IMAGE") {
      const img = document.createElement("img");
      img.src = item.url;
      styleMedia(img, item);
      // Replace immediately
      displayArea.innerHTML = "";
      displayArea.appendChild(img);

    } else if (item.type === "VIDEO") {
      const video = document.createElement("video");
      video.src = item.url;
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      styleMedia(video, item);

      // Wait until video is loaded before replacing
      video.addEventListener("loadeddata", () => {
        displayArea.innerHTML = "";
        displayArea.appendChild(video);
      });
    }
  }

  function styleMedia(el, item) {
    el.style.position = "absolute";
    el.style.zIndex = 10 + (item.r || 0);
    el.style.width = "100%";
    el.style.height = "100%";
    el.style.objectFit = "cover";
    el.style.backgroundColor = "#000"; // optional: helps mask background
  }

  // Show last media first
  showMedia(arg.mediaList[arg.mediaList.length - 1]);

  // Start interval loop
  setInterval(() => {
    showMedia(arg.mediaList[idx]);
    idx = (idx + 1) % arg.mediaList.length;
  }, arg.time * 1000);
}

function showsingleImage(arg) {
  hideOterDetails();
  document.getElementById("image-slider").style.display = "block";
  document.getElementById("slider-image").src = arg;
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
    document.getElementById("internet-status").style.display='none';
  } else {
    document.getElementById("internet-status").style.display='block';
  }
}

 var profile = localStorage.getItem("profile");
console.log(profile);