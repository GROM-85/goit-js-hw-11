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

let isloadMore = false;
let counterHits = 0;
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
        Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.",{
            timeout: 4000,
          },)
        return;
    }
    if(isContentFinished(totalHits)){
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.",{
            timeout: 4000,
          },);
    }
    
    let markup = cards(hits);
    refs.gallery.insertAdjacentHTML("beforeend",markup);

    if(isloadMore){
        refs.gallery.after(refs.loadMoreBtn);
        scrollByBtnClick();
    }

    lightbox = createLightBox();
    
}

function createLightBox(){
    return new SimpleLightbox(".gallery a",{
        captionDelay: 250,
        captionsData:"alt",
        scrollZoom:false,   
    })
}

function isContentFinished(totalHits){
    
    counterHits += options.per_page;
    // console.log(counterHits)
    // console.log(totalHits)
    if(counterHits >= totalHits){
        counterHits = 0;
        isloadMore = false;
        refs.loadMoreBtn.removeEventListener("click",onLoadMoreHandler);
        window.removeEventListener("scroll",InfScrollHandler,{
            passive:true
        });
        if(isloadMore){
            refs.loadMoreBtn.hidden = true;
        }
         return true;
        }
}

function fetchFormHandler(event){
    event.preventDefault();
    const {data} = event.currentTarget.elements;
    if(!data.value){
        Notiflix.Notify.info("Search field can not be empty!",{
            timeout: 4000,
          },);
        return;
    }
    pixabayApi.stoteQuery(data.value);
    clearContent();
    
    pixabayApi.resetPage();  
    pixabayApi.fetchData() // since async fetchData() is async  functoin && return Promise
        .then(renderData); // we can use then() to pass callback
   
    refs.loadMoreBtn.addEventListener("click",onLoadMoreHandler);
    window.addEventListener("scroll",InfScrollHandler,{
    passive:true
});    
    event.currentTarget.reset();
}

function clearContent(){
    refs.gallery.innerHTML = "";
}

function onLoadMoreHandler(){
    lightbox.destroy();
    pixabayApi.fetchData()
        .then(renderData);
    
}

function scrollByBtnClick(){
    
    const {scrollHeight,clientHeight} = document.documentElement;

    window.scrollBy({
    top: scrollHeight/2,
    behavior: "smooth",
    });
}
function loadMoreBtnHiddenToggle(){
    refs.loadMoreBtn.hidden = !refs.loadMoreBtn.hidden
}
const dotsToggle = () => {
    refs.loader.hidden = !refs.loader.hidden;
}

const InfScrollHandler = throttle(500,() => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight,
    } = document.documentElement;

    if(scrollTop + clientHeight >= scrollHeight - 5 && isloadMore === false){
        lightbox.destroy();
        dotsToggle();
        setTimeout(async () => {
        pixabayApi.fetchData() // since async fetchData() is async  function && return Promise
            .then(renderData); // we can use then() to pass callback
            dotsToggle();
        },1000);
    }
})

function scrollSwitchHandler({currentTarget}){
    const {checked} = currentTarget;
    isloadMore = checked;
    if(checked){
        refs.gallery.after(refs.loadMoreBtn);
        refs.loadMoreBtn.hidden = false;
    }else{
        refs.loadMoreBtn.hidden = true;
    }
}

refs.form.addEventListener("submit",fetchFormHandler);
refs.scrollSlider.addEventListener("click",scrollSwitchHandler)

