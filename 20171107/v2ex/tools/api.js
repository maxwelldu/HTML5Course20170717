// API前缀
let API_PREFIX = 'https://www.v2ex.com/api/';
let ajax = {
  // 通用的GET请求方法封装
  get(url, success) {
    wx.request({
      url: API_PREFIX + url,
      method: 'GET',
      success
    });
  },
  // 得到热门主题
  getHotTopics(success) {
    this.get('topics/hot.json', success);
  },
  // 得到最新主题
  getLatestTopics(success) {
    this.get('topics/latest.json', success);
  },
  // 得到所有节点
  getAllNodes(success) {
    this.get('nodes/all.json', success);
  },
  // 根据节点ID得到节点信息
  getNodeInfoById(id, success) {
    this.get('nodes/show.json?id=' + id, success);
  },
  // 根据节点ID得到主题列表
  getTopicsByNodeId(nodeId, success) {
    this.get('topics/show.json?node_id=' + nodeId, success);
  },
  // 根据主题ID得到主题
  getTopicById(id, success) {
    this.get('topics/show.json?id=' + id, success);
  },
  // 根据主题ID得到回复列表
  getRepliesByTopicId(topicId, success) {
    this.get('replies/show.json?topic_id=' + topicId, success);
  },
  // 根据用户名得到用户信息
  getUserinfoByUsername(username, success) {
    this.get('members/show.json?username=' + username, success);
  },
  // 根据用户名得到主题列表
  getTopicsByUsername(username, success) {
    this.get('topics/show.json?username=' + username, success);
  }
}
// 默认导出ajax这个对象
export default ajax;
