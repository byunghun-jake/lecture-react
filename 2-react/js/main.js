import store from "./js/Store.js"

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      searchKeyword: "",
      searchResult: [],
      submitted: false,
    }
  }

  handleChangeInput(event) {
    if (event.target.value.length === 0 && !!this.state.submitted) {
      return this.handleReset()
    }
    this.setState({
      searchKeyword: event.target.value,
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log("handleSubmit", this.state.searchKeyword)
    this.search(this.state.searchKeyword)
  }

  search(searchKeyword) {
    const searchResult = store.search(searchKeyword)
    this.setState({
      searchResult,
      submitted: true,
    })
  }

  handleReset() {
    console.log("handleReset", "검색 결과를 삭제합니다")
    this.setState({
      searchKeyword: "",
      submitted: false,
    })
  }

  render() {
    const searchForm = (
      <form
        onSubmit={(event) => this.handleSubmit(event)}
        onReset={() => this.handleReset()}
      >
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          autoFocus
          value={this.state.searchKeyword}
          onChange={(event) => this.handleChangeInput(event)}
        />
        {this.state.searchKeyword && (
          <button type="reset" className="btn-reset"></button>
        )}
      </form>
    )

    const searchResult =
      this.state.searchResult.length > 0 ? (
        <ul className="result">
          {this.state.searchResult.map((item) => (
            <li key={item.id}>
              <img src={item.imageUrl} alt={item.name} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-box">검색 결과가 없습니다.</div>
      )

    return (
      <>
        <header>
          <h2 className="container">검색</h2>
        </header>
        <div className="container">
          {searchForm}
          <div className="content">{this.state.submitted && searchResult}</div>
        </div>
      </>
    )
  }
}

ReactDOM.render(<App />, document.querySelector("#app"))
