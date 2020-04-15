// var vid = document.getElementById("myVideo");

// let preview = document.getElementById("preview");
// let recording = document.getElementById("recording");
// let startButton = document.getElementById("startButton");
// let stopButton = document.getElementById("stopButton");
// let downloadButton = document.getElementById("downloadButton");


// vid.onplaying = function () {
//     $("#playBtn").hide();
// };
// vid.onpause = function () {
//     $("#playBtn").show();
// };

// function wait(delayInMS) {
//     return new Promise((resolve) => setTimeout(resolve, delayInMS));
// }

// function startRecording(stream, lengthInMS) {
//     let recorder = new MediaRecorder(stream);
//     let data = [];

//     recorder.ondataavailable = (event) => data.push(event.data);
//     recorder.start();

//     let stopped = new Promise((resolve, reject) => {
//         recorder.onstop = resolve;
//         recorder.onerror = (event) => reject(event.name);
//     });

//     let recorded = wait(lengthInMS).then(
//         () => recorder.state == "recording" && recorder.stop()
//     );

//     return Promise.all([stopped, recorded]).then(() => data);
// }

// function stop(stream) {
//     stream.getTracks().forEach((track) => track.stop());
// }

// // stopButton.addEventListener("click", function () {
// //     stop(preview.srcObject);
// // }, false);

// function startRecord(name, scenario_number) {
//     console.log(name);
//     navigator.mediaDevices
//         .getUserMedia({
//             video: true,
//             audio: true,
//         })
//         .then((stream) => {
//             preview.srcObject = stream;
//             downloadButton.href = stream;
//             preview.captureStream =
//                 preview.captureStream || preview.mozCaptureStream;
//             vid.play();
//             return new Promise((resolve) => (preview.onplaying = resolve));
//         })
//         .then(() => startRecording(preview.captureStream(), recordingTimeMS))

//         .then((recordedChunks) => {
//             let recordedBlob = new Blob(recordedChunks, {
//                 type: "video/webm",
//             });
//             recording.src = URL.createObjectURL(recordedBlob);

//             downloadButton.href = recording.src;
//             downloadButton.download = name + "_" + scenario_number + ".webm";
//             downloadButton.click();
//         })
//         .catch((err) => console.log(err));
// }

// function play(name, scenario_number) {
//     console.log(name)
//     startRecord(name, scenario_number);
// }


function next(currentPage,nextPage) { 
    
    var emotion = $("input[name='emotion']:checked").val();
    var likert = $("input[name='likert']:checked").val();
  
    sessionStorage.setItem("scenario" + currentPage, "emotion: " + emotion + " , likert: " + likert);
    if(nextPage === 'finish') {

        finish();
        
    }else { 

        window.location = "./situation" + nextPage + ".html"
    }
}


function finish() { 
    console.log('is Finish');
    var get_scene_1 = "Scenario1 : " + sessionStorage.getItem("scenario1") + '\r\n';
    var get_scene_2 = "Scenario2 : " + sessionStorage.getItem("scenario2") + '\r\n';
    var get_scene_3 = "Scenario3 : " + sessionStorage.getItem("scenario3") + '\r\n';
    var get_scene_4 = "Scenario4 : " + sessionStorage.getItem("scenario4") + '\r\n';
    var get_scene_5 = "Scenario5 : " + sessionStorage.getItem("scenario5") + '\r\n';
    var get_scene_6 = "Scenario6 : " + sessionStorage.getItem("scenario6") + '\r\n';
    var get_scene_7 = "Scenario7 : " + sessionStorage.getItem("scenario7") + '\r\n';
    var get_scene_8 = "Scenario8 : " + sessionStorage.getItem("scenario8") + '\r\n';
    var get_scene_9 = "Scenario9 : " + sessionStorage.getItem("scenario9") + '\r\n';
    var get_scene_10 = "Scenario10 : " + sessionStorage.getItem("scenario10");
    var content = sessionStorage.getItem("content");


    var atag = document.createElement("a");
    var file = new Blob([
            content,
            get_scene_1,
            get_scene_2,
            get_scene_3,
            get_scene_4,
            get_scene_5,
            get_scene_6,
            get_scene_7,
            get_scene_8,
            get_scene_9,
            get_scene_10
        ], {
        type: 'text/plain'
    });
    atag.href = URL.createObjectURL(file);
    atag.download = name;
    atag.click();
}   
