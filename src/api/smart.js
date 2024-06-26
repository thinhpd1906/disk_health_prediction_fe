import request from "../utils/request"

export function getTest() {
    return request({
        url: "/test",
        method: "GET",
    })
}
export function getSmart(data = {}) {
    return request({
        url: "/smart/list",
        method: "GET",
        params: data,
    })
}

export function getSmartForTableView(data = {}) {
    return request({
        url: "/smart/all",
        method: "GET",
        params: data,
    })
}

export function getSerialNumbers(data = {}) {
    return request({
        url: "/smart/serial",
        method: "GET",
        params: data,
    })
}

export function getOveral(data = {}) {
    return request({
        url: "/smart/overal",
        method: "GET",
        params: data,
    })
}