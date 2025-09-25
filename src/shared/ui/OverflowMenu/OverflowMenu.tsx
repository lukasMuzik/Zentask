import {Flex, Menu, MenuButton, MenuItem, MenuList, Text} from '@chakra-ui/react';
import {OverflowMenuProps} from '.';

export function OverflowMenu(props: OverflowMenuProps) {
  return (
    <Menu>
      <MenuButton onClick={(e) => e.stopPropagation()}>{props.trigger}</MenuButton>

      <MenuList>
        {props.menuItems.map((item) => (
          <MenuItem
            key={item.label}
            onClick={(e) => {
              e.stopPropagation();
              item.onClick();
            }}
          >
            <Flex
              alignItems="center"
              gap="12px"
              color={item.variant === 'danger' ? 'text-danger' : 'text-primary'}
            >
              {item.icon}

              <Text as="span">{item.label}</Text>
            </Flex>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
