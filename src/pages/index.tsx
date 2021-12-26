import { Box } from '@chakra-ui/react';
import { ReactElement } from 'react';

import DefaultLayout from '@/layouts/default/DefaultLayout';

const DashboardPage = (): ReactElement => {
  return <Box>Dashboard</Box>;
};

DashboardPage.getLayout = (page: ReactElement): ReactElement => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default DashboardPage;
