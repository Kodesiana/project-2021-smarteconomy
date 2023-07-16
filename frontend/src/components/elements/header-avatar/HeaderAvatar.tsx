import { ProfileInfo } from '@/components/modules/main/navbar/NavbarModule';
import { Avatar, Menu, Text, UnstyledButton, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ChevronDown } from 'react-feather';
const HeaderAvatar = () => {

  const theme = useMantineTheme();
  const { full_name: userName = '', role } = localStorage.getItem('profile') &&
    JSON?.parse(localStorage.getItem('profile') ?? "") as ProfileInfo || {};

  const userNameInitial = userName.split(' ').map((e: string) => e.charAt(0)).join('');
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <Menu
      width={200}
      position="bottom-end"
      transition="pop-top-right"
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton style={{ display: 'flex', height: '100%', alignItems: 'center' }}>
          <Avatar
            src={""}
            alt={userNameInitial}
            radius="xl"
            color="blue"
            mr={12}
            size={38}
          />
          {!isMobile && <>
            <Text weight={600} size={14} mr={8} style={{ color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7] }}>
              {userName} ({role})
            </Text>
            <ChevronDown size={16} /></>
          }
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        {/* <Menu.Item
          onClick={() => {
            window.location.href = '/app/settings';
          }}
        >Profile</Menu.Item> */}
        <Menu.Item onClick={() => {
          localStorage.clear();
          window.dispatchEvent(new Event("storage"));
          window.location.href = '/';
        }}>
          Keluar
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default HeaderAvatar;