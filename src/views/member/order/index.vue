<!--
 * @Author: hidari
 * @Date: 2022-04-28 19:28:34
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-29 18:06:51
 * @FilePath: \shopping-centre-management\src\views\member\order\index.vue
 * @Description: 订单管理
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class="member-order-page">
    <!-- tabs组件 -->
    <XtxTabs v-model="activeName" @tab-click="tabClick">
      <XtxTabsPanel
        v-for="item in orderStatus"
        :key="item.name"
        :label="item.label"
        :name="item.name"
        >{{item.label}}</XtxTabsPanel
      >
    </XtxTabs>
    <!-- 订单列表 -->
    <div class="order-list">
      <div v-if="loading" class="loading"></div>
      <div class="none" v-if="!loading && orderList.length === 0">暂无数据</div>
      <order-item
      @on-delete="deleteHandler"
      @on-cancel="cancelHandler"
      @on-confirm="confirmHandler"
      @on-logistics="logisticsHandler"
      v-for="item in orderList"
      :key="item.id"
      :order="item"/>
    </div>
    <!-- 分页组件 -->
    <xtx-pagination v-if="total > 0" @current-change="requestParams.page = $event" :current-page="requestParams.page" :page-size="requestParams.pageSize" :total="total" />
    <!-- 取消原因组件 -->
       <!-- 对于像：对话框，消息提示，确认提示，通知组件 适合使用传送门 Teleport -->
    <Teleport to="#dailog">
      <order-cancel ref="orderCancelCom" />
    </Teleport>
    <!-- 查看物流组件 -->
    <teleport to="#dailog">
        <order-logistics ref="logisticsOrderCom" />
    </teleport>
  </div>
</template>

<script>
import { getCurrentInstance, reactive, ref, watch } from 'vue'
import { orderStatus } from '@/api/constants'
import orderItem from './components/order-item.vue'
import { reqConfirmOrder, reqDelteOrder, reqFindOrderList } from '@/api/member'
import OrderCancel from './components/order-cancel.vue'
import OrderLogistics from './components/order-logistics.vue'
export default {
  components: { orderItem, OrderCancel, OrderLogistics },
  name: 'Order',
  setup () {
    const activeName = ref('all')
    const loading = ref(true)
    const total = ref(0)
    // 查询订单参数
    const requestParams = reactive({
      page: 1,
      pageSize: 5,
      orderState: 0
    })
    // 订单列表
    const orderList = ref([])

    // 加载数据
    const getOrderList = () => {
      loading.value = true
      reqFindOrderList(requestParams).then(data => {
        total.value = data.result.counts
        orderList.value = data.result.items
        loading.value = false
      })
    }
    // 监听tab切换，重新加载数据
    watch(requestParams, () => {
    // 查询订单
      getOrderList()
    }, {
      immediate: true
    })

    // tab 切换加载数据
    const tabClick = ({ index }) => {
      requestParams.page = 1
      requestParams.orderState = index
    }

    // 删除订单
    const instance = getCurrentInstance()
    const deleteHandler = (order) => {
      instance.proxy.$confirm({ text: '确认删除订单吗？' }).then(() => {
        reqDelteOrder([order.id]).then(() => {
          instance.proxy.$message({ text: '删除成功', type: 'success' })
          getOrderList()
        })
      }).catch(() => {})
    }
    return {
      ...useCancel(),
      ...useConfirm(),
      ...useLogistics(),
      activeName,
      orderStatus,
      orderList,
      tabClick,
      loading,
      total,
      requestParams,
      deleteHandler
    }
  }
}

/**
 * 封装逻辑-取消订单
 * 利用teleport组件将结构放在#app容器外
 * @returns cancelHandler 方法 setup模板 return 中解构使用
 */
export const useCancel = () => {
  // 拿到组件实例
  const orderCancelCom = ref(null)
  // order 订单信息 默认传参
  // 点击取消
  const cancelHandler = (order) => {
    // 拿到组件中 open 方法
    orderCancelCom.value.open(order)
  }
  return {
    cancelHandler,
    orderCancelCom
  }
}

// 确认收货逻辑
export const useConfirm = () => {
  const instance = getCurrentInstance()
  const confirmHandler = (order) => {
    instance.proxy.$confirm({ text: '您确认收到货吗？确认后货款将会打给卖家。' }).then(() => {
      reqConfirmOrder(order.id).then(() => {
        instance.proxy.$message({ text: '确认收货成功', type: 'success' })
        // 订单状态 待收货 => 待评价
        order.orderState = 4
      }).catch(() => {})
    })
  }
  return {
    confirmHandler
  }
}

// 查看物流逻辑
const useLogistics = () => {
  const logisticsOrderCom = ref(null)
  const logisticsHandler = (order) => {
    logisticsOrderCom.value.open(order)
  }
  return {
    logisticsHandler,
    logisticsOrderCom
  }
}
</script>
<style scoped lang="less">
.order-list {
  background: #fff;
  padding: 20px;
  position: relative;
  min-height: 400px;
}
.loading {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(255,255,255,.9) url(../../../assets/images/loading.gif) no-repeat center;
}
.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
}
</style>
