<template>
  <div>
    <header class="w">
        <div class="info">
          <router-link active-class="active" to="/info1">数据库操作记录查询</router-link>          
        </div>
        <div class="info" style="margin-left: -1px;">
          <router-link active-class="active" to="/info2">数据库基础信息查询</router-link>           
        </div>
    </header>
    <section class="w">
      <div class="infobody">
        <router-view></router-view>
      </div>      
    </section>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.w{
    margin: 0 auto;
    width: 1050px;
}
.info{
    margin:40px 10px 0 0;
    display: inline-block;
    padding: 8px 0px;
    border:1px solid #dcdfe6;
    border-radius: 5px;
}
.w .info:hover{
  cursor:pointer;
  
}

.infobody{
  width: 100%;
  margin-top: 5px;
}
a{
  text-decoration: none;
  color: #606266;
  padding: 8px 15px;
}
.active{
  border-radius: 5px;
  background-color:#409eff;
  color:white;
  border:1px solid transparent!important;
}
</style>