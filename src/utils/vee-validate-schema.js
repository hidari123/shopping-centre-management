/*
 * @Author: hidari
 * @Date: 2022-04-24 16:18:46
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-26 09:53:26
 * @FilePath: \shopping-centre-management\src\utils\vee-validate-schema.js
 * @Description: vee-validate表单校验规则
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */

import { reqUserCheckAccount } from '@/api/user'
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

  // 用户校验且校验唯一性
  async accountApi (value) {
    if (!value) return '请输入用户名'
    // 规则：字母开头 6-20 字符之间
    if (!/^[a-zA-Z]\w{5,19}$/.test(value)) {
      return '字母开头且6-20个字符'
    }

    // 服务器端校验
    const data = await reqUserCheckAccount(value)
    if (data.result.valid) return '用户名已存在'
    return true
  },

  // 密码校验
  password (value) {
    if (!value) return '请输入密码'
    // 规则 输入 6-20个字符
    if (!/^\w{6,24}$/.test(value)) return '密码是6-24个字符'
    return true
  },

  // 确认密码校验
  rePassword (value, { form }) {
    if (!value) return '请输入密码'
    // 规则 输入 6-20个字符
    if (!/^\w{6,24}$/.test(value)) return '密码是6-24个字符'
    if (value !== form.password) return '需要和密码保持一致'
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
