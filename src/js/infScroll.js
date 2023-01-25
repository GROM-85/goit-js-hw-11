import InfiniteScroll from "infinite-scroll";
import { refs } from "./getRefs";
import {url,apiKEY,QUERY_KEY} from "./url_key";
export {infScroll};

let opts = {
    path: function(){
        return url + new URLSearchParams(
            {
                key:apiKEY,
                q: sessionStorage.getItem(QUERY_KEY),
                image_type:"photo",
                orientation:"horizontal",
                safesearch:"true",
                page: this.nextIndex,
                per_page: 40,
            }
        )},
    responseBody:"json",
    history:false,

}

let  infScroll =  new InfiniteScroll(refs.gallery,opts);





