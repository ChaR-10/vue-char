.<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%"
      border
      fit
      highlight-current-row
      element-loading-text="数据加载中"
      v-loading="listLoading"
    >
      <el-table-column prop="date" label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="80"> </el-table-column>
      <el-table-column label="头衔" width="80">
        <template slot-scope="scope">
          {{ scope.row.level === 1 ? "高级讲师" : "首席讲师" }}
        </template>
      </el-table-column>
      <el-table-column prop="intro" label="资历" />
      <el-table-column prop="gmtCreate" label="添加时间" width="160" />
      <el-table-column prop="sort" label="排序" width="60" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/edu/teacher/edit/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >修改</el-button
            >
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
<el-pagination
               background
               layout="prev, pager, next,total,jumper"
               :total="total"
               :page-size="limit"
               style="padding: 30px 0; text-align: center"
               :current-page="page"
               @current-change="getList"
               >
</el-pagination>

  </div>
</template>


<script>
//引入要调用的方法，teacher.js文件
import teacher from "@/api/edu/teacher.js";

export default {
  //写核心代码位置
  data() {
    //1、定义变量和初始值
    return {
      list: null, //查询之后给接口返回的数据装的集合
      page: 1, //当前页
      limit: 4, //每页显示记录数
      teacherQuery: {}, //条件封装对象
      total: 0, //总记录数
    };
  },
  created() {
    //页面渲染之前执行，调用method定义的方法
    //调用
    this.getList();
  },
  methods: {
    //调用具体的方法，调用teacher.js定义的方法
    //讲师列表的方法
    getList(page=1) {
        this.page = page;
      teacher
        .getTeacherListPage(this.page, this.limit, this.teacherQuery)
        .then((resp) => {
          //resp接口返回的数据
          // console.log(resp);
          this.list = resp.data.rows;
          console.log(this.list);
          this.total = resp.data.total;
          console.log(this.total);
        }) //请求成功
        .catch((err) => {
          console.log(err);
        }); //请求失败
    },
  },
};
</script>

<style></style>
