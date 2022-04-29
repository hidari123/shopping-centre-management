<!--
 * @Author: hidari
 * @Date: 2022-04-29 17:21:40
 * @LastEditors: hidari
 * @LastEditTime: 2022-04-29 17:21:40
 * @FilePath: \shopping-centre-management\src\components\library\xtx-steps-item.vue
 * @Description: 封装步骤条-条目
 *
 * Copyright (c) 2022 by hidari, All Rights Reserved.
-->
<script>
export default {
  name: 'XtxStepsItem',
  props: {
    title: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    }
  }
}
</script>
