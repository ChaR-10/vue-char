.<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps
      :active="1"
      process-status="wait"
      align-center
      style="margin-
bottom: 40px;"
    >
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>
    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input
          v-model="courseInfo.title"
          placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"
        />
      </el-form-item>

      <!-- 所属分类 TODO -->
    <el-form-item label="课程分类">
    <el-select
           v-model="courseInfo.subjectParentId"
           placeholder="一级分类"
           @change="subjectLevelOneChanged"
           >
    <el-option
               v-for="subject in subjectOneLists"
               :key="subject.id"
               :label="subject.title"
               :value="subject.id"
               ></el-option>
    </el-select>
    <el-select v-model="courseInfo.subjectId" placeholder="二级分类">
    <el-option
               v-for="subject in subjectTwoLists"
               :key="subject.id"
               :label="subject.title"
               :value="subject.id"
               ></el-option>
    </el-select>

       </el-form-item>


<!-- 课程讲师 TODO -->
  <!--课程讲师-->
    <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
         <el-option
                   v-for="teacher in teacherLists"
                   :key="teacher.id"
                   :label="teacher.name"
                   :value="teacher.id"
                   ></el-option>
        </el-select>
    </el-form-item>

      <el-form-item label="总课时">
        <el-input-number
          :min="0"
          v-model="courseInfo.lessonNum"
          controls-position="right"
          placeholder="请填写课程的总课时数"
        />
      </el-form-item>

      <!-- 课程简介 TODO -->
    <!-- 课程简介-->
    <el-form-item label="课程简介">
	    <tinymce :height="300" v-model="courseInfo.description"/>
    </el-form-item>

<!-- 图片大的自己设置宽高<img :src="courseInfo.cover" width="400px" height="200px" /> -->
      <!-- 课程封面 TODO -->
    <el-form-item label="课程封面">
        <el-upload
               :show-file-list="false"
               :on-success="handleAvatarSuccess"
               :before-upload="beforeAvatarUpload"
               :action="BASE_API + '/edu_oss/fileoss/upload'"
               class="avatar-uploader"
               >
        <img :src="courseInfo.cover" width="200px" height="100px" />
        </el-upload>
    </el-form-item>


      <el-form-item label="课程价格">
        <el-input-number
          :min="0"
          v-model="courseInfo.price"
          controls-position="right"
          placeholder="免费课程请设置为0元"
        />
        元
      </el-form-item>

      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          >保存并下一步</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import course from "@/api/edu/course.js";
import subject from '@/api/edu/subject';
//引入Tinymce富文本编辑器组件
import Tinymce from '@/components/Tinymce';


export default {
  components: { 
    Tinymce
     },

  data() {
    return {
      saveBtnDisabled: false,
      courseInfo: 
        {
          title: "",
          subjectId: "",
          teacherId: "",
          lessonNum: 0,
          description: "",
          cover: "/static/02.png",
          price: 0,
        },
        teacherLists: [], //封装所有讲师数据,
        subjectOneLists: [], //封装所以一级分类数据
        subjectTwoLists: [], //封装二级分类数据	,
        BASE_API: process.env.BASE_API, // 接口API地址


    };
  },
  methods: {
    saveOrUpdate() {
      course.addCourseInfo(this.courseInfo).then(resp => {
        this.$message({
          message: "添加课程信息成功",
          type: "success",
        })
        //跳转到第二步，并带着这个课程生成的id
        this.$router.push({ path: "/course/chapter/"+resp.data.courseId });
      });
    },
    //查询所有讲师
    getListTeacher() {
      course.getAllTeacher().then((resp) => {
        this.teacherLists = resp.data.items;
      });
    },
    //查询所有的一级分类
    getOneSubject(){
            subject.getSubjectList()
                .then(response => {
                    // console.log(response.data.list)
                    this.subjectOneLists = response.data.list;
                })
        },
    //点击某个一级分类，触发change事件，显示对应的二级分类
    subjectLevelOneChanged(value) {
    //value就是一级分类的id值
    for (let i = 0; i < this.subjectOneLists.length; i++) {
        if (this.subjectOneLists[i].id === value) {
            this.subjectTwoLists = this.subjectOneLists[i].children;//二级分类绑定
            this.courseInfo.subjectId = "";//二级select的value的清空
        }
        }
    },
    //上传封面成功调用的方法
    handleAvatarSuccess(resp,file) {
        this.courseInfo.cover = resp.data.url
    },
    //上传之前要调用的方法
    beforeAvatarUpload(file) {
        const isJPG = file.type === "image/jpeg";
        const isPNG = file.type === "image/png";
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG && !isPNG) {
            this.$message.error("上传头像图片只能是 JPG /PNG格式!");
        }
        if (!isLt2M) {
            this.$message.error("上传头像图片大小不能超过 2MB!");
        }
        return (isJPG || isPNG) && isLt2M;
    }



  },
  created() {
      //初始化所有讲师
    this.getListTeacher();
     //初始化一级分类
    this.getOneSubject();
  },
};
</script>

<style>
</style>
<style scoped>
  .tinymce-container {
  line-height: 29px;
  }
</style>

