import request from '@/utils/request'


export function login(User) {
    return request({
        url: '/user/login',
        method: 'post',
        headers: {
          isToken: false,
          'Content-Type': 'application/json;charset=utf-8' 
        },
        data: User
    })
}

export function register(User) {
    return request({
        url: '/user/register',
        method: 'post',
        headers: {
          isToken: false,
          'Content-Type': 'application/json;charset=utf-8' 
        },
        data: User
    })
}