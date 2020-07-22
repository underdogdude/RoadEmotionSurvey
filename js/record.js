function next(currentPage,nextPage) { 
    
    // var emotion = $("input[name='emotion']:checked").val();
    // var likert = $("input[name='likert']:checked").val();
  
    // sessionStorage.setItem("scenario" + currentPage, "emotion: " + emotion + " , likert: " + likert);

    window.location = "./situation" + nextPage + ".html"
    // if(nextPage === 'finish') {

    //     finish();
        
    // }else { 

    //     window.location = "./situation" + nextPage + ".html"
    // }
}


// function finish() { 
//     console.log('is Finish');
//     var get_scene_1 = "Scenario1 : " + sessionStorage.getItem("scenario1") + '\r\n';
//     var get_scene_2 = "Scenario2 : " + sessionStorage.getItem("scenario2") + '\r\n';
//     var get_scene_3 = "Scenario3 : " + sessionStorage.getItem("scenario3") + '\r\n';
//     var get_scene_4 = "Scenario4 : " + sessionStorage.getItem("scenario4") + '\r\n';
//     var get_scene_5 = "Scenario5 : " + sessionStorage.getItem("scenario5") + '\r\n';
//     var get_scene_6 = "Scenario6 : " + sessionStorage.getItem("scenario6") + '\r\n';
//     var get_scene_7 = "Scenario7 : " + sessionStorage.getItem("scenario7") + '\r\n';
//     var get_scene_8 = "Scenario8 : " + sessionStorage.getItem("scenario8") + '\r\n';
//     var get_scene_9 = "Scenario9 : " + sessionStorage.getItem("scenario9") + '\r\n';
//     var get_scene_10 = "Scenario10 : " + sessionStorage.getItem("scenario10");
//     var content = sessionStorage.getItem("content");


//     var atag = document.createElement("a");
//     var file = new Blob([
//             content,
//             get_scene_1,
//             get_scene_2,
//             get_scene_3,
//             get_scene_4,
//             get_scene_5,
//             get_scene_6,
//             get_scene_7,
//             get_scene_8,
//             get_scene_9,
//             get_scene_10
//         ], {
//         type: 'text/plain'
//     });
//     atag.href = URL.createObjectURL(file);
//     atag.download = name;
//     atag.click();
// }   
