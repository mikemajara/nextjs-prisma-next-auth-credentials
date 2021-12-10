import {
  useDisclosure,
  Button,
  Collapse,
  VStack,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { watch } from "fs";
import { signIn } from "next-auth/react";
import router, { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { MdOutlineEmail } from "react-icons/md";

export default function FormPasswordlessEmail() {
  const { isOpen, onToggle } = useDisclosure();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (values) => {
    signIn("email", {
      ...values,
      callbackUrl: router.query.callbackUrl.toString(),
    });
  };

  return (
    <>
      <Button
        w="full"
        leftIcon={<MdOutlineEmail />}
        onClick={onToggle}
      >
        Email
      </Button>
      <Collapse in={isOpen} style={{ width: "100%" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack mb={5}>
            <FormControl
              id="email"
              isInvalid={Boolean(router.query.error)}
            >
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                {...register("email", { required: true })}
              />
            </FormControl>
            <Button
              isLoading={isSubmitting}
              loadingText="Sending email..."
              w="full"
              colorScheme="blue"
              type="submit"
            >
              Sign in
            </Button>
          </VStack>
        </form>
      </Collapse>
    </>
  );
}
