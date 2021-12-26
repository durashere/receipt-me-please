import { Badge, HStack, Stack, Text } from '@chakra-ui/react';
import { doc, getFirestore } from 'firebase/firestore';
import { ReactElement } from 'react';
import { useFirestoreDocData, useUser } from 'reactfire';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import moment from 'moment';

import DefaultLayout from '@/layouts/default/DefaultLayout';
import ReceiptDetailsRemoveDialog from '@/components/Receipt/RemoveDialog';
import ReceiptDetailsImage from '@/components/Receipt/Details/Image';
import ReceiptDetailsItems from '@/components/Receipt/Details/Items';

const ReceiptDetailsPage = (): ReactElement | null => {
  const { query } = useRouter();

  const { data: dataUser, status: statusUser } = useUser();

  const { data: dataReceipt, status: statusReceipt } = useFirestoreDocData(
    doc(getFirestore(), `receipts/${query.receiptId}`),
    {
      idField: 'id',
    }
  );

  if (statusUser === 'loading') return null;

  if (statusReceipt === 'loading') return null;
  if (statusReceipt === 'error')
    return <ErrorPage statusCode={500} title="Error loading receipt" />;
  if (statusReceipt === 'success' && !dataReceipt)
    return <ErrorPage statusCode={404} title="Receipt not found" />;

  if (!dataReceipt.users.includes(dataUser?.uid)) {
    return (
      <ErrorPage
        statusCode={401}
        title="You are not authorized to view this receipt"
      />
    );
  }

  const { date, id, items, price, store } = dataReceipt;

  const dateFormatted = moment(date.toDate()).format('HH:mm DD.MM.YYYY');
  const priceFormatted = Number(price).toFixed(2);

  return (
    <Stack>
      <HStack justify="space-between">
        <Badge colorScheme="blue" variant="solid" fontSize="xl" rounded="md">
          {store}
        </Badge>
        <Text color="gray.500" textTransform="uppercase" textAlign="end">
          {dateFormatted}
        </Text>
      </HStack>
      <ReceiptDetailsItems items={items} />
      <Text
        px="1"
        fontSize="lg"
        fontWeight="bold"
        textColor="gray.500"
        alignSelf="end"
        rounded="md"
        letterSpacing="widest"
      >
        {priceFormatted}
      </Text>
      <ReceiptDetailsImage receiptId={id} />
      <ReceiptDetailsRemoveDialog receiptId={id} />
    </Stack>
  );
};

ReceiptDetailsPage.getLayout = (page: ReactElement): ReactElement => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default ReceiptDetailsPage;
