<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps
      :active="2"
      process-status="wait"
      align-center
      style="margin-
bottom: 40px;"
    >
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>

<el-button type="text" @click="openChapterDialog()">添加章节</el-button>
     <!-- 章节 -->
 <!-- 章节 -->
    <ul class="chanpterList">
        <li  v-for="chapter in chapterVideoList" :key="chapter.id">
            <p>
                {{ chapter.title }}
                <span class="acts">
                    <el-button style="" type="text" @click="openVideo(chapter.id)">添加小节</el-button>
                    <el-button style="" type="text" @click="openEditChatper(chapter.id)">编辑</el-button>
                    <el-button type="text" @click="removeChapter(chapter.id)">删除</el-button>
                </span>
            </p>

            <!-- 视频 -->
            <ul class="chanpterList videoList">
                <li v-for="video in chapter.children" :key="video.id">
                    <p>{{ video.title }}
                        <span class="acts">
                            <el-button style="" type="text" @click="openEditVideo(video.id)">编辑</el-button>
                            <el-button type="text" @click="removeVideo(video.id)">删除</el-button>
                        </span>
                    </p>
                </li>
            </ul>

        </li>
    </ul>

<!-- 添加和修改章节表单 -->
    <el-dialog :visible.sync="dialogChapterFormVisible" title="添加章节">
        <el-form :model="chapter" label-width="120px">
            <el-form-item label="章节标题">
                <el-input v-model="chapter.title"/>
            </el-form-item>
            <el-form-item label="章节排序">
                <el-input-number v-model="chapter.sort" :min="0" controls-position="right"/>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
        </div>
    </el-dialog>

    <!--添加小节表单-->
    <!-- 添加和修改课时表单 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加课时">
      <el-form :model="video" label-width="120px">
        <el-form-item label="课时标题">
          <el-input v-model="video.title" />
        </el-form-item>
        <el-form-item label="课时排序">
          <el-input-number
            v-model="video.sort"
            :min="0"
            controls-
            position="right"
          />
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video.isFree">
            <el-radio :label="true">免费</el-radio>
            <el-radio :label="false">默认</el-radio>
          </el-radio-group>
        </el-form-item>
         <el-form-item label="上传视频">
    <el-upload
      :on-success="handleVodUploadSuccess"
     :on-remove="handleVodRemove"
     :before-remove="beforeVodRemove"
     :on-exceed="handleUploadExceed"
     :file-list="fileList"
     :action="BASE_API + '/eduVod/video/uploadAliyunVideo'"
      :limit="1"
  class="upload-demo"
  >
    <el-button size="small" type="primary">上传视频</el-button>
  <el-tooltip placement="right-end">
    <div slot="content">
        最大支持1G，<br />
        支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br />
        GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br />
        MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br />
        SWF、TS、VOB、WMV、WEBM 等视频格式上传
            </div>
  <i class="el-icon-question" />
    </el-tooltip>
  </el-upload>
  </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeVideoDialog()">取 消</el-button>
        <el-button
          :disabled="saveVideoBtnDisabled"
          type="primary"
          @click="saveOrUpdateVideo(video.id)"
          >确 定</el-button
        >
      </div>
    </el-dialog>


    <!-- <el-form label-width="120px">
      <el-form-item>
        <el-button @click="previous">上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next"
          >下一步</el-button
        >
      </el-form-item>
    </el-form> -->

   

    
    <div>
        <el-button @click="previous" round>上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next" round>下一步</el-button>
    </div>
  </div>
</template>

<script>
import chapter from '@/api/edu/chapter.js';
import video from "@/api/edu/video.js";




