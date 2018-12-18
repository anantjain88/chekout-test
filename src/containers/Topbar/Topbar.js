import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import appActions from "../../redux/app/actions";
import TopbarUser from "./topbarUser";
import TopbarWrapper from "./topbar.style";
import themes from "../../settings/themes";
import { themeConfig } from "../../settings";
import { Menu } from 'antd';
import Apartment from '../../image/apartment.png';
import Inbox from '../../image/inbox.png';
import Wrench from '../../image/wrench.png';
import News from '../../image/news.png';
import User from '../../image/user.png';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { Header } = Layout;
const { toggleCollapsed } = appActions;
const customizedTheme = themes[themeConfig.theme];

class Topbar extends Component {
  render() {
    const { toggleCollapsed } = this.props;
    const collapsed = this.props.collapsed && !this.props.openDrawer;
    const styling = {
      background: customizedTheme.backgroundColor,
      position: "fixed",
      width: "100%",
      height: 70
    };
    return (
      <div>
      <TopbarWrapper>
        <Header
          style={styling}
          className={
            collapsed ? "isomorphicTopbar collapsed" : "isomorphicTopbar"
          }
        >
          <div className="isoLeft">
            {/* <button
              className={
                collapsed ? "triggerBtn menuCollapsed" : "triggerBtn menuOpen"
              }
              style={{ color: customizedTheme.textColor }}
              onClick={toggleCollapsed}
            /> */}
          </div>

          <ul className="isoRight">
            <li
              onClick={() => this.setState({ selectedItem: "user" })}
              className="isoUser"
            >
              <TopbarUser />
            </li>
          </ul>
        </Header>
        
      </TopbarWrapper>
      <Menu
        onClick={this.handleClick}
        // selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="mail">
          <img src={Apartment} alt="Apartment"/><div>Liegenschaften</div>
        </Menu.Item>
        <Menu.Item key="tool">
          <img src={Inbox} alt="Inbox"/><div>Nachrichten</div>
        </Menu.Item>
        <Menu.Item key="plus">
          <img src={Wrench} alt="Wrench"/><div>Reparaturen</div>
        </Menu.Item>
        <Menu.Item key="up">
          <img src={News} alt="News"/><div>Aktuelles</div>
        </Menu.Item>
        <Menu.Item key="down">
          <img src={User} alt="User"/><div>Benutzer</div>
        </Menu.Item>
        {/* <SubMenu title={<span className="submenu-title-wrapper"><img src={Wrench} alt="Wrench"/><br />Benutzer</span>}>
          <MenuItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </MenuItemGroup>
        </SubMenu> */}
        {/* <Menu.Item key="alipay">
          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
        </Menu.Item> */}
      </Menu>
      </div>
    );
  }
}

export default connect(
  state => ({
    ...state.App
  }),
  { toggleCollapsed }
)(Topbar);
