import React, { Component } from "react";
import PropTypes from "prop-types";

class  HtmlCode extends Component  {
  // 图片处理
  imgContent (content) {
    let str = content;
    // 匹配图片（g表示匹配所有结果i表示区分大小写）
    let imgReg = /<img.*?(?:>|\/>)/gi;
    let arr = str.match(imgReg);
    if (arr && arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {
        let imgArr = arr[i].split(" ");
        let img = "";
        for (let key in imgArr) {
          if (key === "0") {
            img = imgArr[key] + " style=\"width: 100%\"";
          } else {
            img = img + " " + imgArr[key];
          }
        }
        str = str.replace(arr[i], img);
      }
    }
    str.replace(/“|”/g, "\"");
    str = str.replace(/href="+(\/.?user.?\/|user.?\/)/g, "href=\"./#/user/");
    str = str.replace(/&lt;/g, "<");
    return str.replace(/&gt;/g, ">");
  }

  render() {
    let imgContent = "";
    if (this.props.data) {
      imgContent = this.imgContent(this.props.data);
    }
    return (
      <div style={{overflowWrap: "break-word"}} dangerouslySetInnerHTML={{__html: imgContent}}></div>
    );
  }
}

HtmlCode.propTypes = {
  data: PropTypes.string
};

export default HtmlCode;