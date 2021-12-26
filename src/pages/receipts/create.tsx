import {
  addDoc,
  collection,
  DocumentData,
  Timestamp,
} from 'firebase/firestore';
import { ReactElement } from 'react';
import { ref, uploadBytes } from 'firebase/storage';
import { useFirestore, useStorage, useUser } from 'reactfire';
import { useRouter } from 'next/router';

import DefaultLayout from '@/layouts/default/DefaultLayout';
import ReceiptForm from '@/components/Receipt/Form';

const ReceiptCreatePage = (): ReactElement | null => {
  const { push } = useRouter();
  const firestore = useFirestore();
  const storage = useStorage();

  const { data: dataUser, status: statusUser } = useUser();

  const createReceipt = async (values: DocumentData): Promise<void> => {
    const newReceipt = {
      date: Timestamp.fromDate(new Date(values.date)),
      store: values.store,
      price: Number(values.price).toFixed(2),
      items: values.items.map((item: DocumentData) => ({
        name: item.name,
        price: Number(item.price),
      })),
      users: [dataUser?.uid],
    };

    const createdReceiptRef = await addDoc(
      collection(firestore, 'receipts'),
      newReceipt
    );

    const image = values.image[0];
    const imageMetaData = {
      contentType: image.type,
    };

    await uploadBytes(
      ref(storage, `receipts/${createdReceiptRef.id}`),
      image,
      imageMetaData
    );

    push(createdReceiptRef.id);
  };

  if (statusUser === 'loading') return null;

  return <ReceiptForm onSubmit={createReceipt} />;
};

ReceiptCreatePage.getLayout = (page: ReactElement): ReactElement => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default ReceiptCreatePage;
