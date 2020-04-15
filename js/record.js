// onload
var vid = document.getElementById("myVideo");
var vid_duration = vid.duration * 1000; //tranfrom it to millisec
let preview = document.getElementById("preview");
let recording = document.getElementById("recording");
let startButton = document.getElementById("startButton");
let stopButton = document.getElementById("stopButton");
let downloadButton = document.getElementById("downloadButton");
let recordingTimeMS = vid_duration;


vid.onplaying = function() {
    $("#playBtn").hide();
};
vid.onpause = function() { 
    $("#playBtn").show();
}

function wait(delayInMS) {
    return new Promise((resolve) => setTimeout(resolve, delayInMS));
}

function startRecording(stream, lengthInMS) {
    let recorder = new MediaRecorder(stream);
    let data = [];

    recorder.ondataavailable = (event) => data.push(event.data);
    recorder.start();

    let stopped = new Promise((resolve, reject) => {
        recorder.onstop = resolve;
        recorder.onerror = (event) => reject(event.name);
    });

    let recorded = wait(lengthInMS).then(
        () => recorder.state == "recording" && recorder.stop()
    );

    return Promise.all([stopped, recorded]).then(() => data);
}

function stop(stream) {
    stream.getTracks().forEach((track) => track.stop());
}

// stopButton.addEventListener("click", function () {
//     stop(preview.srcObject);
// }, false);

function startRecord(scenario_number) {
    navigator.mediaDevices
        .getUserMedia({
            video: true,
            audio: true,
        })
        .then((stream) => {
            preview.srcObject = stream;
            downloadButton.href = stream;
            preview.captureStream =
                preview.captureStream || preview.mozCaptureStream;
            vid.play();
            return new Promise((resolve) => (preview.onplaying = resolve));
        })
        .then(() => startRecording(preview.captureStream(), recordingTimeMS))

        .then((recordedChunks) => {
            let recordedBlob = new Blob(recordedChunks, {
                type: "video/webm",
            });
            recording.src = URL.createObjectURL(recordedBlob);

            downloadButton.href = recording.src;
            downloadButton.download = "Bright_" + scenario_number + ".webm";
            downloadButton.click();
        })
        .catch((err) => console.log(err));
}

function play(scenario_number) {
    startRecord(scenario_number);
}


