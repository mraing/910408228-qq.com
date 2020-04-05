# vue-router

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 思路

* 首先前端要配置好路由，保证路由的地址是正确的，后端返回的路由列表基本和前端要保持一致。不能说后端返回的路由前端都查不到，那就肯定是错误的。

* 第二，后端返回的路由格式要和 `router` 的数据格式保持一致。

```JavaScript
// 举个栗子
const routerList = [
    {
        path: '/home',
        component: Home,
        children: [
            {
                path: 'menu-1',
                component: Menu1
            },
            {
                path: 'menu-2',
                component: Menu2
            }
        ]
    }
]
```

* 第三，添加路由的时候，可以放在登录成功后，路由守卫里面去进行操作，即在路由之前就将动态路由表放进去。

## 实践

* 先在前端配置好路由列表

```JavaScript
// routerConfigMap.js

// 懒加载路由
const HelloWorld = () => import('@/components/HelloWorld')
const Menus1 = () => import('@/views/menus-1/Menus-1')
const Menus2 = () => import('@/views/menus-2/Menus-2')

// 查找路由，将字符串的component和对象的component对应起来
export const routerConfigMap = {
  'HelloWorld': HelloWorld,
  'Menus1': Menus1,
  'Menus2': Menus2
}
```

* 其实前端可以提前实现一下即将要加载的动态路由，看能不能正确链接到，确认无误后再和后端协商沟通路由的格式之类的。

```JavaScript
// 导入我们已经配置好的路由文件
import {routerConfigMap} from '@/router/routerMap'

// 请求后台数据
axios.get(...).then((res) => {
    // 根据实际情况进行赋值
    let routerMap = res.data.routerMap
    let routerList = this.filterRouter(routerMap)
    // 将处理好的数据添加进路由
    this.$router.addRoutes(routerList)
})

// 过滤整理路由函数
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
```

## 总结

这样就实现了我们的动态路由，其实整个动态路由流程都很简单，难点就在于后台传过来的 `router` 列表中的 `component` 属性是个字符串，我们需要将这个字符串转变成为我们的实际组件。

所以我们写了一个 `routerConfigMap` 对象，可以通过 `routerConfigMap[component]` 找到真正的组件对象。最后我们将处理好的路由表动态添加进路由中。

> 配置好的路由表定义好之后，就别去轻易改动了，因为数据对不上，那么就会找不到相应路由，从而导致报错。