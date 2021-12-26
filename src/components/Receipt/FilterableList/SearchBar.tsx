import { Input, Select, Stack } from '@chakra-ui/react';
import { ChangeEvent, Dispatch, ReactElement, SetStateAction } from 'react';
import { DocumentData } from 'firebase/firestore';

interface RReceiptSearchBarProps {
  receipts: DocumentData[];
  setSearchQuery: Dispatch<
    SetStateAction<{
      store: string;
      itemName: string;
    }>
  >;
}

const ReceiptSearchBar = ({
  receipts,
  setSearchQuery,
}: RReceiptSearchBarProps): ReactElement => {
  const stores = Array.from(new Set(receipts?.map((receipt) => receipt.store)));

  return (
    <Stack>
      <Input
        type="text"
        placeholder="Item name..."
        onChange={(e: ChangeEvent<HTMLInputElement>): void =>
          setSearchQuery((prevQuery) => ({
            ...prevQuery,
            itemName: e.target.value,
          }))
        }
      />
      <Select
        onChange={(e: ChangeEvent<HTMLSelectElement>): void =>
          setSearchQuery((prevQuery) => ({
            ...prevQuery,
            store: e.target.value,
          }))
        }
      >
        <option value="">ALL</option>
        {stores.map((store) => (
          <option key={store} value={store}>
            {store.toUpperCase()}
          </option>
        ))}
      </Select>
    </Stack>
  );
};

export default ReceiptSearchBar;
