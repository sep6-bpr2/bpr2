import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
    createPersistedState({
        key: 'vuex',
        paths: ['login', 'nav', 'createControlPoint', 'controlPoints', 'users', 'releasedOrders', 'releasedOrder']
    })(store)
}
