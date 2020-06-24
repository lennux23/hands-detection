const video = document.querySelector("#video");
/* const canvas = document.querySelector("#canvas"); */
const counter = document.querySelector("#number");
/* const context = canvas.getContext("2d"); */

const modelParams = {
  flipHorizontal: true, // flip e.g for video
  imageScaleFactor: 0.7, // reduce input image size for gains in speed.
  maxNumBoxes: 20, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.95, // confidence threshold for predictions.
};

let model;
let count = 0;
// Load the model.
handTrack.load(modelParams).then((lmodel) => {
  model = lmodel;
});

function runDetection() {
  model.detect(video).then((predictions) => {
    if (predictions.length > 0) {
      addCounter();
    }
    //model.renderPredictions(predictions, canvas, context, video);
    requestAnimationFrame(runDetection);
  });
}

handTrack.startVideo(video).then((status) => {
  if (status) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(
      (stream) => {
        video.srcObject = stream;
        runDetection();
        //setInterval(runDetection, 1000);
      },
      (err) => console.log(err)
    );
  }
});

function addCounter() {
  count++;
  counter.innerHTML = count;
}
