<template>
  <div class="all">
      <header>
        <span style="margin:10px 8px 8px 10.2%">IP :</span><span><el-input v-model="searchValue.ip"></el-input></span>
          <span style="margin:10px 8px 8px 12.05%">境内外 :</span><span>
              <el-select v-model="value2"  clearable placeholder="请选择" ref="selectLable2">
                <el-option
                  v-for="item in options2"
                  :key="item.value2"
                  :label="item.label2"
                  :value="item.value2">
                </el-option>
              </el-select>
            </span>
            <span style="margin:10px 8px 8px 11.05%">备案归属 :</span><span><el-input v-model="searchValue.owner"></el-input></span><br/>
          <span style="margin:2px 8px 8px 5.9%">起始时间 :</span><span><el-date-picker
            v-model="start_time"
            type="datetime"
            placeholder="选择时间"
            align="right"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker></span>
          <span style="margin:2px 8px 8px 10.7%">终止时间 :</span><span><el-date-picker
            v-model="end_time"
            type="datetime"
            placeholder="选择时间"
            align="right"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker></span>
          <span style="margin:2px 8px 8px 9.6%">数据库类型 :</span>
            <span>
              <el-select v-model="value"  clearable placeholder="请选择" ref="selectLable1">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </span><br/>
          <span style="margin:2px 8px 8px 8.7%">省份 :</span><span><el-input v-model="searchValue.province"></el-input></span>
          <span style="margin:2px 8px 8px 13.5%">地市 :</span><span><el-input v-model="searchValue.city"></el-input></span>
          <span style="margin:2px 8px 8px 13.75%">区县 :</span><span><el-input v-model="searchValue.district"></el-input></span>
          
          
          <span style="margin:-6px 8px 8px 11%"><el-button @click="search()">查询</el-button></span>
        
      </header>
      <section class="Body">
        <el-table
          :data="tableData.slice(
                    (currentPage - 1) * pagesize,
                    currentPage * pagesize
                  )"
          class="tableClass"
          border
          stripe
          size="small"
          v-loading="loading"
          style="width:96%;margin: auto;"
          ref="multipleTable"          
          tooltip-effect="dark"
          >
          
          <el-table-column
          
            prop="dip"
            label="IP"
            min-width="116"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="port"
            label="端口"
            min-width="55"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="min_time"
            label="起始时间"
            min-width="141"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="max_time"
            label="终止时间"
            min-width="141"
            show-overflow-tooltip>
          </el-table-column>
          
          <el-table-column
            prop="s_c_boundary"
            label="备案归属"
            min-width="69"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="database_type"
            label="数据库类型"
            min-width="97"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="c_region"
            label="省份"
            min-width="60"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="c_city"
            label="地市"
            min-width="60"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="c_district"
            label="区县"
            min-width="60"
            show-overflow-tooltip>

          </el-table-column>
          <el-table-column
            prop="company"
            label="单位"
            min-width="190"
            show-overflow-tooltip>

          </el-table-column>
        </el-table>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pagesize"
                layout="total,sizes,prev, pager, next, jumper"
                :total="tableData.length"
              >
              </el-pagination>
      </section>
  </div>
</template>

