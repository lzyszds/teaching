import axios from "axios";
/* 
  get请求 
    url:请求地址（必选）
    para:请求参数（可选）
    isAsync:是否为异步请求（默认为异步）
*/
export async function get(url: string, para?: any | undefined, isAsync = true) {
  if (!isAsync) {
    const result = await axios.get(url, para)
    return result.data
  }
  return new Promise((resolve, rejects) => {
    axios.get(url, para).then(res => {
      resolve(res.data)
    }).catch(e => {
      rejects(e)
    })
  })
}
