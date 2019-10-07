import React from "react";
import "component/Menu.sass";

// components
import UserWidget from "component/UserWidget";
import Localization from "component/Localization";

function Menu() {
  return (
    <div id="menu-component">
      <Localization />
      <UserWidget />
    </div>
  );
}

export default Menu;