<script>
  import axios from 'axios';
  import { Message } from "element-ui";
  export default {
  name:'info1',
  data(){
    return{
      loading:false,
      start_time:this.getYesterday(),
      end_time:this.getNowtime(),
      currentPage: 1,
      pagesize: 10,
      searchValue:{
        ip: "",
        time:"",
        s_time: "",
        d_time: "",
        owner: "",
        province: "",
        city: "",
        district: ""

      },
      
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
      tableData:[
      //   {
      //   dip:'191.168.444.555',
      //   port:'9200',
      //   min_time:'2022-09-03 04:14:53',
      //   max_time:'2022-09-03 21:23:53',
      //   s_c_boundary:'境内',
      //   c_region:'四川省',
      //   c_city:'成都市',
      //   c_district:'新都区',
      //   company:'成都市武侯区行政审批局',
      //   database_type:'ElasticSearch',
        
      // },
      // {
      //   dip:'191.168.444.555',
      //   port:'9200',
      //   min_time:'2022-09-03 04:14:53',
      //   max_time:'2022-09-03 21:23:53',
      //   s_c_boundary:'境内',
      //   c_region:'四川省',
      //   c_city:'成都市',
      //   c_district:'新都区',
      //   company:'成都市武侯区行政审批局',
      //   database_type:'ElasticSearch'
      // },
      // {
      //   dip:'191.168.444.555',
      //   port:'9200',
      //   min_time:'2022-09-03 04:14:53',
      //   max_time:'2022-09-03 21:23:53',
      //   s_c_boundary:'境内',
      //   c_region:'四川省',
      //   c_city:'成都市',
      //   c_district:'新都区',
      //   company:'成都市武侯区行政审批局',
      //   database_type:'ElasticSearch'
      // },
    ],
      options: [{
          value: '选项1',
          label: 'Mysql'
        }, {
          value: '选项2',
          label: 'MongoDB'
        }, {
          value: '选项3',
          label: 'Redis'
        }, {
          value: '选项4',
          label: 'ElasticSearch'
        }, {
          value: '选项5',
          label: 'PostgreSQL'
        }, {
          value: '选项6',
          label: 'SqlServer'
        }, {
          value: '选项7',
          label: 'Oracle'
        }],
        value: '',
        options2: [{
          value2: '选项1',
          label2: '境内'
        }, {
          value2: '选项2',
          label2: '境外'
        }],
        value2: ''
    }
    
  },
  created(){
    // console.log('取出的database_type：'+this.$store.state.reqdata.database_type)
    if(this.$store.state.reqdata2){
      this.searchValue.ip = this.$store.state.reqdata2.ip,
      this.start_time = this.$store.state.reqdata2.s_time,
      this.end_time = this.$store.state.reqdata2.e_time,
      this.searchValue.owner = this.$store.state.reqdata2.owner,
      this.value = this.$store.state.reqdata2.database_type,
      this.value2 = this.$store.state.reqdata2.area_type
      this.searchValue.province = this.$store.state.reqdata2.province,
      this.searchValue.city = this.$store.state.reqdata2.city,
      this.searchValue.district = this.$store.state.reqdata2.district
    }
    
  },
  methods:{
    getNowtime(){
      // 获取当前时间
      var _this = this;
    　　let yy = new Date().getFullYear();
    　　let mm = new Date().getMonth()+1<10? '0'+(new Date().getMonth()-0+1) : (new Date().getMonth()-0+1);
    　　let dd = new Date().getDate()<10? '0'+new Date().getDate() : new Date().getDate();
    　　let hh = new Date().getHours()<10 ? '0'+new Date().getHours() : new Date().getHours();
    　　let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
    　　let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
    　　_this.gettime = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
        console.log(typeof mm)
    　　console.log(_this.gettime)
        return _this.gettime
    },
    getYesterday(){
      var _this = this;
    　　let yy = new Date().getFullYear();
    　　let mm = new Date().getMonth()+1<10? '0'+(new Date().getMonth()-0+1) : (new Date().getMonth()-0+1);
    　　let dd = new Date().getDate()-1<10? '0'+(new Date().getDate()-0-1) : (new Date().getDate()-0-1);
    　　let hh = new Date().getHours()<10 ? '0'+new Date().getHours() : new Date().getHours();
    　　let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
    　　let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
    　　_this.gettime = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
    　　console.log(_this.gettime)
        return _this.gettime
    },
    handleSizeChange(val) {
      this.pagesize = val;
      //console.log(`每页${val}条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      //console.log(`当前页: ${val}`);
    },
    search(){
      // this.loading = true;
      this.$store.dispatch('updatereqdata2',{
              ip: this.searchValue.ip,
              s_time:this.start_time,
              e_time:this.end_time,
              owner: this.searchValue.owner,
              database_type:this.value,
              area_type:this.value2,
              province: this.searchValue.province,
              city: this.searchValue.city,
              district: this.searchValue.district
            })
      // console.log('存入的database_type：'+this.$store.state.reqdata2.database_type)
      axios({
        method:"post",
        url:"/search_database_info",
        data: {
            token: this.$store.state.token,
            req_data: {
              ip: this.$store.state.reqdata2.ip||this.searchValue.ip,
              area_type:this.$refs.selectLable2.selected.label,
              s_time:this.$store.state.reqdata2.s_time||this.start_time,
              e_time:this.$store.state.reqdata2.e_time||this.end_time,
              owner: this.$store.state.reqdata2.owner||this.searchValue.owner,
              database_type:this.$refs.selectLable1.selected.label,
              province: this.$store.state.reqdata2.province||this.searchValue.province,
              city: this.$store.state.reqdata2.city||this.searchValue.city,
              district: this.$store.state.reqdata2.district||this.searchValue.district
            },
        },
      })
        .then((rep) => {
          this.tableData = rep.data.data;
          this.loading = false;
        }).catch(()=> {
          Message({
            message: "用户信息异常,请重试！",
            type: "error",
          });
          //  window.sessionStorage.clear();
          //   // this.$store.dispatch("updateuserinfo", []);
          //   this.$router.replace("/");
          //   //触发后禁止浏览器的后退键
          //   history.pushState(null, null, document.URL);
          //   window.addEventListener(
          //     "popstate",
          //     function (e) {
          //       history.pushState(null, null, document.URL);
          //     },
          //     false
          //   );
        });
        
    },
  },
  mounted(){
    this.search()
  },
  watch:{
    start_time:{
      handler(newValue) {
        var s_date = new Date(newValue)
        var s_time = s_date.getTime()
        // console.log(s_time);
        var e_date = new Date(this.end_time)
        var e_time = e_date.getTime()
        console.log(e_time);
        if(s_time<=e_time){return}
        else if(s_time>e_time){
          this.start_time = this.end_time
        }
      },
    },
    end_time:{
      handler(newValue) {
        var e_date = new Date(newValue)
        var e_time = e_date.getTime()
        // console.log(s_time);
        var s_date = new Date(this.start_time)
        var s_time = s_date.getTime()
        // console.log(e_time);
        if(s_time<=e_time){return}
        else if(s_time>e_time){
          this.end_time = this.start_time
        }
      },
    },
  }
}
</script>

