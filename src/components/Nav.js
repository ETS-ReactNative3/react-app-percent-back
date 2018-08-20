import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavItem } from 'react-bootstrap';
import axios from 'axios';

class NavbarCom extends Component {

    logout = () => {
        localStorage.removeItem('jwtToken');
        window.location.reload();
      }
    

    render() {
        return (
            <div className="NavbarCom">
                <Navbar collapseOnSelect>
                    <Navbar.Header>
                        <NavbarBrand>
                            <a href="*/input">Enter Races</a>
                        </NavbarBrand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={2} href="*/table">See Standings
                            </NavItem>
                            <NavItem eventKey={3} href="*/chart">See Chart
                            </NavItem>
                            <NavItem eventKey={4} onClick={this.logout} href="/">Log Out
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default NavbarCom;