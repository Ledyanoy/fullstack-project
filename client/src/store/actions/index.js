import {
    GET_ARTICLES,
    ERROR_GLOBAL,
    SUCCESS_GLOBAL,
    CLEAR_NOTIFICATIONS,
    AUTH_USER,
} from "../types";


//articles//
export const getArticles = (articles) => ({
    type: GET_ARTICLES,
    payload: articles,
});

//notification//
export const errorGlobal = (msg) => ({
    type: ERROR_GLOBAL,
    payload: msg,
});

export const successGlobal = (msg) => ({
    type: SUCCESS_GLOBAL,
    payload: msg,
});

export const clearNotifications = () => ({
    type: CLEAR_NOTIFICATIONS,
})

//users//
export const authUser = (user) => ({
    type: AUTH_USER,
    payload: user,
});