<style scoped lang="less">
  
  /deep/.tableClass .cell {
  // padding-bottom: 12px;
  height: 20px;
  line-height: 20px !important;
}
  /deep/  .el-icon-time:before {
  display: none;
    content: "\e71f";
}
/deep/.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 162px;
}
.all{
  border:1px solid #dcdfe6;
}
// li{
//     display: inline-block;
//     position: relative;
//     list-style-type: none;
//   }
  /deep/.el-input__suffix {
  top: -1px;
}
/deep/.el-input__icon {
  line-height: inherit;
}
/deep/  .el-input__inner {
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 20px;
    line-height: 20px;
    outline: 20px;
    padding: 0 8px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 162px;
}
/deep/.el-button {
  line-height: 0.1;
  border-radius: 5px;
  letter-spacing: 10px;
  padding:12px 21px 12px 28px;
  margin:8px 0 5px -12px;
}
/deep/.el-pagination>.el-pagination__sizes>.el-select .el-select--mini>.el-input .el-input--mini .el-input--suffix>.el-input__inner{
  background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 20px;
    line-height: 20px;
    outline: 20px;
    padding: 0 8px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100px!important;
}
/deep/.el-pagination__sizes .el-input__inner{
    // border-color: #18ab8f;
    width: 100px;
}
/deep/.el-pagination__jump .el-input__inner{
    // border-color: #18ab8f;
    width: 45px;
}
span{
  display: inline-block;
  // float: right;
}
.Body{
  margin: 0 auto;
  text-align: center;
}

</style>