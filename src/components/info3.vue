<template>
  <div class="all">
    <header>
      <el-row>
          <el-col :span="8">
            <div>
              <span style="margin:10px 8px 8px 0; width: 40%;text-align: right;">源IP :</span><span style="width: 50%;">
                <el-input v-model="searchValue.sourceIP" maxlength="15"></el-input>
              </span>
            </div>
            <div>
              <span style="margin:2px 8px 8px 0; width: 40%;text-align: right;">起始时间 :</span><span style="width: 50%;">
                <el-date-picker v-model="start_time" type="datetime" placeholder="选择时间" align="right"
                  :picker-options="pickerOptions" value-format="yyyy-MM-dd HH:mm:ss" @focus="value3=''">
                </el-date-picker>
              </span>
            </div>
            <div>
              <span style="margin:2px 8px 8px 0; width: 40%;text-align: right;">省份 :</span><span style="width: 50%;">
                <el-input v-model="searchValue.destProvince" maxlength="15"></el-input>
              </span>
            </div>
            <div>
              <span style="margin:2px 8px 8px 0; width: 40%;text-align: right;">数据库类型 :</span>
              <span style="width: 50%;">
                <el-select v-model="value" clearable placeholder="请选择" ref="selectLable1">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </span>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <span style="margin:10px 8px 8px 0; width: 40%;text-align: right;">目的IP :</span><span style="width: 50%;">
                <el-input v-model="searchValue.destIP" maxlength="15"></el-input>
              </span>
            </div>
            <div>
              <span style="margin:2px 8px 8px 0; width: 40%;text-align: right;">终止时间 :</span><span style="width: 50%;">
                <el-date-picker v-model="end_time" type="datetime" placeholder="选择时间" align="right"
                  :picker-options="pickerOptions" value-format="yyyy-MM-dd HH:mm:ss" @focus="value3=''">
                </el-date-picker>
              </span>
            </div>
            <div>
              <span style="margin:2px 8px 8px 0; width: 40%;text-align: right;">地市 :</span><span style="width: 50%;">
                <el-input v-model="searchValue.destCity" maxlength="15"></el-input>
              </span>
            </div>
            <div>
              <span style="margin:-5px 60% 5px 30%">
                <el-button @click="search()">查询</el-button>
              </span>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <span style="margin:10px 8px 8px 0; width: 40%;text-align: right;">备案归属 :</span><span style="width: 50%;">
                <el-input v-model="searchValue.record" maxlength="20"></el-input>
              </span>
            </div>
            <div>
              <span style="margin:2px 8px 8px 0; width: 40%;text-align: right;">周期 :</span>
                <span >
                  <el-select v-model="value3" clearable placeholder="请选择" ref="selectLable3">
                    <el-option v-for="item in options3" :key="item.value3" :label="item.label3" :value="item.value3">
                    </el-option>
                  </el-select>
                </span>
                <el-button style="padding:2px;margin:0 0 0 9px;width: 20px" icon="el-icon-refresh" @click="updateTime()"></el-button>
            </div>
            <div>
              <span style="margin:2px 8px 8px 0; width: 40%;text-align: right;">区县 :</span><span style="width: 50%;">
                <el-input v-model="searchValue.destDistrict" maxlength="15"></el-input>
              </span>
            </div>
          </el-col>
        </el-row>
    </header>
    <section class="Body">
      <el-table :data="tableData.slice(
        (currentPage - 1) * pagesize,
        currentPage * pagesize
      )" class="tableClass" size="small" stripe border v-loading="loading" style="width:96%;margin: auto;"
        ref="multipleTable" tooltip-effect="dark">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="payload">
                <span style=" display: inline-block;">{{ props.row.payload }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="dip" label="目的IP" min-width="116" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="dport" label="目的端口" min-width="71" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="event_time" label="时间" min-width="141" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="sip" label="源IP" min-width="116" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="sport" label="源端口" min-width="61" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="database_type" label="数据库类型" min-width="95" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="status" label="操作类型" min-width="83" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="d_region" label="省份" min-width="59" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="d_city" label="地市" min-width="59" show-overflow-tooltip>

        </el-table-column>
        <el-table-column prop="d_district" label="区县" min-width="59" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="d_owner" label="IP备案信息" min-width="143" show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
      </el-pagination>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import { Message } from "element-ui";
import { getNumHoursAgo } from "@/utils/getNumHoursAgo"
export default {
  name: 'info1',
  data() {
    return {
      loading: false,
      currentPage: 1,
      pagesize: 10,
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

      start_time: getNumHoursAgo(1),
      end_time: this.getNowtime(),
      formData: '',
      searchValue: {
        sourceIP: "",
        destIP: "",
        record: "",
        destProvince: "",
        destCity: "",
        destDistrict: "",

      },
      tableData: [
          {
          event_time:"2022-09-04 12:28:50",
          database_type:"Elasticsearch",
          status:"es登陆成功",
          sip:"189.183.247.190",
          sport:50068,
          dip:"222.212.909.333",
          dport:9200,
          d_region:"四川省",
          d_city:"成都市",
          d_district:"市辖区",
          d_owner:"锦江肖小儿中医门诊部",
          payload:'sajsahkdjhfsadhafsdgasgagsafhsadnfsaduouhguossadnflsadngsasadfasdgrtwhdgsgjsgjhsdhsfhsfh4ty4whdsfhsdfhsfognasfkjsadhkgjdouhuworgwriogsadsdjafjksdafkjsabdjgbsasjdlfljsadfasjgdlkjsdalhdglsdhgaklasdjgasdjfoiasjdflksadjflsajdfoisjdfsadjflsaasjdlfkjasldgsangmsndgdfnwohguowrngsdansldfl'
        },
        {
          event_time:"2022-09-04 12:28:50",
          database_type:"Elasticsearch",
          status:"es登陆成功",
          sip:"18.183.247.190",
          sport:50068,
          dip:"222.212.90.33",
          dport:9200,
          d_region:"四川省",
          d_city:"成都市",
          d_district:"市辖区",
          d_owner:"锦江肖小儿中医门诊部"
        },
        {
          event_time:"2022-09-04 12:28:50",
          database_type:"Elasticsearch",
          status:"es登陆成功",
          sip:"189.183.247.190",
          sport:50068,
          dip:"222.212.909.333",
          dport:9200,
          d_region:"四川省",
          d_city:"成都市",
          d_district:"市辖区",
          d_owner:"锦江肖小儿中医门诊部",
          payload:'sajsahkdjhfsadhafsdgasgagsafhsadnfsaduouhguossadnflsadngsasadfasdgrtwhdgsgjsgjhsdhsfhsfh4ty4whdsfhsdfhsfognasfkjsadhkgjdouhuworgwriogsadsdjafjksdafkjsabdjgbsasjdlfljsadfasjgdlkjsdalhdglsdhgaklasdjgasdjfoiasjdflksadjflsajdfoisjdfsadjflsaasjdlfkjasldgsangmsndgdfnwohguowrngsdansldfl'
        },
        {
          event_time:"2022-09-04 12:28:50",
          database_type:"Elasticsearch",
          status:"es登陆成功",
          sip:"18.183.247.190",
          sport:50068,
          dip:"222.212.90.33",
          dport:9200,
          d_region:"四川省",
          d_city:"成都市",
          d_district:"市辖区",
          d_owner:"锦江肖小儿中医门诊部"
        },
        {
          event_time:"2022-09-04 12:28:50",
          database_type:"Elasticsearch",
          status:"es登陆成功",
          sip:"189.183.247.190",
          sport:50068,
          dip:"222.212.909.333",
          dport:9200,
          d_region:"四川省",
          d_city:"成都市",
          d_district:"市辖区",
          d_owner:"锦江肖小儿中医门诊部",
          payload:'sajsahkdjhfsadhafsdgasgagsafhsadnfsaduouhguossadnflsadngsasadfasdgrtwhdgsgjsgjhsdhsfhsfh4ty4whdsfhsdfhsfognasfkjsadhkgjdouhuworgwriogsadsdjafjksdafkjsabdjgbsasjdlfljsadfasjgdlkjsdalhdglsdhgaklasdjgasdjfoiasjdflksadjflsajdfoisjdfsadjflsaasjdlfkjasldgsangmsndgdfnwohguowrngsdansldfl'
        },
        {
          event_time:"2022-09-04 12:28:50",
          database_type:"Elasticsearch",
          status:"es登陆成功",
          sip:"18.183.247.190",
          sport:50068,
          dip:"222.212.90.33",
          dport:9200,
          d_region:"四川省",
          d_city:"成都市",
          d_district:"市辖区",
          d_owner:"锦江肖小儿中医门诊部"
        },
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
      options3: [{
        value3: '选项1',
        label3: '一小时'
      }, {
        value3: '选项2',
        label3: '六小时'
      }, {
        value3: '选项3',
        label3: '十二小时'
      }, {
        value3: '选项4',
        label3: '一天'
      }],
      value3: '选项1',
    }

  },
  created() {
    // console.log('取出的database_type：'+this.$store.state.reqdata.database_type)
    if (this.$store.state.reqdata3) {
      this.searchValue.sourceIP = this.$store.state.reqdata3.sip,
        this.searchValue.destIP = this.$store.state.reqdata3.dip,
        this.start_time = this.$store.state.reqdata3.s_time,
        this.end_time = this.$store.state.reqdata3.e_time,
        this.searchValue.record = this.$store.state.reqdata3.owner,
        this.value = this.$store.state.reqdata3.database_type,
        this.searchValue.destProvince = this.$store.state.reqdata3.d_province,
        this.searchValue.destCity = this.$store.state.reqdata3.d_city,
        this.searchValue.destDistrict = this.$store.state.reqdata3.d_district
    }

  },
  methods: {
    updateTime(){
      this.end_time = this.getNowtime()
        if(this.value3=='选项1'){
          this.start_time = getNumHoursAgo(1)
        }else if(this.value3=='选项2'){
          this.start_time = getNumHoursAgo(6)
        }else if(this.value3=='选项3'){
          this.start_time = getNumHoursAgo(12)
        }else if(this.value3=='选项4'){
          this.start_time = this.getYesterday()
        }
    },
    getNowtime() {
      // 获取当前时间
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() - 0 + 1) : (new Date().getMonth() - 0 + 1);
      let dd = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate();
      let hh = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours();
      let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
      let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
      _this.gettime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
      //     console.log(typeof mm)
      // 　　console.log(_this.gettime)
      return _this.gettime
    },
    getYesterday() {
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() - 0 + 1) : (new Date().getMonth() - 0 + 1);
      let dd = new Date().getDate() - 1 < 10 ? '0' + (new Date().getDate() - 0 - 1) : (new Date().getDate() - 0 - 1);
      let hh = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours();
      let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
      let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
      _this.gettime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
      //console.log(_this.gettime)
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
    search() {
      this.loading = true;

      this.$store.dispatch('updatereqdata3', {
        sip: this.searchValue.sourceIP,
        dip: this.searchValue.destIP,
        s_time: this.start_time,
        e_time: this.end_time,
        owner: this.searchValue.record,
        database_type: this.value,
        d_province: this.searchValue.destProvince,
        d_city: this.searchValue.destCity,
        d_district: this.searchValue.destDistrict
      })
      // console.log('存入的database_type：'+this.$store.state.reqdata3.database_type)
      axios({
        method: "post",
        url: "/search_attack_history",
        data: {
          token: this.$store.state.token,
          req_data: {
            sip: this.$store.state.reqdata3.sip || this.searchValue.sourceIP,
            dip: this.$store.state.reqdata3.dip || this.searchValue.destIP,
            s_time: this.$store.state.reqdata3.s_time || this.start_time,
            e_time: this.$store.state.reqdata3.e_time || this.end_time,
            owner: this.$store.state.reqdata3.owner || this.searchValue.record,
            database_type: this.$refs.selectLable1.selected.label,
            d_province: this.$store.state.reqdata3.d_province || this.searchValue.destProvince,
            d_city: this.$store.state.reqdata3.d_city || this.searchValue.destCity,
            d_district: this.$store.state.reqdata3.d_district || this.searchValue.destDistrict
          },
        },
      })
        .then((rep) => {
          // console.log("执行了then")
          // console.log(rep.data.data)
          this.tableData = rep.data.data;
          this.loading = false;
        }).catch(() => {
          // console.log("执行了catch")
          this.loading = false;
          Message({
            message: "用户信息异常,请重试！",
            type: "error",
          });
          window.sessionStorage.clear();
          this.$router.replace("/");
          //触发后禁止浏览器的后退键
          history.pushState(null, null, document.URL);
          window.addEventListener(
            "popstate",
            function (e) {
              history.pushState(null, null, document.URL);
            },
            false
          );
        });
      ;
    },
  },
  mounted() {
    // console.log(this.tableData.length);
    // if(this.tableData.length==0){
    //   console.log('执行了');
    //   this.search()
    // }else{
    //   console.log('没执行');
    // }
    // this.search()  // 7.6 测试暂时关闭

  },
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = true
    next(0)
  },
  watch: {
    start_time: {
      handler(newValue) {
        var s_date = new Date(newValue)
        var s_time = s_date.getTime()
        // console.log(s_time);
        var e_date = new Date(this.end_time)
        var e_time = e_date.getTime()
        // console.log(e_time);
        if (s_time <= e_time) { return }
        else if (s_time > e_time) {
          this.start_time = this.end_time
        }
      },
    },
    end_time: {
      handler(newValue) {
        var e_date = new Date(newValue)
        var e_time = e_date.getTime()
        // console.log(s_time);
        var s_date = new Date(this.start_time)
        var s_time = s_date.getTime()
        // console.log(e_time);
        if (s_time <= e_time) { return }
        else if (s_time > e_time) {
          this.end_time = this.start_time
        }
      },
    },
    value3:{
      handler(newValue) {
        this.end_time = this.getNowtime()
        if(newValue=='选项1'){
          this.start_time = getNumHoursAgo(1)
        }else if(newValue=='选项2'){
          this.start_time = getNumHoursAgo(6)
        }else if(newValue=='选项3'){
          this.start_time = getNumHoursAgo(12)
        }else if(newValue=='选项4'){
          this.start_time = this.getYesterday()
        }
      },
    }
  }
}
</script>

