import request from "../utils/request"

export function getSmart() {
    return request({
        url: "/hello",
        method: "GET",
    })
}