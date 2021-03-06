$(function () {
    var APPLICATION_ID = "0C522C4D-8A19-3723-FF46-E630D2591200",
        SECRET_KEY = "F482E78C-48CD-2FF4-FFBD-5323A21EFB00",
        VERSION = "v1";
        
        Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
         
        var postsCollection = Backendless.Persistence.of(Posts).find();
        
        console.log(postsCollection);
        
        var wrapper = {
            posts: postsCollection.data
        };
        
        Handlebars.registerHelper('format', function (time) {
            return moment(time).format("dddd, MMMM Do YYYY");
        });
        
        var blogScript = $("#blogs-template").html();
        var blogTemplate = Handlebars.compile(blogScript);
        var blogHTML = blogTemplate(wrapper);
        
        $('.main-container').html(blogHTML);
        
});

function Posts(args){
    args = args || {};
    this.title = args.title || "";
    this.content = args.content || "";
    this.authorEmail = args.authorEmail || "";
}
$(document).on('click', '.deleteA',function (event){
   Backendless.Persistence.of(Posts).remove(event.target.attributes.data.nodeValue);
   Materialize.toast('Task has been deleted', 2000);
   
   
});

$(document).on('click', '.check',function (event){
   
   Materialize.toast('Task is marked as complete', 2000)
});


