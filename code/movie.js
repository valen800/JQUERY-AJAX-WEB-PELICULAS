const APY_KEY = "9b471e22ab9c236796ca4f569bca82be"
const BASE_URL_UPCOMING = " https://api.themoviedb.org/3/movie/upcoming?api_key="
const LANGUAGE = "&language=es-ES"
const BASE_URL_IMG = "https://image.tmdb.org/t/p/original/"
const URL_PAGE = "&page="

var page = '1';

$(document).ready(function () {

    getUpcomingMovies(page);
})

const getUpcomingMovies = (pageIndex) => {
    let url = BASE_URL_UPCOMING + APY_KEY + LANGUAGE + URL_PAGE + pageIndex;
    $.getJSON(url, function (data) {
        console.log(data);
        clearHTML();
        createCardsActors(data.results);
        createPaginationItems(data.total_pages);
    })
}

const clearHTML = () => {
    $('.lineOne').html('')
    $('.pagination').html('')
}

const createCardsActors = (movies) => {

    movies.forEach(element => {
        let title = element.original_title;
        let urlImg = BASE_URL_IMG + element.poster_path;

        let divBody = $(`<div class="d-flex justify-content-center col col-sm mt-5 text-center"></div>`)
        let divCard = $(`<div class="card" style="width: 18rem;"></div>`);
        let img = $(`<img class="card-img-top" src="${urlImg}" alt="${title}"/>`);
        let divCardBody = $(`<div class="card-body"></div>`);
        let textBodyCard = $(`<p class="card-text">${title}</p>`)

        textBodyCard.appendTo(divCardBody);

        img.appendTo(divCard);
        divCardBody.appendTo(divCard);
        divCard.appendTo(divBody);

        divBody.appendTo('.lineOne')
    });
}

const createPaginationItems = (totalPages) => {
    let previousLi = $(`<li class="page-item"></li>`);
    let previousLink = $(`<a class="page-link" onClick="previousItem(); return false;">Previous</a>`);
    previousLink.appendTo(previousLi);
    previousLi.appendTo('.pagination');


    for (let i = 1; i <= totalPages; i++) {
        let li = $(`<li class="page-item"></li>`);
        let link = $(`<a class="page-link" onClick="getUpcomingMovies(${i}); return false;">${i}</a>`);

        link.appendTo(li);
        li.appendTo('.pagination');
    }

    let nextLi = $(`<li class="page-item"></li>`);
    let nextLink = $(`<a class="page-link" onClick="nextItem(); return false;">Next</a>`);
    nextLink.appendTo(nextLi);
    nextLink.appendTo('.pagination');
}

const nextItem = () => {
    console.log(page);
    let sizePagination = ($('.page-item').length - 2)

    if (page == sizePagination) {
        page = sizePagination;
    } else {
        page = parseInt(page) + 1;
        page = page.toString();
        getUpcomingMovies(page);
    }
}

const previousItem = () => {
    console.log(page);

    if (page == '1') {
        page = '1';
    } else {
        page = parseInt(page) - 1;
        page = page.toString();
        getUpcomingMovies(page);
    }
}