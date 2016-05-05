$(function () {
    var APPLICATION_ID = "0C522C4D-8A19-3723-FF46-E630D2591200",
        SECRET_KEY = "F482E78C-48CD-2FF4-FFBD-5323A21EFB00",
        VERSION = "v1";
 
       Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
   if (Backendless.UserService.isValidLogin()){
       userLoggedIn(Backendless.LocalCache.get("current-user-id"));
   } else {
       var loginScript = $("#login-template").html();
       var loginTemplate = Handlebars.compile(loginScript);
       $('.main-container').html(loginTemplate);
   }


   $(document).on('submit', '.form-signin', function (event) {
       event.preventDefault();

       var data = $(this).serializeArray(),
               email = data[0].value,
               password = data[1].value;

       Backendless.UserService.login(email, password, true, new Backendless.Async(userLoggedIn, gotError));
   });

   $(document).on('click', '.add-blog', function () {
       var addBlogScript = $("#add-blog-template").html();
       var addBlogTemplate = Handlebars.compile(addBlogScript);

       $('.main-container').html(addBlogTemplate);
      tinymce.init({selector: 'textarea'})
   });
   $(document).on('submit', '.form-add-blog', function (event) {
       event.preventDefault();
      
       var data = $(this).serializeArray(),
               title = data[0].value

       if (title === "") {
           Materialize.toast('Empty title or statement', 4000);
       }
       else {
           var dataStore = Backendless.Persistence.of(Posts);

           var postObject = new Posts({
               title: title,
               authorEmail: Backendless.UserService.getCurrentUser().email

           });

           dataStore.save(postObject);

           this.title.value = "";
       }
   });

});



$(document).on('click', '.logout', function () {
   Backendless.UserService.logout(new Backendless.Async(userLoggedOut, gotError));

   var loginScript = $("#login-template").html();
   var loginTemplate = Handlebars.compile(loginScript);
   $('.main-container').html(loginTemplate);
});


function Posts(args) {
   args = args || {};
   this.title = args.title || "";
   this.authorEmail = args.authorEmail || "";
}

function userLoggedIn(user) {
   console.log("user successfully logged in");
   var userData;
   if (typeof user == "string") {
       userData = Backendless.Data.of(Backendless.User).findById(user);
   } else {
       userData = user;
   }
   var welcomeScript = $('#welcome-template').html();
   var welcomeTemplate = Handlebars.compile(welcomeScript);
   var welcomeHTML = welcomeTemplate(userData);

   $('.main-container').html(welcomeHTML);
}
function userLoggedOut() {
   console.log("successfully logged out");
}
function userLoggedOut(){
   console.log("succesfully logged out");
}

function gotError(error){
   Materialize.toast('Wrong Username or Password', 4000) // 4000 is the duration of the toast
   console.log("Error message - " + error.message);
   console.log("Error code - " + error.code);
}