$(document).ready(function() {
    $("#patients-tab-button").click(function() {
            $('#practitioners-tab').hide();
            $('#practitioners-tab-button').removeClass('active-tab');
            $('#patients-tab-button').removeClass('inactive-tab');

            $('#patients-tab-button').addClass('active-tab');
            $('#practitioners-tab-button').addClass('inactive-tab');

            $('#patients-tab').show();

        }
    );

    $("#practitioners-tab-button").click(function() {
            $('#patients-tab').hide();
            $('#patients-tab-button').removeClass('active-tab');
            $('#patients-tab-button').addClass('inactive-tab');

            $('#practitioners-tab').show();
            $('#practitioners-tab-button').removeClass('inactive-tab');
            $('#practitioners-tab-button').addClass('active-tab');
        }
    );

//    $('#try-limited .button-blue, #try-it-free-features-row .button-blue, #try-it-free-row .button-blue').click(function() {
//        analytics.track('Login');
//        setTimeout(function(){window.location.href = '/signup';},100);
//    });


    $('#play-sample-button').click(function(){
        $("#videoModal").modal();
        document.getElementById('theVideo').play();
    })

    $('#play-sample-button1').click(function(){
        $("#videoModal").modal();
        document.getElementById('theVideo').play();
    })

    $('#close-video-modal').click(function(){
        $("#videoModal").modal('hide');
        document.getElementById('theVideo').pause();
        document.getElementById('theVideo').currentTime = 0;
    })

    $('#image-140-exercise-videos').click(function(){
        $("#exerciseVideoModal").modal();
        document.getElementById('exerciseVideo').play();
    })

    $('#exercise-close-video-modal').click(function(){
        $("#exerciseVideoModal").modal('hide');
        document.getElementById('exerciseVideo').pause();
        document.getElementById('exerciseVideo').currentTime = 0;
    })

});