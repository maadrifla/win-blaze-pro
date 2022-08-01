import type { NextPage } from 'next';

import Head from 'next/head';

import { useRouter } from 'next/router';

import { useContext, useEffect } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import axios from 'axios';

import { Button, Text, useToast, VStack } from '@chakra-ui/react';
import { LoginInput } from '../components/LoginInput';

import { UserContext } from '../contexts/useUserContext';
import { Header } from '../components/Header';
import { UserKiwifyContext } from '../contexts/useKiwify';


const formSchema = yup.object().shape({
  email: yup.string().required("Nome de usuário obrigatório.").email("Email inválido."),
  password: yup.string().required("Senha obrigatória."),
});

type FormData = {
  email: string;
  password: string;
}

const Home: NextPage = () => {
  const router = useRouter();

  const toast = useToast();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(formSchema)
  });

  const { errors } = formState;

  const { user, setUser } = useContext(UserContext);
  const { userKiwify, setUserKiwify } = useContext(UserKiwifyContext);

  const handleData: SubmitHandler<FormData> = async ({ email, password }) => {
    const { data } = await axios.post('/api/blaze', { email, password });

    setUser(data ? { email, password } : null);

    if (data) {
      router.push("/dashboard");
    } else {
      toast({
        title: "Credenciais inválidas!",
        description: "Verifique se as credenciais foram escritas corretamente.",
        status: "error",
        duration: 5000
      });
    }
  }

  useEffect(() => {
    if (!userKiwify) {
      router.push('/');
    }
  }, []);

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
          <Text fontSize="3xl" fontWeight="bold" >Login com a Blaze</Text>
          <VStack spacing={4} w="100%" align="start">
            <Text fontSize="md" fontWeight="bold">Adicione suas credenciais da Blaze:</Text>
            <LoginInput type="text" label="Email"
              error={errors.email as any} {...register("email")}
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
