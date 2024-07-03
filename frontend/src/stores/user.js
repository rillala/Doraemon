import { defineStore } from 'pinia'
import axios from 'axios';

export const useUserStore = defineStore('UserStore',  {
    state:()=>{
        return{
            users:[]
        }
    },
    actions:{
        async fetchUsers() {
            try {
              const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`);
              this.users = response.data;
              console.log(this.users)
            } catch (error) {
              console.error('Error fetching users:', error);
            }
          }
    }

})