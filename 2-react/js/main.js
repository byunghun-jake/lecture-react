import { formatRelativeDate } from "./js/helpers.js"
import store from "./js/Store.js"

const TAB_TYPE = {
  KEYWORD: "KEYWORD",
  HISTORY: "HISTORY",
}

const TAB_LABEL = {
  [TAB_TYPE.KEYWORD]: "추천 검색어",
  [TAB_TYPE.HISTORY]: "최근 검색어",
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      searchKeyword: "",
      searchResult: [],
      submitted: false,
      selectedTab: TAB_TYPE.KEYWORD,
      keywordList: [],
      historyList: [],
    }
  }

  componentDidMount() {
    const keywordList = store.getKeywordList()
    const historyList = store.getHistoryList()
    this.setState({
      keywordList,
      historyList,
    })
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
    const historyList = store.getHistoryList()
    this.setState({
      searchResult,
      submitted: true,
      historyList,
    })
  }

  handleReset() {
    console.log("handleReset", "검색 결과를 삭제합니다")
    this.setState({
      searchKeyword: "",
      submitted: false,
    })
  }

  handleClickTab(tabType) {
    this.setState({
      selectedTab: tabType,
    })
  }

  handleClickKeyword(searchKeyword) {
    this.setState({
      searchKeyword,
    })
    this.search(searchKeyword)
  }

  handleClickHistory(event, searchKeyword) {
    if (event.target.closest(".btn-remove")) {
      return this.handleClickRemoveHistory(searchKeyword)
    }
    this.setState({
      searchKeyword,
    })
    this.search(searchKeyword)
  }

  handleClickRemoveHistory(searchKeyword) {
    store.removeHistory(searchKeyword)
    const historyList = store.getHistoryList()
    this.setState({
      historyList,
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

    const keywordList = (
      <ul className="list">
        {this.state.keywordList.length === 0 ? (
          <div className="empty-box">추천 검색어가 없습니다</div>
        ) : (
          this.state.keywordList.map(({ id, keyword }, index) => (
            <li key={id} onClick={() => this.handleClickKeyword(keyword)}>
              <span className="number">{index + 1}</span>
              <span>{keyword}</span>
            </li>
          ))
        )}
      </ul>
    )

    const historyList = (
      <ul className="list">
        {this.state.historyList.length === 0 ? (
          <div className="empty-box">최근 검색어가 없습니다</div>
        ) : (
          this.state.historyList.map(({ id, keyword, date }) => (
            <li
              key={id}
              onClick={(event) => this.handleClickHistory(event, keyword)}
            >
              <span>{keyword}</span>
              <span className="date">{formatRelativeDate(date)}</span>
              <button className="btn-remove"></button>
            </li>
          ))
        )}
      </ul>
    )

    const tabs = (
      <>
        <ul className="tabs">
          {Object.values(TAB_TYPE).map((t) => (
            <li
              key={t}
              className={t === this.state.selectedTab ? "active" : null}
              onClick={() => this.handleClickTab(t)}
            >
              {TAB_LABEL[t]}
            </li>
          ))}
        </ul>
        {this.state.selectedTab === TAB_TYPE.KEYWORD
          ? keywordList
          : historyList}
      </>
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
          <div className="content">
            {this.state.submitted ? searchResult : tabs}
          </div>
        </div>
      </>
    )
  }
}

ReactDOM.render(<App />, document.querySelector("#app"))
