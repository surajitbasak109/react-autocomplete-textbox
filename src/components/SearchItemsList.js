import React from "react";

const SearchItemsList = ({ searchItems, cursor, selectItem }) => {
  return (
    <ul className="list-group">
      {searchItems.map((item, idx) => (
        <li
          className={
            cursor === idx ? "active list-group-item" : "list-group-item"
          }
          key={idx}
          onClick={() => selectItem(item.code)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default SearchItemsList;
