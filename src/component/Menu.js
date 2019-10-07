import React from "react";
import "component/Menu.sass";

// components
import UserWidget from "component/UserWidget";
import Localization from "component/Localization";

function Menu({ userWidget = true, localization = true }) {
  const localizationComponent = localization ? <Localization /> : null;
  const userWidgetComponent = userWidget ? <UserWidget /> : null;
  return (
    <div id="menu-component">
      {localizationComponent}
      {userWidgetComponent}
    </div>
  );
}

export default Menu;
