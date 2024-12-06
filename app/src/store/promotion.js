import { getPromotion, getProduct } from "@/api"

const promotion = {
    state(){
        return {
            promotionObject: {},
            promotionLoading: false,
            promotionError: null
        }
    },

    mutations:{
        SET_PROMOTION_OBJECT(state, newPromotionObject) {
            state.promotionObject = newPromotionObject
        },
        SET_PROMOTION_LOADING(state, value){
            state.promotionLoading = value
        }
    },

    getters:{
        GET_PROMOTION_OBJECT(state) {
            return state.promotionObject
        }
    },

    actions: {
        FETCH_PROMOTION({ state, commit, getters }, promotionId) {
            commit("SET_PROMOTION_LOADING", true)

            commit("SET_PROMOTION_OBJECT", {})

            const handleError = () => {
               commit("SET_PROMOTION_ERROR", "server error!!!")
               commit("SET_PROMOTION_LOADING", false)
            }
         
            const promotionsList = getters.GET_PROMOTIONS_LIST
            console.log(promotionsList)
         
            const promotionFromStore = promotionsList.find((promotion) => promotion.id === promotionId)
         
            // Gets all of the products of single promotion from product/:id api endpoint
            const handlePromotion = (data) => {
         
               const fetchPromises = data.items.map((productId) => getProduct(productId));
               
               Promise.all(fetchPromises)
                    .then((values) => {

                        const returnObject = { ...data, items: values };

                        commit("SET_PROMOTION_OBJECT", returnObject);
                        commit("SET_PROMOTION_LOADING", false);
                    })
                    .catch(handleError);
            }
         
            if (promotionFromStore) {
                handlePromotion(promotionFromStore)
            }
        
            else {
                getPromotion(promotionId)
                    .then(handlePromotion)
                    .catch(handleError)
            }
        }     
    }
 
}