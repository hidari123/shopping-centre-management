<!--
 * @Author: hidari
 * @Date: 2022-04-22 17:13:40
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-24 15:35:14
 * @FilePath: \shopping-centre-management\src\views\goods\components\goods-comment.vue
 * @Description:
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<template>
  <div class="goods-comment">
    <!-- 头部 -->
    <div class="head" v-if="commentInfo">
      <div class="data">
        <p><span>{{commentInfo.salesCount}}</span><span>人购买</span></p>
        <p><span>{{commentInfo.praisePercent}}</span><span>好评率</span></p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a
            v-for="(item,i) in commentInfo.tags"
            :key="item.title"
            href="javascript:;"
            :class="{active:currTagIndex === i}"
            @click="changeTag(i)"
          >
            {{item.title}}（{{item.tagCount}}）
          </a>
        </div>
      </div>
    </div>
    <div class="sort">
      <span>排序：</span>
        <a
          @click="changeSort(null)"
          href="javascript:;"
          :class="{active:reqParams.sortField===null}"
        >默认</a>
        <a
          @click="changeSort('praiseCount')"
          href="javascript:;"
          :class="{active:reqParams.sortField==='praiseCount'}"
        >最热</a>
        <a
          @click="changeSort('createTime')"
          href="javascript:;"
          :class="{active:reqParams.sortField==='createTime'}"
        >最新</a>
    </div>
    <!-- 评价列表 -->
    <div class="list">
      <div class="item" v-for="item in commentList" :key="item.id">
        <div class="user">
          <img :src="item.member.avatar" alt="">
          <span>{{formatNickname(item.member.nickname)}}</span>
        </div>
        <div class="body">
          <div class="score">
            <i v-for="i in item.score" :key="i + 's'" class="iconfont icon-wjx01"></i>
            <i v-for="i in 5-item.score" :key="i + 'k'"  class="iconfont icon-wjx01"></i>
            <span class="attr">{{formatSpecs(item.orderInfo.specs)}}</span>
          </div>
          <div class="text">{{item.content}}</div>
          <!-- 评论图片组件 -->
          <goods-comment-image v-if="item.pictures.length" :pictures="item.pictures"/>
          <div class="time">
            <span>{{item.createTime}}</span>
            <span class="zan"><i class="iconfont icon-dianzan"></i> {{item.praiseCount}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页组件 -->
    <xtx-pagination @current-change="changePageFn" :total="total" :page-size="reqParams.pageSize" :current-page="reqParams.page"/>
  </div>
</template>
<script>
import { reactive, ref } from '@vue/reactivity'
import { reqFindCommentInfoByGoods, reqFindCommentInfoList } from '@/api/product'
import { inject, watch } from '@vue/runtime-core'
import goodsCommentImage from './goods-comment-image.vue'
export default {
  components: { goodsCommentImage },
  name: 'GoodsComment',
  setup () {
    // 获取评论信息
    const commentInfo = ref(null)
    const goods = inject('goods')
    reqFindCommentInfoByGoods(goods.value.id).then(data => {
      // 设置数据之前 tags 数据前追加 有图 tag 全部评价 tag
      // type 的目的是将来点击可以区分点的是不是标签
      data.result.tags.unshift({
        title: '有图',
        tagCount: data.result.hasPictureCount,
        type: 'img'
      })
      data.result.tags.unshift({
        title: '全部评价',
        tagCount: data.result.evaluateCount,
        type: 'all'
      })
      commentInfo.value = data.result
    })

    // 激活 tag
    const currTagIndex = ref(0)
    const changeTag = (i) => {
      currTagIndex.value = i
      // 点击 tag 修改筛选条件
      const tag = commentInfo.value.tags[i]
      if (tag.type === 'all') {
        // 情况1：全部评价
        reqParams.hasPicture = null
        reqParams.tag = null
      } else if (tag.type === 'img') {
      // 情况2：有图
        reqParams.hasPicture = true
        reqParams.tag = null
      } else {
      // 情况3：正常 tag
        reqParams.hasPicture = null
        reqParams.tag = tag.title
      }
      // 页码重置为 1
      reqParams.page = 1
    }

    // 准备筛选条件数据
    const reqParams = reactive({
      page: 1,
      pageSize: 10,
      hasPicture: null,
      tag: null,
      // 排序方式两个可选字段 praiseCount 热度 createTime 最新
      sortField: null
    })

    // 改变排序
    const changeSort = (type) => {
      reqParams.sortField = type
      // 页码重置为 1
      reqParams.page = 1
    }

    // 初始化 / 筛选条件发生变化 需要发送请求
    const total = ref(0)
    const commentList = ref([])
    watch(reqParams, async () => {
      const res = await reqFindCommentInfoList(goods.id, reqParams)
      commentList.value = res.result.items
      total.value = res.result.counts
    }, {
      immediate: true
    })

    // 定义转换数据的函数 对应 vue2 中的过滤器（vue3废除过滤器）
    // reduce 拼接属性
    const formatSpecs = (specs) => {
      return specs.reduce((p, c) => `${p} ${c.name}：${c.nameValue}`, '').trim()
    }

    // 名称匿名化
    /**
     * substr() 方法
     * 语法 string.substr(start,length)
     *
     * 参数值
     * @start 必需。要抽取的子串的起始下标。必须是数值。如果是负数，那么该参数声明从字符串的尾部开始算起的位置。也就是说，-1 指字符串中最后一个字符，-2 指倒数第二个字符，以此类推。
     * @length 可选。子串中的字符数。必须是数值。如果省略了该参数，那么返回从 stringObject 的开始位置到结尾的字串。
     */
    const formatNickname = (nickname) => {
      return nickname.substr(0, 1) + '****' + nickname.substr(-1)
    }

    // 实现分页切换
    const changePageFn = (newPage) => {
      reqParams.page = newPage
    }
    return {
      commentInfo,
      currTagIndex,
      changeTag,
      reqParams,
      changeSort,
      commentList,
      formatSpecs,
      formatNickname,
      total,
      changePageFn
    }
  }
}
</script>
<style scoped lang="less">
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;
    .data {
      width: 340px;
      display: flex;
      padding: 20px;
      p {
        flex: 1;
        text-align: center;
        span {
          display: block;
          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;
      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }
      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        > a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;
          &:hover {
            border-color: @xtxColor;
            background: lighten(@xtxColor,50%);
            color: @xtxColor;
          }
          &.active {
            border-color: @xtxColor;
            background: @xtxColor;
            color: #fff;
          }
        }
      }
    }
  }
  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    > span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      &.active,&:hover {
        color: @xtxColor;
      }
    }
  }
}
  .list {
    padding: 0 20px;
    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;
      .user {
        width: 160px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
        span {
          padding-left: 10px;
          color: #666;
        }
      }
      .body {
        flex: 1;
        .score {
          line-height: 40px;
          .iconfont {
            color: #ff9240;
            padding-right: 3px;
          }
          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
      }
      .text {
        color: #666;
        line-height: 24px;
      }
      .time {
        color: #999;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }
</style>
