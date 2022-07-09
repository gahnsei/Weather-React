import React from "react";

function Header(props) {
  const { input, inputChange, searchCity, location, error } = props;

  return (
    <header>
      <span>REACT WEATHER</span>
      {location.formattedAddress && (
        <span className="location">
          <i className="fa-solid fa-location-dot"></i>
          {location.formattedAddress}
        </span>
      )}
      <form className="input-location" onSubmit={searchCity}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          value={input}
          onChange={inputChange}
          placeholder="Search A City"
        />
        {error && <span className="no-location">No Location Found</span>}
      </form>
    </header>
  );
}

export default Header;
