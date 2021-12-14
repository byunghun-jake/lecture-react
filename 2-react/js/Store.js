import storage from "./storage.js"

const tag = "[Store]"

class Store {
  constructor(storage) {
    console.log(tag, "constructor")

    if (!storage) throw "no storage"

    this.storage = storage
  }

  search(keyword) {
    this.addHistory(keyword)
    return this.storage.productData.filter((product) =>
      product.name.includes(keyword)
    )
  }

  getKeywordList() {
    return this.storage.keywordData
  }

  getHistoryList() {
    return this.storage.historyData.sort(this._sortHistory)
  }

  _sortHistory(h1, h2) {
    return h2.date - h1.date
  }

  removeHistory(searchKeyword) {
    this.storage.historyData = this.storage.historyData.filter(
      ({ keyword }) => keyword !== searchKeyword
    )
    console.log([...this.storage.historyData])
  }

  addHistory(keyword) {
    keyword = keyword.trim()
    const hasHistory = this.storage.historyData.some(
      (item) => item.keyword === keyword
    )
    if (hasHistory) {
      this.removeHistory(keyword)
    }
    const newId = Math.max(...this.storage.historyData.map(({ id }) => id)) + 1
    const newHistory = {
      id: newId,
      keyword,
      date: new Date(),
    }
    this.storage.historyData.push(newHistory)
  }
}

const store = new Store(storage)
export default store
