import request from '@/utils/request'

// 保存日记
export function insertArticle(article) {
    return request({
        url: '/article/insert',
        method: 'post',
        headers: {
          isToken: true,
          'Content-Type': 'application/json;charset=utf-8' 
        },
        data: article
    })
}
