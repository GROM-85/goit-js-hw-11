import InfiniteScroll from "infinite-scroll";
import { refs } from "./getRefs";
import {url,apiKEY,QUERY_KEY} from "./constants";
export {infScroll};

let opts = {
    path: function(){
        console.log("nextIndex",this.pageIndex);
        return url + new URLSearchParams(
            {
                key:apiKEY,
                q: sessionStorage.getItem(QUERY_KEY),
                image_type:"photo",
                orientation:"horizontal",
                safesearch:"true",
                page: this.pageIndex,
                per_page: 40,
            }
        )},
    responseBody:"json",
    history:false,

}

// let  infScroll =  new InfiniteScroll(refs.gallery,opts);

// infScroll.on("load", (body) => {
    //     isInfScroll = true;
    //     lightbox.destroy();
    //     console.log("onScroll",body);
    //     renderData(body);
    
    // });





