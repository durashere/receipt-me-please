import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { ReactElement, useRef } from 'react';
import { useFirestore, useStorage } from 'reactfire';
import { useRouter } from 'next/router';

interface ReceiptDetailsRemoveDialogProps {
  receiptId: string;
}

const ReceiptDetailsRemoveDialog = ({
  receiptId,
}: ReceiptDetailsRemoveDialogProps): ReactElement => {
  const firestore = useFirestore();
  const storage = useStorage();
  const { push } = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const removeReceipt = (): void => {
    deleteDoc(doc(firestore, `receipts/${receiptId}`));
    deleteObject(ref(storage, `receipts/${receiptId}`));
    push('/receipts');
  };

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        Remove receipt
      </Button>

      <AlertDialog
        size="sm"
        isOpen={isOpen}
        leastDestructiveRef={cancelRef.current}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Remove receipt
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef.current} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={removeReceipt} ml="4">
                Remove
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ReceiptDetailsRemoveDialog;
