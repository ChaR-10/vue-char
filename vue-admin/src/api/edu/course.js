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
    },
        //根据课程id 查询课程基本信息
        getCourseInfoById(courseId){
            return request({
                url:`/eduService/course/getCourseInfoById/${courseId}`,
                method: 'get',
            })
        },
        //修改课程信息
        updateCourseInfo(courseInfoForm){
            return request({
                url:"/eduService/course/updateCourseInfo",
                method: 'post',
                data: courseInfoForm,
            })
        },
    
        //5.根据id查询课程确认信息
        getPublishCourseInfo(id){
            return request({
                url: '/eduService/course/getPublishCourseInfo/'+id,
                method: 'get'
            })
        },
            //6.课程最终发布

    publishCourse(id) {
        return request({
            url: '/eduService/course/publishCourse/'+id,
            method: 'post'
          })
    },
    //课程列表（条件查询分页）
    //current当前页 limit每页记录数 courseQuery条件对象
    pageCourseCondition(current,limit,courseQuery){
    return request({
        url: `/eduService/course/pageCourseCondition/${current}/${limit}`,
        method: 'post',
        data: courseQuery
        })
    },
    //课程列表数据查询
     removeCourseById(courseId){
            return request({
                url: "/eduService/course/deleteCourse/"+courseId,
                method: 'delete',
            })
    }
    

    
}
