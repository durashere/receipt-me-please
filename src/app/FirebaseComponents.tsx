import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { ReactElement, ReactNode } from 'react';
import {
  useFirebaseApp,
  AuthProvider,
  FirestoreProvider,
  StorageProvider,
} from 'reactfire';

interface FirebaseComponentsProps {
  children: ReactNode;
}

const FirebaseComponents = ({
  children,
}: FirebaseComponentsProps): ReactElement => {
  const app = useFirebaseApp();

  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const storage = getStorage(app);

  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestore}>
        <StorageProvider sdk={storage}>{children}</StorageProvider>
      </FirestoreProvider>
    </AuthProvider>
  );
};

export default FirebaseComponents;
