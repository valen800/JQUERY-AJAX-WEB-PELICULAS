const APY_KEY = "9b471e22ab9c236796ca4f569bca82be"
const BASE_URL_POPULAR = " https://api.themoviedb.org/3/movie/popular?api_key="
const LANGUAGE = "&language=es-ES"
const BASE_URL_IMG = "https://image.tmdb.org/t/p/original/"

$(document).ready(function () {
    createCarouselItems();
    $("p").greenify();
})

$.fn.greenify = function() {
    this.css( "color", "green" );
};

const createCarouselItems = () => {
    var url = BASE_URL_POPULAR + APY_KEY + LANGUAGE + "&page=1";
    $.getJSON(url, function (data) {
        console.log(data.results[0]);
        data.results.forEach(element => {
            var title = element.original_title;
            var overview = element.overview;
            var urlImg = BASE_URL_IMG + element.backdrop_path

            /* Only first item active */
            if (element == data.results[0]) {
                //create a corousel item
                var div = $('<div class="carousel-item active">')
            } else {
                var div = $('<div class="carousel-item">')
            }

            // create image
            var img = $(`<img src="${urlImg}" alt="${title}">`);

            // Create div with title and overview inside of slider img
            var divCaption = $('<div class="carousel-caption rounded d-none d-md-block">')
            var h5Caption = $('<h1>' + title + '</h1>')
            var pCaption = $('<h5>' + overview + '</h5>')

            h5Caption.appendTo(divCaption)
            pCaption.appendTo(divCaption)
            divCaption.appendTo(div)

            img.appendTo(div)

            div.appendTo('.carousel-inner')
        });
    })
}
