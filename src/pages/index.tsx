import type { NextPage } from 'next';

import Head from 'next/head';

import { useRouter } from 'next/router';

import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Text, useToast, VStack } from '@chakra-ui/react';
import { LoginInput } from '../components/LoginInput';

import { Header } from '../components/Header';
import { useContext } from 'react';
import { UserKiwifyContext } from '../contexts/useKiwify';

/*
1. Dashboard
2. Desligamento do Bot -> botão liga e desliga
3. Deploy -> vercel, kiwify webhook
4. Adicionar assinatura da Kepler Digital
*/

const formSchema = yup.object().shape({
  username: yup.string().required("Nome de usuário obrigatório."),
  password: yup.string().required("Senha obrigatória."),
});

type FormData = {
  username: string;
  password: string;
}

const Home: NextPage = () => {
  const router = useRouter();

  const toast = useToast();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(formSchema)
  });

  const { errors } = formState;

  const { userKiwify, setUserKiwify } = useContext(UserKiwifyContext);

  const handleData: SubmitHandler<FormData> = async ({ username, password }) => {
    if (username === "username@gmail.com" && password === "password") {
      setUserKiwify({ username, password });

      router.push("/blaze");
    } else {
      toast({
        title: "Credenciais inválidas!",
        description: "Verifique se as credenciais foram escritas corretamente.",
        status: "error",
        duration: 5000
      });
    }
  }

  return (
    <>
      <Head>
        <title>WinBlaze Pro | Login</title>    
      </Head>

      <Header />
      <VStack
        maxW="1120" h={["auto", "calc(100vh - 4.5rem)"]}
        mx="auto" px={30} py={[10, "0"]}
        align="center" justify="center"
      >
        <VStack as="form" bg="lightBackground"
          w="100%" maxWidth={540}
          borderRadius="lg" spacing={8} p={8}
          align="center" justify="center"
          onSubmit={handleSubmit(handleData as any)}
        >
          <Text fontSize="3xl" fontWeight="bold">Login com a Kiwify</Text>
          <VStack spacing={4} w="100%" align="start">
            <Text fontSize="md" fontWeight="bold">
              Adicione suas credenciais recebidas por Whatsapp ao adquirir o produto:
            </Text>
            <LoginInput type="text" label="Usuário"
              error={errors.username as any} {...register("username")}
            />
            <LoginInput type="text" label="Senha" isPassword
              error={errors.password as any} {...register("password")}
            />
          </VStack>
          <Button type="submit" bg="primary" size="lg" w="50%"
            _hover={{ opacity: '0.7' }} _active={{ }}
            isLoading={formState.isSubmitting}
          >
            Enviar
          </Button>
        </VStack>
      </VStack>
    </>
  );
}

export default Home;
