import React from 'react'
import Link from 'next/link'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Button,
  } from "@chakra-ui/react"

const PagesMenu = () => {
    return (
        <Menu>
            <MenuButton mr={[1,2]} as={Button}>
                Menu
            </MenuButton>
            <MenuList>
                <Link href='/todo'>
                    <MenuItem>Todo</MenuItem>
                </Link>
                <Link href='/event'>
                    <MenuItem>Events</MenuItem>
                </Link>
                <Link href='/contact'>
                    <MenuItem>Contacts</MenuItem>
                </Link>
                <MenuDivider />
                <Link href='../'>
                    <MenuItem>Home</MenuItem>
                </Link>
            </MenuList>
        </Menu>
    )
}

export default PagesMenu;