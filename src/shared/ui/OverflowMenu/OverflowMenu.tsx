import {Flex, Menu, MenuButton, MenuItem, MenuList, Text} from '@chakra-ui/react';
import {OverflowMenuProps} from '.';

export function OverflowMenu(props: OverflowMenuProps) {
  return (
    <Menu>
      <MenuButton>{props.trigger}</MenuButton>
      <MenuList>
        {props.menuItems.map((item) => (
          <MenuItem key={item.label} onClick={item.onClick}>
            <Flex gap="12px" alignItems="center">
              {item.icon}

              <Text as="span">{item.label}</Text>
            </Flex>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
