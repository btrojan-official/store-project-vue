import axios from "axios"

const get = (url) => new Promise((resolve, reject) => {
     setTimeout(() => {
        axios.get(url, { withCredentials: true })
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })

    }, 500 + Math.random() * 1000);
})

const post = (url, userObject) => new Promise((resolve, reject) => {
    setTimeout(() => {
        axios.post(url, userObject, { withCredentials: true })
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    }, 1000);
})


const getPromotions = () => get("http://localhost:3000/promotions")
const getPromotion = (id) => get(`http://localhost:3000/promotion/${id}`)
const getProduct = (id) => get(`http://localhost:3000/product/${id}`)

const registerUser = (userObject) => post(`http://localhost:3000/createUser`, userObject);

const loginUser = (userObject) => post(`http://localhost:3000/loginUser`, userObject);
const logoutUser = (data) => post(`http://localhost:3000/logoutUser`, data);
const getCurrentUser = () => get(`http://localhost:3000/getCurrentUser`);

export {
    getPromotions,
    getPromotion,
    getProduct,
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
}