import { collection, DocumentData, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useFirestore } from 'reactfire';

const useStoreList = (): string[] | undefined => {
  const firestore = useFirestore();
  const [storeList, setStoreList] = useState<string[]>();

  useEffect(() => {
    const fetchReceipts = async (): Promise<void> => {
      const receipts = await getDocs(collection(firestore, 'receipts'));
      const stores = receipts.docs.map(
        (receipt: DocumentData) => receipt.data().store
      );

      const uniqueStores = Array.from(new Set(stores));

      setStoreList(uniqueStores);
    };

    fetchReceipts();
  }, [firestore]);

  return storeList;
};

export default useStoreList;
