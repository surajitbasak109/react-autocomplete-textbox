import React from "react";
import "./App.css";
import SearchItemsList from "./components/SearchItemsList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        code: "",
        name: "",
        unit: "",
        rate: ""
      },
      cursor: 0,
      searchItems: []
    };
    this.autocomplete = this.autocomplete.bind(this);
    this.hanldeKeyup = this.hanldeKeyup.bind(this);
    this.hanldeKeydown = this.hanldeKeydown.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  autocomplete(evt) {
    let text = evt.target.value;
    fetch(`http://localhost:3004/items?name_like=${text}&_limit=6`)
      .then(res => res.json())
      .then(data => {
        this.setState({ searchItems: data });
      });
    console.log(this.state.searchItems);
  }

  hanldeKeyup(evt) {
    if (evt.keyCode === 27) {
      this.setState({ searchItems: [] });
      return false;
    }
  }

  hanldeKeydown(evt) {
    const { cursor, searchItems } = this.state;
    // arrow up/down button should select next/previous list element
    console.log(evt.keyCode);
    if (evt.keyCode === 38 && cursor > 0) {
      this.setState(prevState => ({
        cursor: prevState.cursor - 1
      }));
    } else if (evt.keyCode === 40 && cursor < searchItems.length - 1) {
      this.setState(prevState => ({
        cursor: prevState.cursor + 1
      }));
    }
    if (evt.keyCode === 13) {
      let currentItem = searchItems[cursor];
      if (currentItem !== undefined) {
        const { name, code, rate, unit } = currentItem;
        this.setState({ item: { name, code, rate, unit }, searchItems: [] });
      }
    }
    if (evt.keyCode === 8) {
      this.setState({ item: { name: "", code: "", rate: "", unit: "" } });
    }
  }

  selectItem(id) {
    const { searchItems } = this.state;
    let selectedItem = searchItems.find(item => item.code === id);
    const { code, name, unit, rate } = selectedItem;
    this.setState({ item: { code, name, unit, rate }, searchItems: [] });
  }

  handleChange(evt) {
    this.setState({ item: { [evt.target.name]: evt.target.value } });
  }

  render() {
    const { searchItems, cursor, item } = this.state;
    const { code, name, unit, rate } = item;
    return (
      <div className="container mt-3">
        <h1 className="h2 text-center">Autocomplete Example</h1>
        <div className="form-group">
          <label htmlFor="autocomplete">Item Name</label>
          <input
            type="text"
            id="autocomplete"
            onChange={this.autocomplete}
            onKeyUp={this.hanldeKeyup}
            onKeyDown={this.hanldeKeydown}
            value={name}
            className="custom-input form-control"
          />
          {searchItems.length > 0 && (
            <SearchItemsList
              searchItems={searchItems}
              cursor={cursor}
              selectItem={this.selectItem}
            />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="code">Code</label>
          <input
            type="text"
            name="code"
            id="code"
            value={code}
            onChange={this.handleChange}
            readOnly
            className="custom-input form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="unit">Unit</label>
          <input
            type="text"
            name="unit"
            id="unit"
            value={unit}
            onChange={this.handleChange}
            readOnly
            className="custom-input form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="rate">Rate</label>
          <input
            type="text"
            name="rate"
            id="rate"
            value={rate}
            onChange={this.handleChange}
            readOnly
            className="custom-input form-control"
          />
        </div>
      </div>
    );
  }
}

export default App;
