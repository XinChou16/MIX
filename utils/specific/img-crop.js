var screen = {
  width: 750,
  height: 1334
};
// 0.56
screen.ratio = screen.width / screen.height;

var img1 = {
  // 0.62
  width: 750, //828
  height: 1208//1334
};
var img2 = {
  width: 100, // 750
  height: 1000,// 7500
};
var img3 = {
  width: 500, // 750
  height: 1000,// 1500
};
var img4 = {
  width: 500, // 750
  height: 1500,// 2250
};
var img5 = {
  width: 900, // 1200
  height: 1000,// 1334
};
var img6 = {
  width: 900, // 800
  height: 1500,// 1334
};

//
var img7 = {
  width: 1000, // 2668
  height: 500,// 1334
};

function getCalcedImgSize(img, screen) {
  var imgWidth = img.width;
  var imgHeight = img.height;
  var imgRatio = imgWidth / imgHeight;
  var screenWidth = screen.width;
  var screenHeight = screen.height;
  var screenRatio = screenWidth / screenHeight;
  var scaleW = function() {
      imgHeight = screenHeight;
      imgWidth = imgHeight * imgRatio;
  };

  imgRatio
  // 宽 < 高
  if (imgRatio < 1) {
      if (imgRatio > screenRatio) {
          // 宽拉伸
          imgHeight = screenHeight;
          imgWidth = imgHeight * imgRatio;
      } else {
          // 高拉伸
          imgWidth = screenWidth;
          imgHeight = imgWidth / imgRatio;
      }
  } else { // 宽 > 高
      if (imgRatio > screenRatio) {
          imgHeight = screenHeight;
          imgWidth = imgHeight * imgRatio;
      }

  }

  return { imgWidth, imgHeight };
}

var a = getCalcedImgSize(img7, screen);
a
