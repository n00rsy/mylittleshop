"use client";
import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from '@mantine/form';
import { signIn } from "next-auth/react";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Container,
  Center,
} from '@mantine/core';
import { GoogleButton } from "@/components/AuthenticationForm/GoogleButton";
import { TwitterButton } from "@/components/AuthenticationForm/TwitterButton";
import { FacebookButton } from "@/components/AuthenticationForm/FacebookButton";

export default function Login() {

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const [error, setError] = useState<string>();
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);

  const paperProps = {
    "title": "Authentication form",
    "category": "authentication",
    "canvas": {
      "center": true,
      "maxWidth": 420
    }
  }

  const handlesubmit = async (name: string, email: string, password: string) => {
    console.log("handlesubmit: ", name, email, password)

    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    if (res?.error) {
      setError(res.error as string);
    }
    if (res?.ok) {
      return router.push("/dashboard");
    }
  };

  return (
    <Center
      style={{height: '100vh'}}
    >
    <Container size="xs">
    <Paper radius="md" p="xl" withBorder shadow="sm">
      <Text size="lg" fw={500}>
        Welcome to mylittleshop, continue with
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <TwitterButton radius="xl">Twitter</TwitterButton>
      </Group>

      <Divider label="Or login with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit((values) => handlesubmit(values.name, values.email, values.password))}>
        <Stack>
          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />
          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
          />
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor c="dimmed" href="/signup" size="xs">
            Don't have an account? Sign up
          </Anchor>
          <Anchor href="/forgotpassword" size="xs" >
            Forgot password?
          </Anchor>
          <Button type="submit" fullWidth mt="xl">
            Login
          </Button>
        </Group>
      </form>
    </Paper>
    </Container>
    </Center>
  );
}
