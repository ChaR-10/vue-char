import request from '@/utils/request' //引入已经封装好的axios 和 拦截器

export default {
    //添加小节
    addVideo(video) {
        return request({
            url: `/eduService/video/addVideo`,
            method: `post`,
            data: video
        })
    },
    //根据id查询小节
    getVideoById(videoId) {
        return request({
            url: `/eduService/video/getVideoById/${videoId}`,
            method: `get`,
        })
    },
    //修改小节
    updateVideo(video) {
        return request({
            url: `/eduService/video/updateVideo`,
            method: `post`,
            data: video
        })
    },
    //删除小节
    deleteById(videoId) {
        return request({
            url: `/eduService/video/deleteVideo/${videoId}`,
            method: `delete`,
        })
    },

    //删除视频
    deleteAliyunvod(id){
            return request({
                url: '/eduVod/video/removeAliyunVideoById/'+id,
                method: 'delete'
            })
    }
}
