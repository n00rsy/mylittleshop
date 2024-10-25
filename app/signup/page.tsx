'use client';
import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/actions/user";
import { useForm } from '@mantine/form';
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
  Center,
  Container,
  rem
} from '@mantine/core';
import { GoogleButton } from "@/components/AuthenticationForm/GoogleButton";
import { TwitterButton } from "@/components/AuthenticationForm/TwitterButton";
import { notifications } from '@mantine/notifications';
import { IconArrowBack, IconArrowLeft } from "@tabler/icons-react";

export default function Register() {

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      name: (val) => (val.length <= 2 ? 'Name should include at least 6 characters' : null),
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
    "withColor": true,
    "dimmed": true,
    "canvas": {
      "center": true,
      "maxWidth": 420
    }
  }

  const handlesubmit = async (name: string, email: string, password: string) => {
    console.log("handlesubmit: ", name, email, password)

    const r = await register({
      email: email,
      password: password,
      name: name,
    });
    ref.current?.reset();
    if (r?.error) {
      console.log("error!", r)
      setError(r.error);
      return;
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <Center
      style={{ height: '100vh' }}
    >
      <Stack>
        <Container size="xs">
          <Paper radius="md" p="xl" withBorder shadow="sm">
            <Text size="lg" fw={500}>
              Welcome to mylittleshop, continue with
            </Text>

            <Group grow mb="md" mt="md">
              <GoogleButton radius="xl">Google</GoogleButton>
              <TwitterButton radius="xl">Twitter</TwitterButton>
            </Group>

            <Divider label="Or sign up with email" labelPosition="center" my="lg" />

            <form onSubmit={form.onSubmit((values) => handlesubmit(values.name, values.email, values.password))}>
              <Stack>
                <TextInput
                  label="Name"
                  placeholder="Your name"
                  value={form.values.name}
                  onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                  radius="md"
                />
                <TextInput
                  required
                  label="Email"
                  placeholder="hello@mantine.dev"
                  value={form.values.email}
                  onChange={(event) => {
                    form.setFieldValue('email', event.currentTarget.value)
                    setError(undefined)
                  }}
                  error={(form.errors.email && 'Invalid email') || error}
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

                <Checkbox
                  label="I accept terms and conditions"
                  checked={form.values.terms}
                  onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                />

              </Stack>

              <Group justify="space-between" mt="xl">
                <Anchor c="dimmed" href="/login" size="xs">

                  Already have an account? Login
                </Anchor>
                <Anchor href="/forgotpassword" size="xs" >
                  Forgot password?
                </Anchor>
                <Button type="submit" fullWidth mt="xl">
                  Sign up
                </Button>
              </Group>
            </form>
          </Paper>
        </Container>
        <Container fluid ta="center">
          <Anchor href="/"><IconArrowLeft style={{ width: rem(14), height: rem(14) }} />Take me home</Anchor>
        </Container>
      </Stack>
    </Center>

  );
}
