const video = document.getElementById("inputVideo");
var emoji_sad = document.getElementById("sad");
var emoji_angry = document.getElementById("angry");
var emoji_natural = document.getElementById("natural");
try {
    window.AppInventor.setWebViewString("js load5");
} catch (err) {
    console.log(err);
}
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("./js/models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("./js/models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("./js/models"),
    faceapi.nets.faceExpressionNet.loadFromUri("./js/models"),
]).then(run);

var timer = 1000;
var count = 0;
let emotionString = '';
// Sad and Angry
let detectExpressions = async (result) => {
    // detect expression

    if (typeof result !== "undefined") {
        let sad = 0,
            anger = 0;  
            surpised = 0;
            disgusted = 0;
            fearful = 0;
            happy = 0;

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
            // count += 1;
            // onExpression("sad");
            // if (count === 3) {
            //     alert("you really sad");
            //     window.AppInventor.setWebViewString("sad");
            // }
            emotionString += "Sad, ";
        } else if (anger > 0.7) {
            // count += 1;
            // onExpression("angry");
            // if (count === 3) {
            //     alert("you really angry");
            //     window.AppInventor.setWebViewString("angry");
            // }
            emotionString += "Anger, ";
        } else if(surpised > 0.7) { 
            emotionString += "Surpised, ";
        } else if(disgusted > 0.7) { 
            emotionString += "Disgusted, ";
        } else if(fearful > 0.7) { 
            emotionString += "Fear, ";
        } else if(happy > 0.7) { 
            emotionString += "Happy, ";
        }else {
            emotionString += "Unknow, ";
            // count = 0;
            // onExpression("natural");
        }
    }
};

// function onExpression(emotion) {
//     if (emotion === "sad") {
//         emoji_sad.style.display = "block";
//         emoji_angry.style.display = "none";
//         emoji_natural.style.display = "none";
//     } else if (emotion === "angry") {
//         emoji_sad.style.display = "none";
//         emoji_angry.style.display = "block";
//         emoji_natural.style.display = "none";
//     } else {
//         emoji_sad.style.display = "none";
//         emoji_angry.style.display = "none";
//         emoji_natural.style.display = "block";
//     }
// }

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
        const resizedResult = faceapi.resizeResults(result,displaySize);
        const minConfidence = 0.05
        faceapi.draw.drawDetections(canvas, resizedResult)
        faceapi.draw.drawFaceExpressions(canvas, resizedResult, minConfidence)
    }
    setTimeout(() => onPlay(), 1000);
}

async function run() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
    const videoEl = $("#inputVideo").get(0);
    videoEl.srcObject = stream;
}
