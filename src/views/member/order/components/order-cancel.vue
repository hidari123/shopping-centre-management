<!--
 * @Author: hidari
 * @Date: 2022-04-29 13:11:02
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-29 15:16:47
 * @FilePath: \shopping-centre-management\src\views\member\order\components\order-cancel.vue
 * @Description: 取消订单
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <XtxDialog title="取消订单" v-model:visible="visibleDialog">
    <!-- 组件内容 -->
    <div class="cancel-info">
        <p>取消订单后，本单享有的优惠可能会一并取消，是否继续？</p>
        <p class="tip">请选择取消订单的原因（必选）：</p>
        <div class="btn">
          <a
            @click="curText = item"
            v-for="item in cancelReason"
            :key="item"
            href="javascript:;"
            :class="{ active: curText === item }"
          >
            {{ item }}
          </a>
        </div>
    </div>
    <!-- 按钮操作 -->
    <template #footer>
      <XtxButton type="gray" @click="visibleDialog=false" style="margin-right:20px">取消</XtxButton>
      <XtxButton type="primary" @click="submit">确认</XtxButton>
    </template>
  </XtxDialog>
</template>
<script>
import { getCurrentInstance, ref } from 'vue'
import { cancelReason } from '@/api/constants'
import { reqCancelOrder } from '@/api/member'
export default {
  name: 'OrderCancel',
  setup () {
    const visibleDialog = ref(false)
    // 选中的取消原因
    const curText = ref('')
    // 当前订单
    const currOrder = ref(null)
    // 定义打开方法
    const open = (order) => {
      visibleDialog.value = true
      currOrder.value = order
    }
    // 确认
    const instance = getCurrentInstance()
    const submit = () => {
      if (!curText.value) {
        return instance.proxy.$message({ text: '请选择取消原因', type: 'warn' })
      }
      reqCancelOrder({ orderId: currOrder.value.id, cancelReason: curText.value }).then(() => {
        instance.proxy.$message({ text: '取消成功', type: 'success' })
        currOrder.value.orderState = 6
      })
      // 关闭对话框
      visibleDialog.value = false
    }
    return {
      visibleDialog,
      cancelReason,
      curText,
      open,
      submit
    }
  }
}
</script>
<style scoped lang="less">
 .xtx-dialog :deep(.wrapper) {
  width: 620px;
}
.cancel-info {
  p {
    font-size: 16px;
    line-height: 35px;
    &.tip {
      color: #999;
    }
  }
  .btn {
    padding-top: 21px;
    display: flex;
    flex-wrap: wrap;
    a {
      width: 256px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      background-color: #ffffff;
      border: 1px solid #e4e4e4;
      margin-right: 20px;
      margin-bottom: 20px;
      color: #666;
      &:nth-child(2n){
        margin-right: 0;
      }
      &:hover,&.active {
        background-color: #e3f9f4;
        border-color: @xtxColor;
      }
    }
  }
}
</style>
