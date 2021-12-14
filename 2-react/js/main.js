class App extends React.Component {
  constructor() {
    super()

    this.state = {
      searchKeyword: "",
    }
  }

  handleChangeInput(event) {
    this.setState({
      searchKeyword: event.target.value,
    })
  }

  render() {
    let resetButton = null

    if (this.state.searchKeyword.length > 0) {
      resetButton = <button type="reset" className="btn-reset"></button>
    }

    return (
      <>
        <header>
          <h2 className="container">검색</h2>
        </header>
        <div className="container">
          <form id="search-form-view">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              autoFocus
              value={this.state.searchKeyword}
              onChange={(event) => this.handleChangeInput(event)}
            />
            {resetButton}
          </form>
        </div>
      </>
    )
  }
}

ReactDOM.render(<App />, document.querySelector("#app"))
