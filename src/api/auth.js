import request from "../utils/request"

export function signIn(data = {}) {
    return request({
        url: "/auth/authenticate",
        method: "POST",
        data
    })
}

export function logOut(data = {}) {
    return request({
        url: "/auth/logout",
        method: "POST",
        data
    })
}

export function signUp(data = {}) {
    return request({
        url: "/auth/admin/register",
        method: "POST",
        data
    })
}