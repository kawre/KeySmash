import React from "react";
import styled from "styled-components";
import { FaChevronRight } from "react-icons/fa";
// Types -------------------------------------------------------------------------

interface Props {
  type: "big" | "small";
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  collapsed?: boolean;
}

// Component ---------------------------------------------------------------------
const SettingsTitle: React.FC<Props> = ({
  collapsed,
  onClick,
  type,
  children,
}) => {
  if (type === "big")
    return (
      <Big onClick={onClick}>
        {children}
        <FaChevronRight className={collapsed ? "" : "collapsed"} />
      </Big>
    );
  return <Small>{children}</Small>;
};

export default SettingsTitle;

// Styled ------------------------------------------------------------------------

const Big = styled.div`
  font-size: 32px;
  color: ${({ theme }) => theme.sub};
  transition: 250ms ease;
  cursor: pointer;
  display: flex;
  align-items: center;

  svg {
    margin-left: 20px;
    transition: transform 250ms ease;

    &.collapsed {
      transform: rotate(90deg);
    }
  }

  &:hover {
    color: ${({ theme }) => theme.text};
  }
`;

const Small = styled.div`
  color: ${({ theme }) => theme.sub};
  margin-bottom: 5px;
`;
