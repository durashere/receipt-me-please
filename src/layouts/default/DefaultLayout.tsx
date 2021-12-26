import {
  Box,
  Button,
  HStack,
  IconButton,
  LinkBox,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { MdMenu } from 'react-icons/md';
import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import NextLink from 'next/link';
import { useAuth, useSigninCheck } from 'reactfire';
import { GoogleAuthProvider, signInWithRedirect, signOut } from 'firebase/auth';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout = ({
  children,
}: DefaultLayoutProps): ReactElement | null => {
  const { push } = useRouter();
  const auth = useAuth();

  const { status: signInCheckStatus, data: signInCheckResult } =
    useSigninCheck();

  const signInUser = async (): Promise<void> => {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
  };

  const signOutUser = async (): Promise<void> => {
    await signOut(auth);
  };

  if (signInCheckStatus === 'loading') return null;

  return (
    <>
      <Head>
        <title>Receipt me please</title>
        <meta name="description" content="App for receipts management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SimpleGrid gridTemplateRows="auto 1fr" minH="100vh">
        <HStack as="header" px="4" py="2" borderBottomWidth="thin">
          <NextLink href="/" passHref>
            <LinkBox flexGrow="1" cursor="pointer">
              <Text fontSize="2xl">Receipt me please</Text>
            </LinkBox>
          </NextLink>

          {!signInCheckResult.signedIn && (
            <Button onClick={signInUser}>Login</Button>
          )}
          <Menu>
            <MenuButton id="nav-menu" as={IconButton} icon={<MdMenu />}>
              Actions
            </MenuButton>
            <MenuList>
              <MenuItem onClick={(): Promise<boolean> => push('/')}>
                Dashboard
              </MenuItem>
              <MenuItem onClick={(): Promise<boolean> => push('/receipts')}>
                Receipt list
              </MenuItem>
              <MenuItem
                onClick={(): Promise<boolean> => push('/receipts/create')}
              >
                Create receipt
              </MenuItem>
              <MenuItem textColor="red.500" onClick={signOutUser}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
        {signInCheckResult.signedIn && (
          <Box as="main" p="4">
            {children}
          </Box>
        )}
      </SimpleGrid>
    </>
  );
};

export default DefaultLayout;
