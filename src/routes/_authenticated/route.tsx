import {createFileRoute, Outlet, useNavigate} from '@tanstack/react-router';
import {Box, Flex, Text, Avatar} from '@chakra-ui/react';
import {Logo} from '@ui/Logo';
import {MoreIcon} from '../../shared/assets/icons';
import {OverflowMenu} from '@ui/OverflowMenu';
import {useAuth} from '../../app/providers/AuthProvider/AuthProvider';
import {useLogoutMutation} from '../../features/auth/api/useLogoutMutation';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({context}) => {
    await context.auth.authGuard();
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const {user, logout} = useAuth();
  const logoutMutation = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      logout();
      navigate({to: '/login'});
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box minH="100vh" px={{base: '0.5rem', sm: '2.5rem'}} pb="5rem" maxW="80rem" mx="auto">
      {/* TODO Header */}
      <Flex
        justifyContent="space-between"
        alignItems="center"
        py="2.5rem"
        px={{base: '0.5rem', sm: '0rem'}}
      >
        {/* TODO Logo section */}
        <Flex alignItems="center" gap="0.75rem">
          <Logo variant="simple" width={37} height={32} />

          <Text fontSize="1.75rem" fontWeight="700" color="text-primary">
            Zentask
          </Text>
        </Flex>

        <OverflowMenu
          trigger={
            <Flex alignItems="center" gap="0.5rem">
              <Avatar w={{base: '2.5rem', sm: '1.5rem'}} h={{base: '2.5rem', sm: '1.5rem'}} />
              <Text display={{base: 'none', sm: 'block'}}>{user?.username}</Text>
            </Flex>
          }
          menuItems={[
            {
              label: 'Logout',
              icon: <MoreIcon />,
              onClick: handleLogout,
            },
          ]}
        />
      </Flex>

      {/* TODO Main Content Card */}
      <Box bg="fill-white" borderRadius="2rem" p="2.5rem">
        <Outlet />
      </Box>
    </Box>
  );
}
