import { Component } from 'react'
import { Button, Dropdown, Menu } from 'semantic-ui-react'
import {NavLink} from "react-router-dom";
import "../styles/MenuBar.css"

export default class MenuExampleSizeHuge extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Menu size='huge' className="menu-wrapper">
                <Menu.Item
                    name='home'
                    as={NavLink}
                    to="/"
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='orders'
                    as={NavLink}
                    to="/orders"
                    active={activeItem === 'orders'}
                    onClick={this.handleItemClick}
                />

                <Menu.Menu position='right'>
                    <Dropdown item text='Language'>
                        <Dropdown.Menu>
                            <Dropdown.Item>English</Dropdown.Item>
                            <Dropdown.Item>Russian</Dropdown.Item>
                            <Dropdown.Item>Spanish</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Menu.Item>
                        <Button primary>Sign Up</Button>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}