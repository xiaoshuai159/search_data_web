<template>
  <div class="all">
    <header>
      <div>
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
            <div>
              <span style="margin:2px 8px 8px 0; width: 40%;text-align: right;">是否为重点单位 :</span>
              <span style="width: 50%;">
                <el-select v-model="zdValue" clearable placeholder="请选择" ref="selectLable1">
                  <el-option v-for="item in zdOptions" :key="item.value" :label="item.label" :value="item.value">
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
              <span style="margin:2px 8px 8px 0; width: 40%;text-align: right;"> 敏感程度 :</span>
              <span style="width: 50%;">
                <el-select v-model="mgValue" clearable placeholder="请选择" ref="selectLable1">
                  <el-option v-for="item in mgOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </span>
            </div>
            <div>
              <span style="margin:-5px 60% 5px 13%">
                <el-button @click="search()">查询</el-button>
              </span>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <span style="margin:10px 8px 8px 0; width: 40%;text-align: right;">备案归属 :</span><span style="width: 50%;">
                <el-input v-model="searchValue.record" maxlength="15"></el-input>
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
            <div>
              <span style="margin:2px 8px 8px 0; width: 40%;text-align: right;"> 风险等级 :</span>
              <span style="width: 50%;">
                <el-select v-model="fxValue" clearable placeholder="请选择" ref="selectLable1">
                  <el-option v-for="item in fxOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </span>
            </div>
          </el-col>
        </el-row>
      </div>
    </header>
    <section class="Body">
      <el-table :data="tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)" class="tableClass" size="small" stripe border v-loading="loading" style="width:96%;margin: auto;" ref="multipleTable" tooltip-effect="dark">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="载荷">
                <span style=" display: inline-block;">{{ props.row.payload }}</span>
              </el-form-item>
            </el-form>
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="还原信息">
                <div style="display: flex;justify-content: space-between;">
                  <!-- <span>数据库名：{{ props.row.database_name }}</span> -->
                  <span style="margin: 0 30px;">数据库名：baseinfo_user_info_2023_08_11</span>
                  <span style="margin: 0 30px;">表名：baseinfo_user_info_2023_08_11</span>
                  <span style="margin: 0 30px;">字段名：_type,aac001,aac002,aac003,aab301,aac004,aac005,aac006,aac007,aac009,aac010,aac011,aac012,aac014,aac015,aac017,aac020,aac024,aac028,aac058,aac147,aae005,aae006,aae007,aac067,aaz500,aae159,aae004,etl_insert_time,etl_update_time,aac016,sb_cblx,sb_cbzt,sb_jfzt,sb_cbdq,sb_sccb,sb_bccb,sb_cbdw,bie013,hjszd,is_gth,is_shixin,hjdlx,aae445,is_dzsb,sb_gs_cbzt,sb_sy_cbzt,sb_gs_jfzt,sb_sy_jfzt,is_qyfr,sbk_cklx,aac060,aac084,label_value_name,label_value_id,label_name,label_id</span>
                  <!-- <span>字段类型：{{ props.row.field_type }}</span> -->
                  <!-- <span>具体类型：{{ props.row.define_type }}</span> -->
                </div>
              </el-form-item>
            </el-form>
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="敏感数据">
                <div style="display: flex;justify-content: space-between;">
                  <span>特定身份：{{ props.row.id_imp }}</span>
                  <span>医疗健康：{{ props.row.med_health }}</span>
                  <span>金融账户：{{ props.row.fin_acc }}</span>
                  <span>行踪轨迹：{{ props.row.whe_track }}</span>
                  <!-- <span>具体类型：{{ props.row.define_type }}</span> -->
                </div>
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
        <el-table-column prop="is_important" label="是否为重点单位" min-width="105" show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column prop="mg_level" label="敏感程度" min-width="70" show-overflow-tooltip>
          <template slot-scope="props">
            <div style="text-align: center;">
              <el-tag v-if="props.row.mg_level == '高'" type="danger" size="mini">高</el-tag>
              <el-tag v-else-if="props.row.mg_level == '中'" type="warning" size="mini">中</el-tag>
              <el-tag v-else-if="props.row.mg_level == '低'" size="mini">低</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="mg_level" label="风险等级" min-width="70" show-overflow-tooltip>
          <template slot-scope="props">
            <div style="text-align: center;">
              <a class="mylink" style="color:red" v-if="props.row.mg_level == '高'" @click="openDialog('高',props.row)">高</a>
              <a class="mylink" style="color:orange" v-else-if="props.row.mg_level == '中'" @click="openDialog('中',props.row)">中</a>
              <a class="mylink" style="color:skyblue" v-else-if="props.row.mg_level == '低'" @click="openDialog('低',props.row)">低</a>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        <!-- tableData.length -->
      </el-pagination>
    </section>
    <el-dialog title="风险评价" :visible="dialogTableVisible" @close="dialogTableVisible = false" :append-to-body='true'>
      <div class="dialog-body">
						<div class="dialog-body-title">
							<span class="start-png"></span>
							基础信息
							<p class="dashed-bottom"></p>
							<p class="end-png"></p>
						</div>
            <el-row style="margin-top: 8px;">
              <el-col :span="12"><div><span class="dialog-body-left">重点单位：</span><span class="dialog-body-right">长葛市建设路街道办事处（产业集聚区）</span></div></el-col>
              <el-col :span="12"><div><span class="dialog-body-left">数据库类型：</span><span class="dialog-body-right">elasticsearch</span></div></el-col>
            </el-row>
            <div class="my-el-row">                  
                <div><span class="dialog-body-left">省份：</span><span class="dialog-body-right">河南省</span></div>
                <div><span class="dialog-body-left">地市：</span><span class="dialog-body-right">许昌市</span></div>
                <div><span class="dialog-body-left">区县：</span><span class="dialog-body-right">市辖区</span></div>
            </div>
            <div class="dialog-body-title" style="margin-top: 8px;">
							<span class="start-png"></span>
							预警信息
							<p class="dashed-bottom"></p>
							<p class="end-png"></p>
						</div>
						<div class="dialog-body-content">
              <el-table :data="tableData2" class="tableClass" size="small" stripe border v-loading="loading" style="width:96%;margin: auto;" ref="multipleTable" tooltip-effect="dark">
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
                <el-table-column prop="mg_type" label="敏感信息类型" min-width="95" show-overflow-tooltip>
                </el-table-column>
              </el-table>
						</div>
            <div class="dialog-body-title" style="margin-top: 8px;">
							<span class="start-png"></span>
							变化趋势
							<p class="dashed-bottom"></p>
							<p class="end-png"></p>
						</div>
            <div ref="mylineChart" style="width: 100%;height:210px;"></div>
					</div>
    </el-dialog>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import axios from 'axios';
