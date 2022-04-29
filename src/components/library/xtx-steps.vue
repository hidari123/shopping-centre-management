<!--
 * @Author: hidari
 * @Date: 2022-04-29 17:21:16
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-29 17:37:58
 * @FilePath: \shopping-centre-management\src\components\library\xtx-steps.vue
 * @Description: 静态步骤条
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<script>
export default {
  name: 'XtxSteps',
  props: {
    active: {
      type: Number,
      default: 1
    }
  },
  render () {
    // 1. 获取默认插槽的节点
    const items = this.$slots.default()
    // 2. 获取所有动态生成的 xtx-steps-item组件节点
    const dynamicItems = []
    items.forEach(item => {
      if (item.type.name === 'XtxStepsItem') {
        dynamicItems.push(item)
      } else {
        item.children.forEach(item => {
          dynamicItems.push(item)
        })
      }
    })
    // 3. 根据动态节点生成 item 的 jsx 对象
    const itemsJsx = dynamicItems.map((item, i) => {
      return <div class="xtx-steps-item" class={{ active: i < this.active }}>
        <div class="step"><span>{i + 1}</span></div>
        <div class="title">{item.props.title}</div>
        <div class="desc">{item.props.desc}</div>
      </div>
    })
    // 4. 插入大容器中
    return <div class="xtx-steps">{itemsJsx}</div>
  }
}
</script>
<style lang="less">
.xtx-steps {
  display: flex;
  text-align: center;
  &-item {
    flex: 1;
    &:first-child {
      .step {
        &::before {
          display: none;
        }
      }
    }
    &:last-child {
      .step {
        &::after {
          display: none;
        }
      }
    }
    &.active {
      .step {
        > span {
          border-color: @xtxColor;
          background: @xtxColor;
          color: #fff
        }
        &::before,&::after {
          background: @xtxColor;
        }
      }
      .title {
        color: @xtxColor;
      }
    }
    .step {
      position: relative;
      > span {
        width: 48px;
        height: 48px;
        font-size: 28px;
        border: 2px solid #e4e4e4;
        background: #fff;
        border-radius: 50%;
        line-height: 44px;
        color: #ccc;
        display: inline-block;
        position: relative;
        z-index: 1;
      }
      &::after,&::before{
        content: "";
        position: absolute;
        top: 23px;
        width: 50%;
        height: 2px;
        background: #e4e4e4;
      }
      &::before {
         left: 0;
      }
      &::after {
         right: 0;
       }
    }
    .title {
      color: #999;
      padding-top: 12px;
    }
    .desc {
      font-size: 12px;
      color: #999;
      padding-top: 6px;
    }
  }
}
</style>
