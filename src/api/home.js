// 首页相关api函数
import request from '@/utils/request'

/**
 * 获取品牌
 * @param {Integer} limit - 品牌个数
 * @returns Promise
 */
export const reqFindBrand = (limit = 6) => request('/home/brand', 'get', { limit })
