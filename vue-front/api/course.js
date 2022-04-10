import request from '@/utils/request'

export default{
    //前台多条件分页查询
    getConditionPage(page,limit,searchObj){
        return request({
            url: `/eduService/courseFront/getFrontCourseList/${page}/${limit}`,
            method: 'post',
            data: searchObj
        })
    },
    //查询所有分类（一级分类、二级分类）的方法
    getAllSubject(){
        return request({
            url: `/eduService/subject/getAllSubject`,
            method: 'get'
        })
    },
    //根据课程id，查询课程详细信息
    getFrontCourseInfo(courseId){
        return request({
            url: `/eduService/courseFront/getFrontCourseInfo/${courseId}`,
            method: 'get'
        })
    }
}
