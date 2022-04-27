<!--
 * @Author: hidari
 * @Date: 2022-04-25 16:10:06
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-27 15:38:17
 * @FilePath: \shopping-centre-management\src\views\login\components\callback-bind.vue
 * @Description: 绑定手机
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <Form ref="formCom" :validation-schema="mySchema" autocomplete="off" v-slot="{errors}" class="xtx-form">
    <div class="user-info">
      <img :src="avatar" alt="" />
      <p>{{`Hi，${nickname} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~`}}</p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <Field v-model="form.mobile" name="mobile" :class="{err: errors.mobile}" class="input" type="text" placeholder="绑定的手机号" />
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
        <Field v-model="form.code" name="code" :class="{err: errors.code}" class="input" type="text" placeholder="短信验证码" />
        <span @click="send()" class="code">
          {{time===0?'发送验证码':`${time}秒后发送`}}
        </span>
      </div>
        <ErrorMessage name="code" v-slot="{ message }">
            <div class="error" v-if="message">
            <i class="iconfont icon-warning" />{{ message }}
            </div>
        </ErrorMessage>
    </div>
    <a href="javascript:;" class="submit" @click="submit">立即绑定</a>
  </Form>
</template>

<script>
import QC from 'qc'
import { reactive, ref, onUnmounted } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import veeSchema from '@/utils/vee-validate-schema'
import { reqUserQQBindCode, reqUserQQBindLogin } from '@/api/user'
import { useIntervalFn } from '@vueuse/core'
import Message from '@/components/library/message'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'CallbackBind',
  components: {
    Form, Field, ErrorMessage
  },
  props: {
    unionId: {
      type: String,
      default: ''
    }
  },
  setup (props) {
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
          // 合并购物车
          store.dispatch('cart/mergeLocalCart').then(() => {
            // 进入 then 说明合并成功
            // 2. 跳转到来源页或者首页
            router.push(store.state.user.redirectUrl || '/')
            // 3. 成功提示
            Message({ type: 'success', text: 'QQ绑定成功' })
          })
        }).catch(e => {
          Message({ type: 'error', text: '绑定失败' })
        })
      }
    }
    return {
      nickname,
      avatar,
      form,
      mySchema,
      send,
      formCom,
      time,
      submit
    }
  }
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
