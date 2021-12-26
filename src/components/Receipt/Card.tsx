import { DocumentData } from 'firebase/firestore';
import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import {
  Badge,
  Button,
  HStack,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import moment from 'moment';

import { ReceiptItemProps } from '@/types/Receipt';

interface ReceiptCardProps {
  receipt: DocumentData;
}

const ReceiptCard = ({ receipt }: ReceiptCardProps): ReactElement | null => {
  const { push } = useRouter();

  if (!receipt.date) return null;

  const { id, items, store } = receipt;

  const dateFormatted = moment(receipt.date.toDate()).format(
    'HH:mm DD.MM.YYYY'
  );

  const goToDetails = (): Promise<boolean> => push(`/receipts/${id}`);

  return (
    <Stack p="4" borderWidth="thin" rounded="md">
      <HStack justify="space-between">
        <Badge colorScheme="blue" variant="solid" fontSize="xl" rounded="md">
          {store}
        </Badge>
        <Text color="gray.500" textTransform="uppercase" textAlign="end">
          {dateFormatted}
        </Text>
      </HStack>
      <HStack justify="space-between">
        <UnorderedList colorScheme="blue">
          {items.map(({ name }: ReceiptItemProps) => (
            <ListItem key={name}>
              <Text textTransform="uppercase">{name}</Text>
            </ListItem>
          ))}
        </UnorderedList>
        <Button colorScheme="blue" onClick={goToDetails} alignSelf="end">
          Details
        </Button>
      </HStack>
    </Stack>
  );
};

export default ReceiptCard;
