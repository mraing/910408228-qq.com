<template>
  <div class="hello">
    <el-header>
      <h1></h1>
      <el-button type="primary" @click="addRouter">添加动态路由</el-button>
    </el-header>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside v-show="routerList.length">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu default-active="1" router class="el-menu-vertical-demo" :collapse="isCollapse">
          <template v-for="(item, index) in routerList">
            <el-submenu :index="item.path" :key="index">
              <template slot="title">
                <i :class="item.mate.icon"></i>
                <span slot="title">{{item.mate.name}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="(child, index) in item.children" :key="index" :index="child.path">{{child.mate.name}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <!-- 路由窗口 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'
import {routerConfigMap} from '@/router/routerMap'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      isCollapse: false,
      routerList: []
    }
  },
  methods: {
    // 添加动态路由
    addRouter () {
      // 请求动态路由，或者直接从 routerMap 里面拿到静态的路由地址
      axios.get('http://localhost:7300/mock/5e74332a9ff9860021cf1edc/znyproject/routermap')
        .then((res) => {
          // console.log(res)
          let routerMap = res.data.data.routerMap
          // 将路由列表渲染到菜单上
          this.routerList = routerMap
          // 将请求到的路由过滤处理后添加到路由列表上
          let routerList = this.filterRouter(routerMap)
          this.$router.addRoutes(routerList)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 过滤整理路由
    filterRouter (routerMap) {
      routerMap.forEach(item => {
        item.component = routerConfigMap[item.component]
        if (item.children) {
          // 如果有子路由则继续这一步操作
          return this.filterRouter(item.children)
        }
      })
      return routerMap
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
