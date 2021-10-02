import React, { useState } from "react";
import MapComponent from "../Map/MapComponent";
import './App.scss';
import Header from "../Header/Header";
import SidePanel from "../SidePanel/SidePanel";

const App = () => {
  const [itemOnFocus, setItemOnFocus] = useState(null);
  const handleItemClick = (item) => {
    setItemOnFocus(item);
  };

  return (
    <>
      <Header />
      <SidePanel handleItemClick={handleItemClick} />
      <MapComponent itemOnFocus={itemOnFocus} />
    </>
  );
};

export default App;
