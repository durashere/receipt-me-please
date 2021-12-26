import { ReactElement } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
} from '@chakra-ui/react';

import { DocumentData } from 'firebase/firestore';

import useStoreList from '@/hooks/useStoreList';

interface ReceiptFormProps {
  onSubmit: (values: DocumentData) => void;
}

const ReceiptForm = ({ onSubmit }: ReceiptFormProps): ReactElement | null => {
  const storeList = useStoreList();

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const { fields, append } = useFieldArray({
    control,
    name: 'items',
  });

  const watchStore = watch('store');
  const storeAlreadyUsed = storeList?.some((store) =>
    store.toLowerCase().includes(watchStore?.toLowerCase())
  );
  const storeAlreadyUsedFound = storeList?.find(
    (store) => store.toLowerCase() === watchStore?.toLowerCase()
  );

  const checksBeforeSubmit = async (values: DocumentData): Promise<void> => {
    if (fields.length === 0) {
      return append({ name: '', price: '' });
    }

    return onSubmit(values);
  };

  if (!storeList) return null;

  return (
    <Stack as="form" onSubmit={handleSubmit(checksBeforeSubmit)}>
      <FormControl isInvalid={errors.image}>
        <FormLabel id="image-label" htmlFor="image">
          Image
        </FormLabel>
        <Input
          p="0"
          border="none"
          rounded="none"
          id="image"
          type="file"
          accept="image/png, image/jpeg"
          {...register('image', {
            required: 'You have to provide image',
          })}
        />
        <FormErrorMessage>{errors.image?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.store}>
        <FormLabel id="store-label" htmlFor="store">
          Store
        </FormLabel>
        <Input
          id="store"
          type="text"
          {...register('store', {
            required: 'You have to provide store',
          })}
        />
        <FormErrorMessage>{errors.store?.message}</FormErrorMessage>
      </FormControl>
      {watchStore && storeAlreadyUsed && watchStore !== storeAlreadyUsedFound && (
        <Box borderWidth="thin" rounded="md" maxH="200" overflowY="scroll">
          <Stack p="2">
            {storeList
              .filter((store) =>
                store.toLowerCase().includes(watchStore.toLowerCase())
              )
              .map((store) => (
                <Button
                  key={store}
                  onClick={(): void => setValue('store', store)}
                >
                  {store}
                </Button>
              ))}
          </Stack>
        </Box>
      )}

      <FormControl isInvalid={errors.price}>
        <FormLabel id="price-label" htmlFor="price">
          Price
        </FormLabel>
        <NumberInput min={1} step={0.01}>
          <NumberInputField
            id="price"
            type="number"
            {...register('price', {
              required: 'You have to provide price',
            })}
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.date}>
        <FormLabel id="date-label" htmlFor="date">
          Date
        </FormLabel>
        <Input
          id="date"
          type="datetime-local"
          {...register('date', {
            required: 'You have to provide date',
          })}
        />
        <FormErrorMessage>{errors.date?.message}</FormErrorMessage>
      </FormControl>

      {fields.length > 0 && (
        <Stack p="4" borderWidth="thin" rounded="md">
          {fields.map((field, index) => (
            <HStack key={field.id} align="start">
              <FormControl isInvalid={errors.items?.[index]?.name}>
                <FormLabel
                  id={`item-name-${index}-label`}
                  htmlFor={`item-name-${index}`}
                >
                  Item name
                </FormLabel>
                <Input
                  id={`item-name-${index}`}
                  {...register(`items.${index}.name`, {
                    required: 'You have to provide item name',
                  })}
                />
                <FormErrorMessage>
                  {errors.items?.[index]?.name?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.items?.[index]?.price}>
                <FormLabel
                  id={`item-price-${index}-label`}
                  htmlFor={`item-price-${index}`}
                >
                  Item price
                </FormLabel>
                <NumberInput min={1} step={0.01}>
                  <NumberInputField
                    id={`item-price-${index}`}
                    type="number"
                    {...register(`items.${index}.price`, {
                      required: 'You have to provide item price',
                    })}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormErrorMessage>
                  {errors.items?.[index]?.price?.message}
                </FormErrorMessage>
              </FormControl>
            </HStack>
          ))}
        </Stack>
      )}

      <Button onClick={(): void => append({ name: '', price: '' })}>
        Append item
      </Button>
      <Button mt={4} colorScheme="blue" isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </Stack>
  );
};

export default ReceiptForm;
