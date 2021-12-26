import { collection, DocumentData, query, where } from 'firebase/firestore';
import { Stack } from '@chakra-ui/react';
import { ReactElement, useState } from 'react';
import { useFirestoreCollectionData, useFirestore, useUser } from 'reactfire';
import ErrorPage from 'next/error';

import DefaultLayout from '@/layouts/default/DefaultLayout';
import ReceiptList from '@/components/Receipt/FilterableList/List';
import ReceiptSearchBar from '@/components/Receipt/FilterableList/SearchBar';

const ReceiptFilterableListPage = (): ReactElement | null => {
  const [searchQuery, setSearchQuery] = useState({
    store: '',
    itemName: '',
  });

  const { data: dataUser, status: statusUser } = useUser();

  const { data: dataReceipts, status: statusReceipts } =
    useFirestoreCollectionData(
      query(
        collection(useFirestore(), 'receipts'),
        where('users', 'array-contains', dataUser?.uid)
      ),
      {
        idField: 'id',
      }
    );

  const filterCriteria = (receipt: DocumentData): DocumentData => {
    return (
      receipt.store.includes(searchQuery.store) &&
      receipt.items
        .map((item: DocumentData) => item.name.toLowerCase())
        .some((item: DocumentData) =>
          item.includes(searchQuery.itemName.toLowerCase())
        )
    );
  };

  if (statusUser === 'loading') return null;

  if (statusReceipts === 'loading') return null;
  if (statusReceipts === 'error')
    return <ErrorPage statusCode={500} title="Error loading receipts" />;

  return (
    <Stack spacing="8">
      <ReceiptSearchBar
        receipts={dataReceipts}
        setSearchQuery={setSearchQuery}
      />
      <ReceiptList receipts={dataReceipts.filter(filterCriteria)} />
    </Stack>
  );
};

ReceiptFilterableListPage.getLayout = (page: ReactElement): ReactElement => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default ReceiptFilterableListPage;
