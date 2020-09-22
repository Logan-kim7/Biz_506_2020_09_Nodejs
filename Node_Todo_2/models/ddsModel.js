var mongoose = require("mongoose");

var schema = mongoose.Schema;

var bbsVO = new schema({
  t_text: String,
  t_date: String,
  t_tiem: String,
});

module.exports = mongoose.model("tbl_bbs", bbsVO);
