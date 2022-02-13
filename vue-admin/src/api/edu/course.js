import request from '@/utils/request' //引入已经封装好的axios 和 拦截器

export default{
    //添加课程信息功能
    addCourseInfo(courseInfo){
        return request({
            url:"/eduService/course/addCourseInfo",
            method: 'post',
            data: courseInfo,
        })
    },
     //查询所有讲师
     getAllTeacher(){
        return request({
           url:"/eduService/teacher/findAll",
           method: 'get',
        })
       }
    
    
}
