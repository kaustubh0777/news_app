import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps={
    country:"in",
    pageSize:8,
    category:'general'
  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string

  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1

    }
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=0c143a00b2db43b4b79f150bc5f06c24&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parseData = await data.json()
    this.setState({ articles: parseData.articles, totalResults: parseData.totalResults, loading: false })

  }
  handlePrevious = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=0c143a00b2db43b4b79f150bc5f06c24&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    this.setState({ loading: true })
    let data = await fetch(url);
    let parseData = await data.json()
    this.setState({
      page: this.state.page - 1,
      articles: parseData.articles,
      loading: false
    })

  }
  handleNext = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {
    }
    else {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=0c143a00b2db43b4b79f150bc5f06c24&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
      this.setState({ loading: true })
      let data = await fetch(url);
      let parseData = await data.json()

      this.setState({
        page: this.state.page + 1,
        articles: parseData.articles,
        loading: false
      })
    }
  }
  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">News- Top Headlines</h2>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageurl={element.urlToImage ? element.urlToImage : "https://ichef.bbci.co.uk/news/1024/branded_news/179CB/production/_128751769_lorriesgetty.jpg"} newsUrl={element.url} />
            </div>
          })}
        </div >
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevious}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
