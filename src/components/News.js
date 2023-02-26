import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false

    }
  }

  async componentDidMount() {
    let url = "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=0c143a00b2db43b4b79f150bc5f06c24"
    let data = await fetch(url);
    let parseData = await data.json()
    this.setState({ articles: parseData.articles })
    

  }
  render() {
    return (
      <div className="container my-3">
        <h2>News- Top Headlines</h2>
        <div className="row">
          {this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageurl={element.urlToImage?element.urlToImage:"https://ichef.bbci.co.uk/news/1024/branded_news/179CB/production/_128751769_lorriesgetty.jpg"} newsUrl={element.url} />
            </div>
          })}
        </div >
      </div>
    );
  }
}

export default News;
