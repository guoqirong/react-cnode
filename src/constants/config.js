/* eslint-disable no-undef */

const config = {};
// 获取运行环境
config.IS_PROD = process.env.NODE_ENV === "production";
// 接口地址设置
config.BASE_URL = config.IS_PROD ? "https://cnodejs.org" : "https://cnodejs.org";
// 接口端口设置
config.CODE_BASE_PORT = "";
// 拼接网关路径
config.GATEWAY_URL = config.BASE_URL + config.CODE_BASE_PORT;

export default config;