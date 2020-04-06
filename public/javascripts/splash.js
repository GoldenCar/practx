/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


$(function(){
    //Auto playing the video on modal open
    
    var video = document.getElementById("theVideo");
    
    $('#splashVideo').on('shown', function () {
        video.currentTime = 0;
        video.play();
    });
    
    //Auto stopping the video on modal close
    $('#splashVideo').on('hidden', function () {
        
       video.currentTime = 0;
       video.pause()
    });
});