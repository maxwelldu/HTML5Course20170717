let API_PREFIX = 'https://www.v2ex.com/api/';
let ajax = {
  get(url, success) {
    wx.request({
      url: API_PREFIX + url,
      method: 'GET',
      success
    });
  },
  getHotTopics(success) {
    this.get('topics/hot.json', success);
  },
  getLatestTopics(success) {
    this.get('topics/latest.json', success);
  },
  getAllNodes(success) {
    this.get('nodes/all.json', success);
  },
  getNodeInfoById(id, success) {
    this.get('nodes/show.json?id=' + id, success);
  },
  getTopicsByNodeId(nodeId, success) {
    this.get('topics/show.json?node_id=' + nodeId, success);
  },
  getTopicById(id, success) {
    this.get('topics/show.json?id=' + id, success);
  },
  getRepliesByTopicId(topicId, success) {
    this.get('replies/show.json?topic_id=' + topicId, success);
  },
  getUserinfoByUsername(username, success) {
    this.get('members/show.json?username=' + username, success);
  },
  getTopicsByUsername(username, success) {
    this.get('topics/show.json?username=' + username, success);
  }
}
export default ajax;
