import { Alert, AlertIcon, Grid } from '@chakra-ui/react';
import { DocumentData } from 'firebase/firestore';
import { ReactElement } from 'react';

import ReceiptCard from '@/components/Receipt/Card';

interface ReceiptListProps {
  receipts: DocumentData;
}

const ReceiptList = ({ receipts }: ReceiptListProps): ReactElement => {
  if (receipts.length === 0) {
    return (
      <Alert status="info" rounded="md">
        <AlertIcon />
        No receipts found.
      </Alert>
    );
  }

  return (
    <Grid mt={4} gap={4}>
      {receipts.map((receipt: DocumentData) => (
        <ReceiptCard key={receipt.id} receipt={receipt} />
      ))}
    </Grid>
  );
};

export default ReceiptList;
