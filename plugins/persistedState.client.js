import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
    createPersistedState({
        key: 'vuex',
        paths: [
            'mainState',
            'login', 
            'nav', 
            'createControlPoint', 
            'controlPoints', 
            'users', 
            'releasedOrders', 
            'releasedOrder', 
            'completedOrder', 
            'completedOrders'
        ]
    })(store)
}
