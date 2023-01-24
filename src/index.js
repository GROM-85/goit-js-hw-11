// import "./js/r_GET" ;
// import "./js/c_POST";
// import "./js/u_UPDATE";
// import "./js/d_DELETE";
import "simplelightbox/dist/simple-lightbox.min.css";
import * as bootstrap from 'bootstrap';
import { throttle } from 'throttle-debounce';
import cards from "./templates/cards.hbs";
import {refs} from "./js/getRefs";
import SimpleLightbox from "simplelightbox";
import { preventOverflow } from '@popperjs/core';
import { formToJSON } from 'axios';
import { fetchAPI } from './js/fetchAPI';
import Notiflix from "notiflix";
import InfiniteScroll from "infinite-scroll";

const url = "https://pixabay.com/api/?";
const apiKEY = "32950836-9c0ce5402bfaddd9a8ff9a3e7";
const DELAY = 500;
const QUERY_KEY = "query_pixabay";
let counterHits = 0;
refs.loadMoreBtn.setAttribute("disabled",true);

const options = {
    key:apiKEY,
    q:"",
    image_type:"photo",
    orientation:"horizontal",
    safesearch:"true",
    page: 1,
    per_page: 40,
}

// init instance of fetchAPI class
const pixabayApi = new fetchAPI({
    url,
    options,
    queryKey: QUERY_KEY,
    });

// function to render data && create lightBox
function renderData({totalHits,hits}){
    if(!hits.length){
        Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.")
        return;
    }
    countHits(totalHits)
    let markup = cards(hits);
    refs.gallery.insertAdjacentHTML("beforeend",markup);
    scrollByBtnClick();
    createLightBox();
    
}

function createLightBox(){
    return new SimpleLightbox(".gallery a",{
        captionDelay: 250,
        captionsData:"alt",
        scrollZoom:false,   
    })
}

function countHits(totalHits){
    
    counterHits += options.per_page;
    console.log(counterHits)
    console.log(totalHits)
    if(counterHits > totalHits){
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
    }
}

function fetchFormHandler(event){
    event.preventDefault();
    const {data} = event.currentTarget.elements;
    if(!data.value){
        Notiflix.Notify.info("Search field can not be empty!");
        return;
    }
    pixabayApi.stoteQuery(data.value);
    clearContent();
    pixabayApi.resetPage();
    pixabayApi.fetchData()
        .then(renderData);
    refs.loadMoreBtn.removeAttribute("disabled")    
    event.currentTarget.reset();
}

function clearContent(){
    refs.gallery.innerHTML = "";
}

function onLoadMoreHandler(){
    pixabayApi.fetchData()
        .then(renderData);
}

function scrollByBtnClick(){
    const { height: cardHeight } = document
    .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();

    window.scrollBy({
    top: cardHeight * options.per_page/2,
    behavior: "smooth",
    });
}

// function infScroll(){
//     let {hits} = pixabayApi.fetchData();
//     let pathJSON = JSON.stringify(cards(hits));
//     let opts = {
//         path: pathJSON,
//         responseBody:"json",

//     }
//     return new InfiniteScroll(refs.gallery,opts)
// }
refs.form.addEventListener("submit",fetchFormHandler);
refs.loadMoreBtn.addEventListener("click",onLoadMoreHandler)
// infScroll();

