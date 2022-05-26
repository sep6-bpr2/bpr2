import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
    createPersistedState({
        key: 'vuex',
        paths: [
            'mainState',
            'login', 
            'nav', 
            'users'
        ]
    })(store)
}
