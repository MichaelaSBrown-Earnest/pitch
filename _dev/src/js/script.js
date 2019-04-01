
console.log("test");


$(document).on('keydown', function (event) {
    if (event.which == 37) {
        // $('#prevPage').trigger('click');
        window.location = $('#prevPage').attr('href');
    } else if (event.which == 39) {
        // $('#nextPage').trigger('click');
        window.location = $('#nextPage').attr('href');
    }
});


// $('#prevPage').on('click', function () { alert('PREV!'); return false; });
// $('#nextPage').on('click', function () { alert('NEXT!'); return false; });




// $(document).ready(function(){
//    $(".grid img").animate({top: '250px'});
// });








