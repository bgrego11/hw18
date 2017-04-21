$(document).on("click", ".add", function(e){
    e.preventDefault();
    var user = $('#user').val();
    var comment = $('#comment').val();
    var id = $(this).data('id') ;
    var newCom = {
        _id: id,
        user: user,
        comment: comment
    };
    $.post("/", newCom).then(function(){
        console.log(newCom)
    })
});