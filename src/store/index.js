import { createStore } from 'vuex'

import promotions from './promotions'

const modules = {
    promotions,
    // kolejne moduły
}

export default createStore({    
    modules,
})