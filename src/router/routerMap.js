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

// 模拟请求到的路由
export const ansyRouter = [
  {
    path: '/',
    name: 'HelloWorld',
    component: 'HelloWorld',
    mate: {
      name: '首页',
      icon: 'el-icon-menu'
    },
    hidden: false,
    children: [
      {
        path: 'menus-1',
        component: 'Menus1',
        mate: {
          name: '菜单 1',
          icon: 'el-icon-s-goods'
        }
      },
      {
        path: 'menus-2',
        component: 'Menus2',
        mate: {
          name: '菜单 2',
          icon: 'el-icon-user-solid'
        }
      }
    ]
  }
]
