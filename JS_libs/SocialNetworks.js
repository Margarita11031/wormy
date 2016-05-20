/**
 * Created by Margarita on 20.05.2016.
 */

var FB = null;

window.fbAsyncInit = function() {
    FB.init({
        appId      : '1050546111697623',
        xfbml      : true,
        version    : 'v2.6'
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function ShareOnFacebook_void(){
    FB.ui({
        method: 'share',
        href: 'https://www.youtube.com/watch?v=TR3Vdo5etCQ&index=10&list=RDZwAd_ag9Q0E'
    }, function(response){
        // Debug response (optional)
        console.log(response);
    });
}