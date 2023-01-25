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
import { fetchAPI } from './js/fetchAPI';
import Notiflix from "notiflix";
import { infScroll } from "./js/infScroll";
import {url,apiKEY,QUERY_KEY,DELAY} from "./js/constants";


let isInfScroll = false;
let counterHits = 0;
refs.loadMoreBtn.setAttribute("disabled",true);
let lightbox;

export const options = {
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

    if(!isInfScroll)scrollByBtnClick();
    
    lightbox = createLightBox();
    
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
    pixabayApi.fetchData() // since async fetchData() is async  functoin && return Promise
        .then(renderData); // we can use then() to pass callback
    refs.loadMoreBtn.removeAttribute("disabled")    
    event.currentTarget.reset();
}

function clearContent(){
    refs.gallery.innerHTML = "";
}

function onLoadMoreHandler(){
    lightbox.destroy();
    isInfScroll = false;
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

refs.form.addEventListener("submit",fetchFormHandler);
refs.loadMoreBtn.addEventListener("click",onLoadMoreHandler);


