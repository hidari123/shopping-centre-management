/*
 * @Author: hidari
 * @Date: 2022-04-25 11:20:11
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-26 11:07:00
 * @FilePath: \shopping-centre-management\src\api\user.js
 * @Description: user模块请求api
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
 */
import request from '@/utils/request'

/**
 * 帐号登录
 * @param {String} account - 用户名
 * @param {String} password - 密码
 * @returns Promise
 */
export const reqUserAccountLogin = ({ account, password }) => request('/login', 'post', { account, password })

/**
 * 短信登录
 * @param {String} mobile - 手机号
 * @param {String} code - 验证码 默认 123456
 * @returns Promise
 */
export const reqYserMobileLogin = ({ mobile, code }) => request('/login/code', 'post', { mobile, code })

/**
   * 获取短信登录验证码
   * @param {String} mobile - 手机号
   * @returns Promise
   */
export const reqUserMobileLoginMsg = (mobile) => request('/login/code', 'get', { mobile })

/**
 * 第三方登录
 * @param {String} unionId - 第三方登录唯一标识
 * @param {Integer} source - 来源 1为pc，2为webapp，3为微信小程序，4为Android，5为ios,6为qq,7为微信
 * @returns Promise
 */
export const reqUserQQLogin = (unionId, source = 1) => request('/login/social', 'post', { unionId, source })

/**
 * 获取QQ绑定的时候短信验证码
 * @param {String} mobile - 手机号
 * @returns promise
 */
export const reqUserQQBindCode = (mobile) => request('/login/social/code', 'get', { mobile })

/**
   * QQ登录-绑定帐号
   * @param {String} unionId - QQ唯一标识，openId
   * @param {String} mobile - 手机号
   * @param {String} code - 验证码
   * @returns
   */
export const reqUserQQBindLogin = ({ unionId, mobile, code }) => request('/login/social/bind', 'post', { unionId, mobile, code })

/**
 * 校验帐号是否存在
 * @param {String} account - 帐号
 * @returns 存在 => true
 */
export const reqUserCheckAccount = (account) => request('/register/check', 'get', { account })

/**
 * 获取QQ完善信息的时候短信验证码
 * @param {String} mobile - 手机号
 * @returns promise
 */
export const reqUserQQPatchCode = (mobile) => request('/register/code', 'get', { mobile })

/**
   * QQ登录-完善信息
   * @param {String} unionId - QQ唯一标识，openId
   * @param {String} mobile - 手机号
   * @param {String} code - 验证码
   * @param {String} account - 帐号
   * @param {String} password - 密码
   * @returns
   */
export const reqUserQQPatchLogin = ({ unionId, mobile, code, account, password }) => request(`/login/social/${unionId}/complement`, 'post', { unionId, mobile, code, account, password })

/**
 * QQ解绑
 * @param {String} mobile -手机号
 * @returns
 */
export const reqUserQQUnbindingLogin = (mobile) => request('/login/social/unbind', 'get', { mobile })
