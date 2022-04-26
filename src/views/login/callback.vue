<!--
 * @Author: hidari
 * @Date: 2022-04-25 15:48:53
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-25 17:50:56
 * @FilePath: \shopping-centre-management\src\views\login\callback.vue
 * @Description: 登录回调页面
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <LoginHeader>联合登录</LoginHeader>
    <section class="container" v-if ="isBind">
    <div class="unbind">
      <div class="loading"></div>
    </div>
  </section>
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
      <CallbackBind :unionId="unionId"/>
    </div>
    <div class="tab-content" v-else>
      <CallbackPatch :unionId="unionId" />
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
import { reqUserQQLogin } from '@/api/user'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Message from '@/components/library/message'
import QC from 'qc'
export default {
  name: 'Callback',
  components: { LoginHeader, LoginFooter, CallbackBind, CallbackPatch },
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
}
</script>

<style scoped lang='less'>
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
