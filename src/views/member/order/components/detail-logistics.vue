<!--
 * @Author: hidari
 * @Date: 2022-04-29 17:44:46
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-29 17:57:11
 * @FilePath: \shopping-centre-management\src\views\member\order\components\detail-logistics.vue
 * @Description: 物流信息
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class="detail-logistics">
    <p>
      <span>{{list[0].time}}</span>
      <span>{{list[0].text}}</span>
    </p>
    <a href="javascript:;">查看物流</a>
  </div>
</template>
<script>
import { reqLogisticsOrder } from '@/api/member'
import { ref } from '@vue/reactivity'
export default {
  name: 'DetailLogistics',
  props: {
    order: {
      type: Object,
      default: () => ({})
    }
  },
  // setup 必须在组件创建的时候执行 因为需要返回渲染模板
  // 写一个 async 只能稍后执行
  // 组件初始化失败
  async setup (props) {
    const data = await reqLogisticsOrder(props.order.id)
    const list = ref(data.result.list)
    return {
      list
    }
  }
}
</script>
<style scoped lang="less">
.detail-logistics {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  background-color: #f5f5f5;
  margin: 30px 50px 0;
  > p {
    flex: 1;
    span {
      color: #999;
      &:first-child {
        margin-right: 30px;
      }
    }
  }
  > a {
    color: @xtxColor;
    text-align: center;
  }
}
</style>
