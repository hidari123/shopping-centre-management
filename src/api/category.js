// 分类相关API函数
import request from '@/utils/request'

/**
 * 获取首页头部分类数据(顶级，二级，对应的商品推荐数据)
 */
export const reqFindAllCategory = () => request('/home/category/head', 'get')
