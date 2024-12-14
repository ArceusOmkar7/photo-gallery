import React from "react";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import Link from "next/link";

const LoginCardButton = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Login</Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Login / Signup to your account</Dialog.Title>
        <form className="flex flex-col space-y-5 mb-2">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Username
            </Text>
            <TextField.Root placeholder="username" />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Password
            </Text>
            <TextField.Root placeholder="password" />
          </label>
        </form>
        <Dialog.Description>
          {"Don't have an account?"} <Link href="/signup">SignUp</Link>
        </Dialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default LoginCardButton;
