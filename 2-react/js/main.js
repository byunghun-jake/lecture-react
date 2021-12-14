class App extends React.Component {
  constructor() {
    super()

    this.state = {
      searchKeyword: "",
    }
  }

  handleChangeInput(event) {
    if (!event.target.value) {
      return this.handleReset()
    }
    this.setState({
      searchKeyword: event.target.value,
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log("handleSubmit", this.state.searchKeyword)
  }

  handleReset() {
    console.log("handleReset", "검색 결과를 삭제합니다")
    this.setState({
      searchKeyword: "",
    })
  }

  render() {
    return (
      <>
        <header>
          <h2 className="container">검색</h2>
        </header>
        <div className="container">
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
        </div>
      </>
    )
  }
}

ReactDOM.render(<App />, document.querySelector("#app"))
