import { axios } from './axios';
/**
*   @database: { 微信开发 }
*   @desc:     { 批量绩效_投票 } 
	以下参数在建立过程中与系统保留字段冲突，已自动替换:
	@desc:批量插入数据时，约定使用二维数组values参数，格式为[{`user`,dpt,score,usertype,isgm,sportid,votedate,votetime }]，数组的每一项表示一条数据*/
export const addCbpcPerformance = (values) =>
  axios({
    method: 'post',
    data: {
      values,
      id: 155,
      nonce: 'c8a91eaea6'
    }
  });

/**
 *   @database: { 微信开发 }
 *   @desc:     { 绩效_查看得分 }
 */
export const getCbpcPerformance = (sid) =>
  axios({
    url: '/156/274ff67aec.json',
    params: {
      sid
    }
  });
/**
 *   @database: { 微信开发 }
 *   @desc:     { 绩效_得分明细 }
 */
export const getCbpcPerformanceDetail = (sid) =>
  axios({
    url: '/157/0e9de788d8.json',
    params: {
      sid
    }
  });
