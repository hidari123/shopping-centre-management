<!--
 * @Author: hidari
 * @Date: 2022-04-25 16:10:19
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-26 10:25:28
 * @FilePath: \shopping-centre-management\src\views\login\components\callback-patch.vue
 * @Description: 完善信息
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
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
