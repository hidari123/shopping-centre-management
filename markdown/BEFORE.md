<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [vue3](#vue3)
  - [vite基本使用](#vite%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8)
  - [创建](#%E5%88%9B%E5%BB%BA)
  - [选项API和组合API](#%E9%80%89%E9%A1%B9api%E5%92%8C%E7%BB%84%E5%90%88api)
  - [组合API-setup函数](#%E7%BB%84%E5%90%88api-setup%E5%87%BD%E6%95%B0)
  - [组合API-生命周期](#%E7%BB%84%E5%90%88api-%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)
  - [组合API-reactive函数](#%E7%BB%84%E5%90%88api-reactive%E5%87%BD%E6%95%B0)
  - [组合API-toRef函数](#%E7%BB%84%E5%90%88api-toref%E5%87%BD%E6%95%B0)
  - [组合API-toRefs函数](#%E7%BB%84%E5%90%88api-torefs%E5%87%BD%E6%95%B0)
  - [组合API-ref函数](#%E7%BB%84%E5%90%88api-ref%E5%87%BD%E6%95%B0)
  - [组合API-computed函数](#%E7%BB%84%E5%90%88api-computed%E5%87%BD%E6%95%B0)
  - [组合API-watch函数](#%E7%BB%84%E5%90%88api-watch%E5%87%BD%E6%95%B0)
  - [组合API-ref属性](#%E7%BB%84%E5%90%88api-ref%E5%B1%9E%E6%80%A7)
  - [组合API-父子通讯](#%E7%BB%84%E5%90%88api-%E7%88%B6%E5%AD%90%E9%80%9A%E8%AE%AF)
  - [组合API-依赖注入](#%E7%BB%84%E5%90%88api-%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5)
  - [补充-v-model语法糖](#%E8%A1%A5%E5%85%85-v-model%E8%AF%AD%E6%B3%95%E7%B3%96)
  - [补充-mixins语法](#%E8%A1%A5%E5%85%85-mixins%E8%AF%AD%E6%B3%95)
- [vuex](#vuex)
  - [vuex基础](#vuex%E5%9F%BA%E7%A1%80)
  - [vuex-持久化](#vuex-%E6%8C%81%E4%B9%85%E5%8C%96)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# vue3
1. 性能提升，运行速度事vue2.x的1.5倍左右
2. 体积更小，按需编译体积比vue2.x要更小
3. 类型推断，更好的支持Ts（typescript）这个也是趋势
4. 高级给予，暴露了更底层的API和提供更先进的内置组件
5. ★组合API (composition api) ，能够更好的组织逻辑，封装逻辑，复用逻辑

## vite基本使用
- 它是一个更加轻量（热更新速度快，打包构建速度快）的vue项目脚手架工具。
- 相对于vue-cli它默认安装的插件非常少，随着开发过程依赖增多，需要自己额外配置。
- vite基本使用：
    - 创建项目 npm init vite-app 项目名称 或者 yarn create vite-app 项目名称
    - 安装依赖 npm i 或者 yarn
    - 启动项目 npm run dev 或者 yarn dev

## 创建
```vue
<template>
  <div class="container">
    我是根组件
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
```
```js
// 创建一个vue应用
// 1. 导入createApp函数
// 2. 编写一个根组件App.vue，导入进来
// 3. 基于根组件创建应用实例
// 4. 挂载到index.html的#app容器

import {createApp} from 'vue'
import App from './App.vue'
const app = createApp(App)
app.mount('#app')
```

***总结：*** 如何创建vue应用实例？
通过createApp创建应用实例--->扩展功能将来都是在app上进行。

## 选项API和组合API
1. Options ApI => 选项API 写法
    1. 代码风格：data选项写数据，methods选项写函数...，一个功能逻辑的代码分散。
    2. 优点：易于学习和使用，写代码的位置已经约定好
    3. 缺点：代码组织性差，相似的逻辑代码不便于复用，逻辑复杂代码多了不好阅读。
    4. 补充：虽然提供mixins用来封装逻辑，但是出现数据函数覆盖的概率很大，不好维护。
2. Compositon API => 组合API 写法
    1. 代码风格：一个功能逻辑的代码组织在一起（包含数据，函数...）
    2. 优点：功能逻辑复杂繁多情况下，各个功能逻辑代码组织再一起，便于阅读和维护
    3. 缺点：需要有良好的代码组织能力和拆分逻辑能力，PS：大家没问题。
    4. 补充：为了能让大家较好的过渡到vue3.0的版本来，也支持vue2.x选项API写法

## 组合API-setup函数
- setup 是一个新的组件选项，作为组件中使用组合API的起点。
- 从组件生命周期来看，它的执行在组件实例创建之前vue2.x的beforeCreate执行。
- 这就意味着在setup函数中 this 还不是组件实例，this 此时是 undefined
- 在模版中需要使用的数据和函数，需要在 setup 返回。

***总结：*** setup 组件初始化之前执行，它返回的数据和函数可在模版使用。

## 组合API-生命周期
- setup 创建实例前
- onBeforeMount 挂载DOM前
- onMounted 挂载DOM后
- onBeforeUpdate 更新组件前
- onUpdated 更新组件后
- onBeforeUnmount 卸载销毁前
- onUnmounted 卸载销毁后

***总结：*** 组合API的生命周期钩子有7个，可以多次使用同一个钩子，执行顺序和书写顺序相同。

## 组合API-reactive函数
- reactive是一个函数，它可以定义一个复杂数据类型，成为响应式数据。
```vue
<template>
  <div class="container">
    <div>{{obj.name}}</div>
    <div>{{obj.age}}</div>
    <button @click="updateName">修改数据</button>
  </div>
</template>
<script>
import { reactive } from 'vue'
export default {
  name: 'App',
  setup () {
    // 普通数据
    // const obj = {
    //   name: 'ls',
    //   age: 18
    // }
    const obj = reactive({
      name: 'ls',
      age: 18
    })

    // 修改名字
    const updateName = () => {
      console.log('updateName')
      obj.name = 'zs'
    }

    return { obj ,updateName}
  }
}
</script>
```

***总结：*** 通常是用来定义响应式**对象数据**

## 组合API-toRef函数
toRef是函数，转换**响应式对象**中**某个**属性为单独响应式数据，并且**值是关联的**。
```vue
<template>
  <div class="container">
    {{name}} <button @click="updateName">修改数据</button>
  </div>
</template>
<script>
import { reactive, toRef } from 'vue'
export default {
  name: 'App',
  setup () {
    // 1. 响应式数据对象
    const obj = reactive({
      name: 'ls',
      age: 10
    })
    console.log(obj)
    // 2. 模板中只需要使用name数据
    // 注意：从响应式数据对象中解构出的属性数据，不再是响应式数据
    // let { name } = obj 不能直接解构，出来的是一个普通数据
    const name = toRef(obj, 'name')
    // console.log(name)
    const updateName = () => {
      console.log('updateName')
      // toRef转换响应式数据包装成对象，value存放值的位置
      name.value = 'zs'
    }

    return {name, updateName}
  }
}
</script>
<style scoped lang="less"></style>
```
使用场景：有一个响应式对象数据，但是模版中只需要使用其中一项数据。

## 组合API-toRefs函数
toRefs是函数，转换**响应式对象**中所有属性为单独响应式数据，对象成为普通对象，并且**值是关联的**
```vue
<template>
  <div class="container">
    <div>{{name}}</div>
    <div>{{age}}</div>
    <button @click="updateName">修改数据</button>
  </div>
</template>
<script>
import { reactive, toRef, toRefs } from 'vue'
export default {
  name: 'App',
  setup () {
    // 1. 响应式数据对象
    const obj = reactive({
      name: 'ls',
      age: 10
    })
    console.log(obj)
    // 2. 解构或者展开响应式数据对象
    // const {name,age} = obj
    // console.log(name,age)
    // const obj2 = {...obj}
    // console.log(obj2)
    // 以上方式导致数据就不是响应式数据了
    const obj3 = toRefs(obj)
    console.log(obj3)

    const updateName = () => {
      // obj3.name.value = 'zs'
      obj.name = 'zs'
    }

    return {...obj3, updateName}
  }
}
</script>
<style scoped lang="less"></style>
```
使用场景：剥离响应式对象（解构|展开），想使用响应式对象中的多个或者所有属性做为响应式数据。

## 组合API-ref函数
- ref函数，常用于简单数据类型定义为响应式数据
    - 再修改值，获取值的时候，需要.value
    - 在模板中使用ref申明的响应式数据，可以省略.value
```vue
<template>
  <div class="container">
    <div>{{name}}</div>
    <div>{{age}}</div>
    <button @click="updateName">修改数据</button>
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  name: 'App',
  setup () {
    // 1. name数据
    const name = ref('ls')
    console.log(name)
    const updateName = () => {
      name.value = 'zs'
    }
    // 2. age数据
    const age = ref(10)

    // ref常用定义简单数据类型的响应式数据
    // 其实也可以定义复杂数据类型的响应式数据
    // 对于数据未之的情况下 ref 是最适用的
    // const data = ref(null)
    // setTimeout(()=>{
    //   data.value = res.data
    // },1000)

    return {name, age, updateName}
  }
}
</script>
```
**使用场景：**
当你明确知道需要的是一个响应式数据 **对象** 那么就使用 **reactive** 即可
其他情况使用**ref**

## 组合API-computed函数
- computed函数，是用来定义计算属性的，计算属性不能修改。
基本使用：
```vue
<template>
  <div class="container">
    <div>今年：{{age}}岁</div>
    <div>后年：{{newAge}}岁</div>
  </div>
</template>
<script>
import { computed, ref } from 'vue'
export default {
  name: 'App',
  setup () {
    // 1. 计算属性：当你需要依赖现有的响应式数据，根据一定逻辑得到一个新的数据。
    const age = ref(16)
    // 得到后年的年龄
    const newAge = computed(()=>{
      // 该函数的返回值就是计算属性的值
      return age.value + 2
    })

    return {age, newAge}
  }
}
</script>
```
高级用法：
```vue
<template>
  <div class="container">
    <div>今年：{{age}}岁</div>
    <div>后年：{{newAge}}岁</div>
    <!-- 使用v-model绑定计算属性 -->
    <input type="text" v-model="newAge">
  </div>
</template>
<script>
import { computed, ref } from 'vue'
export default {
  name: 'App',
  setup () {
    // 1. 计算属性：当你需要依赖现有的响应式数据，根据一定逻辑得到一个新的数据。
    const age = ref(16)
    // 得到后年的年龄
    // const newAge = computed(()=>{
    //   // 该函数的返回值就是计算属性的值
    //   return age.value + 2
    // })

    // 计算属性高级用法，传人对象
    const newAge = computed({
      // get函数，获取计算属性的值
      get(){
        return age.value + 2
      },
      // set函数，当你给计算属性设置值的时候触发
      set (value) {
        age.value = value - 2
      }
    })


    return {age, newAge}
  }
}
</script>
```
**目的：**让计算属性支持双向数据绑定。
**总结：**计算属性两种用法
    给computed传入函数，返回值就是计算属性的值
    给computed传入对象，get获取计算属性的值，set监听计算属性改变。

## 组合API-watch函数
- 监听ref定义的响应式数据
- 监听多个响应式数据数据
- 监听reactive定义的响应式数据
- 监听reactive定义的响应式数据，某一个属性
- 深度监听
- 默认执行
```vue
<template>
  <div class="container">
    <div>
      <p>count的值：{{count}}</p>
      <button @click="add">改数据</button>
    </div>
    <hr>
    <div>
      <p>{{obj.name}}</p>
      <p>{{obj.age}}</p>
      <p>{{obj.brand.name}}</p>
      <button @click="updateName">改名字</button>
      <button @click="updateBrandName">改品牌名字</button>
    </div>
  </div>
</template>
<script>
import { reactive, ref, watch } from 'vue'
export default {
  name: 'App',
  setup () {
    const count = ref(0)
    const add = () => {
      count.value++
    }
    // 当你需要监听数据的变化就可以使用watch
    // 1. 监听一个ref数据
    // 1.1 第一个参数  需要监听的目标
    // 1.2 第二个参数  改变后触发的函数
    // watch(count, (newVal,oldVal)=>{
    //   console.log(newVal,oldVal)
    // })


    const obj = reactive({
      name: 'ls',
      age: 10,
      brand: {
        id: 1,
        name: '宝马'
      }
    })
    const updateName = () => {
      obj.name = 'zs'
    }
    const updateBrandName = () => {
      obj.brand.name = '奔驰'
    }
    // 2. 监听一个reactive数据
    watch(obj, ()=>{
      console.log('数据改变了')
    })

    watch(()=>obj.brand, ()=>{
      console.log('brand数据改变了')
    },{
      // 5. 需要深度监听
      deep: true,
      // 6. 想默认触发
      immediate: true
    })

    // 3. 监听多个数据的变化
    // watch([count, obj], ()=>{
    //   console.log('监听多个数据改变了')
    // }) 


    // 4. 此时监听对象中某一个属性的变化 例如：obj.name 
    // 需要写成函数返回该属性的方式才能监听到
    // watch(()=>obj.name,()=>{
    //   console.log('监听obj.name改变了')
    // })

    return {count, add, obj, updateName, updateBrandName}
  }
}
</script>
```

## 组合API-ref属性
获取DOM或者组件实例可以使用ref属性，写法和vue2.0需要区分开
获取单个DOM或者组件
```vue
<template>
  <div class="container">
    <!-- vue2.0 获取单个元素 -->
    <!-- 1. 通过ref属性绑定该元素 -->
    <!-- 2. 通过this.$refs.box获取元素 -->
    <!-- <div ref="box">我是box</div> -->
    <!-- vue2.0 获取v-for遍历的多个元素 -->
    <!-- 1. 通过ref属性绑定被遍历元素 -->
    <!-- 2. 通过this.$refs.li 获取所有遍历元素  -->
    <!-- <ul>
      <li v-for="i in 4" :key="i" ref="li">{{i}}</li>
    </ul> -->

    <!-- 单个元素 -->
    <div ref="dom">我是box</div>
    <!-- 被遍历的元素 -->
    <ul>
      <li v-for="i in 4" :key="i" :ref="setDom">第{{i}}LI</li>
    </ul>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue'
export default {
  name: 'App',
  setup () {
    // 1. 获取单个元素
    // 1.1 先定义一个空的响应式数据ref定义的
    // 1.2 setup中返回该数据，你想获取那个dom元素，在该元素上使用ref属性绑定该数据即可。
    const dom = ref(null)
    onMounted(()=>{
       console.log(dom.value)
    })
  }
}
</script>
<style scoped lang="less"></style>
```
获取v-for遍历的DOM或者组件
```js
// 2. 获取v-for遍历的元素
// 2.1 定义一个空数组，接收所有的LI
// 2.2 定义一个函数，往空数组push DOM
const domList = []
const setDom = (el) => {
    domList.push(el)
}
onMounted(()=>{
    console.log(domList)
})
return {dom, setDom}
```
**总结：**
1. 单个元素：先申明ref响应式数据，返回给模版使用，通过ref绑定数据
2. 遍历的元素：先定义一个空数组，定一个函数获取元素，返回给模版使用，通过ref绑定这个函数
    - 有一个边界问题：组件更新的时候会重复的设置dom元素给数组：
    ```js
    // ref获取v-for遍历的DOM元素，需要在组件更新的时候重置接受dom元素的数组。
    onBeforeUpdate(()=>{
      list = []
    })
    ```

## 组合API-父子通讯
父传子：使用props选项和emits选项完成父子组件通讯
```vue
<template>
  <div class="container">
    <h1>父组件</h1>
    <p>{{money}}</p>
    <hr>
    <Son :money="money" />
  </div>
</template>
<script>
import { ref } from 'vue'
import Son from './Son.vue'
export default {
  name: 'App',
  components: {
    Son
  },
  // 父组件的数据传递给子组件
  setup () {
    const money = ref(100)
    return { money }
  }
}
</script>
```
```vue
<template>
  <div class="container">
    <h1>子组件</h1>
    <p>{{money}}</p>
  </div>
</template>
<script>
import { onMounted } from 'vue'
export default {
  name: 'Son',
  // 子组件接收父组件数据使用props即可
  props: {
    money: {
      type: Number,
      default: 0
    }
  },
  setup (props) {
    // 获取父组件数据money
    console.log(props.money)
  }
}
</script>
```
子传父：
```vue
<template>
  <div class="container">
    <h1>父组件</h1>
    <p>{{money}}</p>
    <hr>
    <Son :money="money" @change-money="updateMoney" />
  </div>
</template>
<script>
import { ref } from 'vue'
import Son from './Son.vue'
export default {
  name: 'App',
  components: {
    Son
  },
  // 父组件的数据传递给子组件
  setup () {
    const money = ref(100)
    const updateMoney = (newMoney) => {
      money.value = newMoney
    }
    return { money , updateMoney}
  }
}
</script>
```
```vue
<template>
  <div class="container">
    <h1>子组件</h1>
    <p>{{money}}</p>
    <button @click="changeMoney">花50元</button>
  </div>
</template>
<script>
import { onMounted } from 'vue'
export default {
  name: 'Son',
  // 子组件接收父组件数据使用props即可
  props: {
    money: {
      type: Number,
      default: 0
    }
  },
  // props 父组件数据
  // emit 触发自定义事件的函数
  setup (props, {emit}) {
    // 获取父组件数据money
    console.log(props.money)
    // 向父组件传值
    const changeMoney = () => {
      // 消费50元
      // 通知父组件，money需要变成50
      emit('change-money', 50)
    }
    return {changeMoney}
  }
}
</script>
```
扩展：
- 在vue2.x的时候 `.sync` 除去`v-model`实现双向数据绑定的另一种方式
```html
<!-- <Son :money='money' @update:money="fn"  /> -->
<Son :money.sync='money'  />
```
在vue3.0的时候，使用 `v-model:money="money"` 即可
```html
<!-- <Son :money="money" @update:money="updateMoney" /> -->
<Son v-model:money="money" />
```
**总结：**
- 父传子：在`setup`中使用`props`数据 `setup(props){ // props就是父组件数据 }`
- 子传父：触发自定义事件的时候`emit`来自 `setup(props,{emit}){ // emit 就是触发事件函数 }`
- 在vue3.0中 `v-model` 和 `.sync` 已经合并成 `v-model` 指令

## 组合API-依赖注入
使用`provide`函数和`inject`函数完成后代组件数据通讯
使用场景：有一个父组件，里头有子组件，有孙组件，有很多后代组件，共享父组件数据。
```vue
<template>
  <div class="container">
    <h1>父组件 {{money}} <button @click="money=1000">发钱</button></h1>
    <hr>
    <Son />
  </div>
</template>
<script>
import { provide, ref } from 'vue'
import Son from './Son.vue'
export default {
  name: 'App',
  components: {
    Son
  },
  setup () {
    const money = ref(100)
    const changeMoney = (saleMoney) => {
      console.log('changeMoney',saleMoney)
      money.value = money.value - saleMoney
    }
    // 将数据提供给后代组件 provide
    provide('money', money)
    // 将函数提供给后代组件 provide
    provide('changeMoney', changeMoney)

    return { money }
  }
}
</script>
<style scoped lang="less"></style>
```
```vue
<template>
  <div class="container">
    <h2>子组件 {{money}}</h2>
    <hr>
    <GrandSon />
  </div>
</template>
<script>
import { inject } from 'vue'
import GrandSon from './GrandSon.vue'
export default {
  name: 'Son',
  components: {
    GrandSon
  },
  setup () {
    // 接收祖先组件提供的数据
    const money = inject('money')
    return { money }
  }
}
</script>
<style scoped lang="less"></style>
```
```vue
<template>
  <div class="container">
    <h3>孙组件 {{money}} <button @click="fn">消费20</button></h3>
  </div>
</template>
<script>
import { inject } from 'vue'
export default {
  name: 'GrandSon',
  setup () {
    const money = inject('money')
    // 孙组件，消费50，通知父组件App.vue组件，进行修改
    // 不能自己修改数据，遵循单选数据流原则，大白话：数据谁定义谁修改
    const changeMoney = inject('changeMoney')
    const fn = () => {
      changeMoney(20)
    }
    return {money, fn}
  }
}
</script>
<style scoped lang="less"></style>
```
**总结：**
- `provide`函数提供数据和函数给后代组件使用
- `inject`函数给当前组件注入`provide`提供的数据和函数

## 补充-v-model语法糖
在vue2.0中v-mode语法糖简写的代码 `<Son :value="msg" @input="msg=$event" />`
在vue3.0中v-model语法糖有所调整：`<Son :modelValue="msg" @update:modelValue="msg=$event" />`
```vue
<template>
  <div class="container">
    <!-- 如果你想获取原生事件事件对象 -->
    <!-- 如果绑定事函数 fn fn(e){ // e 就是事件对象 } -->
    <!-- 如果绑定的是js表达式  此时提供一个默认的变量 $event -->
    <h1 @click="$event.target.style.color='red'">父组件 {{count}}</h1>
    <hr>
    <!-- 如果你想获取自定义事件  -->
    <!-- 如果绑定事函数 fn fn(data){ // data 触发自定义事件的传参 } -->
    <!-- 如果绑定的是js表达式  此时 $event代表触发自定义事件的传参 -->
    <!-- <Son :modelValue="count" @update:modelValue="count=$event" /> -->
    <Son v-model="count" />
  </div>
</template>
<script>
import { ref } from 'vue'
import Son from './Son.vue'
export default {
  name: 'App',
  components: {
    Son
  },
  setup () {
    const count = ref(10)
    return { count }
  }
}
</script>
```
```vue
<template>
  <div class="container">
    <h2>子组件 {{modelValue}} <button @click="fn">改变数据</button></h2>
  </div>
</template>
<script>
export default {
  name: 'Son',
  props: {
    modelValue: {
      type: Number,
      default: 0
    }
  },
  setup (props, {emit}) {
    const fn = () => {
      // 改变数据
      emit('update:modelValue', 100)
    }
    return { fn }
  }
}
</script>
```
**总结：** vue3.0封装组件支持v-model的时候，父传子`:modelValue` 子传父 `@update:modelValue`
**补充：** vue2.0的 `xxx.sync` 语法糖解析 父传子 `:xxx` 子传父 `@update:xxx` 在vue3.0 使用 `v-model:xxx` 代替。

## 补充-mixins语法
- 混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。
理解全局混入：所有组件混入了这些逻辑代码
```js
// 全局混入 全局mixin
// vue2.0 写法  Vue.mixin({})
app.mixin({
  methods: {
    say () {
      console.log(this.$el,'在mounted中调用say函数')
    }
  },
  mounted () {
    this.say()
  }
})
```
```vue
<template>
  <div class="container1">
    <h1> 作者：周杰伦  <a href="javascript:;">关注</a> </h1>
    <hr>
    <Son />
  </div>
</template>
<script>
import Son from './Son.vue'
export default {
  name: 'App',
  components: {
    Son
  }
}
</script>
```
```vue
<template>
  <div class="container2">
    <h2> 作者：周杰伦  <button>关注</button> </h2>
  </div>
</template>
<script>
export default {
  name: 'Son'
}
</script>
<style scoped lang="less"></style>
```
理解局部混入：通过mixins选项进行混入
```js
// 配置对象
export const followMixin =  {
  data () {
    return {
      loading: false
    }
  },
  methods: {
    followFn () {
      this.loading = true
      // 模拟请求
      setTimeout(()=>{
        // 省略请求代码
        this.loading = false
      },2000)
    }
  }
}
```
```vue
<template>
  <div class="container1">
    <h1> 作者：周杰伦  <a href="javascript:;" @click="followFn">{{loading?'请求中...':'关注'}}</a> </h1>
    <hr>
    <Son />
  </div>
</template>
<script>
import Son from './Son.vue'
import {followMixin} from './mixins'
export default {
  name: 'App',
  components: {
    Son
  },
  mixins: [followMixin]
}
</script>
```
```vue
<template>
  <div class="container2">
    <h2> 作者：周杰伦  <button @click="followFn">{{loading?'loading...':'关注'}}</button> </h2>
  </div>
</template>
<script>
import {followMixin} from './mixins'
export default {
  name: 'Son',
  mixins: [followMixin]
}
</script>
<style scoped lang="less"></style>
```
总结： 在vue2.0中一些可复用的逻辑可以使用mixins来封装，当是需要考虑逻辑代码冲突问题。vue3.0的组合API很好的解决了这个问题，就不在推荐使用mixins了。


# vuex
## vuex基础
1. 根模块的用法
定义
```js
export default createStore({
  state: {
    username: 'zs'
  },
  getters: {
    newName (state) {
      return state.username + '!!!'
    }
  },
  mutations: {
    updateName (state) {
      state.username = 'ls'
    }
  },
  actions: {
    updateName (ctx) {
      // 发请求
      setTimeout(() => {
        ctx.commit('updateName')
      }, 1000)
    }
  },
  modules: {

  }
})
```
```vue
<template>
  <!-- vue2.0需要根元素，vue3.0可以是代码片段 Fragment -->
  <div>
    App
    <!-- 1. 使用根模块state的数据   -->
    <p>{{$store.state.username}}</p>
    <!-- 2. 使用根模块getters的数据   -->
    <p>{{$store.getters['newName']}}</p>
    <button @click="mutationsFn">mutationsFn</button>
  </div>
</template>
<script>
import { useStore } from 'vuex'
export default {
  name: 'App',
  setup () {
    // 使用vuex仓库
    const store = useStore()
    // 1. 使用根模块state的数据
    console.log(store.state.username)
    // 2. 使用根模块getters的数据
    console.log(store.getters.newName)
    const mutationsFn = () => {
      // 3. 提交根模块mutations函数
      // store.commit('updateName')
      // 4. 调用根模块actions函数
      store.dispatch('updateName')
    }
    return { mutationsFn }
  }
}
</script>
```
2. modules (分模块)
- 存在两种情况
    - 默认的模块，state 区分模块，其他 getters mutations actions 都在全局。
    - 带命名空间 namespaced: true 的模块，所有功能区分模块，更高封装度和复用。
```js
import { createStore } from 'vuex'

const moduleA = {
  // 子模块state建议写成函数
  state: () => {
    return {
      username: '模块A'
    }
  },
  getters: {
    changeName (state) {
      return state.username + 'AAAAAA'
    }
  }
}

const moduleB = {
  // 带命名空间的模块
  namespaced: true,
  // 子模块state建议写成函数
  state: () => {
    return {
      username: '模块B'
    }
  },
  getters: {
    changeName (state) {
      return state.username + 'BBBBBB'
    }
  },
  mutations: {
    // 修改名字的mutation
    update (state) {
      state.username = 'BBBB' + state.username
    }
  },
  actions: {
    update ({ commit }) {
      // 假设请求
      setTimeout(() => {
        commit('update')
      }, 2000)
    }
  }
}

// 创建vuex仓库并导出
export default createStore({
  state: {
    // 数据
    person: [
      { id: 1, name: 'tom', gender: '男' },
      { id: 2, name: 'lucy', gender: '女' },
      { id: 3, name: 'jack', gender: '男' }
    ]
  },
  mutations: {
    // 改数据函数
  },
  actions: {
    // 请求数据函数
  },
  modules: {
    // 分模块
    a: moduleA,
    b: moduleB
  },
  getters: {
    // vuex的计算属性
    boys: (state) => {
      return state.person.filter(p => p.gender === '男')
    }
  }
})
```
```vue
<template>
 <div>APP组件</div>
 <ul>
   <li v-for="item in $store.getters.boys" :key="item.id">{{item.name}}</li>
 </ul>
 <!-- 使用模块A的username -->
 <p>A的username --- {{$store.state.a.username}}</p>
 <p>A的changeName --- {{$store.getters.changeName}}</p>
 <hr>
 <p>B的username --- {{$store.state.b.username}}</p>
 <p>B的changeName --- {{$store.getters['b/changeName']}}</p>
 <button @click="$store.commit('b/update')">修改username</button>
 <button @click="$store.dispatch('b/update')">异步修改username</button>
</template>
```

## vuex-持久化
- 在开发的过程中，像用户信息（名字，头像，token）需要vuex中存储且需要本地存储。
- 再例如，购物车如果需要未登录状态下也支持，如果管理在vuex中页需要存储在本地。
- 我们需要category模块存储分类信息，但是分类信息不需要持久化。
1. 首先：我们需要安装一个vuex的插件vuex-persistedstate来支持vuex的状态持久化。
```sh
npm i vuex-persistedstate
```
2. 然后：在`src/store` 文件夹下新建 `modules` 文件，在 `modules` 下新建 `user.js` 和 `cart.js`
`src/store/modules/user.js`
```js
// 用户模块
export default {
  namespaced: true,
  state () {
    return {
      // 用户信息
      profile: {
        id: '',
        avatar: '',
        nickname: '',
        account: '',
        mobile: '',
        token: ''
      }
    }
  },
  mutations: {
    // 修改用户信息，payload就是用户信息对象
    setUser (state, payload) {
      state.profile = payload
    }
  }
}
```
`src/store/modules/cart.js`
```js
// 购物车状态
export default {
  namespaced: true,
  state: () => {
    return {
      list: []
    }
  }
}
```
`src/store/modules/category.js`
```js
// 分类模块
export default {
  namespaced: true,
  state () {
    return {
      // 分类信息集合
      list: []
    }
  }
}
```
3. 继续：在 `src/store/index.js` 中导入 user cart 模块。
```js
import { createStore } from 'vuex'

import user from './modules/user'
import cart from './modules/cart'
import cart from './modules/category'

export default createStore({
  modules: {
    user,
    cart,
    category
  }
})
```
4. 最后：使用vuex-persistedstate插件来进行持久化
```js
import { createStore } from 'vuex'
+import createPersistedstate from 'vuex-persistedstate'

import user from './modules/user'
import cart from './modules/cart'
import cart from './modules/category'

export default createStore({
  modules: {
    user,
    cart,
    category
  },
+  plugins: [
+    createPersistedstate({
+      key: 'erabbit-client-pc-store',
+      paths: ['user', 'cart']
+    })
+  ]
})
```
**注意：**
===> 默认是存储在`localStorage`中
===> `key`是存储数据的键名
===> `paths`是存储`state`中的那些数据，如果是模块下具体的数据需要加上模块名称，如`user.token`
===> 修改`state`后触发才可以看到本地存储数据的的变化。
**测试：** `user`模块定义一个`mutation`在`main.js`去调用下，观察浏览器`application`的`localStorage`下数据。
`src/App.js`
```vue
<template>
  <div class="container">
    <!-- 修改数据，测试是否持久化 -->
    App {{$store.state.user.profile.account}}
    <button @click="$store.commit('user/setUser',{account:'zhousg'})">设置用户信息</button>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
```
