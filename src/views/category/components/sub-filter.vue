<!--
 * @Author: hidari
 * @Date: 2022-04-19 17:54:48
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-20 17:55:33
 * @FilePath: \shopping-centre-management\src\views\category\components\sub-filter.vue
 * @Description:
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
    <!-- 筛选区 -->
   <div class="sub-filter" v-if="filterData && !filterLoding">
     <div class="item">
       <div class="head">品牌：</div>
       <div class="body">
         <a @click="changeBrand(item.id)" :class="{active: item.id === filterData.brands.selectedBrand}" href="javascript:;" v-for="item in filterData.brands" :key="item.id">{{item.name}}</a>
       </div>
     </div>
      <div class="item" v-for="item in filterData.saleProperties" :key="item.id">
       <div class="head">{{item.name}}</div>
       <div class="body">
         <a href="javascript:;" @click="changeAttr(item, attr.id)" :class="{active: attr.id === item.selectedAttr}" v-for="attr in item.properties" :key="attr.id">{{attr.name}}</a>
       </div>
     </div>
   </div>
  <div v-else class="sub-filter">
    <XtxSkeleton class="item" width="800px" height="40px"  />
    <XtxSkeleton class="item" width="800px" height="40px"  />
    <XtxSkeleton class="item" width="600px" height="40px"  />
    <XtxSkeleton class="item" width="600px" height="40px"  />
    <XtxSkeleton class="item" width="600px" height="40px"  />
  </div>
</template>
<script>
import { ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { reqFindSubCategoryFilter } from '@/api/category.js'
export default {
  name: 'SubFilter',
  setup (props, { emit }) {
    const route = useRoute()
    const filterLoding = ref(false)
    // 监听二级类目ID的变化获取筛选数据
    const filterData = ref(null)
    watch(() => route.params.id, (newVal) => {
      // 变化后 ID 有值且处在二级类名路由下
      if (newVal && `/category/sub/${newVal}` === route.path) {
        filterLoding.value = true
        // 发请求获取数据
        reqFindSubCategoryFilter(route.params.id).then(({ result }) => {
          // 每一组可选的筛选条件缺失 全部 条件
          // 给每一组数据加上一个选中的 id
          // 1. 品牌
          result.brands.unshift({ id: null, name: '全部' })
          result.brands.selectedBrand = null
          // 2. 属性
          result.saleProperties.forEach(item => {
            item.properties.unshift({ id: null, name: '全部' })
            item.selectedAttr = null
          })
          // 设置修改的数据
          filterData.value = result
          filterLoding.value = false
        })
      }
    }, {
      immediate: true
    })

    // 获取筛选参数的函数
    const getFilterParams = () => {
      // 参考数据
      // {brandId: '', attrs: [{groupName: '', propertyName: ''}, {}]}
      const filterParams = { brandId: null, attrs: [] }
      // 品牌
      filterParams.brandId = filterData.value.brands.selectedBrand
      // 销售属性
      filterData.value.saleProperties.forEach(item => {
        if (item.selectedAttr) {
          const attr = item.properties.find(attr => attr.id === item.selectedAttr)
          filterParams.attrs.push({ groupName: item.name, propertyName: attr.name })
        }
      })
      if (filterParams.attrs.length === 0) filterParams.attrs = null
      return filterParams
    }

    // 记录当前选择的品牌
    const changeBrand = (brandId) => {
      if (filterData.value.brands.selectedBrand === brandId) return
      filterData.value.brands.selectedBrand = brandId
      emit('filter-change', getFilterParams())
    }

    // 记录选择的销售属性
    const changeAttr = (item, attrId) => {
      if (item.selectedAttr === attrId) return
      item.selectedAttr = attrId
      emit('filter-change', getFilterParams())
    }
    return {
      filterData,
      filterLoding,
      changeBrand,
      changeAttr
    }
  }
}
</script>
<style scoped lang='less'>
  // 筛选区
  .sub-filter {
    background: #fff;
    padding: 25px;
    .item {
      display: flex;
      line-height: 40px;
      .head {
        width: 80px;
        color: #999;
      }
      .body {
        flex: 1;
        a {
          margin-right: 36px;
          transition: all .3s;
          display: inline-block;
          &.active,
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
    .xtx-skeleton {
        padding: 10px 0;
    }
  }
</style>
