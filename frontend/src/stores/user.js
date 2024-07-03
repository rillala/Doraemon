import { defineStore } from 'pinia'
import { useFirestore } from '../composable/useFirestore'
import { watch } from 'vue'

export const useUserStore = defineStore('UserStore', {
    state: () => {
        return {
            memberList: [],
            unsubscribe: null,
        }
    },
    actions: {
        //把原本user資料取出來存進firestore(只會用一次)
        async saveUser() {
            try {
                //有另外建立一個backend資料夾，並使用express模擬後端api(沒有另外推上GitHub)
                await fetch('http://localhost:3000/saveUsers');

            } catch (error) {
                console.error('Error to save user data.', error)
            }
        },
        //從firestore中取出member資料  引入composable中的function
        fetchMembers() {
            const { getData, documents } = useFirestore();

            getData("users") 

            //onSnapshot更新的documents是非同步的，要用watch觀測到新的值在給memberList
            watch(documents,(newVal,oldVal) => {
                this.memberList = newVal
            },{ immediate:true })
        },
        // cleanUp() {
        //     if (this.unsubscribe) {
        //         this.unsubscribe();
        //     }
        // }
    }

})