import request from '@/utils/request'

export default {
  //查询热门课程和讲师
  getListBanner() {
    return request({
        url: `/eduService/indexfront/index`,
        method: 'get'
      })
  }
}
