<!--
 * @Author: hidari
 * @Date: 2022-04-28 11:35:18
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-29 14:47:11
 * @FilePath: \shopping-centre-management\src\views\member\pay\components\address-edit.vue
 * @Description: 添加地址组件
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <XtxDialog :title="`${formData.id ? '修改' : '添加'}收货地址`" v-model:visible="dialogVisible">
    <div class="address-edit">
    <div class="xtx-form">
      <div class="xtx-form-item">
        <div class="label">收货人：</div>
        <div class="field">
          <input v-model="formData.receiver" class="input" placeholder="请输入收货人" />
        </div>
      </div>
      <div class="xtx-form-item">
        <div class="label">手机号：</div>
        <div class="field">
          <input v-model="formData.contact" class="input" placeholder="请输入手机号" />
        </div>
      </div>
      <div class="xtx-form-item">
        <div class="label">地区：</div>
        <div class="field">
          <XtxCity :fullLocation="formData.fullLocation" @change="changeCty" placeholder="请选择所在地区"/>
        </div>
      </div>
      <div class="xtx-form-item">
        <div class="label">详细地址：</div>
        <div class="field">
          <input  v-model="formData.address" class="input" placeholder="请输入详细地址" />
        </div>
      </div>
      <div class="xtx-form-item">
        <div class="label">邮政编码：</div>
        <div class="field">
           <input  v-model="formData.postalCode" class="input" placeholder="请输入邮政编码" />
        </div>
      </div>
      <div class="xtx-form-item">
        <div class="label">地址标签：</div>
        <div class="field">
          <input v-model="formData.addressTags" class="input" placeholder="请输入地址标签，逗号分隔" />
        </div>
      </div>
    </div>
    </div>
    <template v-slot:footer>
      <XtxButton @click="dialogVisible=false" type="gray" style="margin-right:20px">取消</XtxButton>
      <XtxButton @click="submit" type="primary">确认</XtxButton>
    </template>
  </XtxDialog>
</template>
<script>
import { getCurrentInstance, reactive, ref } from 'vue'
import { reqAddAddress, reqEditAddress } from '@/api/order'
export default {
  name: 'AddressEdit',
  emits: ['on-success'],
  // 写 { emit } 前面需要有 props
  setup (props, { emit }) {
    const dialogVisible = ref(false)
    // 打开函数 在组件实例上有 open 方法 父组件可以调用 需要 return
    const open = (address) => {
      // 没有id => 添加 => 清空表单
      if (!address.id) {
        for (const key in formData) {
          if (key === 'isDefault') {
            formData[key] = 1
          } else {
            formData[key] = null
          }
        }
      } else {
        // 有 id => 修改 => 填充表单
        for (const key in address) {
          formData[key] = address[key]
        }
      }
      dialogVisible.value = true
    }

    // 表单数据
    const formData = reactive({
      receiver: '',
      contact: '',
      provinceCode: '',
      cityCode: '',
      countyCode: '',
      address: '',
      postalCode: '',
      addressTags: '',
      isDefault: 1,
      // 城市组件显示文字 完整的行政区
      fullLocation: ''
    })
    // 选择地区
    const changeCty = (data) => {
      formData.provinceCode = data.provinceCode
      formData.cityCode = data.cityCode
      formData.countyCode = data.countyCode
      formData.fullLocation = data.fullLocation
    }

    // 添加/修改时的提交操作
    const instance = getCurrentInstance()
    const submit = async () => {
      // 校验
      // 发送请求
      if (!formData.id) {
        // 添加
        const data = await reqAddAddress(formData)
        // 提示
        instance.proxy.$message({ text: '添加收货地址成功', type: 'success' })
        // 需要给结算组件地址列表中加一条（改一条）数据
        // 需要设置ID
        formData.id = data.result.id
        // 触发自定义事件
        emit('on-success', formData)
      } else {
        // 修改
        await reqEditAddress(formData)
        // 提示
        instance.proxy.$message({ text: '修改收货地址成功', type: 'success' })
        // 需要给结算组件地址列表中加一条（改一条）数据
        // 触发自定义事件
        emit('on-success', formData)
      }
      // 关闭
      dialogVisible.value = false
    }
    return { dialogVisible, open, formData, changeCty, submit }
  }
}
</script>
<style scoped lang="less">
.xtx-dialog {
  :deep(.wrapper){
    width: 780px;
    .body {
      font-size: 14px;
    }
  }
}
.xtx-form {
  padding: 0;
  input {
    outline: none;
    &::placeholder {
      color: #ccc;
    }
  }
}
.xtx-city {
  width: 320px;
  :deep(.select) {
    height: 50px;
    line-height: 48px;
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    .placeholder {
      color: #ccc;
    }
    i {
      color: #ccc;
      font-size: 18px;
    }
    .value {
      font-size: 14px;
    }
  }
  :deep(.option) {
    top: 49px;
  }
}
</style>
