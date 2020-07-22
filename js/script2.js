 // START Face API
 const video = document.getElementById("inputVideo");
 Promise.all([
     faceapi.nets.tinyFaceDetector.loadFromUri("./js/models"),
     faceapi.nets.faceLandmark68Net.loadFromUri("./js/models"),
     faceapi.nets.faceRecognitionNet.loadFromUri("./js/models"),
     faceapi.nets.faceExpressionNet.loadFromUri("./js/models"),
 ]).then(run);

 let emotionString = '';
 let detectExpressions = async (result) => {
     if (typeof result !== "undefined") {
         console.log(result,' REsu');
         let sad = 0,
         anger = 0;
         surpised = 0;
         disgusted = 0;
         fearful = 0;
         happy = 0;

         if (result.expressions.hasOwnProperty("neutral")) {
            neutral = result.expressions.neutral;
         }
         if (result.expressions.hasOwnProperty("sad")) {
             sad = result.expressions.sad;
         }
         if (result.expressions.hasOwnProperty("angry")) {
             anger = result.expressions.angry;
         }
         if (result.expressions.hasOwnProperty("surpised")) {
             surpised = result.expressions.surpised;
         }
         if (result.expressions.hasOwnProperty("disgusted")) {
             disgusted = result.expressions.disgusted;
         }
         if (result.expressions.hasOwnProperty("fearful")) {
             fearful = result.expressions.fearful;
         }
         if (result.expressions.hasOwnProperty("happy")) {
             happy = result.expressions.happy;
         }
         
         if (sad > 0.7) {
             emotionString += "Sad, ";
         } else if (anger > 0.7) {
             emotionString += "Anger, ";
         } else if (surpised > 0.7) {
             emotionString += "Surpised, ";
         } else if (disgusted > 0.7) {
             emotionString += "Disgusted, ";
         } else if (fearful > 0.7) {
             emotionString += "Fear, ";
         } else if (happy > 0.7) {
             emotionString += "Happy, ";
         } else if (neutral > 0.7) {
             emotionString += "Neutral, ";
         } else {
            //  emotionString += "Unknow, ";
         }
     }
 };
 async function onPlay() {

     const videoEl = $("#inputVideo").get(0);
     let displaySize = {
         width: $('#inputVideo').width(),
         height: $('#inputVideo').height()
     };

     if (videoEl.paused || videoEl.ended) return setTimeout(() => onPlay());

     let result = await faceapi
         .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
         .withFaceLandmarks()
         .withFaceExpressions();

     detectExpressions(result);
     if (result) {
         const canvas = $('#overlay').get(0)
         const dims = faceapi.matchDimensions(canvas, videoEl, true)
         const resizedResult = faceapi.resizeResults(result, displaySize);
         const minConfidence = 0.05
         faceapi.draw.drawDetections(canvas, resizedResult)
         faceapi.draw.drawFaceExpressions(canvas, resizedResult, minConfidence)
     }
     setTimeout(() => onPlay(), 1000);
 }

 async function run() {
     const stream = await navigator.mediaDevices.getUserMedia({
         video: {}
     });
     const videoEl = $("#inputVideo").get(0);
     videoEl.srcObject = stream;
 }

 // END Face API

