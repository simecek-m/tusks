import React from "react";
import "component/menu/Menu.sass";

// components
import UserWidget from "component/menu/widget/Profile";
import Localization from "component/menu/widget/Localization";

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
