<!--
 * @Author: hidari
 * @Date: 2022-04-24 16:13:28
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-25 18:06:14
 * @FilePath: \shopping-centre-management\src\views\login\components\login-form.vue
 * @Description:
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="isMsgLogin=false" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a @click="isMsgLogin=true" href="javascript:;" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <vee-form class="form" ref="formCom" :validation-schema="veeSchema" autocomplete="off" v-slot="{errors}">
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <field name="account" :class="{error: errors.account}" v-model="form.account" type="text" placeholder="请输入用户名或手机号" />
          </div>
            <ErrorMessage name="account" v-slot="{ message }">
                <div class="error" v-if="message">
                    <i class="iconfont icon-warning" />{{ message }}
                </div>
            </ErrorMessage>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <field name="password" :class="{error: errors.password}" v-model="form.password" type="password" placeholder="请输入密码" />
          </div>
              <ErrorMessage name="password" v-slot="{ message }">
                <div class="error" v-if="message">
                  <i class="iconfont icon-warning" />{{ message }}
                </div>
              </ErrorMessage>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <field name="mobile" v-model="form.mobile" :class="{error: errors.mobile}" type="text" placeholder="请输入手机号" />
          </div>
              <ErrorMessage name="mobile" v-slot="{ message }">
                <div class="error" v-if="message">
                  <i class="iconfont icon-warning" />{{ message }}
                </div>
              </ErrorMessage>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <field name="code" v-model="form.code" type="password" placeholder="请输入验证码" />
            <span class="code" @click="send">{{ time === 0 ? '发送验证码' : `${time}秒后发送`}}</span>
          </div>
              <ErrorMessage name="code" v-slot="{ message }">
                <div class="error" v-if="message">
                  <i class="iconfont icon-warning" />{{ message }}
                </div>
              </ErrorMessage>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <field as="XtxCheckbox" name="isAgree" v-model="form.isAgree" />
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
            <ErrorMessage name="isAgree" v-slot="{ message }">
              <div class="error" v-if="message">
                <i class="iconfont icon-warning" />{{ message }}
              </div>
            </ErrorMessage>
      </div>
      <a href="javascript:;" class="btn" @click="login">登录</a>
    </vee-form>
    <div class="action">
        <!-- QQ登录 -->
          <a href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback">
            <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="">
          </a>
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>
<script>
import veeSchema from '@/utils/vee-validate-schema'
import { getCurrentInstance, onUnmounted, reactive, ref, watch } from 'vue'
import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate'
import Message from '@/components/library/message'
import { reqUserAccountLogin, reqUserMobileLoginMsg, reqYserMobileLogin } from '@/api/user'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useIntervalFn } from '@vueuse/core'
// import QC from 'qc'
export default {
  name: 'LoginForm',
  components: {
    VeeForm,
    Field,
    ErrorMessage
  },
  setup () {
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

    // vee-validata 校验
    // 1. 导入 Form Field 组件将 form 和 input 进行替换 需要加上name指定将来的校验规则函数的名称
    // 2. Field 需要进行数据绑定 字段名称最好和后台接口需要的保持一致
    // 3. 编写name属性指定的校验规则函数 Form 的 validation-schema 接受定义好的校验规则 是一个对象
    // 4. 自定义组件需要校验 必须支持 v-model Field 使用 as 为指定组件名称
    const { account, password, mobile, code, isAgree } = veeSchema
    const mySchema = { account, password, mobile, code, isAgree }

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

    // 初始化QQ登录按钮 => 官方
    // 1. 准备 span 有 id = qqLoginBtn
    // 2. QC.Login({btnId: 'qqLoginBtn})
    // onMounted(() => {
    //   // 组件渲染完毕，使用QC生成QQ登录按钮
    //   QC.Login({
    //     btnId: 'qqLoginBtn'
    //   })
    // })
    return { isMsgLogin, form, veeSchema: mySchema, login, formCom, send, time }
  }
}
</script>

<style lang="less" scoped>
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
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
            border-color: @priceColor;
          }
          &.active,&:focus {
            border-color: @xtxColor;
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
        color: @priceColor;
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
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
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
