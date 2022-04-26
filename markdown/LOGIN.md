<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [登录模块](#%E7%99%BB%E5%BD%95%E6%A8%A1%E5%9D%97)
  - [组件基础](#%E7%BB%84%E4%BB%B6%E5%9F%BA%E7%A1%80)
  - [切换效果](#%E5%88%87%E6%8D%A2%E6%95%88%E6%9E%9C)
  - [表单组件](#%E8%A1%A8%E5%8D%95%E7%BB%84%E4%BB%B6)
  - [表单校验](#%E8%A1%A8%E5%8D%95%E6%A0%A1%E9%AA%8C)
  - [消息提示组件封装](#%E6%B6%88%E6%81%AF%E6%8F%90%E7%A4%BA%E7%BB%84%E4%BB%B6%E5%B0%81%E8%A3%85)
  - [账号登录](#%E8%B4%A6%E5%8F%B7%E7%99%BB%E5%BD%95)
    - [短信登录](#%E7%9F%AD%E4%BF%A1%E7%99%BB%E5%BD%95)
  - [退出登录](#%E9%80%80%E5%87%BA%E7%99%BB%E5%BD%95)
  - [QQ登录](#qq%E7%99%BB%E5%BD%95)
    - [流程分析](#%E6%B5%81%E7%A8%8B%E5%88%86%E6%9E%90)
    - [按钮处理](#%E6%8C%89%E9%92%AE%E5%A4%84%E7%90%86)
    - [回跳页面](#%E5%9B%9E%E8%B7%B3%E9%A1%B5%E9%9D%A2)
    - [已注册已绑定](#%E5%B7%B2%E6%B3%A8%E5%86%8C%E5%B7%B2%E7%BB%91%E5%AE%9A)
    - [未绑定有账号](#%E6%9C%AA%E7%BB%91%E5%AE%9A%E6%9C%89%E8%B4%A6%E5%8F%B7)
    - [未绑定没账号](#%E6%9C%AA%E7%BB%91%E5%AE%9A%E6%B2%A1%E8%B4%A6%E5%8F%B7)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: hidari
 * @Date: 2022-04-25 10:24:39
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-25 11:50:09
 * @FilePath: \shopping-centre-management\markdown\LOGIN.md
 * @Description: 登录页面
 * 
 * Copyright (c) 2022 by hidari, All Rights Reserved. 
-->

# 登录模块

## 组件基础

> 目标：配置路由和基准组件布局

大致步骤：

- 路由与组件
- 组件基础布局



具体代码：

**1）路由与组件**

组件：`src/views/login/index.vue`

```vue
<template>
  <div class="xtx-login-page">
    Login
  </div>
</template>
<script>
export default {
  name: 'Login'
}
</script>
<style scoped lang="less"></style>
```

路由：`src/router/route/login.route.js` 一级路由规则

```js
export const Login = [
  // 登陆布局容器
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login')
  }
]
```

链接：`src/components/app-topnav.vue`

```diff
+ <li><RouterLink to="/login">请先登录</RouterLink></li>
```



**2）组件基础布局**

- 头部组件 `src/views/login/components/login-header.vue`

```vue
<template>
  <header class="login-header">
    <div class="container">
      <h1 class="logo"><RouterLink to="/">小兔鲜</RouterLink></h1>
      <h3 class="sub"><slot /></h3>
      <RouterLink class="entry" to="/">
        进入网站首页
        <i class="iconfont icon-angle-right"></i>
        <i class="iconfont icon-angle-right"></i>
      </RouterLink>
    </div>
  </header>
</template>

<script>
export default {
  name: 'LoginHeader'
}
</script>

<style scoped lang='less'>
.login-header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;
  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
  .logo {
    width: 200px;
    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url(../../../assets/logo.png) no-repeat center 18px / contain;
    }
  }
  .sub {
    flex: 1;
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 38px;
    margin-left: 20px;
    color: #666;
  }
  .entry {
    width: 120px;
    margin-bottom: 38px;
    font-size: 16px;
    i {
      font-size: 14px;
      color: var(--xtx-color);
      letter-spacing: -5px;
    }
  }
}
</style>
```

- 底部组件 `src/views/login/components/login-footer.vue`

```vue
<template>
  <footer class="login-footer">
    <div class='container'>
      <p>
        <a href="javascript:;">关于我们</a>
        <a href="javascript:;">帮助中心</a>
        <a href="javascript:;">售后服务</a>
        <a href="javascript:;">配送与验收</a>
        <a href="javascript:;">商务合作</a>
        <a href="javascript:;">搜索推荐</a>
        <a href="javascript:;">友情链接</a>
      </p>
      <p>CopyRight &copy; 小兔鲜儿</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'LoginFooter'
}
</script>

<style scoped lang='less'>
.login-footer {
  padding: 30px 0 50px;
  background: #fff;
  p {
    text-align: center;
    color: #999;
    padding-top: 20px;
    a {
      line-height: 1;
      padding:0 10px;
      color: #999;
      display: inline-block;
      ~ a {
        border-left: 1px solid #ccc;
      }
    }
  }
}
</style>
```

- 主体组件 `src/views/login/index.vue`

```vue
<template>
  <LoginHeader>欢迎登录</LoginHeader>
  <section class="login-section">
    <div class="wrapper">
      <nav>
        <a href="javascript:;" class="active">账户登录</a>
        <a href="javascript:;">扫码登录</a>
      </nav>
    </div>
  </section>
  <LoginFooter />
</template>

<script>
import LoginHeader from "./components/login-header";
import LoginFooter from "./components/login-footer";
export default {
  name: "xtx-login-page",
  components: {
    LoginHeader,
    LoginFooter,
  },
};
</script>

<style scoped lang="less">
.login-section {
  background: url(../../assets/login-bg.png) no-repeat center / cover;
  height: 488px;
  position: relative;
  .wrapper {
    width: 380px;
    background: #fff;
    min-height: 400px;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    nav {
      height: 55px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;
      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        &:first-child {
          border-right: 1px solid #f5f5f5;
          text-align: left;
        }
        &.active {
          color: var(--xtx-color);
          font-weight: bold;
        }
      }
    }
  }
}
</style>
```


## 切换效果

> 目的：完成点击nav按钮切换，帐号登录和扫码登录。

大致步骤：

- 声明`activeName`数据提供模版使用
- 点击按钮设置`activeName`和绑定`class`属性
- 控制帐号登录盒子和扫码登录盒子显示隐藏

落地代码：

`src/views/login/index.vue`

```diff
+import { ref } from 'vue'
export default {
  name: 'PageLogin',
  components: { LoginHeader, LoginFooter },
  setup () {
+    const activeName = ref('account')
+    return { activeName }
  }
}
```
```vue
<template>
    <div class="wrapper">
      <nav>
        <a @click="activeName='account'" :class="{active:activeName==='account'}" href="javascript:;">账户登录</a>
        <a @click="activeName='qrcode'" :class="{active:activeName==='qrcode'}" href="javascript:;">扫码登录</a>
      </nav>
      <!-- 表单 -->
      <div v-if="activeName==='account'" class="account-box">表单</div>
      <!-- 二维码 -->
      <div v-if="activeName==='qrcode'" class="qrcode-box">
        <img src="@/assets/images/qrcode.jpg" alt="">
        <p>打开 <a href="javascript:;">小兔鲜App</a> 扫码登录</p>
      </div>
    </div>
</template>
```
```less
// 二维码容器
.qrcode-box {
  text-align: center;
  padding-top: 40px;
  p {
    margin-top: 20px;
    a {
      color: @xtxColor;
      font-size: 16px;
    }
  }
}
```



## 表单组件

> 目的：完成表单布局和帐号登录，短信登录切换。

**大致步骤：**

- 组件基础结构
- 使用组件
- 交互效果
  - 通过isMsgLogin切换短信登录
  - 通过form.isAgree绑定同意协议



**落地代码：**

**1）**定义组件 `src/views/login/component/login-form.vue`

```vue
<template>
  <div class="login-form">
    <div class="toggle">
      <a href="javascript:;">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a href="javascript:;">
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <div class="form">
      <div class="form-item">
        <div class="input">
          <i class="iconfont icon-user"></i>
          <input type="text" placeholder="请输入账号" />
        </div>
        <!-- <div class="error"><i class="iconfont icon-warning" />请输入手机号</div> -->
      </div>
      <div class="form-item">
        <div class="input">
          <i class="iconfont icon-lock"></i>
          <input type="password" placeholder="请输入密码" />
        </div>
      </div>
      <div class="form-item">
        <div class="input">
          <i class="iconfont icon-user"></i>
          <input type="text" placeholder="请输入手机号" />
        </div>
      </div>
      <div class="form-item">
        <div class="input">
          <i class="iconfont icon-code"></i>
          <input type="password" placeholder="请输入验证码" />
          <span class="code">发送验证码</span>
        </div>
      </div>
      <div class="form-item">
        <div class="agree">
          <XtxCheckbox />
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
      </div>
      <a href="javascript:;" class="btn">登录</a>
    </div>
    <div class="action">
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "LoginForm",
};
</script>
<style lang="less" scoped>
// 账号容器
.login-form {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: var(--xtx-color);
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: var(--price-color);
          }
          &.active,
          &:focus {
            border-color: var(--xtx-color);
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: var(--price-color);
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: var(--xtx-color);
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
```

**2）**使用组件 `src/views/login/index.vue`

```diff
+<LoginForm v-if="activeName==='account'"></LoginForm>
+import LoginForm from './components/login-form'
import { ref } from 'vue'
export default {
  name: 'PageLogin',
  components: {
    LoginHeader,
    LoginFooter,
+    LoginForm
  },
```

**3）**交互效果

```vue
      <a @click="isMsgLogin = false" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a @click="isMsgLogin = true" href="javascript:;" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
```

```diff
+      <template v-if="!isMsgLogin">
        <div class="form-item">//...</div>
        <div class="form-item">//...</div>
      </template>
+      <template v-else>
        <div class="form-item">//...</div>
        <div class="form-item">//...</div>
      </template>
      
```

```vue
<XtxCheckbox v-model="form.isAgree" />
```

```js
import { reactive, ref } from 'vue'
export default {
  name: 'LoginForm',
  setup () {
    // 是否短信登录
    const isMsgLogin = ref(false)
    // 表单信息对象
    const form = reactive({
      isAgree: true
    })
    return { isMsgLogin, form }
  }
}
```





## 表单校验

> 文档：https://vee-validate.logaretm.com/v4/ 支持vue3.0

大致步骤：

- 知道 `vee-validate` 插件基本使用
- 使用 `vee-validate` 插件
  - 安装
  - 定义表单数据
  - 定义校验规则
  - 表单项校验
    - 1.使用 `Form` 组件添加校验规则
    - 2.使用 `Field `组件替换元素表单元素，双向数据绑定
    - 3.使用 `ErrorMessage` 组件显示错误提示
  - 切换表单重置表单和数据
  - 兜底校验



具体落地：

- 知道 `vee-validate` 插件基本使用

```js
// 1. 定义form表单数据对象
// 2. 定义form表单校验规则对象
// 3. from表单绑定校验规则对象
// 4. 表单元素field双向绑定form表单数据对象的属性，name属性指定校验规则
// 5. 错误组件显示错误提示
```

- 使用 `vee-validate` 插件

  - 安装

  ```bash
  npm i vee-validate@4.0.3
  ```
  - 导入
  修改文件 `src/views/login/index.vue`

  - 定义表单数据

  ```js
    // 是否短信登录
    const isMsgLogin = ref(false)
    // 表单信息对象
    const form = reactive({
      isAgree: true,
      account: null,
      password: null,
      mobile: null,
      code: null
    })
  ```

  - 定义校验规则  `src/utils/vee-validate-schema.js`

  ```js
    export default {
        // 用户名校验
        account (value) {
            // value是将来使用该规则的表单元素的值
            // return true => 成功
            // return 字符串 => 失败 字符串是失败内容
            if (!value) return '请输入用户名'
            // 规则：字母开头 6-20 字符之间
            if (!/^[a-zA-Z]\w{5,19}$/.test(value)) {
            return '字母开头且6-20个字符'
            }
            return true
        },
        // 密码校验
        password (value) {
            if (!value) return '请输入密码'
            // 规则 输入 6-20个字符
            if (!/^\w{6,24}$/.test(value)) return '密码是6-24个字符'
            return true
        },
        // 手机号校验
        mobile (value) {
            if (!value) return '请输入手机号'
            if (!/^1[3-9]\d{9}$/.test(value)) return '手机号格式错误'
            return true
        },
        // 验证码校验
        code (value) {
            if (!value) return '请输入验证码'
            if (!/^\d{6}$/.test(value)) return '验证码是6个数字'
            return true
        },
        // 是否勾选同意框
        isAgree (value) {
            if (!value) return '请勾选同意用户协议'
            return true
        }
    }
  ```
  - 提取目的 `这些校验规则将来在其他表单验证时候可复用`

  - 使用 `Form` 组件添加校验规则，使用 `vee-validate-schema` 校验规则

  - 修改文件 `src/views/login/index.vue`

  ```js
  import { Form } from "vee-validate";
  ```

  ```js
    // vee-validata 校验
    // 1. 导入 Form Field 组件将 form 和 input 进行替换 需要加上name指定将来的校验规则函数的名称
    // 2. Field 需要进行数据绑定 字段名称最好和后台接口需要的保持一致
    // 3. 编写name属性指定的校验规则函数 Form 的 validation-schema 接受定义好的校验规则 是一个对象
    // 4. 自定义组件需要校验 必须支持 v-model Field 使用 as 为指定组件名称、

    // 解构赋值
    const { account, password, mobile, code, isAgree } = veeSchema
    const mySchema = { account, password, mobile, code, isAgree }

    return { veeSchema: mySchema }
  ```

  ```vue
  <Form :validation-schema="formSchema" autocomplete="off">
  ```

  - 使用 `Field `组件替换元素表单元素，双向数据绑定

  ```js
  import { Field } from "vee-validate";
  ```

  ```vue
                <Field
                  v-model="form.account"
                  name="account"
                  type="text"
                  placeholder="请输入账号"
                />
  ```

  ```vue
                <Field
                  v-model="form.password"
                  name="password"
                  type="password"
                  placeholder="请输入密码"
                />
  ```

  ```vue
                <Field
                  v-model="form.mobile"
                  name="mobile"
                  type="text"
                  placeholder="请输入手机号"
                />
  ```

  ```vue
                <Field
                  v-model="form.code"
                  name="code"
                  type="text"
                  placeholder="请输入验证码"
                />
  ```

  ```vue
  <!-- 自定组件：as XtxCheckbox 指定渲染的组件 -->
  <Field name="isAgree" as="XtxCheckbox" v-model="form.isAgree" />
  ```

  - 使用 `ErrorMessage` 组件显示错误提示

  ```vue
              <ErrorMessage name="account" v-slot="{ message }">
                <div class="error" v-if="message">
                  <i class="iconfont icon-warning" />{{ message }}
                </div>
              </ErrorMessage>
  ```

  ```vue
              <ErrorMessage name="password" v-slot="{ message }">
                <div class="error" v-if="message">
                  <i class="iconfont icon-warning" />{{ message }}
                </div>
              </ErrorMessage>
  ```

  ```vue
              <ErrorMessage name="mobile" v-slot="{ message }">
                <div class="error" v-if="message">
                  <i class="iconfont icon-warning" />{{ message }}
                </div>
              </ErrorMessage>
  ```

  ```vue
              <ErrorMessage name="code" v-slot="{ message }">
                <div class="error" v-if="message">
                  <i class="iconfont icon-warning" />{{ message }}
                </div>
              </ErrorMessage>
  ```

  ```vue
            <ErrorMessage name="isAgree" v-slot="{ message }">
              <div class="error" v-if="message">
                <i class="iconfont icon-warning" />{{ message }}
              </div>
            </ErrorMessage>
  ```

  - 其实就是把`input`改成 `Field` 组件，默认解析成`input`
    - `Field` 添加`name`属性，作用是指定使用`schema`中哪个校验规则
    - `Form` 添加 `v-slot="{errors}"` 使用作用域插槽暴露 `errors` 错误对象
    - 通过 `errors['校验规则名称']` 取出错误信息，有则显示，无即隐藏
    - `<div class="error" v-if="errors.code"><i class="iconfont icon-warning" />{{errors.code}}</div>`

  - 校验 自定义组件 `XtxCheckbox`
    - 修改文件 `src/views/login/index.vue`
    - `Field` 的 `as` 属性可以指定为其他标签，也可指定为组件。
      - 但是组件需要支持 `v-model` 否则校验不会触发。
      

  - 切换表单重置表单和数据
    - 修改文件 `src/views/login/index.vue`
    ```vue
    <Form ref="formCom" class="form" :validation-schema="schema" v-slot="{errors}" 
    ```

  ```js
    // 监听 isMsgLogin 重置表单数据（数据和校验结果）
    const formCom = ref(null)
    watch(isMsgLogin, () => {
      // 还原数据
      form.isAgree = true
      form.account = null
      form.password = null
      form.mobile = null
      form.code = null
      // 补充校验效果清除，Form组件提供resetForm()
    //   formCom.value.resetForm()
    })
  ```
  - 首先需要自己手动清除数据，然后使用 `Form` 组件提供 `resetForm` 方法对表单进行清除校验结果

  - 兜底校验
    - 修改文件 `src/views/login/index.vue`
    ```vue
    <a @click="login()" href="javascript:;" class="btn">登 录</a>
    ```

  ```js
    // 需要在点击登录的时候对整体表单进行校验
    const login = async () => {
      // Form 组件提供了一个 validate 函数作为整体表单校验，返回一个promise
      const valid = await formCom.value.validate()
      console.log(valid)
    }

    return { isMsgLogin, form, schema: mySchema, formCom, login }
  ```
  - `Form` 组件提供 `validate` 方法对表单进行整体校验

## 消息提示组件封装

> 目的：在接口请求报错的时候给用户进行提示

组件功能分析：

- 固定顶部显示，有三种类型：成功，错误，警告。
- 显示消息提示时需要动画从上滑入且淡出。
- 组件使用的方式不够便利，封装成工具函数方式。

大致实现步骤：

- 先把布局，和三种情况的显示，完成。
    - 定义组件：`src/components/library/xtx-message.vue`

```vue
    <template>
  <div class="xtx-message" :style="style[type]">
    <!-- 上面绑定的是样式 -->
    <!-- 不同提示图标会变 -->
    <i class="iconfont" :class="[style[type].icon]"></i>
    <span class="text">{{text}}</span>
  </div>
</template>
<script>
export default {
  name: 'XtxMessage',
  props: {
    text: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      // warn 警告  error 错误  success 成功
      default: 'warn'
    }
  },
  setup () {
    // 定义一个对象，包含三种情况的样式，对象key就是类型字符串
    const style = {
      warn: {
        icon: 'icon-warning',
        color: '#E6A23C',
        backgroundColor: 'rgb(253, 246, 236)',
        borderColor: 'rgb(250, 236, 216)'
      },
      error: {
        icon: 'icon-shanchu',
        color: '#F56C6C',
        backgroundColor: 'rgb(254, 240, 240)',
        borderColor: 'rgb(253, 226, 226)'
      },
      success: {
        icon: 'icon-queren2',
        color: '#67C23A',
        backgroundColor: 'rgb(240, 249, 235)',
        borderColor: 'rgb(225, 243, 216)'
      }
    }
    return { style }
  }
}
</script>
<style scoped lang="less">
.xtx-message {
  width: 300px;
  height: 50px;
  position: fixed;
  z-index: 9999;
  left: 50%;
  margin-left: -150px;
  top: 25px;
  line-height: 50px;
  padding: 0 25px;
  border: 1px solid #e4e4e4;
  background: #f5f5f5;
  color: #999;
  border-radius: 4px;
  i {
    margin-right: 4px;
    vertical-align: middle;
  }
  .text {
    vertical-align: middle;
  }
}
</style>
```

- 使用组件
```vue
<XtxMessage text="手机号或密码错误" type="error" />
```
- 实现显示的时候动画效果
```diff
<template>
+  <Transition name="down">
+    <div class='xtx-message' :style="style" v-show="show">
      <!-- 上面绑定的是样式 -->
      <!-- 不同提示图标会变 -->
      <i class="iconfont" :class="[style[type].icon]"></i>
      <span class="text">{{text}}</span>
    </div>
+  </Transition>
</template>

<script>
+import { onMounted, ref } from 'vue'
export default {
  name: 'XtxMessage',
  props: {
    text: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      // warn 警告  error 错误  success 成功
      default: 'warn'
    }
  },
  setup () {
    // 定义一个对象，包含三种情况的样式，对象key就是类型字符串
    const style = {
      warn: {
        icon: 'icon-warning',
        color: '#E6A23C',
        backgroundColor: 'rgb(253, 246, 236)',
        borderColor: 'rgb(250, 236, 216)'
      },
      error: {
        icon: 'icon-shanchu',
        color: '#F56C6C',
        backgroundColor: 'rgb(254, 240, 240)',
        borderColor: 'rgb(253, 226, 226)'
      },
      success: {
        icon: 'icon-queren2',
        color: '#67C23A',
        backgroundColor: 'rgb(240, 249, 235)',
        borderColor: 'rgb(225, 243, 216)'
      }
    }
+    // 定义一个数据控制显示隐藏，默认是隐藏，组件挂载完毕显示
+    const visible = ref(false)
+    onMounted(() => {
+      visible.value = true
+    })
+    return { style, visible }
  }
}
</script>

<style scoped lang='less'>
+.down {
+  &-enter {
+    &-from {
+      transform: translate3d(0,-75px,0);
+      opacity: 0;
+    }
+    &-active {
+      transition: all 0.5s;
+    }
+    &-to {
+      transform: none;
+      opacity: 1;
+    }
+  }
+}
// 。。。 省略
```

- 封装成vue实例函数式调用
    - vue3.0使用app.config.globalProperties挂载原型方法
    - 也支持直接导入函数使用

`src/components/library/Message.js`

```js
// 实现使用函数调用xtx-message组件的逻辑
import { createVNode, render } from 'vue'
import XtxMessage from './xtx-message.vue'

// 准备dom容器
const div = document.createElement('div')
// 标识
div.setAttribute('class', 'xtx-message-container')
document.body.appendChild(div)

// 定时器标识
let timer = null

export default ({ type, text }) => {
  // 渲染组件
  // 1. 导入消息提示组件
  // 2. 将消息组件编译为虚拟节点(dom节点)
  /**
   * createVNode()
   * 参数1： 组件
   * 参数2： 属性对象（props）
   */
  const vnode = createVNode(XtxMessage, { type, text }) // => 内存中
  // 3. 准备一个装载消息提示的dom容器(真实dom)
  // 4. 将虚拟节点渲染到DOM容器中
  /**
   * render
   * 参数1：虚拟节点
   * 参数2：DOM容器
   */
  render(vnode, div)

  // 5. 3s后销毁组件，移出DOM容器内容
  clearTimeout(timer)
  timer = setTimeout(() => {
    render(null, div)
  }, 3000)
}
```

`src/components/library/index.js`

```js
import Message from './Message'
```
```diff
    // 定义指令
    defineDirective(app)

+    // 如果你想挂载全局的属性，能够通过组件实例调用的属性   this.$message
+    app.config.globalProperties.$message = Message// 原型函数
}
```

- 在登录逻辑中使用 `src/views/login/index.vue`
```js
import Message from '@/components/library/Message'
```
```js
// vue3 中 拿到组件实例
// const { proxy } = getCurrentInstance()
// 点击登录时对整体表单进行校验
const login = async () => {
    // Form 提供一个 validate 函数进行整体校验 返回 promise
    const valid = await formCom.value.validate()
    console.log(valid)
    Message({ type: 'error', text: '用户名或密码错误' })
    //   proxy.$message({ text: '111' })
}
```


## 账号登录

> 目的：使用账号密码登录

大致步骤：

- 定义账号登录API函数
- 判断校验通过，且是账号登录，发请求登录
  - 成功后，存入vuex和本地
  - 失败后，提示错误



落地代码：

- 定义账号登录API `api/user.js`

```js
import request from '@/utils/request'

/**
 * 帐号登录
 * @param {String} account - 用户名
 * @param {String} password - 密码
 * @returns Promise
 */
export const reqUserAccountLogin = ({ account, password }) => request('/login', 'post', { account, password })
```

- 判断校验通过，且是账号登录，发请求登录

```js
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    // vue3 中 拿到组件实例
    const { proxy } = getCurrentInstance()
    // 点击登录时对整体表单进行校验
    const login = async () => {
      // Form 提供一个 validate 函数进行整体校验 返回 promise
      const valid = await formCom.value.validate()
      Message({ type: 'error', text: '用户名或密码错误' })

      // 1. 准备一个 api 做帐号登录
      // 2. 调用 api 函数
      if (valid) {
        // 帐号密码登录
        const { account, password } = form
        reqUserAccountLogin({ account, password }).then(data => {
          // 成功 => 存储用户信息，跳转至来源页或首页 + 消息提示
          // 1. 存储信息
          const { id, account, nickname, avatar, token, mobile } = data.result
          store.commit('user/setUser', { id, account, nickname, avatar, token, mobile })
          // 2. 登陆跳转
          router.push(route.query.redirectUrl || '/')
          // 3. 消息提示
          Message({ type: 'success', text: '登陆成功' })
        }).catch(e => {
          // 失败
          // 消息提示
          if (e.response.data) {
            proxy.$message({ type: 'error', text: e.response.data.message || '登陆失败' })
          }
        })
      }
    }
```

消息提示组件

```js
// type: warn 警告  error 错误  success 成功
Message({type: "",text: "提示文字"})
proxy.$message({type: "",text: "提示文字"})
```

### 短信登录

> `src/api/user.js` 实现代码

封装好发短信和进行短信登录的接口API

```js
/**
 * 短信登录
 * @param {String} mobile - 手机号
 * @param {String} code - 验证码
 * @returns Promise
 */
export const userMobileLogin = ({ mobile, code }) => {
  return request('/login/code', 'post', { mobile, code })
}

/**
 * 获取短信登录验证码
 * @param {String} mobile - 手机号
 * @returns Promise
 */
export const userMobileLoginMsg= (mobile) => {
  return request('/login/code', 'get', { mobile })
}
```

`src/views/login/index.vue` 实现代码发送短信

根据数据渲染按钮文字，绑定点击事件发送验证码：
```vue
            <span @click="send()" class="code">
              {{time===0?'发送验证码':`${time}秒后发送`}}
            </span>
```

使用 schma 函数来校验mobile，如果成功继续执行，不成功使用Form组件错误 `setFieldError`

发送验证码，需要校验手机号，和判断是否60秒内，方可发送。组件销毁时候清除定时器。

- 原生js
```js
const time = ref(60)
const timer = ref(null)
clearInterval(timer)
timer = setInterval(() => {
time.value--
console.log(timer)
if (time.value <= 0) {
    clearInterval(timer)
}
}, 1000)
```

- vueuse 插件
```js
import { useIntervalFn } from '@vueuse/core'
```
```js
    /**
     * useIntervalFn()
     * pause 暂停 resume 开启
     * 参数1： 定时器回调函数
     * 参数2： 执行间隔时间
     * 参数3： 是否立即开始
     */
    const { pause, resume } = useIntervalFn(() => {
      time.value--
      if (time.value <= 0) {
        pause()
      }
    }, 1000, false)
    onUnmounted(() => {
      pause()
    })
    const time = ref(0)
    // let timer = null
    // 发送验证码
    // 1. 发送验证码
    // 1.1 绑定发送验证码点击事件
    // 1.2 校验手机号 => 成功发送短信 => 请求成功后开启60s倒计时 不能再次点击 倒计时结束恢复
    // 1.3 校验失败 => 展现失败信息
    const send = async () => {
      const valid = mySchema.mobile(form.mobile)
      if (valid === true) {
        // 通过
        // 没有倒计时 发送请求
        if (time.value === 0) {
          await reqUserMobileLoginMsg(form.mobile)
          // 消息提示
          Message({ type: 'success', text: '发送成功' })
          // 倒计时
          time.value = 60
          // clearInterval(timer)
          // timer = setInterval(() => {
          //   time.value--
          //   console.log(timer)
          //   if (time.value <= 0) {
          //     clearInterval(timer)
          //   }
          // }, 1000)
          resume() // 开启定时器
        }
      } else {
        // 失败，触发 vue 错误信息函数显示错误信息
        // 使用组件 setFieldError() 方法
        /**
         * 参数1： 字段
         * 参数2： 错误信息
         */
        formCom.value.setFieldError('mobile', valid)
      }
    }
```

`src/views/login/index.vue` 实现代码手机号登录

```js
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    // vue3 中 拿到组件实例
    const { proxy } = getCurrentInstance()
    // 点击登录时对整体表单进行校验
    const login = async () => {
      // Form 提供一个 validate 函数进行整体校验 返回 promise
      const valid = await formCom.value.validate()

      // 1. 准备一个 api 做帐号登录
      // 2. 调用 api 函数
      if (valid) {
        let data = null
        try {
          if (isMsgLogin.value) {
          // 2. 手机号登陆
            const { mobile, code } = form
            data = await reqYserMobileLogin({ mobile, code })
          } else {
          // 帐号密码登录
            const { account, password } = form
            data = await reqUserAccountLogin({ account, password })
          }
          // 成功 => 存储用户信息，跳转至来源页或首页 + 消息提示
          // 1. 存储信息
          const { id, account, nickname, avatar, token, mobile } = data.result
          store.commit('user/setUser', { id, account, nickname, avatar, token, mobile })
          // 2. 登陆跳转
          router.push(route.query.redirectUrl || '/')
          // 3. 消息提示
          Message({ type: 'success', text: '登陆成功' })
        } catch (e) {
          // 失败
          // 消息提示
          if (e.response.data) {
            proxy.$message({ type: 'error', text: e.response.data.message || '登陆失败' })
          }
        }
      }
    }
```




## 退出登录

> 目的：退出登录，跳转页面

大致步骤：

- 绑定点击
- 清除用户信息，跳转登录



落地代码：

- 绑定点击`src/components/app-topnav.vue`

```vue
        <template v-if="profile.token">
          <li>
            <a href="javascript:;"><i class="iconfont icon-user"></i>
              {{profile.account}}
            </a>
          </li>
          <li><a @click="logout()" href="javascript:;">退出登录</a></li>
        </template>
```

- 清除用户信息，跳转登录

```diff
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'AppTopnav',
  setup () {
    const store = useStore()
    const profile = computed(() => {
      return store.state.user.profile
    })
+    const router = userRouter()
+    const logout = () => {
+      store.commit('user/setUser',{})
+      router.push('/login')
+    }
+    return { profile, logout}
  }
}
```


## QQ登录

### 流程分析

> 目的：掌握第三方登录的实现流程。

![avatar](https://zhoushugang.gitee.io/erabbit-client-pc-document/assets/img/1608280341945.57fbfa34.png)

描述一下我们要做的事情：

- 在登录页面，QQ登录图片处，赋予其打开QQ登录页面功能。

- 回跳的页面得到QQ给的唯一标识openId，根据openId去后台查询是否已经绑定过账户。

    - 如果绑定过，完成登录。
    - 没有绑定过
        - 有账号的，绑定手机号，即为登录。
        - 没账号的，完善账户信息，即为登录。
- 登录成功后，跳转首页，或者来源页面。

### 按钮处理

> 目的：完成QQ登录按钮初始化

第一步：参考文档：

准备工作(https://wiki.connect.qq.com/%E5%87%86%E5%A4%87%E5%B7%A5%E4%BD%9C_oauth2-0)

QQ互联JS_SDK(https://wiki.connect.qq.com/js_sdk%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E#3..E8.87.AA.E5.AE.9A.E4.B9.89.E7.99.BB.E5.BD.95.E6.8C.89.E9.92.AE)

总结一下：

- 有一个网站，且已备案。网站需要有QQ登录的逻辑（登录页面，回跳页面）。
- 然后在QQ互联上进行身份认证，审核通过。
- 然后在QQ互联上创建应用，应用需要域名，备案号，回调地址。审核通过。
- 得到：应用ID 应用key 回调地址。
- 才能完成QQ登录。（以上四个步骤，由后台或运维完成）
- 注意：id和uri都不能修改，否则无效。
```sh
# 测试用appid 
# 100556005
# 测试用redirect_uri
# http://www.corho.com:8080/#/login/callback
```

第二步：遇到问题：

- 由于域名是`www.corho.com`和`localhost`不一致无法回调页面，需要在本地修改`hosts`地址。
`windows`

```sh
1. 找到 C:\Windows\System32\drivers\etc 下hosts文件
2. 在文件中加入  127.0.0.1       www.corho.com
3. 保存即可。
# 如果提示没有权限
1. 将hosts文件移到桌面，然后进行修改，确认保存。
2. 将桌面hosts文件替换c盘文件
```
`mac OS`
```sh
1. 打开命令行窗口
2. 输入：sudo vim /etc/hosts
3. 按下：i 键
4. 输入：127.0.0.1       www.corho.com
5. 按下：esc
6. 按下：shift + :
7. 输入：wq 回车即可
```

- 需要开启IP或域名访问webpack服务器权限，在`vue.config.js`中

```json
  // 这个是给webpack-dev-server开启可IP和域名访问权限。
  chainWebpack: config => {
    config.devServer.disableHostCheck(true)
  }
```

第三步：处理QQ登录按钮：

1. 在`index.html`添加
```html
<script src="http://connect.qq.com/qc_jssdk.js" data-appid="100556005" data-redirecturi="http://www.corho.com:8080/#/login/callback"></script>
```

2. 在vue.config.js添加
```json
  # 这个是设置外部扩展，模块为qc变量名为QC，导入qc将不做打包。
  configureWebpack: {
    externals: {
      qc: 'QC'
    }
  },
```

3. 在 `src/views/login.vue`
```js
import QC from 'qc'
```
```html
<span id="qqLoginBtn"></span>
```
```js
    onMounted(() => {
      // 组件渲染完毕，使用QC生成QQ登录按钮
      QC.Login({
        btnId: 'qqLoginBtn'
      })
    })
```

4. 看页面生成QQ登录按钮，点击后新窗口打开，登录成功也无法跳转到登录页面窗口。

![image](https://zhoushugang.gitee.io/erabbit-client-pc-document/assets/img/1608282862740.f15b2069.png)

5. 通过审查元素，找到跳转连接，自己来控制

```html
          <a href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback">
            <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="">
          </a>
```

### 回跳页面

> 目的：完成QQ登录成功后的页面

主要有三个逻辑：

- 已注册，已绑定，登录成功，跳转首页，或者来源页面
- 已注册，未绑定，绑定手机号，登录成功，跳转首页，或者来源页面
- 未注册，补充完善账户信息，，登录成功，跳转首页，或者来源页面
需要一个回调页面：

路由规则 `src/router/index.js`

```js
const LoginCallback = () => import('@/views/login/callback')
```
```diff
  { path: '/login', component: Login },
+  { path: '/login/callback', component: LoginCallback }
```

- 三个组件
`src/views/login/callback.vue` 回调页面

```vue
<template>
  <LoginHeader>联合登录</LoginHeader>
  <section class="container">
    <nav class="tab">
      <a @click="hasAccount=true" :class="{active:hasAccount}" href="javascript:;">
        <i class="iconfont icon-bind" />
 <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a @click="hasAccount=false" :class="{active:!hasAccount}" href="javascript:;">
        <i class="iconfont icon-edit" />
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <div class="tab-content" v-if="hasAccount">
      <CallbackBind :nickname="nickname" :avatar="avatar" />
    </div>
    <div class="tab-content" v-else>
      <CallbackPatch />
    </div>
  </section>
  <LoginFooter />
</template>

<script>
import { ref } from 'vue'
import LoginHeader from './components/login-header'
import LoginFooter from './components/login-footer'
import CallbackBind from './components/callback-bind'
import CallbackPatch from './components/callback-patch'
export default {
  name: 'PageCallback',
  components: { LoginHeader, LoginFooter, CallbackBind, CallbackPatch },
  setup () {
    const hasAccount = ref(true)
    const nickname = ref(null)
    const avatar = ref(null)
    return { hasAccount, nickname, avatar }
  }
}
</script>

<style scoped lang='less'>
.container {
  padding: 25px 0;
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    i {
      font-size: 22px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 4px;
    }
    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>
```

`src/views/login/components/callback-bind.vue` 绑定手机

```vue
<template>
  <div class="xtx-form">
    <div class="user-info">
      <img src="http://qzapp.qlogo.cn/qzapp/101941968/57C7969540F9D3532451374AA127EE5B/50" alt="" />
      <p>Hi，Tom 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <input class="input" type="text" placeholder="绑定的手机号" />
      </div>
      <div class="error"></div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <input class="input" type="text" placeholder="短信验证码" />
        <span class="code">发送验证码</span>
      </div>
      <div class="error"></div>
    </div>
    <a href="javascript:;" class="submit">立即绑定</a>
  </div>
</template>

<script>
export default {
  name: 'CallbackBind'
}
</script>

<style scoped lang='less'>
.user-info {
    width: 320px;
    height: 70px;
    margin: 0 auto;
    display: flex;
    background: #f2f2f2;
    align-items: center;
    padding: 0 10px;
    margin-bottom: 25px;
    img {
      background: #f2f2f2;
      width: 50px;
      height: 50px;
    }
    p {
      padding-left: 10px;
    }
  }
  .code {
    position: absolute;
    right: 0;
    top: 0;
    line-height: 50px;
    width: 80px;
    color: #999;
    &:hover {
      cursor: pointer;
    }
  }
</style>
```

`src/views/login/components/callback-patch.vue` 完善信息

```vue
<template>
  <div class="xtx-form">
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-user"></i>
        <input class="input" type="text" placeholder="请输入用户名" />
      </div>
      <div class="error"></div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <input class="input" type="text" placeholder="请输入手机号" />
      </div>
      <div class="error"></div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <input class="input" type="text" placeholder="请输入验证码" />
        <span class="code">发送验证码</span>
      </div>
      <div class="error"></div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <input class="input" type="password" placeholder="请输入密码" />
      </div>
      <div class="error"></div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <input class="input" type="password" placeholder="请确认密码" />
      </div>
      <div class="error"></div>
    </div>
    <a href="javascript:;" class="submit">立即提交</a>
  </div>
</template>

<script>
export default {
  name: 'CallbackPatch'
}
</script>

<style scoped lang='less'>
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;
  &:hover {
    cursor: pointer;
  }
}
</style>
```

`src/assets/styles/common.less` 公用样式

```less
// 表单
.xtx-form {
  padding: 50px 0;
  &-item {
    display: flex;
    align-items: center;
    width: 700px;
    margin: 0 auto;
    padding-bottom: 25px;
    .label {
      width: 180px;
      padding-right: 10px;
      text-align: right;
      color: #999;
      ~ .field {
        margin-left: 0;
      }
    }
    .field {
      width: 320px;
      height: 50px;
      position: relative;
      margin-left: 190px;
      .icon {
        position: absolute;
        left: 0;
        top: 0;
        width: 40px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        color: #999;
        ~ .input {
          padding-left: 40px;
        }
      }
      .input{
        border: 1px solid #e4e4e4;
        width: 320px;
        height: 50px;
        line-height: 50px;
        padding: 0 10px;
        &.err {
          border-color: @priceColor;
        }
        &:focus,&:active{
          border-color: @xtxColor;
        }
      }
    }
    .error {
      width: 180px;
      padding-left: 10px;
      color: @priceColor;
    }
  }
  .submit {
    width: 320px;
    height: 50px;
    border-radius: 4px;
    background: @xtxColor;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    color: #fff;
    display: block;
    margin: 0 auto;
  }
}
```

### 已注册已绑定

> 目的：已注册已绑定，完成QQ登录。

大致思路：

- 回跳组件初始化的时候获取`openId`
- 根据`openId`去后台进行登录
- 如果成功，就代表已注册已绑定，记录返回的用户信息，跳转到首页或者来源页面。
- 再做上述事件需要网络请求，所以加上一个`loading`状态。

落地代码：

准备一个`loading`的容器覆盖在当前页面容器上。

```less
.container {
  padding: 25px 0;
  position: relative;
  height: 730px;  
  .unbind {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 25px 0;
    z-index: 99;
    .loading {
      height: 100%;
      background: #fff url(../../assets/images/load.gif) no-repeat center / 100px 100px;
    }
  }
}
```
```diff
+  <section class="container"v-if="isBind">
+    <div class="unbind">
+      <div class="loading"></div>
+    </div>
+  <section class="container" v-else>
```
```js
    // 假设已经绑定，默认会去做一次登录，如果登录失败证明未绑定。
    const isBind = ref(true)
```
- 记录需要回跳的页面地址
`src/store/module/user.js`
```diff
export default {
  namespaced: true,
  state () {
    return {
      // 用户信息
      profile: {
        id: '',
        account: '',
        avatar: '',
        nickname: '',
        mobile: '',
        token: ''
      },
+      // 登录后回调的路径
+      redirectUrl: '/'
    }
  },
  mutations: {
    // 修改用户信息，payload就是用户信息对象
    setUser (state, payload) {
      state.profile = payload
    },
+    // 修改回调地址
+    setRedirectUrl (state, url) {
+      state.redirectUrl = url
+    }
  }
}
```
`src/views/login/index.vue` 记录跳转登录地址栏通过returnUrl传递的参数
```js
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
```
```js
    // 存储回调地址，提供将来QQ回调页使用 setup 中
    const store = useStore()
    const route = useRoute()
    store.commit('user/setRedirectUrl', route.query.redirectUrl)
```

- 在组件初始化的时候获取openId去登录
`src/api/user.js` 准备登录API

```js
/**
 * 第三方登录
 * @param {String} unionId - 第三方登录唯一标识
 * @param {Integer} source - 来源 1为pc，2为webapp，3为微信小程序，4为Android，5为ios,6为qq,7为微信
 * @returns Promise
 */
export const userQQLogin = (unionId, source = 6) => {
  return request('/login/social', 'post', { unionId, source })
}
```

`src/views/login/callback.vue` 根据openId登录

```js
import QC from 'qc'
import { userQQLogin } from '@/api/user'
import Message from '@/components/library/Message'
```
```js
  setup () {
    const hasAccount = ref(true)

    // 默认认为已经注册且已经绑定
    // 通过 QQ 的 API 获取 openId 就是后台需要的 unionId 然后进行登录
    // 成功 => 登陆成功
    // 失败 => 该QQ未绑定账号（有账号未绑定QQ，没有账号未绑定QQ）

    const isBind = ref(true)
    // 2. 根据QQ互联的openId去进行登录，准备一个接口
    const store = useStore()
    const router = useRouter()
    const unionId = ref(null)
    // 确保QQ已经登录
    if (QC.Login.check()) {
      // 第三方唯一标识 QQ 唯一标识
      QC.Login.getMe((openId) => {
        unionId.value = openId
        // 请求后台，做QQ登录
        reqUserQQLogin(openId).then(data => {
          // 登陆成功：data.result 用户信息
          // 1. 存储用户信息
          const { id, account, avatar, mobile, nickname, token } = data.result
          store.commit('user/setUser', { id, account, avatar, mobile, nickname, token })
          // 2. 跳转到来源页或首页
          // 此时QQ不会出现来源页 在来到登录页时把地址栏地址保存在 vuex 中
          router.push(store.state.user.redirectUrl || '/')
          // 3. 成功提示
          Message({ type: 'success', text: 'QQ登陆成功' })
        }).catch(e => {
          // 登陆失败 没有和后台绑定
          isBind.value = false
        })
      })
    }
    return { hasAccount, isBind, unionId }
  }
```


### 未绑定有账号
> 目的：未注册有账号，完成QQ绑定。

![image](https://zhoushugang.gitee.io/erabbit-client-pc-document/assets/img/1617194504314.b9d3381e.png)

大致思路：

- 获取QQ用户的头像和昵称展示
- 进行表单校验
- 进行短信验证码发送
- 进行绑定，完成后为登录状态，跳转到首页或者来源页面。

落地代码：

QQ信息展示 `src/views/login/component/callback-bind.vue`

```js
    // 1. 准备 unionId(openId) QQ头像 昵称
    const nickname = ref(null)
    const avatar = ref(null)

    // 2. 表单校验
    // 3. 发送验证码（先校验，定义API，调用，完成倒计时）
    // 4. 绑定，绑定成功 => 登录成功
    if (QC.Login.check()) {
      QC.api('get_user_info').success(res => {
        nickname.value = res.data.nickname
        avatar.value = res.data.figureurl_1
      })
    }
```

- `src/views/login/index.vue`传入openId给 callback-bind.vue组件
```vue
<CallbackBind :unionId="unionId" />
```
```js
  const unionId = ref(null)
```
```diff
      QC.Login.getMe((openId) => {
+        unionId.value = openId
        userQQLogin(openId).then(data => {
```

- 表单校验，发送短信，立即绑定 `src/login/components/callback-bind.vue`

```js
    // 表单数据对象
    const form = reactive({
      mobile: null,
      code: null
    })
    // 校验规则对象
    const { mobile, code } = veeSchema
    const mySchema = { mobile, code }

    // 发送短信验证码
    // pause 暂停 resume 开始
    // useIntervalFn(回调函数,执行间隔,是否立即开启)
    const formCom = ref(null)
    const time = ref(0)
    const { pause, resume, isActive } = useIntervalFn(() => {
      time.value--
      if (time.value <= 0) {
        pause()
      }
    }, 1000, false)
    onUnmounted(() => {
      pause()
    })

    // 1. 发送验证码
    // 1.1 绑定发送验证码按钮点击事件
    // 1.2 校验手机号，如果成功才去发送短信（定义API），请求成功开启60s的倒计时，不能再次点击，倒计时结束恢复
    // 1.3 如果失败，失败的校验样式显示出来
    const send = async () => {
      const valid = mySchema.mobile(form.mobile)
      if (valid === true) {
        // 通过
        if (!isActive.value) {
        // 没有倒计时才可以发送
          await reqUserQQBindCode(form.mobile)
          Message({ type: 'success', text: '发送成功' })
          time.value = 60
          resume()
        }
      } else {
        // 失败，使用vee的错误函数显示错误信息 setFieldError(字段,错误信息)
        formCom.value.setFieldError('mobile', valid)
      }
    }

    // 立即绑定
    const store = useStore()
    const router = useRouter()
    const submit = () => {
      const valid = formCom.value.validate()
      if (valid) {
        reqUserQQBindLogin({
          unionId: props.unionId,
          ...form
        }).then(data => {
          // 实现和之前登录一样的逻辑
          // 1. 存储用户信息
          const { id, account, avatar, mobile, nickname, token } = data.result
          store.commit('user/setUser', { id, account, avatar, mobile, nickname, token })
          // 2. 跳转到来源页或者首页
          router.push(store.state.user.redirectUrl)
          // 3. 成功提示
          Message({ type: 'success', text: 'QQ绑定成功' })
        }).catch(e => {
          Message({ type: 'error', text: '绑定失败' })
        })
      }
    }
```

`api/user.js` 定义发短信API和立即绑定API
```js
/**
 * 获取QQ绑定的时候短信验证码
 * @param {String} mobile - 手机号
 * @returns promise
 */
export const userQQBindCode = (mobile) => {
  return request('/login/social/code', 'get', { mobile })
}

/**
 * QQ登录-绑定帐号
 * @param {String} unionId - QQ唯一标识，openId
 * @param {String} mobile - 手机号
 * @param {String} code - 验证码
 * @returns
 */
export const userQQBindLogin = ({ unionId, mobile, code }) => {
  return request('/login/social/bind', 'post', { unionId, mobile, code })
}
```

### 未绑定没账号

> 目的：未绑定没账号，完成完整信息的补充。

![image](https://zhoushugang.gitee.io/erabbit-client-pc-document/assets/img/1617194528122.5c8e793f.png)

大致思路：

- 完成表单校验，需要加两个校验规则，用户名和确认密码。
- 需要短信验证码功能，使用注册时候的接口
- 进行完善，完成后为登录状态，跳转到首页或者来源页面。

落地代码：

判断用户名是否存在的API `src/api/user.js`

```js
/**
 * 校验帐号是否存在
 * @param {String} account - 帐号
 * @returns Promise
 */
export const userCheckAccount = (account) => {
  return request('/register/check', 'get', { account })
}
```

- 完成校验规则定义
`src/utils/vee-validate-schema.js`

```js
  async accountApi (value) {
    if (!value) return '请输入用户名'
    if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return '字母开头且6-20个字符'
    // 服务端校验
    const { result } = await userCheckAccount(value)
    if (result.valid) return '用户名已存在'
    return true
  },
  rePassword (value, { form }) {
    if (!value) return '请输入密码'
    if (!/^\w{6,24}$/.test(value)) return '密码是6-24个字符'
    // 校验密码是否一致  form表单数据对象
    if (value !== form.password) return '两次输入的密码不一致'
    return true
  }
```

- 完成表单校验，短信验证码，提交操作
```vue
<template>
  <Form ref="formCom" :validation-schema="mySchema" v-slot="{errors}" class="xtx-form" autocomplete="off">
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-user"></i>
        <Field :class="{err:errors.account}" v-model="form.account" name="account" class="input" type="text" placeholder="请输入用户名" />
      </div>
        <ErrorMessage name="account" v-slot="{ message }">
            <div class="error" v-if="message">
            <i class="iconfont icon-warning" />{{ message }}
            </div>
        </ErrorMessage>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <Field :class="{err:errors.mobile}" v-model="form.mobile" name="mobile" class="input" type="text" placeholder="请输入手机号" />
      </div>
        <ErrorMessage name="mobile" v-slot="{ message }">
            <div class="error" v-if="message">
            <i class="iconfont icon-warning" />{{ message }}
            </div>
        </ErrorMessage>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <Field :class="{err:errors.code}" v-model="form.code" name="code" class="input" type="text" placeholder="请输入验证码" />
        <span @click="send()" class="code">
          {{time === 0 ? '发送验证码' : `${time}秒后发送`}}
        </span>
      </div>
        <ErrorMessage name="code" v-slot="{ message }">
            <div class="error" v-if="message">
            <i class="iconfont icon-warning" />{{ message }}
            </div>
        </ErrorMessage>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <Field :class="{err:errors.password}" v-model="form.password" name="password" class="input" type="password" placeholder="请输入密码" />
      </div>
        <ErrorMessage name="password" v-slot="{ message }">
            <div class="error" v-if="message">
            <i class="iconfont icon-warning" />{{ message }}
            </div>
        </ErrorMessage>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <Field :class="{err:errors.rePassword}" v-model="form.rePassword" name="rePassword" class="input" type="password" placeholder="请确认密码" />
      </div>
        <ErrorMessage name="rePassword" v-slot="{ message }">
            <div class="error" v-if="message">
            <i class="iconfont icon-warning" />{{ message }}
            </div>
        </ErrorMessage>
    </div>
    <a @click="submit" href="javascript:;" class="submit">立即提交</a>
  </Form>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate'
import veeSchema from '@/utils/vee-validate-schema'
import { reqUserQQPatchCode, reqUserQQPatchLogin } from '@/api/user'
import { reactive, ref, onUnmounted } from 'vue'
import { useIntervalFn } from '@vueuse/core'
import Message from '@/components/library/message'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'CallbackPatch',
  components: {
    Form,
    Field,
    ErrorMessage
  },
  props: {
    unionId: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    // 1. 表单校验 多 用户名是否存在 再次输入密码是否一致
    // 2. 发送短信验证码
    // 3. 完善信息

    // 表单数据对象
    const form = reactive({
      account: null,
      mobile: null,
      code: null,
      password: null,
      rePassword: null
    })

    const { accountApi, mobile, code, password, rePassword } = veeSchema
    const mySchema = { account: accountApi, mobile, code, password, rePassword }

    // 发送短信验证码
    // pause 暂停 resume 开始
    // useIntervalFn(回调函数,执行间隔,是否立即开启)
    const formCom = ref(null)
    const time = ref(0)
    const { pause, resume, isActive } = useIntervalFn(() => {
      time.value--
      if (time.value <= 0) {
        pause()
      }
    }, 1000, false)
    onUnmounted(() => {
      pause()
    })

    // 1. 发送验证码
    // 1.1 绑定发送验证码按钮点击事件
    // 1.2 校验手机号，如果成功才去发送短信（定义API），请求成功开启60s的倒计时，不能再次点击，倒计时结束恢复
    // 1.3 如果失败，失败的校验样式显示出来
    const send = async () => {
      const valid = mySchema.mobile(form.mobile)
      if (valid === true) {
        // 通过
        if (!isActive.value) {
        // 没有倒计时才可以发送
          await reqUserQQPatchCode(form.mobile)
          Message({ type: 'success', text: '发送成功' })
          time.value = 60
          resume()
        }
      } else {
        // 失败，使用vee的错误函数显示错误信息 setFieldError(字段,错误信息)
        formCom.value.setFieldError('mobile', valid)
      }
    }

    // 完善信息
    const store = useStore()
    const router = useRouter()
    const submit = async () => {
      const valid = formCom.value.validate()
      if (valid) {
        reqUserQQPatchLogin({
          unionId: props.unionId,
          ...form
        }).then(data => {
          // 实现和之前登录一样的逻辑
          // 1. 存储用户信息
          const { id, account, avatar, mobile, nickname, token } = data.result
          store.commit('user/setUser', { id, account, avatar, mobile, nickname, token })
          // 2. 跳转到来源页或者首页
          router.push(store.state.user.redirectUrl)
          // 3. 成功提示
          Message({ type: 'success', text: 'QQ完善信息成功' })
        }).catch(e => {
          Message({ type: 'error', text: '完善信息失败' })
        })
      }
    }
    return {
      form,
      mySchema,
      submit,
      formCom,
      send,
      time
    }
  }
}
</script>
```