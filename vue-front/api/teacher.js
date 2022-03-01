import request from '@/utils/request'

export default {
  //查询讲师信息方法
  getTeacherList(page,limit) {
    return request({
        url: `/eduservice/teacherfront/getTeacherFrontList/${page}/${limit}`,
        method: 'post'
      })
  },
}
