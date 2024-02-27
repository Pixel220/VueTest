
import { createStore } from 'vuex';


const store = createStore({
    state() {
        return {
            users: false,
            defaultLink: 'https://jsonplaceholder.typicode.com',
            selectUser: {}
        }
    },
    mutations: {
        SetUsers(state, value) {
            state.users = value
        },
        SetSelectUser(state, value) {
            state.selectUser = {}
            fetch(`${state.defaultLink}/users/${value}`).then(res => res.json()).then(data => {
                state.selectUser = data
            })
        }
    }
})

export default store