<style scoped lang="less">
/deep/.demo-table-expand {
  font-size: 0;
}

/deep/.demo-table-expand label {
  width: 80px;
  color: #99a9bf;

}

/deep/.el-table__expanded-cell {
  padding: 2px 0
}

/deep/.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  margin-left: 1%;
  width: 97%;
}

/deep/.el-form-item__content {
  // position: relative;
  display: inline-block;
  // background-color: pink;
  width: 92%
}

/deep/.el-form-item__content span {
  // background-color: purple;
  // position: absolute;
  // width:100%;
  word-break: break-word;
  margin-top: 7px;
  line-height: 26px;
}

/deep/.tableClass .cell {
  // padding-bottom: 12px;
  height: 20px;
  line-height: 20px !important;
}

/deep/ .el-icon-time:before {
  display: none;
  content: "\e71f";
}

/deep/.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 162px;
}

/deep/.el-pagination__sizes .el-input__inner {
  // border-color: #18ab8f;
  width: 100px;
}

/deep/.el-pagination__jump .el-input__inner {
  // border-color: #18ab8f;
  width: 45px;
}

.all {
  border: 1px solid #dcdfe6;
}

// li{
//     display: inline-block;
//     // float: left;
//     position: relative;
//     list-style-type: none;
//   }
/deep/.el-input__suffix {
  top: -1px;
}

/deep/.el-input__icon {
  line-height: inherit;
}

/deep/ .el-input__inner {
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
  transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
  width: 162px;
}

/deep/.el-button {
  line-height: 0.1;
  border-radius: 5px;
  letter-spacing: 10px;
  padding: 12px 21px 12px 28px;
  margin: 8px 0 5px 38px;
}

// /deep/.el-table__body .el-table__row{
//   height: 18px;
//   line-height: 18px;
// }
span {
  display: inline-block;
  // margin:1px 20px;
}

.Body {
  margin: 0 auto;
  text-align: center;
}
</style>
