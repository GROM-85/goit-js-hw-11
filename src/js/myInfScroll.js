//===============
// TEST INF-SCROLL
//===============

import {url,apiKEY,QUERY_KEY,DELAY} from "./constants";
import {refs} from "./getRefs";
import {options} from "../index";
import { throttle } from "throttle-debounce";
import cards from "../templates/cards.hbs";

const getImgs = async (opts) =>{
    const response = await fetch(url + new URLSearchParams(opts));
    console.log("myInfScroll",response); //Response obj
    if(!response.ok){
        throw new Error(response.status);
    }
    return await response.json();
}

const renderImgs = ({hits}) =>{

    refs.gallery.insertAdjacentHTML("beforeend",cards(hits));

}

const showLoader = () => {
    loader.classList.add("show");
}

const hideLoader = () => {
    loader.classList.remove("show");
}

const hasMoreImgs = (page,limit,total) =>{
    const startInd = (page - 1) * limit + 1;
    return total === 0 || startInd < total;
}

const loadImgs = async () => {
    // showLoader();
    try{
        options.page++;
        const response = await getImgs(options);
        renderImgs(response);
        const {totalHits} = response;
    }
    catch(error){
        console.log(error.message);
    }
    finally{
        //hideloader()
    }
}

// scroll Event

function onScrollHandler(){
    console.log("scrollTop",document.documentElement.scrollTop);
    console.log("scrollHeight",document.documentElement.scrollHeight);
    console.log("clientHieght",document.documentElement.clientHeight);

    const{
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    if(scrollTop + clientHeight >= scrollHeight - 5 ){
        loadImgs();
    }   
}

window.addEventListener("scroll",throttle(DELAY,onScrollHandler),{
    passive:true
});
