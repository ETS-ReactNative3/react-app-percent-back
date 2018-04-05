import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavItem } from 'react-bootstrap';

class NavbarCom extends Component {
    render() {
        return (
            <div className="NavbarCom">
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <NavbarBrand>
                            <a href="/">Enter Races</a>
                        </NavbarBrand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem event key={2} href="/table">See Standings
            </NavItem>
                            <NavItem event key={3} href="/chart">See Chart
            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>;
            </div>
        )
    }
}

export default NavbarCom;