export default {
  data() {
    return {
      courseId:'',
      chapterVideoList:[],
      saveBtnDisabled: false,
      chapter:{//封装章节数据
			title: '',
	        sort: 0
        },
      dialogChapterFormVisible:false,//章节弹框
      dialogVideoFormVisible:false, //小结弹框
      video: {
                title: '',
                sort: 0,
                free: 0,
                videoSourceId: '',
                videoOriginalName: ''//视频名称
     },
      saveVideoBtnDisabled:false,

      fileList: [], //上传文件列表
      BASE_API: process.env.BASE_API, // 接口API地址


    };
  },
  methods: {
        //跳转到上一步
    previous() {
      this.$router.push({ path: "/course/info/"+this.courseId});
    },
    next() {
      //跳转到第三步
      this.$router.push({ path: "/course/publish/"+this.courseId});
    },

     //根据课程id查询对应的课程章节和小结
    getChapterVideoByCourseId(){
        chapter.getChapterVideoByCourseId(this.courseId)
          .then(resp=>{
            this.chapterVideoList =  resp.data.allChapterVideo
          })
    },

    // ==================章节操作===================
    //添加章节
    saveChapter() {
      //设置课程id到chapter对象中
      this.chapter.courseId = this.courseId
      chapter.addChapter(this.chapter).then((resp) => {
        //关闭弹框
        this.dialogChapterFormVisible = false;
        //提示信息
        this.$message({
          message: "添加章节成功",
          type: "success",
        });
        //刷新页面
        this.getChapterVideoByCourseId()
      });
    },
    //修改章节
    updateChapter() {
      //设置课程id到chapter对象中
      this.chapter.courseId = this.courseId;
      chapter.updateChapterById(this.chapter).then((resp) => {
        //关闭弹框
        this.dialogChapterFormVisible = false;
        //提示信息
        this.$message({
          message: "修改章节成功",
          type: "success",
        });
        //刷新页面
        this.getChapterVideoByCourseId();
      });
    },
    saveOrUpdate() {
      if (this.chapter.id) {
        //修改章节
        this.updateChapter();
      } else {
        //新增章节
        this.saveChapter();
      }
    },
    //弹出添加章节表单
    openChapterDialog(){
       //清空之前的数据
        this.chapter={}
        //显示弹框
        this.dialogChapterFormVisible = true
    },
        //删除章节
    removeChapter(chapterId) {
      this.$confirm("此操作将永久删除章节信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //点击确定，执行then方法
        chapter.deleteById(chapterId).then((resp) => {
          //删除成功
          //提示信息
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          //刷新页面
          this.getChapterVideoByCourseId();
        });
      });
    },
    //弹出编辑章节页面
      openEditChatper(chapterId){

        //弹框
          this.dialogChapterFormVisible = true;
        //调用接口 
          chapter.getChapterById(chapterId)
            .then(response => {
                this.chapter = response.data.chapter
            })
      },

// ====================== 小结操作 ======================
      //添加小节弹框的方法
    openVideo(chapterId) {
      //清空之前的数据
      this.video = {};
      //显示弹框
      this.dialogVideoFormVisible = true;
      //设置章节id
      this.video.chapterId = chapterId;
    },

        //添加小节
    addVideo() {
      //设置课程id
      this.video.courseId = this.courseId;
      video.addVideo(this.video).then((resp) => {
        //关闭弹框
        this.dialogVideoFormVisible = false;
        //提示信息
        this.$message({
          message: "添加小节成功",
          type: "success",
        });
        //刷新页面
        this.getChapterVideoByCourseId();
      });
    },
    saveOrUpdateVideo(){

        
        if (!this.video.id){
             this.addVideo()
        }else{
            this.updateVideoById()
        }
        
      },
      closeVideoDialog(){
          this.dialogVideoFormVisible = false
          this.fileList = []; // 取消关闭小节窗口 情况fileList
      },
        //删除小节
    removeVideo(videoId) {
      this.$confirm("此操作将永久删除小节信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //点击确定，执行then方法
        video.deleteById(videoId).then((resp) => {
          //删除成功
          //提示信息
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          //刷新页面
          this.getChapterVideoByCourseId();
        });
      });
    },
     //弹出编辑小节页面
     openEditVideo(id){
        //弹框
          this.dialogVideoFormVisible = true;
        //调用接口 
          video.getVideoById(id)
            .then(response => {

                this.video = response.data.video
                if(this.video.videoOriginalName != null && this.video.videoOriginalName != ""){
                  this.fileList=[{name:this.video.videoOriginalName}] // 上传的视频回显
                }
                  
                // console.log(video)
            })
      },
    //小节修改
    updateVideoById() {

      video.updateVideo(this.video).then((resp) => {
        //关闭弹框
        this.dialogVideoFormVisible = false;
        //提示信息
        this.$message({
          message: "修改小节成功",
          type: "success",
        });
        //刷新页面
        this.getChapterVideoByCourseId();
      });
    },

  // 视频上传
      //上传成功执行方法
    handleVodUploadSuccess(response,file,fileList){
        //上传视频id赋值
        this.video.videoSourceId = response.data.videoId
        //上传视频名称赋值
        this.video.videoOriginalName = file.name
    },
    beforeVodRemove(file, fileList){
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
 //点击确定调用的方法
    handleVodRemove() {
            //调用接口的删除视频的方法
            video.deleteAliyunvod(this.video.videoSourceId)
                .then(response => {
                    //提示信息
                    this.$message({
                        type: 'success',
                        message: '删除视频成功!'
                    });
                    //把文件列表清空
                    this.fileList = []
                    //把video视频id和视频名称值清空
                    //上传视频id赋值
                    this.video.videoSourceId = ''
                    //上传视频名称赋值
                    this.video.videoOriginalName = ''
                })
        },
         handleUploadExceed() {
            this.$message.warning('想要重新上传视频，请先删除已上传的视频')
        },

    
  },
  created() {
      //获取路由里的id值
      if(this.$route.params && this.$route.params.id){
       this.courseId = this.$route.params.id
      }
      //根据课程id查询对应的课程章节和小结
      this.getChapterVideoByCourseId();
    }
};
</script>

<style scoped>
.chanpterList{
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
}
.chanpterList li{
  position: relative;
}
.chanpterList p{
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #DDD;
  position: relative;
}
.chanpterList .acts {
    float: right;
    font-size: 14px;
    position: relative;
    z-index: 1;
}

.videoList{
  padding-left: 50px;
}
.videoList p{
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #DDD;
}

</style>