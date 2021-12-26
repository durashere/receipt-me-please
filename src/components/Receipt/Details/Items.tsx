import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { ReactElement } from 'react';

import { ReceiptItemProps } from '@/types/Receipt';

interface ReceiptDetailsItemsProps {
  items: ReceiptItemProps[];
}

const ReceiptDetailsItems = ({
  items,
}: ReceiptDetailsItemsProps): ReactElement => {
  return (
    <Box>
      <Table>
        <Thead>
          <Tr>
            <Th px="1" borderColor="gray.200">
              Item name
            </Th>
            <Th px="1" borderColor="gray.200" isNumeric>
              Price
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map(({ name, price }) => (
            <Tr key={name}>
              <Td px="1" textTransform="uppercase" borderColor="gray.200">
                {name}
              </Td>
              <Td px="1" borderColor="gray.200" isNumeric>
                {Number(price).toFixed(2)}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ReceiptDetailsItems;