import { Message } from "element-ui";
import dayjs from 'dayjs';
import { getNumHoursAgo } from "@/utils/getNumHoursAgo"
export default {
  name: 'info1',
  data() {
    return {
      total:43442,
      myChart: null,
      dialogTableVisible: false,
      selectedLevel: '',
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

      start_time: dayjs().subtract(3, 'day').format('YYYY-MM-DD HH:mm:ss'),
      end_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      formData: '',
      searchValue: {
        sourceIP: "",
        destIP: "",
        record: "",
        destProvince: "",
        destCity: "",
        destDistrict: "",

      },
      tableData2:[
      {
          event_time:dayjs().subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"elasticsearch",
          status:"登陆成功",
          sip:"68.235.44.87",
          sport:13736,
          dip:"123.13.206.63",
          dport:9200,
          d_region:"河南省",
          d_city:"许昌市",
          d_district:"市辖区",
          d_owner:"长葛市建设路街道办事处（产业集聚区）",
          is_important:'是',
          payload:"\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00",
          database_name:'mysql',
          list_name:'datalist_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'身份证号-210782197902212613',
          med_health:'诊断号-AC65132764',
          fin_acc:'银行卡号-6222198561354561',
          whe_track:'实时位置-贺州市烟草公司',
          mg_type:'身份证号-210782197902212613'
        },
        {
          event_time:dayjs().subtract(3, 'day').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"elasticsearch",
          status:"登陆成功",
          sip:"68.235.47.121",
          sport:17457,
          dip:"123.13.206.63",
          dport:9200,
          d_region:"河南省",
          d_city:"许昌市",
          d_district:"市辖区",
          d_owner:"长葛市建设路街道办事处（产业集聚区）",
          is_important:'是',
          payload:"\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00",
          database_name:'mysql',
          list_name:'datalist_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'身份证号-210782197902212613',
          med_health:'诊断号-AC65132764',
          fin_acc:'银行卡号-6222198561354561',
          whe_track:'实时位置-贺州市烟草公司',
          // mg_type:'诊断号-AC65132764'
        },
        {
          event_time:dayjs().subtract(4, 'day').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"elasticsearch",
          status:"登陆成功",
          sip:"68.235.4.24",
          sport:37102,
          dip:"123.13.206.63",
          dport:9200,
          d_region:"河南省",
          d_city:"许昌市",
          d_district:"市辖区",
          d_owner:"长葛市建设路街道办事处（产业集聚区）",
          is_important:'是',
          payload:"\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00",
          database_name:'mysql',
          list_name:'datalist_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'身份证号-210782197902212613',
          med_health:'诊断号-AC65132764',
          fin_acc:'银行卡号-6222198561354561',
          whe_track:'实时位置-贺州市烟草公司',
          // mg_type:'诊断号-AC65132764'
        },
        {
          event_time:dayjs().subtract(6, 'day').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"elasticsearch",
          status:"登陆成功",
          sip:"68.235.142.77",
          sport:17542,
          dip:"123.13.206.63",
          dport:9200,
          d_region:"河南省",
          d_city:"许昌市",
          d_district:"市辖区",
          d_owner:"长葛市建设路街道办事处（产业集聚区）",
          is_important:'是',
          payload:"\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00",
          database_name:'mysql',
          list_name:'datalist_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'身份证号-210782197902212613',
          med_health:'诊断号-AC65132764',
          fin_acc:'银行卡号-6222198561354561',
          whe_track:'实时位置-贺州市烟草公司',
          // mg_type:'银行卡号-6222198561354561'
        },
        {
          event_time:dayjs().subtract(9, 'day').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"elasticsearch",
          status:"登陆成功",
          sip:"68.235.34.57",
          sport:13457,
          dip:"123.13.206.63",
          dport:9200,
          d_region:"河南省",
          d_city:"许昌市",
          d_district:"市辖区",
          d_owner:"长葛市建设路街道办事处（产业集聚区）",
          is_important:'是',
          payload:"\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00",
          database_name:'mysql',
          list_name:'datalist_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'身份证号-210782197902212613',
          med_health:'诊断号-AC65132764',
          fin_acc:'银行卡号-6222198561354561',
          whe_track:'实时位置-贺州市烟草公司',
          // mg_type:'实时位置-贺州市烟草公司'
        },
        {
          event_time:dayjs().subtract(10, 'day').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"elasticsearch",
          status:"查询操作",
          sip:"68.235.13.45",
          sport:17644,
          dip:"123.13.206.63",
          dport:9200,
          d_region:"浙江省",
          d_city:"杭州市",
          d_district:"滨江区",
          d_owner:"杭州国际学校",
          is_important:'是',
          payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
          database_name:'mysql',
          list_name:'dl_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'身份证号-210782197902212613',
          med_health:'诊断号-AC65132764',
          fin_acc:'银行卡号-6222198561354561',
          whe_track:'实时位置-贺州市烟草公司',
          // mg_type:'实时位置-贺州市烟草公司'
        },
        {
          event_time:dayjs().subtract(13, 'day').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"elasticsearch",
          status:"查询操作",
          sip:"68.235.120.44",
          sport:18555,
          dip:"123.13.206.63",
          dport:9200,
          d_region:"浙江省",
          d_city:"杭州市",
          d_district:"滨江区",
          d_owner:"杭州国际学校",
          is_important:'是',
          payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
          database_name:'mysql',
          list_name:'dl_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'身份证号-210782197902212613',
          med_health:'诊断号-AC65132764',
          fin_acc:'银行卡号-6222198561354561',
          whe_track:'实时位置-贺州市烟草公司',
          // mg_type:'银行卡号-6222198561354561'
        },
        {
          event_time:dayjs().subtract(15, 'day').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"elasticsearch",
          status:"查询操作",
          sip:"68.235.33.4",
          sport:25611,
          dip:"123.13.206.63",
          dport:9200,
          d_region:"浙江省",
          d_city:"杭州市",
          d_district:"滨江区",
          d_owner:"杭州国际学校",
          is_important:'是',
          payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
          database_name:'mysql',
          list_name:'dl_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'身份证号-210782197902212613',
          med_health:'诊断号-AC65132764',
          fin_acc:'银行卡号-6222198561354561',
          whe_track:'实时位置-贺州市烟草公司',
          // mg_type:'身份证号-210782197902212613'
        },
        {
          event_time:dayjs().subtract(19, 'day').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"elasticsearch",
          status:"查询操作",
          sip:"68.235.11.27",
          sport:31345,
          dip:"123.13.206.63",
          dport:9200,
          d_region:"浙江省",
          d_city:"杭州市",
          d_district:"滨江区",
          d_owner:"杭州国际学校",
          is_important:'是',
          payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
          database_name:'mysql',
          list_name:'dl_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'身份证号-210782197902212613',
          med_health:'诊断号-AC65132764',
          fin_acc:'银行卡号-6222198561354561',
          whe_track:'实时位置-贺州市烟草公司',
          // mg_type:'身份证号-210782197902212613'
        },
        {
          event_time:dayjs().subtract(23, 'day').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"elasticsearch",
          status:"查询操作",
          sip:"68.235.17.22",
          sport:34578,
          dip:"123.13.206.63",
          dport:9200,
          d_region:"浙江省",
          d_city:"杭州市",
          d_district:"滨江区",
          d_owner:"杭州国际学校",
          is_important:'是',
          payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
          database_name:'mysql',
          list_name:'dl_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'身份证号-210782197902212613',
          med_health:'诊断号-AC65132764',
          fin_acc:'银行卡号-6222198561354561',
          whe_track:'实时位置-贺州市烟草公司',
          // mg_type:'银行卡号-6222198561354561'
        }
      ],
      tableData: [
          {
          event_time:dayjs().format('YYYY-MM-DD HH:mm:ss'),
          database_type:"MySQL",
          status:"查询操作",
          sip:"68.235.44.87",
          sport:13736,
          dip:"123.13.206.63",
          dport:3306,
          d_region:"河南省",
          d_city:"许昌市",
          d_district:"市辖区",
          d_owner:"长葛市建设路街道办事处（产业集聚区）",
          is_important:'是',
          payload:"SELECT database_name,list_name FROM index_name WHERE database_name = 'ms' AND list_name = 'datalist_one' AND field_name = 'f_n' AND field_type = 'string' AND id_imp = '210782197902212613'",
          database_name:'ms',
          list_name:'datalist_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'身份证号-210782197902212613',
          med_health:'-',
          fin_acc:'-',
          whe_track:'-'
        },
        {
          event_time:dayjs().subtract(1.1, 'minute').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"MySQL",
          status:"查询操作",
          sip:"23.41.231.41",
          sport:47455,
          dip:"35.127.32.222",
          dport:3306,
          d_region:"辽宁省",
          d_city:"锦州市",
          d_district:"古塔区",
          d_owner:"锦州医科大学附属第三医院",
          is_important:'是',
          payload:"SELECT database_name,list_name FROM index_name WHERE database_name = 'ms' AND list_name = 'datalist_one' AND field_name = 'f_n' AND field_type = 'string' AND id_imp = '120103197211230011'",
          database_name:'ms',
          list_name:'datalist_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'身份证号-120103197211230011',
          med_health:'-',
          fin_acc:'-',
          whe_track:'-'
        },
        {
          event_time:dayjs().subtract(2.4, 'minute').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"MySQL",
          status:"查询操作",
          sip:"98.130.147.10",
          sport:10068,
          dip:"242.231.91.83",
          dport:3306,
          d_region:"江苏省",
          d_city:"常州市",
          d_district:"天宁区",
          d_owner:"天宁区",
          is_important:'是',
          payload:"SELECT database_name,list_name FROM index_name WHERE database_name = 'ms' AND list_name = 'datalist_one' AND field_name = 'f_n' AND field_type = 'string' AND med_health = 'AB69876313'",
          database_name:'MD',
          list_name:'datalist_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'-',
          med_health:'诊断号-AB69876313',
          fin_acc:'-',
          whe_track:'-'
        },
        {
          event_time:dayjs().subtract(3.9, 'minute').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"Elasticsearch",
          status:"登陆成功",
          sip:"78.56.223.41",
          sport:23345,
          dip:"34.145.77.223",
          dport:9200,
          d_region:"浙江省",
          d_city:"绍兴市",
          d_district:"越城区",
          d_owner:"绍兴市第一人民医院",
          is_important:'是',
          payload:"SELECT * FROM index_name WHERE database_name = 'ms' AND list_name = 'datalist_one' AND field_name = 'f_n' AND field_type = 'string'",
          database_name:'mysql',
          list_name:'datalist_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'-',
          med_health:'-',
          fin_acc:'-',
          whe_track:'实时位置-绍兴市第一人民医院'
        },
        {
          event_time:dayjs().subtract(5.2, 'minute').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"Elasticsearch",
          status:"登陆成功",
          sip:"43.156.37.77",
          sport:23324,
          dip:"53.236.64.75",
          dport:9200,
          d_region:"湖南省",
          d_city:"岳阳市",
          d_district:"岳阳市",
          d_owner:"岳阳市公安局",
          is_important:'是',
          payload:"SELECT * FROM index_name WHERE database_name = 'ms' AND list_name = 'datalist_one' AND field_name = 'f_n' AND field_type = 'string'",
          database_name:'mysql',
          list_name:'datalist_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'身份证号-120221197911290013',
          med_health:'-',
          fin_acc:'-',
          whe_track:'-'
        },
        {
          event_time:dayjs().subtract(6.8, 'minute').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"MySQL",
          status:"查询操作",
          sip:"167.56.34.13",
          sport:33011,
          dip:"45.79.31.45",
          dport:3306,
          d_region:"河南省",
          d_city:"驻马店市",
          d_district:"驿城区",
          d_owner:"驻马店市第一中学",
          is_important:'是',
          payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
          database_name:'mysql',
          list_name:'dl_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'-',
          med_health:'诊断号-CA8963214',
          fin_acc:'-',
          whe_track:'-'
        },
        {
          event_time:dayjs().subtract(7.9, 'minute').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"MySQL",
          status:"查询操作",
          sip:"175.224.57.75",
          sport:34530,
          dip:"65.91.119.59",
          dport:3306,
          d_region:"山西省",
          d_city:"长治市",
          d_district:"城区",
          d_owner:"中国联通长治分公司",
          is_important:'是',
          payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
          database_name:'mysql',
          list_name:'dl_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'-',
          med_health:'-',
          fin_acc:'银行卡号-6222198561354561',
          whe_track:'-'
        },
        {
          event_time:dayjs().subtract(8.3, 'minute').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"SqlServer",
          status:"删除操作",
          sip:"68.235.44.87",
          sport:13736,
          dip:"161.51.68.252",
          dport:1433,
          d_region:"安徽省",
          d_city:"亳州市",
          d_district:"谯城区",
          d_owner:"亳州市交通运输局",
          is_important:'是',
          payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
          database_name:'sqls',
          list_name:'dl_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'身份证号-12022519670801003X',
          med_health:'-',
          fin_acc:'-',
          whe_track:'-'
        },
        {
          event_time:dayjs().subtract(9.5, 'minute').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"Oracle",
          status:"查询操作",
          sip:"97.84.123.21",
          sport:45451,
          dip:"75.32.123.75",
          dport:1521,
          d_region:"广西壮族自治区",
          d_city:"贺州市",
          d_district:"八步区",
          d_owner:"贺州市烟草公司",
          is_important:'是',
          payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
          database_name:'oracle',
          list_name:'dl_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'-',
          med_health:'-',
          fin_acc:'-',
          whe_track:'实时位置-贺州市烟草公司'
        },
        {
          event_time:dayjs().subtract(10.6, 'minute').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"SqlServer",
          status:"查询操作",
          sip:"75.86.83.242",
          sport:57311,
          dip:"54.36.78.31",
          dport:1433,
          d_region:"浙江省",
          d_city:"杭州市",
          d_district:"滨江区",
          d_owner:"杭州国际学校",
          is_important:'是',
          payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
          database_name:'mysql',
          list_name:'dl_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'身份证-120223197507215196',
          med_health:'-',
          fin_acc:'-',
          whe_track:'-'
        },{
          event_time:dayjs().subtract(11.9, 'minute').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"Oracle",
          status:"登陆成功",
          sip:"68.235.44.87",
          sport:13736,
          dip:"222.212.90.33",
          dport:9200,
          d_region:"河南省",
          d_city:"许昌市",
          d_district:"市辖区",
          d_owner:"长葛市建设路街道办事处（产业集聚区）",
          is_important:'是',
          payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
          database_name:'oracle',
          list_name:'datalist_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'-',
          med_health:'诊断号-AC65132764',
          fin_acc:'-',
          whe_track:'-'
        },{
          event_time:dayjs().subtract(13.6, 'minute').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"Elasticsearch",
          status:"登陆成功",
          sip:"68.235.44.87",
          sport:13736,
          dip:"123.13.206.63",
          dport:9200,
          d_region:"河南省",
          d_city:"许昌市",
          d_district:"市辖区",
          d_owner:"长葛市建设路街道办事处（产业集聚区）",
          is_important:'是',
          payload:"\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00",
          database_name:'es',
          list_name:'datalist_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'身份证号-210782197902212613',
          med_health:'-',
          fin_acc:'-',
          whe_track:'-'
        },
        {
          event_time:dayjs().subtract(13.9, 'minute').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"Redis",
          status:"插入操作",
          sip:"23.41.231.41",
          sport:47455,
          dip:"35.127.32.222",
          dport:2020,
          d_region:"辽宁省",
          d_city:"锦州市",
          d_district:"古塔区",
          d_owner:"锦州医科大学附属第三医院",
          is_important:'是',
          payload:"\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00",
          database_name:'redis',
          list_name:'datalist_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'身份证号-120103197211230011',
          med_health:'-',
          fin_acc:'-',
          whe_track:'-'
        },
        {
          event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"MongoDB",
          status:"删除操作",
          sip:"98.130.147.10",
          sport:10068,
          dip:"242.231.91.83",
          dport:10020,
          d_region:"江苏省",
          d_city:"常州市",
          d_district:"天宁区",
          d_owner:"天宁区",
          is_important:'是',
          payload:"\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00",
          database_name:'MD',
          list_name:'datalist_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'-',
          med_health:'诊断号-AB69876313',
          fin_acc:'-',
          whe_track:'-'
        },
        {
          event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"Elasticsearch",
          status:"登陆成功",
          sip:"68.235.44.87",
          sport:13736,
          dip:"123.13.206.63",
          dport:3900,
          d_region:"浙江省",
          d_city:"绍兴市",
          d_district:"越城区",
          d_owner:"绍兴市第一人民医院",
          is_important:'是',
          payload:"\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00",
          database_name:'mysql',
          list_name:'datalist_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'-',
          med_health:'-',
          fin_acc:'-',
          whe_track:'实时位置-绍兴市第一人民医院'
        },
        {
          event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"Elasticsearch",
          status:"登陆成功",
          sip:"43.156.37.77",
          sport:23324,
          dip:"53.236.64.75",
          dport:4352,
          d_region:"湖南省",
          d_city:"岳阳市",
          d_district:"岳阳市",
          d_owner:"岳阳市公安局",
          is_important:'是',
          payload:"\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00",
          database_name:'mysql',
          list_name:'datalist_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'身份证号-120221197911290013',
          med_health:'-',
          fin_acc:'-',
          whe_track:'-'
        },
        {
          event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"MySQL",
          status:"查询操作",
          sip:"167.56.34.13",
          sport:33011,
          dip:"45.79.31.45",
          dport:34,
          d_region:"河南省",
          d_city:"驻马店市",
          d_district:"驿城区",
          d_owner:"驻马店市第一中学",
          is_important:'是',
          payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
          database_name:'mysql',
          list_name:'dl_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'-',
          med_health:'诊断号-CA8963214',
          fin_acc:'-',
          whe_track:'-'
        },
        {
          event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"MySQL",
          status:"查询操作",
          sip:"175.224.57.75",
          sport:34530,
          dip:"65.91.119.59",
          dport:577,
          d_region:"山西省",
          d_city:"长治市",
          d_district:"城区",
          d_owner:"中国联通长治分公司",
          is_important:'是',
          payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
          database_name:'mysql',
          list_name:'dl_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'-',
          med_health:'-',
          fin_acc:'银行卡号-6222198561354561',
          whe_track:'-'
        },
        {
          event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"SqlServer",
          status:"删除操作",
          sip:"68.235.44.87",
          sport:13736,
          dip:"161.51.68.252",
          dport:7888,
          d_region:"安徽省",
          d_city:"亳州市",
          d_district:"谯城区",
          d_owner:"亳州市交通运输局",
          is_important:'是',
          payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
          database_name:'sqls',
          list_name:'dl_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'身份证号-12022519670801003X',
          med_health:'-',
          fin_acc:'-',
          whe_track:'-'
        },
        {
          event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"Oracle",
          status:"查询操作",
          sip:"97.84.123.21",
          sport:45451,
          dip:"75.32.123.75",
          dport:4757,
          d_region:"广西壮族自治区",
          d_city:"贺州市",
          d_district:"八步区",
          d_owner:"贺州市烟草公司",
          is_important:'是',
          payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
          database_name:'oracle',
          list_name:'dl_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'-',
          med_health:'-',
          fin_acc:'-',
          whe_track:'实时位置-贺州市烟草公司'
        },
        {
          event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"SqlServer",
          status:"查询操作",
          sip:"75.86.83.242",
          sport:57311,
          dip:"54.36.78.31",
          dport:312,
          d_region:"浙江省",
          d_city:"杭州市",
          d_district:"滨江区",
          d_owner:"杭州国际学校",
          is_important:'是',
          payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
          database_name:'mysql',
          list_name:'dl_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'身份证-120223197507215196',
          med_health:'-',
          fin_acc:'-',
          whe_track:'-'
        },{
          event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"Oracle",
          status:"登陆成功",
          sip:"68.235.44.87",
          sport:13736,
          dip:"222.212.90.33",
          dport:9200,
          d_region:"河南省",
          d_city:"许昌市",
          d_district:"市辖区",
          d_owner:"长葛市建设路街道办事处（产业集聚区）",
          is_important:'是',
          payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
          database_name:'oracle',
          list_name:'datalist_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'-',
          med_health:'诊断号-AC65132764',
          fin_acc:'-',
          whe_track:'-'
        },{
          event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"Elasticsearch",
          status:"登陆成功",
          sip:"68.235.44.87",
          sport:13736,
          dip:"222.212.90.33",
          dport:9200,
          d_region:"河南省",
          d_city:"许昌市",
          d_district:"市辖区",
          d_owner:"长葛市建设路街道办事处（产业集聚区）",
          is_important:'是',
          payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
          database_name:'mysql',
          list_name:'datalist_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'身份证号-210782197902212613',
          med_health:'诊断号-AC65132764',
          fin_acc:'银行卡号-6222198561354561',
          whe_track:'实时位置-贺州市烟草公司'
        },{
          event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"Elasticsearch",
          status:"登陆成功",
          sip:"68.235.44.87",
          sport:13736,
          dip:"123.13.206.63",
          dport:9200,
          d_region:"河南省",
          d_city:"许昌市",
          d_district:"市辖区",
          d_owner:"长葛市建设路街道办事处（产业集聚区）",
          is_important:'是',
          payload:"\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00",
          database_name:'es',
          list_name:'datalist_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'身份证号-210782197902212613',
          med_health:'诊断号-AC65132764',
          fin_acc:'银行卡号-6222198561354561',
          whe_track:'实时位置-贺州市烟草公司'
        },
        {
          event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"Redis",
          status:"插入操作",
          sip:"23.41.231.41",
          sport:47455,
          dip:"35.127.32.222",
          dport:2020,
          d_region:"辽宁省",
          d_city:"锦州市",
          d_district:"古塔区",
          d_owner:"锦州医科大学附属第三医院",
          is_important:'是',
          payload:"\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00",
          database_name:'redis',
          list_name:'datalist_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'身份证号-210782197902212613',
          med_health:'诊断号-AC65132764',
          fin_acc:'银行卡号-6222198561354561',
          whe_track:'实时位置-贺州市烟草公司'
        },
        {
          event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"MongoDB",
          status:"删除操作",
          sip:"98.130.147.10",
          sport:10068,
          dip:"242.231.91.83",
          dport:10020,
          d_region:"江苏省",
          d_city:"常州市",
          d_district:"天宁区",
          d_owner:"天宁区",
          is_important:'是',
          payload:"\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00",
          database_name:'MD',
          list_name:'datalist_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'身份证号-210782197902212613',
          med_health:'诊断号-AC65132764',
          fin_acc:'银行卡号-6222198561354561',
          whe_track:'实时位置-贺州市烟草公司'
        },
        {
          event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"Elasticsearch",
          status:"登陆成功",
          sip:"68.235.44.87",
          sport:13736,
          dip:"123.13.206.63",
          dport:3900,
          d_region:"浙江省",
          d_city:"绍兴市",
          d_district:"越城区",
          d_owner:"绍兴市第一人民医院",
          is_important:'是',
          payload:"\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00",
          database_name:'mysql',
          list_name:'datalist_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'身份证号-210782197902212613',
          med_health:'诊断号-AC65132764',
          fin_acc:'银行卡号-6222198561354561',
          whe_track:'实时位置-贺州市烟草公司'
        },
        {
          event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"Elasticsearch",
          status:"登陆成功",
          sip:"43.156.37.77",
          sport:23324,
          dip:"53.236.64.75",
          dport:4352,
          d_region:"湖南省",
          d_city:"岳阳市",
          d_district:"岳阳市",
          d_owner:"岳阳市公安局",
          is_important:'是',
          payload:"\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00",
          database_name:'mysql',
          list_name:'datalist_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'身份证号-210782197902212613',
          med_health:'诊断号-AC65132764',
          fin_acc:'银行卡号-6222198561354561',
          whe_track:'实时位置-贺州市烟草公司'
        },{
          event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"Elasticsearch",
          status:"登陆成功",
          sip:"68.235.44.87",
          sport:13736,
          dip:"222.212.90.33",
          dport:9200,
          d_region:"河南省",
          d_city:"许昌市",
          d_district:"市辖区",
          d_owner:"长葛市建设路街道办事处（产业集聚区）",
          is_important:'是',
          payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
          database_name:'mysql',
          list_name:'datalist_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'身份证号-210782197902212613',
          med_health:'诊断号-AC65132764',
          fin_acc:'银行卡号-6222198561354561',
          whe_track:'实时位置-贺州市烟草公司'
        },{
          event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"Elasticsearch",
          status:"登陆成功",
          sip:"68.235.44.87",
          sport:13736,
          dip:"123.13.206.63",
          dport:9200,
          d_region:"河南省",
          d_city:"许昌市",
          d_district:"市辖区",
          d_owner:"长葛市建设路街道办事处（产业集聚区）",
          is_important:'是',
          payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
          database_name:'mysql',
          list_name:'datalist_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'身份证号-210782197902212613',
          med_health:'诊断号-AC65132764',
          fin_acc:'银行卡号-6222198561354561',
          whe_track:'实时位置-贺州市烟草公司'
        },
        {
          event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"MySQL",
          status:"查询操作",
          sip:"68.235.44.87",
          sport:13736,
          dip:"60.191.119.59",
          dport:3333,
          d_region:"浙江省",
          d_city:"杭州市",
          d_district:"滨江区",
          d_owner:"杭州国际学校",
          is_important:'是',
          payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
          database_name:'mysql',
          list_name:'dl_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'身份证号-210782197902212613',
          med_health:'诊断号-AC65132764',
          fin_acc:'银行卡号-6222198561354561',
          whe_track:'实时位置-贺州市烟草公司'
        },
        {
          event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"MySQL",
          status:"查询操作",
          sip:"68.235.44.87",
          sport:13736,
          dip:"60.191.119.59",
          dport:3333,
          d_region:"浙江省",
          d_city:"杭州市",
          d_district:"滨江区",
          d_owner:"杭州国际学校",
          is_important:'是',
          payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
          database_name:'mysql',
          list_name:'dl_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'身份证号-210782197902212613',
          med_health:'诊断号-AC65132764',
          fin_acc:'银行卡号-6222198561354561',
          whe_track:'实时位置-贺州市烟草公司'
        },
        {
          event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"MySQL",
          status:"查询操作",
          sip:"68.235.44.87",
          sport:13736,
          dip:"60.191.119.59",
          dport:3333,
          d_region:"浙江省",
          d_city:"杭州市",
          d_district:"滨江区",
          d_owner:"杭州国际学校",
          is_important:'是',
          payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
          database_name:'mysql',
          list_name:'dl_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'身份证号-210782197902212613',
          med_health:'诊断号-AC65132764',
          fin_acc:'银行卡号-6222198561354561',
          whe_track:'实时位置-贺州市烟草公司'
        },
        {
          event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"MySQL",
          status:"查询操作",
          sip:"68.235.44.87",
          sport:13736,
          dip:"60.191.119.59",
          dport:3333,
          d_region:"浙江省",
          d_city:"杭州市",
          d_district:"滨江区",
          d_owner:"杭州国际学校",
          is_important:'是',
          payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
          database_name:'mysql',
          list_name:'dl_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'身份证号-210782197902212613',
          med_health:'诊断号-AC65132764',
          fin_acc:'银行卡号-6222198561354561',
          whe_track:'实时位置-贺州市烟草公司'
        },
        {
          event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"MySQL",
          status:"查询操作",
          sip:"68.235.44.87",
          sport:13736,
          dip:"60.191.119.59",
          dport:3333,
          d_region:"浙江省",
          d_city:"杭州市",
          d_district:"滨江区",
          d_owner:"杭州国际学校",
          is_important:'是',
          payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
          database_name:'mysql',
          list_name:'dl_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'身份证号-210782197902212613',
          med_health:'诊断号-AC65132764',
          fin_acc:'银行卡号-6222198561354561',
          whe_track:'实时位置-贺州市烟草公司'
        },
        {
          event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"MySQL",
          status:"查询操作",
          sip:"68.235.44.87",
          sport:13736,
          dip:"60.191.119.59",
          dport:3333,
          d_region:"浙江省",
          d_city:"杭州市",
          d_district:"滨江区",
          d_owner:"杭州国际学校",
          is_important:'是',
          payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
          database_name:'mysql',
          list_name:'dl_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'身份证号-210782197902212613',
          med_health:'诊断号-AC65132764',
          fin_acc:'银行卡号-6222198561354561',
          whe_track:'实时位置-贺州市烟草公司'
        },
        {
          event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"MySQL",
          status:"查询操作",
          sip:"68.235.44.87",
          sport:13736,
          dip:"60.191.119.59",
          dport:3333,
          d_region:"浙江省",
          d_city:"杭州市",
          d_district:"滨江区",
          d_owner:"杭州国际学校",
          is_important:'是',
          payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
          database_name:'mysql',
          list_name:'dl_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'身份证号-210782197902212613',
          med_health:'诊断号-AC65132764',
          fin_acc:'银行卡号-6222198561354561',
          whe_track:'实时位置-贺州市烟草公司'
        },
        {
          event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
          database_type:"MySQL",
          status:"查询操作",
          sip:"68.235.44.87",
          sport:13736,
          dip:"60.191.119.59",
          dport:3333,
          d_region:"浙江省",
          d_city:"杭州市",
          d_district:"滨江区",
          d_owner:"杭州国际学校",
          is_important:'是',
          payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
          database_name:'mysql',
          list_name:'dl_one',
          field_name:'f_n',
          field_type:'string',
          define_type:'String',
          mg_level:'高',
          fx_level:'高',
          id_imp:'身份证号-210782197902212613',
          med_health:'诊断号-AC65132764',
          fin_acc:'银行卡号-6222198561354561',
          whe_track:'实时位置-贺州市烟草公司'
        }
      ],
      options: [{
        value: 'Mysql',
        label: 'Mysql'
      }, {
        value: 'MongoDB',
        label: 'MongoDB'
      }, {
        value: 'Redis',
        label: 'Redis'
      }, {
        value: 'ElasticSearch',
        label: 'ElasticSearch'
      }, {
        value: 'PostgreSQL',
        label: 'PostgreSQL'
      }, {
        value: 'SqlServer',
        label: 'SqlServer'
      }, {
        value: 'Oracle',
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
      mgOptions:[{
        value: '高',
        label: '高'
      }, {
        value: '中',
        label: '中'
      }, {
        value: '低',
        label: '低'
      }],
      mgValue:'',
      fxOptions:[{
        value: '高',
        label: '高'
      }, {
        value: '中',
        label: '中'
      }, {
        value: '低',
        label: '低'
      }],
      fxValue:'',
      zdOptions:[{
        value:'是',
        label:'是'
      }, {
        value:'否',
        label:'否'
      }],
      zdValue:''
    }

  },
  created() {
    // console.log('取出的database_type：'+this.$store.state.reqdata.database_type)
    if (this.$store.state.reqdata) {
      this.searchValue.sourceIP = this.$store.state.reqdata.sip,
        this.searchValue.destIP = this.$store.state.reqdata.dip,
        this.start_time = this.$store.state.reqdata.s_time,
        this.end_time = this.$store.state.reqdata.e_time,
        this.searchValue.record = this.$store.state.reqdata.owner,
        this.value = this.$store.state.reqdata.database_type,
        this.searchValue.destProvince = this.$store.state.reqdata.d_province,
        this.searchValue.destCity = this.$store.state.reqdata.d_city,
        this.searchValue.destDistrict = this.$store.state.reqdata.d_district
    }
    this.readcsv()
  },
  methods: {
    async readcsv(){
      // const fileReader = new FileReader()
      const filePath = '../../json/data_web.csv'
      const {data:res} = await axios({
        method:'GET',
        url:filePath
      })
      this.csvtoTableData(res)
    },
    csvtoTableData(csvData){
      const preData = csvData.split('\n').map((line)=>{
        // const regex = /([^,]+)$/;
        let [, database_type, sip, sport, , , , , dip, dport, d_region, d_city, d_district, d_owner, event_time, ...payload] = line.split(',');
        const originalDate = new Date(event_time);
        event_time = dayjs(originalDate).format('YYYY-MM-DD HH:mm:ss')
        payload = payload.join('')
        const status = database_type?database_type.slice(-4):''
        database_type = database_type?database_type.slice(0,-4):''
        const database_name = database_type, impArr = ['高','中','低'], fieldnameArr = ['f_n','q_m','d_s','-'], fieldtypeArr = ['string','int','object','-'], definetypeArr = ['String','Integer','Object','-'], isimpArr = ['是'], listnameArr = ['datalist_one','dl_1','data_n','-'],idimpArr=['身份信息-身份证号码:["352121196310082125"]'],medhealthArr = ['-'],finaccArr = ['-'],whetrackArr = ['-']
        const mg_level = impArr[Math.floor(Math.random() * impArr.length)], fx_level = impArr[Math.floor(Math.random() * impArr.length)], field_name = fieldnameArr[Math.floor(Math.random() * fieldnameArr.length)], field_type = fieldtypeArr[Math.floor(Math.random() * fieldtypeArr.length)],define_type =definetypeArr[Math.floor(Math.random() * definetypeArr.length)],id_imp=idimpArr[Math.floor(Math.random() * idimpArr.length)],med_health=medhealthArr[Math.floor(Math.random() * medhealthArr.length)],fin_acc=finaccArr[Math.floor(Math.random() * finaccArr.length)],whe_track=whetrackArr[Math.floor(Math.random() * whetrackArr.length)],list_name = listnameArr[Math.floor(Math.random() * listnameArr.length)],is_important=isimpArr[Math.floor(Math.random() * isimpArr.length)]
        return {event_time, database_type, status, sip, sport, dip, dport, d_region, d_city, d_district, d_owner, payload, database_name,mg_level,fx_level,field_name,field_type,define_type,id_imp,med_health,fin_acc,whe_track,list_name,is_important}
      })
      this.tableData = preData
    },
    openDialog(level,rowData) {
      // console.log(rowData);
      this.selectedLevel = level;
      this.dialogTableVisible = true;
    },
    updateTime(){
      this.end_time = this.getNowtime()
        if(this.value3=='选项1'){
          this.start_time = dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss')
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
    initChart() {
      let dateArray = [], today = dayjs(), dataArray = new Array(30)
      for (let i = 30; i >= 0; i--) {
        // 使用 `subtract` 方法从今天减去指定天数
        const date = today.subtract(i, 'day');
        // 将日期的月份和日期格式化为 "MM.DD" 的形式，然后添加到数组中
        dateArray.push(date.format('MM.DD'));
        const randomNum = Math.floor(Math.random() * 1001);
        dataArray[i] = randomNum
      }
      // console.log(dateArray);
      this.$nextTick(()=>{
        // console.log(this.$refs.mylineChart);
        this.myChart = echarts.init(this.$refs.mylineChart);
        // 使用 ECharts API 渲染折线图
        const option = {
          grid: {
            left: '10%',
            right: '5%',
            top: '15%',
            bottom: '20%',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: dateArray
          },
          yAxis: {
            type: 'value',
            name: '活跃统计（单位/次）'
          },
          series: [
            {
              data: dataArray,
              type: 'line',
              areaStyle: {},
            }
          ]
        };
        this.myChart.setOption(option);
      })
    },
    destroyChart() {
      if (this.myChart) {
        this.myChart.dispose();
        this.myChart = null;
      }
    },
    // 走接口的查询
    // search() {
    //   this.loading = true;
    //   // this.tableData=[
    //   //   {
    //   //   event_time:"2022-09-04 12:28:50",
    //   //   database_type:"Elasticsearch",
    //   //   status:"登陆成功",
    //   //   sip:"189.183.247.190",
    //   //   sport:13736,
    //   //   dip:"123.13.206.63",
    //   //   dport:9200,
    //   //   d_region:"河南省",
    //   //   d_city:"许昌市",
    //   //   d_district:"市辖区",
    //   //   d_owner:"长葛市建设路街道办事处（产业集聚区）",
    //   //   payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00'
    //   // },
    //   // {
    //   //   event_time:"2022-09-04 12:28:50",
    //   //   database_type:"Elasticsearch",
    //   //   status:"登陆成功",
    //   //   sip:"68.235.44.87",
    //   //   sport:13736,
    //   //   dip:"222.212.90.33",
    //   //   dport:9200,
    //   //   d_region:"河南省",
    //   //   d_city:"许昌市",
    //   //   d_district:"市辖区",
    //   //   d_owner:"长葛市建设路街道办事处（产业集聚区）"
    //   // }]
    //   this.$store.dispatch('updatereqdata', {
    //     sip: this.searchValue.sourceIP,
    //     dip: this.searchValue.destIP,
    //     s_time: this.start_time,
    //     e_time: this.end_time,
    //     owner: this.searchValue.record,
    //     database_type: this.value,
    //     d_province: this.searchValue.destProvince,
    //     d_city: this.searchValue.destCity,
    //     d_district: this.searchValue.destDistrict
    //   })
    //   // console.log('存入的database_type：'+this.$store.state.reqdata.database_type)
    //   axios({
    //     method: "post",
    //     url: "/search_operate_history",
    //     data: {
    //       token: this.$store.state.token,
    //       req_data: {
    //         sip: this.$store.state.reqdata.sip || this.searchValue.sourceIP,
    //         dip: this.$store.state.reqdata.dip || this.searchValue.destIP,
    //         s_time: this.$store.state.reqdata.s_time || this.start_time,
    //         e_time: this.$store.state.reqdata.e_time || this.end_time,
    //         owner: this.$store.state.reqdata.owner || this.searchValue.record,
    //         database_type: this.$refs.selectLable1.selected.label,
    //         d_province: this.$store.state.reqdata.d_province || this.searchValue.destProvince,
    //         d_city: this.$store.state.reqdata.d_city || this.searchValue.destCity,
    //         d_district: this.$store.state.reqdata.d_district || this.searchValue.destDistrict
    //       },
    //     },
    //   })
    //     .then((rep) => {
    //       // console.log("执行了then")
    //       // console.log(rep.data.data)
    //       this.tableData = rep.data.data;
    //       this.loading = false;
    //     }).catch(() => {
    //       // console.log("执行了catch")
    //       this.loading = false;
    //       Message({
    //         message: "用户信息异常,请重试！",
    //         type: "error",
    //       });
    //       window.sessionStorage.clear();
    //       this.$router.replace("/");
    //       //触发后禁止浏览器的后退键
    //       history.pushState(null, null, document.URL);
    //       window.addEventListener(
    //         "popstate",
    //         function (e) {
    //           history.pushState(null, null, document.URL);
    //         },
    //         false
    //       );
    //     });
    //   ;
    // },
    // 前端模拟查询
    search(){
      this.loading = true
      console.log(this.value);

      if(this.value == 'Mysql'){
        setTimeout(()=>{
        this.loading = false
        this.total = 9832
        this.tableData = this.tableData.filter((cur)=>{
          console.log(cur.database_type );
          return cur.database_type == 'mysql'
        }) 
        
        // this.tableData = [
        // {
        //   event_time:dayjs().format('YYYY-MM-DD HH:mm:ss'),
        //   database_type:"MySQL",
        //   status:"插入操作",
        //   sip:"23.41.231.41",
        //   sport:47455,
        //   dip:"35.127.32.222",
        //   dport:3306,
        //   d_region:"辽宁省",
        //   d_city:"锦州市",
        //   d_district:"古塔区",
        //   d_owner:"锦州医科大学附属第三医院",
        //   is_important:'是',
        //   payload:"SELECT database_name,list_name FROM index_name WHERE database_name = 'ms' AND list_name = 'datalist_one' AND field_name = 'f_n' AND field_type = 'string' AND id_imp = '210782197902212613'",
        //   database_name:'ms',
        //   list_name:'datalist_one',
        //   field_name:'f_n',
        //   field_type:'string',
        //   define_type:'String',
        //   mg_level:'高',
        //   fx_level:'高',
        //   id_imp:'身份证号-210782197902212613',
        //   med_health:'诊断号-AC65132764',
        //   fin_acc:'银行卡号-6222198561354561',
        //   whe_track:'实时位置-贺州市烟草公司'
        // },
        // {
        //   event_time:dayjs().subtract(1.1, 'minute').format('YYYY-MM-DD HH:mm:ss'),
        //   database_type:"MySQL",
        //   status:"登陆成功",
        //   sip:"68.235.44.87",
        //   sport:13736,
        //   dip:"54.57.46.78",
        //   dport:3306,
        //   d_region:"河南省",
        //   d_city:"许昌市",
        //   d_district:"市辖区",
        //   d_owner:"长葛市建设路街道办事处（产业集聚区）",
        //   is_important:'是',
        //   payload:"SELECT database_name,list_name FROM index_name WHERE database_name = 'ms' AND list_name = 'datalist_one' AND field_name = 'f_n' AND field_type = 'string' AND med_health = 'AC65132764'",
        //   database_name:'es',
        //   list_name:'datalist_one',
        //   field_name:'f_n',
        //   field_type:'string',
        //   define_type:'String',
        //   mg_level:'高',
        //   fx_level:'高',
        //   id_imp:'身份证号-210782197902212613',
        //   med_health:'诊断号-AC65132764',
        //   fin_acc:'银行卡号-6222198561354561',
        //   whe_track:'实时位置-贺州市烟草公司'
        // },
        // {
        //   event_time:dayjs().subtract(2.3, 'minute').format('YYYY-MM-DD HH:mm:ss'),
        //   database_type:"MySQL",
        //   status:"登陆成功",
        //   sip:"68.235.44.87",
        //   sport:13736,
        //   dip:"27.89.78.247",
        //   dport:3306,
        //   d_region:"浙江省",
        //   d_city:"绍兴市",
        //   d_district:"越城区",
        //   d_owner:"绍兴市第一人民医院",
        //   is_important:'是',
        //   payload:"SELECT database_name,list_name FROM index_name WHERE database_name = 'ms' AND list_name = 'datalist_one' AND field_name = 'f_n' AND field_type = 'string' AND fin_acc = '6222198561354561'",
        //   database_name:'mysql',
        //   list_name:'datalist_one',
        //   field_name:'f_n',
        //   field_type:'string',
        //   define_type:'String',
        //   mg_level:'高',
        //   fx_level:'高',
        //   id_imp:'身份证号-210782197902212613',
        //   med_health:'诊断号-AC65132764',
        //   fin_acc:'银行卡号-6222198561354561',
        //   whe_track:'实时位置-贺州市烟草公司'
        // },{
        //   event_time:dayjs().subtract(3.5, 'minute').format('YYYY-MM-DD HH:mm:ss'),
        //   database_type:"MySQL",
        //   status:"删除操作",
        //   sip:"98.130.147.10",
        //   sport:10068,
        //   dip:"242.231.91.83",
        //   dport:3306,
        //   d_region:"江苏省",
        //   d_city:"常州市",
        //   d_district:"天宁区",
        //   d_owner:"天宁区",
        //   is_important:'是',
        //   payload:"\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00",
        //   database_name:'MD',
        //   list_name:'datalist_one',
        //   field_name:'f_n',
        //   field_type:'string',
        //   define_type:'String',
        //   mg_level:'高',
        //   fx_level:'高',
        //   id_imp:'身份证号-210782197902212613',
        //   med_health:'诊断号-AC65132764',
        //   fin_acc:'银行卡号-6222198561354561',
        //   whe_track:'实时位置-贺州市烟草公司'
        // },
        // {
        //   event_time:dayjs().subtract(4.6, 'minute').format('YYYY-MM-DD HH:mm:ss'),
        //   database_type:"MySQL",
        //   status:"登陆成功",
        //   sip:"43.156.37.77",
        //   sport:23324,
        //   dip:"53.236.64.75",
        //   dport:3306,
        //   d_region:"湖南省",
        //   d_city:"岳阳市",
        //   d_district:"岳阳市",
        //   d_owner:"岳阳市公安局",
        //   is_important:'是',
        //   payload:"\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00",
        //   database_name:'mysql',
        //   list_name:'datalist_one',
        //   field_name:'f_n',
        //   field_type:'string',
        //   define_type:'String',
        //   mg_level:'高',
        //   fx_level:'高',
        //   id_imp:'身份证号-210782197902212613',
        //   med_health:'诊断号-AC65132764',
        //   fin_acc:'银行卡号-6222198561354561',
        //   whe_track:'实时位置-贺州市烟草公司'
        // },
        // {
        //   event_time:dayjs().subtract(5.8, 'minute').format('YYYY-MM-DD HH:mm:ss'),
        //   database_type:"MySQL",
        //   status:"查询操作",
        //   sip:"175.224.57.75",
        //   sport:34530,
        //   dip:"65.91.119.59",
        //   dport:3306,
        //   d_region:"山西省",
        //   d_city:"长治市",
        //   d_district:"城区",
        //   d_owner:"中国联通长治分公司",
        //   is_important:'是',
        //   payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
        //   database_name:'mysql',
        //   list_name:'dl_one',
        //   field_name:'f_n',
        //   field_type:'string',
        //   define_type:'String',
        //   mg_level:'高',
        //   fx_level:'高',
        //   id_imp:'身份证号-210782197902212613',
        //   med_health:'诊断号-AC65132764',
        //   fin_acc:'银行卡号-6222198561354561',
        //   whe_track:'实时位置-贺州市烟草公司'
        // },
        // {
        //   event_time:dayjs().subtract(6.8, 'minute').format('YYYY-MM-DD HH:mm:ss'),
        //   database_type:"MySQL",
        //   status:"查询操作",
        //   sip:"167.56.34.13",
        //   sport:33011,
        //   dip:"45.79.31.45",
        //   dport:3306,
        //   d_region:"河南省",
        //   d_city:"驻马店市",
        //   d_district:"驿城区",
        //   d_owner:"驻马店市第一中学",
        //   is_important:'是',
        //   payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
        //   database_name:'mysql',
        //   list_name:'dl_one',
        //   field_name:'f_n',
        //   field_type:'string',
        //   define_type:'String',
        //   mg_level:'高',
        //   fx_level:'高',
        //   id_imp:'身份证号-210782197902212613',
        //   med_health:'诊断号-AC65132764',
        //   fin_acc:'银行卡号-6222198561354561',
        //   whe_track:'实时位置-贺州市烟草公司'
        // },
        // {
        //   event_time:dayjs().subtract(7.2, 'minute').format('YYYY-MM-DD HH:mm:ss'),
        //   database_type:"MySQL",
        //   status:"删除操作",
        //   sip:"68.235.44.87",
        //   sport:13736,
        //   dip:"161.51.68.252",
        //   dport:3306,
        //   d_region:"安徽省",
        //   d_city:"亳州市",
        //   d_district:"谯城区",
        //   d_owner:"亳州市交通运输局",
        //   is_important:'是',
        //   payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
        //   database_name:'sqls',
        //   list_name:'dl_one',
        //   field_name:'f_n',
        //   field_type:'string',
        //   define_type:'String',
        //   mg_level:'高',
        //   fx_level:'高',
        //   id_imp:'身份证号-210782197902212613',
        //   med_health:'诊断号-AC65132764',
        //   fin_acc:'银行卡号-6222198561354561',
        //   whe_track:'实时位置-贺州市烟草公司'
        // },
        // {
        //   event_time:dayjs().subtract(8.5, 'minute').format('YYYY-MM-DD HH:mm:ss'),
        //   database_type:"MySQL",
        //   status:"查询操作",
        //   sip:"75.86.83.242",
        //   sport:57311,
        //   dip:"54.36.78.31",
        //   dport:3306,
        //   d_region:"浙江省",
        //   d_city:"杭州市",
        //   d_district:"滨江区",
        //   d_owner:"杭州国际学校",
        //   is_important:'是',
        //   payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
        //   database_name:'mysql',
        //   list_name:'dl_one',
        //   field_name:'f_n',
        //   field_type:'string',
        //   define_type:'String',
        //   mg_level:'高',
        //   fx_level:'高',
        //   id_imp:'身份证号-210782197902212613',
        //   med_health:'诊断号-AC65132764',
        //   fin_acc:'银行卡号-6222198561354561',
        //   whe_track:'实时位置-贺州市烟草公司'
        // },{
        //   event_time:dayjs().subtract(9.5, 'minute').format('YYYY-MM-DD HH:mm:ss'),
        //   database_type:"MySQL",
        //   status:"查询操作",
        //   sip:"97.84.123.21",
        //   sport:45451,
        //   dip:"75.32.123.75",
        //   dport:3306,
        //   d_region:"广西壮族自治区",
        //   d_city:"贺州市",
        //   d_district:"八步区",
        //   d_owner:"贺州市烟草公司",
        //   is_important:'是',
        //   payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
        //   database_name:'oracle',
        //   list_name:'dl_one',
        //   field_name:'f_n',
        //   field_type:'string',
        //   define_type:'String',
        //   mg_level:'高',
        //   fx_level:'高',
        //   id_imp:'身份证号-210782197902212613',
        //   med_health:'诊断号-AC65132764',
        //   fin_acc:'银行卡号-6222198561354561',
        //   whe_track:'实时位置-贺州市烟草公司'
        // }]
      },500)
      }else if(this.mgValue == '高'){
        setTimeout(()=>{
        this.loading = false
        this.total = 8651
        this.tableData = this.tableData.filter((cur)=>{
          console.log(cur.mg_level);
          return cur.mg_level == '高'
        }) 
        // this.tableData = [
        // {
        //   event_time:dayjs().format('YYYY-MM-DD HH:mm:ss'),
        //   database_type:"MySQL",
        //   status:"插入操作",
        //   sip:"23.41.231.41",
        //   sport:47455,
        //   dip:"35.127.32.222",
        //   dport:3306,
        //   d_region:"辽宁省",
        //   d_city:"锦州市",
        //   d_district:"古塔区",
        //   d_owner:"锦州医科大学附属第三医院",
        //   is_important:'是',
        //   payload:"SELECT database_name,list_name FROM index_name WHERE database_name = 'ms' AND list_name = 'datalist_one' AND field_name = 'f_n' AND field_type = 'string' AND id_imp = '210782197902212613'",
        //   database_name:'ms',
        //   list_name:'datalist_one',
        //   field_name:'f_n',
        //   field_type:'string',
        //   define_type:'String',
        //   mg_level:'高',
        //   fx_level:'高',
        //   id_imp:'身份证号-210782197902212613',
        //   med_health:'诊断号-AC65132764',
        //   fin_acc:'银行卡号-6222198561354561',
        //   whe_track:'实时位置-贺州市烟草公司'
        // },
        // {
        //   event_time:dayjs().subtract(1.1, 'minute').format('YYYY-MM-DD HH:mm:ss'),
        //   database_type:"MySQL",
        //   status:"登陆成功",
        //   sip:"68.235.44.87",
        //   sport:13736,
        //   dip:"54.57.46.78",
        //   dport:3306,
        //   d_region:"河南省",
        //   d_city:"许昌市",
        //   d_district:"市辖区",
        //   d_owner:"长葛市建设路街道办事处（产业集聚区）",
        //   is_important:'是',
        //   payload:"SELECT database_name,list_name FROM index_name WHERE database_name = 'ms' AND list_name = 'datalist_one' AND field_name = 'f_n' AND field_type = 'string' AND med_health = 'AC65132764'",
        //   database_name:'es',
        //   list_name:'datalist_one',
        //   field_name:'f_n',
        //   field_type:'string',
        //   define_type:'String',
        //   mg_level:'高',
        //   fx_level:'高',
        //   id_imp:'身份证号-210782197902212613',
        //   med_health:'诊断号-AC65132764',
        //   fin_acc:'银行卡号-6222198561354561',
        //   whe_track:'实时位置-贺州市烟草公司'
        // },
        // {
        //   event_time:dayjs().subtract(2.3, 'minute').format('YYYY-MM-DD HH:mm:ss'),
        //   database_type:"MySQL",
        //   status:"登陆成功",
        //   sip:"68.235.44.87",
        //   sport:13736,
        //   dip:"27.89.78.247",
        //   dport:3306,
        //   d_region:"浙江省",
        //   d_city:"绍兴市",
        //   d_district:"越城区",
        //   d_owner:"绍兴市第一人民医院",
        //   is_important:'是',
        //   payload:"SELECT database_name,list_name FROM index_name WHERE database_name = 'ms' AND list_name = 'datalist_one' AND field_name = 'f_n' AND field_type = 'string' AND fin_acc = '6222198561354561'",
        //   database_name:'mysql',
        //   list_name:'datalist_one',
        //   field_name:'f_n',
        //   field_type:'string',
        //   define_type:'String',
        //   mg_level:'高',
        //   fx_level:'高',
        //   id_imp:'身份证号-210782197902212613',
        //   med_health:'诊断号-AC65132764',
        //   fin_acc:'银行卡号-6222198561354561',
        //   whe_track:'实时位置-贺州市烟草公司'
        // },{
        //   event_time:dayjs().subtract(3.5, 'minute').format('YYYY-MM-DD HH:mm:ss'),
        //   database_type:"MySQL",
        //   status:"删除操作",
        //   sip:"98.130.147.10",
        //   sport:10068,
        //   dip:"242.231.91.83",
        //   dport:3306,
        //   d_region:"江苏省",
        //   d_city:"常州市",
        //   d_district:"天宁区",
        //   d_owner:"天宁区",
        //   is_important:'是',
        //   payload:"\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00",
        //   database_name:'MD',
        //   list_name:'datalist_one',
        //   field_name:'f_n',
        //   field_type:'string',
        //   define_type:'String',
        //   mg_level:'高',
        //   fx_level:'高',
        //   id_imp:'身份证号-210782197902212613',
        //   med_health:'诊断号-AC65132764',
        //   fin_acc:'银行卡号-6222198561354561',
        //   whe_track:'实时位置-贺州市烟草公司'
        // },
        // {
        //   event_time:dayjs().subtract(4.6, 'minute').format('YYYY-MM-DD HH:mm:ss'),
        //   database_type:"MySQL",
        //   status:"登陆成功",
        //   sip:"43.156.37.77",
        //   sport:23324,
        //   dip:"53.236.64.75",
        //   dport:3306,
        //   d_region:"湖南省",
        //   d_city:"岳阳市",
        //   d_district:"岳阳市",
        //   d_owner:"岳阳市公安局",
        //   is_important:'是',
        //   payload:"\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00",
        //   database_name:'mysql',
        //   list_name:'datalist_one',
        //   field_name:'f_n',
        //   field_type:'string',
        //   define_type:'String',
        //   mg_level:'高',
        //   fx_level:'高',
        //   id_imp:'身份证号-210782197902212613',
        //   med_health:'诊断号-AC65132764',
        //   fin_acc:'银行卡号-6222198561354561',
        //   whe_track:'实时位置-贺州市烟草公司'
        // },
        // {
        //   event_time:dayjs().subtract(5.8, 'minute').format('YYYY-MM-DD HH:mm:ss'),
        //   database_type:"MySQL",
        //   status:"查询操作",
        //   sip:"175.224.57.75",
        //   sport:34530,
        //   dip:"65.91.119.59",
        //   dport:3306,
        //   d_region:"山西省",
        //   d_city:"长治市",
        //   d_district:"城区",
        //   d_owner:"中国联通长治分公司",
        //   is_important:'是',
        //   payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
        //   database_name:'mysql',
        //   list_name:'dl_one',
        //   field_name:'f_n',
        //   field_type:'string',
        //   define_type:'String',
        //   mg_level:'高',
        //   fx_level:'高',
        //   id_imp:'身份证号-210782197902212613',
        //   med_health:'诊断号-AC65132764',
        //   fin_acc:'银行卡号-6222198561354561',
        //   whe_track:'实时位置-贺州市烟草公司'
        // },
        // {
        //   event_time:dayjs().subtract(6.8, 'minute').format('YYYY-MM-DD HH:mm:ss'),
        //   database_type:"MySQL",
        //   status:"查询操作",
        //   sip:"167.56.34.13",
        //   sport:33011,
        //   dip:"45.79.31.45",
        //   dport:3306,
        //   d_region:"河南省",
        //   d_city:"驻马店市",
        //   d_district:"驿城区",
        //   d_owner:"驻马店市第一中学",
        //   is_important:'是',
        //   payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
        //   database_name:'mysql',
        //   list_name:'dl_one',
        //   field_name:'f_n',
        //   field_type:'string',
        //   define_type:'String',
        //   mg_level:'高',
        //   fx_level:'高',
        //   id_imp:'身份证号-210782197902212613',
        //   med_health:'诊断号-AC65132764',
        //   fin_acc:'银行卡号-6222198561354561',
        //   whe_track:'实时位置-贺州市烟草公司'
        // },
        // {
        //   event_time:dayjs().subtract(7.2, 'minute').format('YYYY-MM-DD HH:mm:ss'),
        //   database_type:"MySQL",
        //   status:"删除操作",
        //   sip:"68.235.44.87",
        //   sport:13736,
        //   dip:"161.51.68.252",
        //   dport:3306,
        //   d_region:"安徽省",
        //   d_city:"亳州市",
        //   d_district:"谯城区",
        //   d_owner:"亳州市交通运输局",
        //   is_important:'是',
        //   payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
        //   database_name:'sqls',
        //   list_name:'dl_one',
        //   field_name:'f_n',
        //   field_type:'string',
        //   define_type:'String',
        //   mg_level:'高',
        //   fx_level:'高',
        //   id_imp:'身份证号-210782197902212613',
        //   med_health:'诊断号-AC65132764',
        //   fin_acc:'银行卡号-6222198561354561',
        //   whe_track:'实时位置-贺州市烟草公司'
        // },
        // {
        //   event_time:dayjs().subtract(8.5, 'minute').format('YYYY-MM-DD HH:mm:ss'),
        //   database_type:"MySQL",
        //   status:"查询操作",
        //   sip:"75.86.83.242",
        //   sport:57311,
        //   dip:"54.36.78.31",
        //   dport:3306,
        //   d_region:"浙江省",
        //   d_city:"杭州市",
        //   d_district:"滨江区",
        //   d_owner:"杭州国际学校",
        //   is_important:'是',
        //   payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
        //   database_name:'mysql',
        //   list_name:'dl_one',
        //   field_name:'f_n',
        //   field_type:'string',
        //   define_type:'String',
        //   mg_level:'高',
        //   fx_level:'高',
        //   id_imp:'身份证号-210782197902212613',
        //   med_health:'诊断号-AC65132764',
        //   fin_acc:'银行卡号-6222198561354561',
        //   whe_track:'实时位置-贺州市烟草公司'
        // },{
        //   event_time:dayjs().subtract(9.5, 'minute').format('YYYY-MM-DD HH:mm:ss'),
        //   database_type:"MySQL",
        //   status:"查询操作",
        //   sip:"97.84.123.21",
        //   sport:45451,
        //   dip:"75.32.123.75",
        //   dport:3306,
        //   d_region:"广西壮族自治区",
        //   d_city:"贺州市",
        //   d_district:"八步区",
        //   d_owner:"贺州市烟草公司",
        //   is_important:'是',
        //   payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
        //   database_name:'oracle',
        //   list_name:'dl_one',
        //   field_name:'f_n',
        //   field_type:'string',
        //   define_type:'String',
        //   mg_level:'高',
        //   fx_level:'高',
        //   id_imp:'身份证号-210782197902212613',
        //   med_health:'诊断号-AC65132764',
        //   fin_acc:'银行卡号-6222198561354561',
        //   whe_track:'实时位置-贺州市烟草公司'
        // }]
      },500)
       
      }else{
        this.loading = false
        this.total = 43442
        this.readcsv()
      //   this.tableData = [
      //   {
      //     event_time:dayjs().format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"MySQL",
      //     status:"查询操作",
      //     sip:"68.235.44.87",
      //     sport:13736,
      //     dip:"123.13.206.63",
      //     dport:3306,
      //     d_region:"河南省",
      //     d_city:"许昌市",
      //     d_district:"市辖区",
      //     d_owner:"长葛市建设路街道办事处（产业集聚区）",
      //     is_important:'是',
      //     payload:"SELECT database_name,list_name FROM index_name WHERE database_name = 'ms' AND list_name = 'datalist_one' AND field_name = 'f_n' AND field_type = 'string' AND id_imp = '210782197902212613'",
      //     database_name:'ms',
      //     list_name:'datalist_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'身份证号-210782197902212613',
      //     med_health:'-',
      //     fin_acc:'-',
      //     whe_track:'-'
      //   },
      //   {
      //     event_time:dayjs().subtract(1.1, 'minute').format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"MySQL",
      //     status:"查询操作",
      //     sip:"23.41.231.41",
      //     sport:47455,
      //     dip:"35.127.32.222",
      //     dport:3306,
      //     d_region:"辽宁省",
      //     d_city:"锦州市",
      //     d_district:"古塔区",
      //     d_owner:"锦州医科大学附属第三医院",
      //     is_important:'是',
      //     payload:"SELECT database_name,list_name FROM index_name WHERE database_name = 'ms' AND list_name = 'datalist_one' AND field_name = 'f_n' AND field_type = 'string' AND id_imp = '120103197211230011'",
      //     database_name:'ms',
      //     list_name:'datalist_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'身份证号-120103197211230011',
      //     med_health:'-',
      //     fin_acc:'-',
      //     whe_track:'-'
      //   },
      //   {
      //     event_time:dayjs().subtract(2.4, 'minute').format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"MySQL",
      //     status:"查询操作",
      //     sip:"98.130.147.10",
      //     sport:10068,
      //     dip:"242.231.91.83",
      //     dport:3306,
      //     d_region:"江苏省",
      //     d_city:"常州市",
      //     d_district:"天宁区",
      //     d_owner:"天宁区",
      //     is_important:'是',
      //     payload:"SELECT database_name,list_name FROM index_name WHERE database_name = 'ms' AND list_name = 'datalist_one' AND field_name = 'f_n' AND field_type = 'string' AND med_health = 'AB69876313'",
      //     database_name:'MD',
      //     list_name:'datalist_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'-',
      //     med_health:'诊断号-AB69876313',
      //     fin_acc:'-',
      //     whe_track:'-'
      //   },
      //   {
      //     event_time:dayjs().subtract(3.9, 'minute').format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"Elasticsearch",
      //     status:"登陆成功",
      //     sip:"78.56.223.41",
      //     sport:23345,
      //     dip:"34.145.77.223",
      //     dport:9200,
      //     d_region:"浙江省",
      //     d_city:"绍兴市",
      //     d_district:"越城区",
      //     d_owner:"绍兴市第一人民医院",
      //     is_important:'是',
      //     payload:"SELECT * FROM index_name WHERE database_name = 'ms' AND list_name = 'datalist_one' AND field_name = 'f_n' AND field_type = 'string'",
      //     database_name:'mysql',
      //     list_name:'datalist_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'-',
      //     med_health:'-',
      //     fin_acc:'-',
      //     whe_track:'实时位置-绍兴市第一人民医院'
      //   },
      //   {
      //     event_time:dayjs().subtract(5.2, 'minute').format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"Elasticsearch",
      //     status:"登陆成功",
      //     sip:"43.156.37.77",
      //     sport:23324,
      //     dip:"53.236.64.75",
      //     dport:9200,
      //     d_region:"湖南省",
      //     d_city:"岳阳市",
      //     d_district:"岳阳市",
      //     d_owner:"岳阳市公安局",
      //     is_important:'是',
      //     payload:"SELECT * FROM index_name WHERE database_name = 'ms' AND list_name = 'datalist_one' AND field_name = 'f_n' AND field_type = 'string'",
      //     database_name:'mysql',
      //     list_name:'datalist_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'身份证号-120221197911290013',
      //     med_health:'-',
      //     fin_acc:'-',
      //     whe_track:'-'
      //   },
      //   {
      //     event_time:dayjs().subtract(6.8, 'minute').format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"MySQL",
      //     status:"查询操作",
      //     sip:"167.56.34.13",
      //     sport:33011,
      //     dip:"45.79.31.45",
      //     dport:3306,
      //     d_region:"河南省",
      //     d_city:"驻马店市",
      //     d_district:"驿城区",
      //     d_owner:"驻马店市第一中学",
      //     is_important:'是',
      //     payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
      //     database_name:'mysql',
      //     list_name:'dl_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'-',
      //     med_health:'诊断号-CA8963214',
      //     fin_acc:'-',
      //     whe_track:'-'
      //   },
      //   {
      //     event_time:dayjs().subtract(7.9, 'minute').format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"MySQL",
      //     status:"查询操作",
      //     sip:"175.224.57.75",
      //     sport:34530,
      //     dip:"65.91.119.59",
      //     dport:3306,
      //     d_region:"山西省",
      //     d_city:"长治市",
      //     d_district:"城区",
      //     d_owner:"中国联通长治分公司",
      //     is_important:'是',
      //     payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
      //     database_name:'mysql',
      //     list_name:'dl_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'-',
      //     med_health:'-',
      //     fin_acc:'银行卡号-6222198561354561',
      //     whe_track:'-'
      //   },
      //   {
      //     event_time:dayjs().subtract(8.3, 'minute').format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"SqlServer",
      //     status:"删除操作",
      //     sip:"68.235.44.87",
      //     sport:13736,
      //     dip:"161.51.68.252",
      //     dport:1433,
      //     d_region:"安徽省",
      //     d_city:"亳州市",
      //     d_district:"谯城区",
      //     d_owner:"亳州市交通运输局",
      //     is_important:'是',
      //     payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
      //     database_name:'sqls',
      //     list_name:'dl_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'身份证号-12022519670801003X',
      //     med_health:'-',
      //     fin_acc:'-',
      //     whe_track:'-'
      //   },
      //   {
      //     event_time:dayjs().subtract(9.5, 'minute').format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"Oracle",
      //     status:"查询操作",
      //     sip:"97.84.123.21",
      //     sport:45451,
      //     dip:"75.32.123.75",
      //     dport:1521,
      //     d_region:"广西壮族自治区",
      //     d_city:"贺州市",
      //     d_district:"八步区",
      //     d_owner:"贺州市烟草公司",
      //     is_important:'是',
      //     payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
      //     database_name:'oracle',
      //     list_name:'dl_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'-',
      //     med_health:'-',
      //     fin_acc:'-',
      //     whe_track:'实时位置-贺州市烟草公司'
      //   },
      //   {
      //     event_time:dayjs().subtract(2.4, 'minute').format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"SqlServer",
      //     status:"查询操作",
      //     sip:"75.86.83.242",
      //     sport:57311,
      //     dip:"54.36.78.31",
      //     dport:1433,
      //     d_region:"浙江省",
      //     d_city:"杭州市",
      //     d_district:"滨江区",
      //     d_owner:"杭州国际学校",
      //     is_important:'是',
      //     payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
      //     database_name:'mysql',
      //     list_name:'dl_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'身份证-120223197507215196',
      //     med_health:'-',
      //     fin_acc:'-',
      //     whe_track:'-'
      //   },
      //   {
      //     event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"SqlServer",
      //     status:"查询操作",
      //     sip:"75.86.83.242",
      //     sport:57311,
      //     dip:"54.36.78.31",
      //     dport:1433,
      //     d_region:"浙江省",
      //     d_city:"杭州市",
      //     d_district:"滨江区",
      //     d_owner:"杭州国际学校",
      //     is_important:'是',
      //     payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
      //     database_name:'mysql',
      //     list_name:'dl_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'身份证-120223197507215196',
      //     med_health:'-',
      //     fin_acc:'-',
      //     whe_track:'-'
      //   },{
      //     event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"Oracle",
      //     status:"登陆成功",
      //     sip:"68.235.44.87",
      //     sport:13736,
      //     dip:"222.212.90.33",
      //     dport:9200,
      //     d_region:"河南省",
      //     d_city:"许昌市",
      //     d_district:"市辖区",
      //     d_owner:"长葛市建设路街道办事处（产业集聚区）",
      //     is_important:'是',
      //     payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
      //     database_name:'oracle',
      //     list_name:'datalist_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'-',
      //     med_health:'诊断号-AC65132764',
      //     fin_acc:'-',
      //     whe_track:'-'
      //   },{
      //     event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"Elasticsearch",
      //     status:"登陆成功",
      //     sip:"68.235.44.87",
      //     sport:13736,
      //     dip:"123.13.206.63",
      //     dport:9200,
      //     d_region:"河南省",
      //     d_city:"许昌市",
      //     d_district:"市辖区",
      //     d_owner:"长葛市建设路街道办事处（产业集聚区）",
      //     is_important:'是',
      //     payload:"\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00",
      //     database_name:'es',
      //     list_name:'datalist_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'身份证号-210782197902212613',
      //     med_health:'-',
      //     fin_acc:'-',
      //     whe_track:'-'
      //   },
      //   {
      //     event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"Redis",
      //     status:"插入操作",
      //     sip:"23.41.231.41",
      //     sport:47455,
      //     dip:"35.127.32.222",
      //     dport:2020,
      //     d_region:"辽宁省",
      //     d_city:"锦州市",
      //     d_district:"古塔区",
      //     d_owner:"锦州医科大学附属第三医院",
      //     is_important:'是',
      //     payload:"\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00",
      //     database_name:'redis',
      //     list_name:'datalist_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'身份证号-120103197211230011',
      //     med_health:'-',
      //     fin_acc:'-',
      //     whe_track:'-'
      //   },
      //   {
      //     event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"MongoDB",
      //     status:"删除操作",
      //     sip:"98.130.147.10",
      //     sport:10068,
      //     dip:"242.231.91.83",
      //     dport:10020,
      //     d_region:"江苏省",
      //     d_city:"常州市",
      //     d_district:"天宁区",
      //     d_owner:"天宁区",
      //     is_important:'是',
      //     payload:"\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00",
      //     database_name:'MD',
      //     list_name:'datalist_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'-',
      //     med_health:'诊断号-AB69876313',
      //     fin_acc:'-',
      //     whe_track:'-'
      //   },
      //   {
      //     event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"Elasticsearch",
      //     status:"登陆成功",
      //     sip:"68.235.44.87",
      //     sport:13736,
      //     dip:"123.13.206.63",
      //     dport:3900,
      //     d_region:"浙江省",
      //     d_city:"绍兴市",
      //     d_district:"越城区",
      //     d_owner:"绍兴市第一人民医院",
      //     is_important:'是',
      //     payload:"\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00",
      //     database_name:'mysql',
      //     list_name:'datalist_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'-',
      //     med_health:'-',
      //     fin_acc:'-',
      //     whe_track:'实时位置-绍兴市第一人民医院'
      //   },
      //   {
      //     event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"Elasticsearch",
      //     status:"登陆成功",
      //     sip:"43.156.37.77",
      //     sport:23324,
      //     dip:"53.236.64.75",
      //     dport:4352,
      //     d_region:"湖南省",
      //     d_city:"岳阳市",
      //     d_district:"岳阳市",
      //     d_owner:"岳阳市公安局",
      //     is_important:'是',
      //     payload:"\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00",
      //     database_name:'mysql',
      //     list_name:'datalist_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'身份证号-120221197911290013',
      //     med_health:'-',
      //     fin_acc:'-',
      //     whe_track:'-'
      //   },
      //   {
      //     event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"MySQL",
      //     status:"查询操作",
      //     sip:"167.56.34.13",
      //     sport:33011,
      //     dip:"45.79.31.45",
      //     dport:34,
      //     d_region:"河南省",
      //     d_city:"驻马店市",
      //     d_district:"驿城区",
      //     d_owner:"驻马店市第一中学",
      //     is_important:'是',
      //     payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
      //     database_name:'mysql',
      //     list_name:'dl_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'-',
      //     med_health:'诊断号-CA8963214',
      //     fin_acc:'-',
      //     whe_track:'-'
      //   },
      //   {
      //     event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"MySQL",
      //     status:"查询操作",
      //     sip:"175.224.57.75",
      //     sport:34530,
      //     dip:"65.91.119.59",
      //     dport:577,
      //     d_region:"山西省",
      //     d_city:"长治市",
      //     d_district:"城区",
      //     d_owner:"中国联通长治分公司",
      //     is_important:'是',
      //     payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
      //     database_name:'mysql',
      //     list_name:'dl_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'-',
      //     med_health:'-',
      //     fin_acc:'银行卡号-6222198561354561',
      //     whe_track:'-'
      //   },
      //   {
      //     event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"SqlServer",
      //     status:"删除操作",
      //     sip:"68.235.44.87",
      //     sport:13736,
      //     dip:"161.51.68.252",
      //     dport:7888,
      //     d_region:"安徽省",
      //     d_city:"亳州市",
      //     d_district:"谯城区",
      //     d_owner:"亳州市交通运输局",
      //     is_important:'是',
      //     payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
      //     database_name:'sqls',
      //     list_name:'dl_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'身份证号-12022519670801003X',
      //     med_health:'-',
      //     fin_acc:'-',
      //     whe_track:'-'
      //   },
      //   {
      //     event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"Oracle",
      //     status:"查询操作",
      //     sip:"97.84.123.21",
      //     sport:45451,
      //     dip:"75.32.123.75",
      //     dport:4757,
      //     d_region:"广西壮族自治区",
      //     d_city:"贺州市",
      //     d_district:"八步区",
      //     d_owner:"贺州市烟草公司",
      //     is_important:'是',
      //     payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
      //     database_name:'oracle',
      //     list_name:'dl_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'-',
      //     med_health:'-',
      //     fin_acc:'-',
      //     whe_track:'实时位置-贺州市烟草公司'
      //   },
      //   {
      //     event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"SqlServer",
      //     status:"查询操作",
      //     sip:"75.86.83.242",
      //     sport:57311,
      //     dip:"54.36.78.31",
      //     dport:312,
      //     d_region:"浙江省",
      //     d_city:"杭州市",
      //     d_district:"滨江区",
      //     d_owner:"杭州国际学校",
      //     is_important:'是',
      //     payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
      //     database_name:'mysql',
      //     list_name:'dl_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'身份证-120223197507215196',
      //     med_health:'-',
      //     fin_acc:'-',
      //     whe_track:'-'
      //   },{
      //     event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"Oracle",
      //     status:"登陆成功",
      //     sip:"68.235.44.87",
      //     sport:13736,
      //     dip:"222.212.90.33",
      //     dport:9200,
      //     d_region:"河南省",
      //     d_city:"许昌市",
      //     d_district:"市辖区",
      //     d_owner:"长葛市建设路街道办事处（产业集聚区）",
      //     is_important:'是',
      //     payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
      //     database_name:'oracle',
      //     list_name:'datalist_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'-',
      //     med_health:'诊断号-AC65132764',
      //     fin_acc:'-',
      //     whe_track:'-'
      //   },{
      //     event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"Elasticsearch",
      //     status:"登陆成功",
      //     sip:"68.235.44.87",
      //     sport:13736,
      //     dip:"222.212.90.33",
      //     dport:9200,
      //     d_region:"河南省",
      //     d_city:"许昌市",
      //     d_district:"市辖区",
      //     d_owner:"长葛市建设路街道办事处（产业集聚区）",
      //     is_important:'是',
      //     payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
      //     database_name:'mysql',
      //     list_name:'datalist_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'身份证号-210782197902212613',
      //     med_health:'诊断号-AC65132764',
      //     fin_acc:'银行卡号-6222198561354561',
      //     whe_track:'实时位置-贺州市烟草公司'
      //   },{
      //     event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"Elasticsearch",
      //     status:"登陆成功",
      //     sip:"68.235.44.87",
      //     sport:13736,
      //     dip:"123.13.206.63",
      //     dport:9200,
      //     d_region:"河南省",
      //     d_city:"许昌市",
      //     d_district:"市辖区",
      //     d_owner:"长葛市建设路街道办事处（产业集聚区）",
      //     is_important:'是',
      //     payload:"\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00",
      //     database_name:'es',
      //     list_name:'datalist_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'身份证号-210782197902212613',
      //     med_health:'诊断号-AC65132764',
      //     fin_acc:'银行卡号-6222198561354561',
      //     whe_track:'实时位置-贺州市烟草公司'
      //   },
      //   {
      //     event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"Redis",
      //     status:"插入操作",
      //     sip:"23.41.231.41",
      //     sport:47455,
      //     dip:"35.127.32.222",
      //     dport:2020,
      //     d_region:"辽宁省",
      //     d_city:"锦州市",
      //     d_district:"古塔区",
      //     d_owner:"锦州医科大学附属第三医院",
      //     is_important:'是',
      //     payload:"\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00",
      //     database_name:'redis',
      //     list_name:'datalist_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'身份证号-210782197902212613',
      //     med_health:'诊断号-AC65132764',
      //     fin_acc:'银行卡号-6222198561354561',
      //     whe_track:'实时位置-贺州市烟草公司'
      //   },
      //   {
      //     event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"MongoDB",
      //     status:"删除操作",
      //     sip:"98.130.147.10",
      //     sport:10068,
      //     dip:"242.231.91.83",
      //     dport:10020,
      //     d_region:"江苏省",
      //     d_city:"常州市",
      //     d_district:"天宁区",
      //     d_owner:"天宁区",
      //     is_important:'是',
      //     payload:"\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00",
      //     database_name:'MD',
      //     list_name:'datalist_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'身份证号-210782197902212613',
      //     med_health:'诊断号-AC65132764',
      //     fin_acc:'银行卡号-6222198561354561',
      //     whe_track:'实时位置-贺州市烟草公司'
      //   },
      //   {
      //     event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"Elasticsearch",
      //     status:"登陆成功",
      //     sip:"68.235.44.87",
      //     sport:13736,
      //     dip:"123.13.206.63",
      //     dport:3900,
      //     d_region:"浙江省",
      //     d_city:"绍兴市",
      //     d_district:"越城区",
      //     d_owner:"绍兴市第一人民医院",
      //     is_important:'是',
      //     payload:"\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00",
      //     database_name:'mysql',
      //     list_name:'datalist_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'身份证号-210782197902212613',
      //     med_health:'诊断号-AC65132764',
      //     fin_acc:'银行卡号-6222198561354561',
      //     whe_track:'实时位置-贺州市烟草公司'
      //   },
      //   {
      //     event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"Elasticsearch",
      //     status:"登陆成功",
      //     sip:"43.156.37.77",
      //     sport:23324,
      //     dip:"53.236.64.75",
      //     dport:4352,
      //     d_region:"湖南省",
      //     d_city:"岳阳市",
      //     d_district:"岳阳市",
      //     d_owner:"岳阳市公安局",
      //     is_important:'是',
      //     payload:"\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00",
      //     database_name:'mysql',
      //     list_name:'datalist_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'身份证号-210782197902212613',
      //     med_health:'诊断号-AC65132764',
      //     fin_acc:'银行卡号-6222198561354561',
      //     whe_track:'实时位置-贺州市烟草公司'
      //   },{
      //     event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"Elasticsearch",
      //     status:"登陆成功",
      //     sip:"68.235.44.87",
      //     sport:13736,
      //     dip:"222.212.90.33",
      //     dport:9200,
      //     d_region:"河南省",
      //     d_city:"许昌市",
      //     d_district:"市辖区",
      //     d_owner:"长葛市建设路街道办事处（产业集聚区）",
      //     is_important:'是',
      //     payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
      //     database_name:'mysql',
      //     list_name:'datalist_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'身份证号-210782197902212613',
      //     med_health:'诊断号-AC65132764',
      //     fin_acc:'银行卡号-6222198561354561',
      //     whe_track:'实时位置-贺州市烟草公司'
      //   },{
      //     event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"Elasticsearch",
      //     status:"登陆成功",
      //     sip:"68.235.44.87",
      //     sport:13736,
      //     dip:"123.13.206.63",
      //     dport:9200,
      //     d_region:"河南省",
      //     d_city:"许昌市",
      //     d_district:"市辖区",
      //     d_owner:"长葛市建设路街道办事处（产业集聚区）",
      //     is_important:'是',
      //     payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
      //     database_name:'mysql',
      //     list_name:'datalist_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'身份证号-210782197902212613',
      //     med_health:'诊断号-AC65132764',
      //     fin_acc:'银行卡号-6222198561354561',
      //     whe_track:'实时位置-贺州市烟草公司'
      //   },
      //   {
      //     event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"MySQL",
      //     status:"查询操作",
      //     sip:"68.235.44.87",
      //     sport:13736,
      //     dip:"60.191.119.59",
      //     dport:3333,
      //     d_region:"浙江省",
      //     d_city:"杭州市",
      //     d_district:"滨江区",
      //     d_owner:"杭州国际学校",
      //     is_important:'是',
      //     payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
      //     database_name:'mysql',
      //     list_name:'dl_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'身份证号-210782197902212613',
      //     med_health:'诊断号-AC65132764',
      //     fin_acc:'银行卡号-6222198561354561',
      //     whe_track:'实时位置-贺州市烟草公司'
      //   },
      //   {
      //     event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"MySQL",
      //     status:"查询操作",
      //     sip:"68.235.44.87",
      //     sport:13736,
      //     dip:"60.191.119.59",
      //     dport:3333,
      //     d_region:"浙江省",
      //     d_city:"杭州市",
      //     d_district:"滨江区",
      //     d_owner:"杭州国际学校",
      //     is_important:'是',
      //     payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
      //     database_name:'mysql',
      //     list_name:'dl_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'身份证号-210782197902212613',
      //     med_health:'诊断号-AC65132764',
      //     fin_acc:'银行卡号-6222198561354561',
      //     whe_track:'实时位置-贺州市烟草公司'
      //   },
      //   {
      //     event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"MySQL",
      //     status:"查询操作",
      //     sip:"68.235.44.87",
      //     sport:13736,
      //     dip:"60.191.119.59",
      //     dport:3333,
      //     d_region:"浙江省",
      //     d_city:"杭州市",
      //     d_district:"滨江区",
      //     d_owner:"杭州国际学校",
      //     is_important:'是',
      //     payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
      //     database_name:'mysql',
      //     list_name:'dl_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'身份证号-210782197902212613',
      //     med_health:'诊断号-AC65132764',
      //     fin_acc:'银行卡号-6222198561354561',
      //     whe_track:'实时位置-贺州市烟草公司'
      //   },
      //   {
      //     event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"MySQL",
      //     status:"查询操作",
      //     sip:"68.235.44.87",
      //     sport:13736,
      //     dip:"60.191.119.59",
      //     dport:3333,
      //     d_region:"浙江省",
      //     d_city:"杭州市",
      //     d_district:"滨江区",
      //     d_owner:"杭州国际学校",
      //     is_important:'是',
      //     payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
      //     database_name:'mysql',
      //     list_name:'dl_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'身份证号-210782197902212613',
      //     med_health:'诊断号-AC65132764',
      //     fin_acc:'银行卡号-6222198561354561',
      //     whe_track:'实时位置-贺州市烟草公司'
      //   },
      //   {
      //     event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"MySQL",
      //     status:"查询操作",
      //     sip:"68.235.44.87",
      //     sport:13736,
      //     dip:"60.191.119.59",
      //     dport:3333,
      //     d_region:"浙江省",
      //     d_city:"杭州市",
      //     d_district:"滨江区",
      //     d_owner:"杭州国际学校",
      //     is_important:'是',
      //     payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
      //     database_name:'mysql',
      //     list_name:'dl_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'身份证号-210782197902212613',
      //     med_health:'诊断号-AC65132764',
      //     fin_acc:'银行卡号-6222198561354561',
      //     whe_track:'实时位置-贺州市烟草公司'
      //   },
      //   {
      //     event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"MySQL",
      //     status:"查询操作",
      //     sip:"68.235.44.87",
      //     sport:13736,
      //     dip:"60.191.119.59",
      //     dport:3333,
      //     d_region:"浙江省",
      //     d_city:"杭州市",
      //     d_district:"滨江区",
      //     d_owner:"杭州国际学校",
      //     is_important:'是',
      //     payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
      //     database_name:'mysql',
      //     list_name:'dl_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'身份证号-210782197902212613',
      //     med_health:'诊断号-AC65132764',
      //     fin_acc:'银行卡号-6222198561354561',
      //     whe_track:'实时位置-贺州市烟草公司'
      //   },
      //   {
      //     event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"MySQL",
      //     status:"查询操作",
      //     sip:"68.235.44.87",
      //     sport:13736,
      //     dip:"60.191.119.59",
      //     dport:3333,
      //     d_region:"浙江省",
      //     d_city:"杭州市",
      //     d_district:"滨江区",
      //     d_owner:"杭州国际学校",
      //     is_important:'是',
      //     payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
      //     database_name:'mysql',
      //     list_name:'dl_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'身份证号-210782197902212613',
      //     med_health:'诊断号-AC65132764',
      //     fin_acc:'银行卡号-6222198561354561',
      //     whe_track:'实时位置-贺州市烟草公司'
      //   },
      //   {
      //     event_time:dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
      //     database_type:"MySQL",
      //     status:"查询操作",
      //     sip:"68.235.44.87",
      //     sport:13736,
      //     dip:"60.191.119.59",
      //     dport:3333,
      //     d_region:"浙江省",
      //     d_city:"杭州市",
      //     d_district:"滨江区",
      //     d_owner:"杭州国际学校",
      //     is_important:'是',
      //     payload:'\\01\\01\\00\\E0\\00\\00\\01\\00\\19\\00\\00\\00\\12\\00\\00\\00\\00\\02\\00\\00\\00\\00\\00\\00\\00\\00\\00\\00\\01\\00\\00\\00S\\00e\\00\\00d\\00a\\00t\\00a\\00s\\00o\\00u\\00r\\00c\\00e\\00',
      //     database_name:'mysql',
      //     list_name:'dl_one',
      //     field_name:'f_n',
      //     field_type:'string',
      //     define_type:'String',
      //     mg_level:'高',
      //     fx_level:'高',
      //     id_imp:'身份证号-210782197902212613',
      //     med_health:'诊断号-AC65132764',
      //     fin_acc:'银行卡号-6222198561354561',
      //     whe_track:'实时位置-贺州市烟草公司'
      //   }
      // ]
      }
      
      
    }
  },
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = true
    next(0)
  },
  mounted() {
    // this.search()   // 7.6 测试暂时关闭
  },
  watch: {

    dialogTableVisible: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.initChart();
        } else {
          this.destroyChart();
        }
      },
    },
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
          this.start_time = dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss')
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
.dialog-body{
	// width: 100%;
    font-size: 14px;
    border: 1px solid #d6d6d6;
    padding: 10px 20px;
    overflow: auto;
}
.dialog-body-title{
	padding: 1px 0;
    font-size: 17px;
    color: #333;
    font-weight: 700;
    display: flex;
    // -webkit-box-align: center;
    // -ms-flex-align: center;
    align-items: center;
}
.dialog-body .start-png{
	width: 20px;
    height: 20px;
    margin-right: 0;
	background: url(../assets/img/data_image_base1.png) no-repeat 50%;
	// background-size: contain;
}
.dialog-body-left{
	margin-left:6px;
	margin-bottom: 2px;
	font-size: 14px;
	color: #aaaaaa;
}
.dialog-body-right{
	font-size: 14px;
    font-weight: 500;
}
.my-el-row{
    margin-top: 8px;
}
.my-el-row div{
    float: left;
    width: 33%;
}
.my-el-row::after{
    content:'';
    display:block;
    clear: both;
}

.mylink{
  cursor: pointer; 
  text-decoration: none;
}
.mylink:hover{
  cursor: pointer; 
  text-decoration: underline;
}
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
