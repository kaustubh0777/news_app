import React, { Component } from "react";
import NewsItem from "./NewsItem";



export class News extends Component {
  render() {
    return (
      <div className="container my-3">
        <h2>News- Top Headlines</h2>
        <div className="row">
          <div className="col-md-4">
            <NewsItem title="mytitle" description="solid description" imageurl="https://ichef.bbci.co.uk/news/1024/cpsprodpb/1121B/production/_128717107_p0f4r35d.jpg"/>
          </div>
          <div className="col-md-4">
            <NewsItem title="mytitle" description="solid description" />
          </div>
          <div className="col-md-4">
            <NewsItem title="mytitle" description="solid description" />
          </div>
        </div>
      </div>
    );
  }
}

export default News;
