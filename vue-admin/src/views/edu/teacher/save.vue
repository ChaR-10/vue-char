.<template>
    <div class="app-container">
        <el-form label-width="120px">
            <el-form-item label="讲师名称">
                <el-input v-model="teacher.name" />
            </el-form-item>
            <el-form-item label="讲师排序">
                <el-input-number
                                 v-model="teacher.sort"
                                 controls-position="right"
                                 min="0"
                                 />
            </el-form-item>
            <el-form-item label="讲师头衔">
                <el-select v-model="teacher.level" clearable placeholder="选择讲师头衔">
                    <!--
数据类型一定要和取出的json中的一致，否则没法回填
因此，这里value使用动态绑定的值，保证其数据类型是number
-->
                    <el-option :value="1" label="高级讲师" />
                    <el-option :value="2" label="首席讲师" />
                </el-select>
            </el-form-item>
            <el-form-item label="讲师资历">
                <el-input v-model="teacher.career" />
            </el-form-item>
            <el-form-item label="讲师简介">
                <el-input v-model="teacher.intro" :rows="10" type="textarea" />
            </el-form-item>
            <!-- 讲师头像：TODO -->
            <el-form-item>
                <el-button
                           :disabled="saveBtnDisabled"
                           type="primary"
                           @click="saveOrUpdate"
                           >保存</el-button
                    >
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    //引入对应的新增api方法
    import teacherApi from "@/api/edu/teacher.js";

export default {
    data() {
        return {
            teacher: {
                name: "",
                sort: 0,
                level: 1,
                career: "",
                intro: "",
                avatar: "",
            },
            saveBtnDisabled: false, // 保存按钮是否禁用,
        };
    },
    methods: {
        saveOrUpdate() {
            this.saveBtnDisabled = true;
            this.saveData();
        },
        // 保存
        saveData() {
            teacherApi.saveTeacher(this.teacher).then((resp) => {//添加成功
                //提示信息
                this.$message({
                    message: "添加讲师记录成功",
                    type: "success",
                });
                //回到讲师列表 路由跳转
                this.$router.push({path: '/teacher/table'})
            });
        },
    },
};
</script>
