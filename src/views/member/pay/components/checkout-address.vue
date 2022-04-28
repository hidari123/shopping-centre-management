<!--
 * @Author: hidari
 * @Date: 2022-04-27 18:09:12
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-28 17:20:03
 * @FilePath: \shopping-centre-management\src\views\member\pay\components\checkout-address.vue
 * @Description: 地址组件
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class="checkout-address">
    <div class="text">
      <div v-if="!showAddress" class="none">您需要先添加收货地址才可提交订单。</div>
      <ul v-if="showAddress">
        <li><span>收<i/>货<i/>人：</span>{{showAddress.receiver}}</li>
        <!-- 手机号分成3段 $1 => 第一段 **** => 第二段 $2 => 第三段 -->
        <li><span>联系方式：</span>{{showAddress.contact.replace(/^(\d{3})\d{4}(\d{4})$/,'$1****$2')}}</li>
        <li><span>收货地址：</span>{{showAddress.fullLocation.replace(/ /g,'')+showAddress.address}}</li>
      </ul>
      <a v-if="showAddress" href="javascript:;" @click="openAddressEdit(showAddress)">修改地址</a>
    </div>
    <div class="action">
      <XtxButton @click="openDialog" class="btn">切换地址</XtxButton>
      <XtxButton class="btn" @click="openAddressEdit({})">添加地址</XtxButton>
    </div>
  </div>
  <!-- 对话框组件 切换收货信息 -->
    <xtx-dialog title="切换收货地址" v-model:visible="dialogVisible">
      <div @click="selectedAddress = item" :class="{active: selectedAddress && selectedAddress.id === item.id}" class="text item" v-for="item in list" :key="item.id">
        <ul>
          <li><span>收<i/>货<i/>人：</span>{{item.receiver}}</li>
          <li><span>联系方式：</span>{{item.contact.replace(/^(\d{3})\d{4}(\d{4})$/,'$1****$2')}}</li>
          <!-- replace(/ /g,'') 清除中间空格 -->
          <li><span>收货地址：</span>{{item.fullLocation.replace(/ /g,'')+item.address}}</li>
        </ul>
      </div>
      <!-- vue3.0 仅支持v-slot+template写法 -->
      <template v-slot:footer>
        <XtxButton @click="dialogVisible=false" type="gray" style="margin-right:20px">取消</XtxButton>
        <XtxButton @click="confirmAddr" type="primary">确认</XtxButton>
      </template>
    </xtx-dialog>
    <!-- 添加/编辑组件 -->
    <address-edit ref="AddressEditCom" @on-success="successHandler" />
</template>
<script>
import { ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import AddressEdit from './address-edit.vue'
export default {
  name: 'CheckoutAddress',
  components: { AddressEdit },
  props: {
    // 收货地址列表
    list: {
      type: Array,
      default: () => []
    }
  },
  // 1. 在拥有根元素的组件中，触发自定义事件，有没有emits选项无所谓
  // 2. 如果你的组件渲染的代码片段，vue3.0规范，需要在emits中申明你所触发的自定义事件
  // 3. 提倡：你发了自定义事件，需要在emits选项申明下，代码可读性很高
  emits: ['change', 'changeList'],
  setup (props, { emit }) {
    // 1. 找到默认收货地址
    // 2. 没有默认收货地址，显示第一条收货地址
    // 3. 如果没有数据 => 请添加一条数据
    const showAddress = ref(null)
    if (props.list.length) {
      const defaultAddress = props.list.find(item => item.isDefault === 1)
      if (defaultAddress) {
        showAddress.value = defaultAddress
      } else {
        // 在子组件中获取参数值的时候，是会使得这个参数丢失响应式属性的，
        // 要通过 props 来直接引用，官方提供有 toRefs 方法可以转化为响应式数据。可以直接用这个方法转化
        // 可以写成计算属性 => 计算属性不能修改
        /**
         * toRef和ref一样都是生成影响式数据的API，但是toRef和ref又有一定的区别
         * toRef和传入的数据形成引用关系，修改toRef会影响之的数据，但是不会更新UI
         * ref是单纯的复制,影响不影响之前复制的数据，取决于复制的数据类型，但是会更新UI
         * ref 数据会引起监听行为，而 toRef 不会
         */
        showAddress.value = computed(() => props.list[0])
      }
    }

    // 默认通知父组件一个收货地址 ID
    // showAddress.value?.id => 如果 value有值才取，es6语法
    emit('change', showAddress.value?.id)

    // 切换地址对话框显示隐藏
    const dialogVisible = ref(false)

    // 记录当前选中的地址 id
    const selectedAddress = ref(null)

    // 点击确认按钮
    const confirmAddr = () => {
      // 显示的地址换成选中的地址
      showAddress.value = selectedAddress.value
      // 把选中的地址 id 通知结算组件
      emit('change', showAddress.value?.id)
      // 关闭对话框
      dialogVisible.value = false
    }

    // 打开对话框
    const openDialog = () => {
      // 将之前选中的地址设为空
      selectedAddress.value = null
      // 打开对话框
      dialogVisible.value = true
    }

    // 添加编辑收获地址组件控制显示和隐藏
    const AddressEditCom = ref(null)
    const openAddressEdit = (address) => {
      // AddressEditCom 组件内部创建了一个open方法 通过取到组件实例 取到open方法
      // 添加 => {}
      // 修改 => 数据
      AddressEditCom.value.open(address)
    }

    // 成功后回调函数
    const successHandler = (formData) => {
      // 根据formData 中的 id 去当前地址列表中查找
      // 有 => 修改 => 数组中的数据也会更新 => 同一引用地址
      // 没有 => 添加 => 往 list 中追加一条
      const address = props.list.find(item => item.id === formData.id)
      if (address) {
        // 修改 => 打开对话框时需要清空之前的输入信息
        for (const key in address) {
          // address 值在列表中 更新 address => 更新列表
          address[key] = formData[key]
        }
      } else {
        // 添加
        // 需要克隆下，不然使用的是对象的引用
        // 因为打开对话框时要删除克隆的信息，所以克隆一份，保证原本的数据不会被清除
        // 克隆 formData 信息
        const cloneFormData = JSON.parse(JSON.stringify(formData))
        // 通知父组件
        emit('changeList', cloneFormData)
      }
    }
    return {
      showAddress,
      dialogVisible,
      selectedAddress,
      confirmAddr,
      openDialog,
      openAddressEdit,
      AddressEditCom,
      successHandler
    }
  }
}
</script>
<style scoped lang="less">
.checkout-address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
.xtx-dialog {
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    &.item {
      border: 1px solid #f5f5f5;
      margin-bottom: 10px;
      cursor: pointer;
      &.active,&:hover {
        border-color: @xtxColor;
        background: lighten(@xtxColor,50%);
      }
      > ul {
        padding: 10px;
        font-size: 14px;
        line-height: 30px;
      }
    }
  }
}
</style>
