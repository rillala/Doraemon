import { defineStore } from 'pinia'

export const useImageStore = defineStore('ImageStore',  {
    state:()=>{
        return{
            previewImage:null
        }
    },
    actions:{
        setPreviewImage(image){
            this.previewImage = image;
        }
    }

})