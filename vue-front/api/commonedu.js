import request from '@/utils/request'
export default {
    getPageList(page, limit, courseId) {
        return request({
            url: `/eduService/edu-comment/getCommentPage/${page}/${limit}`,
            method: 'get',
            params: courseId
        })
    },
    addComment(comment) {
        return request({
            url: `/eduService/edu-comment/auth/addComment`,
            method: 'post',
            data: comment
        })
    }
}
