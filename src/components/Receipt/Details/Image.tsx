import { Box, chakra } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { ref } from 'firebase/storage';
import { useStorage, useStorageDownloadURL } from 'reactfire';
import NextImage from 'next/image';

interface ReceiptDetailsImageProps {
  receiptId: string;
}

const ReceiptDetailsImage = ({
  receiptId,
}: ReceiptDetailsImageProps): ReactElement | null => {
  const storage = useStorage();

  const { data: imageUrl, status: statusImage } = useStorageDownloadURL(
    ref(storage, `receipts/${receiptId}`)
  );

  const ChakraNextImage = chakra(NextImage, {
    baseStyle: { maxH: '100%', maxW: '100%' },
    shouldForwardProp: (prop) =>
      [
        'src',
        'className',
        'width',
        'height',
        'layout',
        'loader',
        'sizes',
        'quality',
        'priority',
        'placeholder',
        'objectFit',
        'objectPosition',
        'onLoadingComplete',
        'loading',
        'blurDataURL',
        'lazyBoundary',
        'unoptimized',
        'style',
        'srcSet',
        'ref',
        'decoding',
      ].includes(prop),
  });

  if (statusImage === 'loading') return null;

  return (
    <Box py="4" borderWidth="thin" borderX="0">
      <ChakraNextImage
        priority
        src={imageUrl}
        layout="responsive"
        objectFit="contain"
        width="100%"
        height="100%"
      />
    </Box>
  );
};

export default ReceiptDetailsImage;
