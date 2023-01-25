import axios from "axios";
import Notiflix from "notiflix";

export class fetchAPI{
    constructor({url,options,queryKey} = {}){
        this.url = url;
        this.options = options;
        this.queryKey = queryKey;
        this.page = 1;
    }

    async fetchData(){
        this.options.q = this.getQuery();
        // return fetch(this.url + new URLSearchParams(this.options))
        //     .then(response => {
        //         if (!response.ok) {
        //         throw new Error(response.status);
        //     };
        //     return response.json();
        //     })
        //     .then(({hits}) => {
        //         this.updatePage();
        //         return hits;
        //     })
        //     .catch(error=>console.log(error.message));
        try {
            const response = await axios.get(this.url + new URLSearchParams(this.options));
            this.updatePage();
            
            console.dir(response); //Object 
            
            return response.data; // async return Promise 
            // in here its equal to Promise.resolve(response.data)

        } catch(error){
            console.log(error.message);
            Notiflix.Notify.failure(`Ooos, during your search API gave ${error.message} error!`)
        }

    }


    updateOptions(newOptions){
        Object.assign(options,newOptions);
    }

    stoteQuery(value){
        sessionStorage.setItem(this.queryKey,JSON.stringify(value))
    }

    getQuery(){
        try{
           return JSON.parse(sessionStorage.getItem(this.queryKey));
        }catch(error){
            console.log("Ooops this key isnt stored!");
        }
    }

    updatePage(){
        this.page++;
        this.options.page = this.page;
    }

    resetPage(){
        this.page = 1;
    }

}