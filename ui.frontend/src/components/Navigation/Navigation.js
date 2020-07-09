import React from 'react';
import { MapTo } from '@adobe/cq-react-editable-components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavigationEditConfig = {
  emptyLabel: 'Navigation',

  isEmpty: function (props) {
    return !props || !props.items || props.items.length < 1;
  },
};

const NavItem = styled.li`
  list-style: none;
`;

function renderLink(item) {
  return (
    <Link to={item.url} title={item.title} aria-current={item.active && 'page'}>
      {item.title}
    </Link>
  );
}

function renderNavItem(item, index) {
  return (
    <NavItem key={item.url} index={index}>
      {renderLink(item)}
      {renderGroupNav(item.children)}
    </NavItem>
  );
}

function renderGroupNav(children) {
  if (children === null || children.length < 1) {
    return null;
  }

  return (
    <ul>
      {children.map((item, index) => {
        return renderNavItem(item, index);
      })}
    </ul>
  );
}

function Navigation(props) {
  if (NavigationEditConfig.isEmpty(props)) {
    return null;
  }

  return <nav>{renderGroupNav(props.items)}</nav>;
}

export default MapTo('wknd-spa-react/components/navigation')(
  Navigation,
  NavigationEditConfig,
);
