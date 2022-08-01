import { NextPage } from 'next';

import Head from 'next/head';

import { forwardRef, ForwardRefRenderFunction, useContext, useEffect, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import axios from 'axios';

import { HStack, VStack, Text, Button, useDisclosure, Stack, Checkbox, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Grid, GridItem, FormLabel, FormControl, useCheckbox, useToast } from '@chakra-ui/react';
import { DashboardCard } from '../components/DashboardCard';
import { FormInput } from '../components/FormInput';
import { Header } from '../components/Header';

import { UserContext } from '../contexts/useUserContext';
import { UserKiwifyContext } from '../contexts/useKiwify';
import { useRouter } from 'next/router';

const formSchema = yup.object().shape({
  multGale: yup.string().required("Campo obrigatório."),
  gales: yup.string().required("Campo obrigatório."),
  entryValue: yup.string().required("Campo obrigatório."),
  stopGain: yup.string().required("Campo obrigatório."),
  stopLoss: yup.string().required("Campo obrigatório."),

  protectInWhite: yup.bool(),
  catalogingMode: yup.bool(),

  one: yup.bool(),
  two: yup.bool(),
  three: yup.bool(),
  four: yup.bool(),
  five: yup.bool(),
  six: yup.bool(),
  seven: yup.bool()
});

type FormData = {
  multGale: number;
  gales: number;
  entryValue: number;
  stopGain: number;
  stopLoss: number;

  protectInWhite: boolean;
  catalogingMode: boolean;

  one: boolean;
  two: boolean;
  three: boolean;
  four: boolean;
  five: boolean;
  six: boolean;
  seven: boolean;
}

type ScoreProps = {
  win: number;
  loss: number;
}

const Dashboard: NextPage = () => {
  const router = useRouter();

  let [isBotActive, setBotActive] = useState(false);

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(formSchema)
  });

  const { errors } = formState;

  const [score, setScore] = useState({} as ScoreProps);
  const [botStartTime, setBotStartTime] = useState("");

  const { user, setUser } = useContext(UserContext);
  const { userKiwify, setUserKiwify } = useContext(UserKiwifyContext);

  const handleData: SubmitHandler<FormData> = async ({
    multGale, gales,
    entryValue,
    stopGain, stopLoss,
    protectInWhite, catalogingMode,
    one, two, three, four, five, six, seven
  }) => {
    let allValid = true;

    if (entryValue < 1.8) {
      toast({
        title: "Valor de Entrada Inválido",
        description: "O valor de entrada mínimo é de 1.80!",
        status: "error",
        duration: 2000,
      });

      allValid = false;
    }

    let inputValues = [
      multGale, gales,
      entryValue,
      stopGain, stopLoss
    ];

    for (let value of inputValues) {
      if (isNaN(Number(value))) {
        toast({
          title: "Valores inválidos!",
          description: "Os valores das configurações de estratégia devem ser números inteiros ou decimais.",
          status: "error",
          duration: 2000,
        });

        allValid = false;
        break;
      }
    }
    
    let strategies = [one, two, three, four, five, six, seven];

    if (strategies.every(strategy => strategy === false)) {
      toast({
        title: "Valores inválidos!",
        description: "Você deve selecionar ao menos uma estratégia para apostar.",
        status: "error",
        duration: 2000,
      });

      allValid = false;
    }

    if (allValid) {
      onClose();

      setBotActive(true);

      await axios.post('/api/bot', {
        email: user!.email, password: user!.password,
        multGale, gales,
        entryValue,
        stopGain, stopLoss,
        protectInWhite, catalogingMode,
        strategies
      });
    }
  }

  useEffect(() => {
    if (!user) {
      if (!userKiwify) {
        router.push('/');
      } else {
        router.push('/blaze');
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>WinBlaze Pro | Dashboard</title>
      </Head>

      <Header />
      <VStack px={24} py={12} spacing={12} h={["auto", "calc(100vh - 4.6rem)"]}
        align="center" justify="space-between"
      >
        <HStack w="100%" justify="space-between" spacing={6}>
          <Text fontSize="3xl" fontWeight="bold">Dashboard</Text>
          { isBotActive ?
            <Text color="green" fontWeight="bold" textAlign="center">Bot Ligado</Text>
            : <Text color="primary" fontWeight="bold" textAlign="center">Bot Desligado</Text>
          }
        </HStack>
        <Stack direction={["column", "row"]} w="100%" justify="space-between">
          <DashboardCard type="green" value={isBotActive ? `${score.win}` : "0"} />
          <DashboardCard type="red" value={isBotActive ? `${score.loss}` : "0"} />
        </Stack>
        { isBotActive ?
          <Button bg="primary" size="lg" w="100%"
            _hover={{ opacity: '0.7' }} _active={{ }}
            onClick={() => { setBotActive(false); }}
          >
            Desativar Bot
          </Button>
          : <Button bg="primary" size="lg" w="100%"
            _hover={{ opacity: '0.7' }} _active={{ }}
            onClick={onOpen}
          >
            Ativar Bot!
          </Button>
        }
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(handleData as any)}
          backgroundColor="lightBackground"
        >
          <ModalHeader>Configure suas apostas</ModalHeader>
          <ModalCloseButton />
          <ModalBody alignSelf="center">
            <FormLabel>Configurações</FormLabel>
            <Grid gap={3}
              templateRows="repeat(2, 1fr)" templateColumns="repeat(2, 1fr)"
            >
              <GridItem rowSpan={1} colSpan={1}>
                <FormInput type="text" placeholder="Multiplicador Gale"
                  error={errors.multGale as any} {...register("multGale")}
                />
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <FormInput type="text" placeholder="Gales"
                  error={errors.gales as any} {...register("gales")}
                />
              </GridItem>
              <GridItem rowSpan={1} colSpan={2}>
                <FormInput type="text" placeholder="Valor de Entrada"
                  error={errors.entryValue as any} {...register("entryValue")}
                />
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <FormInput type="text" placeholder="Stop Gain"
                  error={errors.stopGain as any} {...register("stopGain")}
                />
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <FormInput type="text" placeholder="Stop Loss"
                  error={errors.stopLoss as any} {...register("stopLoss")}
                />
              </GridItem>
            </Grid>
            <HStack justify="space-evenly" mt={6}>
              <CheckBox index={"protectInWhite"} content={"Proteger no Branco"} {...register("protectInWhite")} />
              <CheckBox index={"catalogingMode"} content={"Modo Catalogador"} {...register("catalogingMode")} />
            </HStack>
            <FormLabel mt={4}>Estratégias</FormLabel>
            <HStack w="100%" align="start" justify="space-evenly" mt={4}>
              <VStack>
                <CheckBox index={"one"} content={"Isaac Newton"} {...register("one")} />
                <CheckBox index={"two"} content={"Albert Einstein"} {...register("two")} />
                <CheckBox index={"three"} content={"Marie Curie"} {...register("three")} />
                <CheckBox index={"four"} content={"Stephen Hawking"} {...register("four")} />
              </VStack>
              <VStack>
                <CheckBox index={"five"} content={"Galileu Galilei"} {...register("five")} />
                <CheckBox index={"six"} content={"Nikola Tesla"} {...register("six")} />
                <CheckBox index={"seven"} content={"Michael Faraday"} {...register("seven")} />
              </VStack>
            </HStack>
          </ModalBody>

          <ModalFooter alignSelf="center" mt={4} w="100%">
            <Button type="submit" backgroundColor="primary" w="100%"
              _hover={{ opacity: '0.7' }} _active={{ }}
              isLoading={formState.isSubmitting}
            >
              Ativar bot!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

interface CheckboxProps {
  index: string;
  content: string;
}

const CheckBoxBase: ForwardRefRenderFunction<HTMLInputElement, CheckboxProps> = (
  { index, content, ...rest }: CheckboxProps, 
  ref
) => {
  return (
    <FormControl>
      <Checkbox ref={ref} name={index} id={index} {...rest}>{content}</Checkbox>      
    </FormControl>
  );
}

const CheckBox = forwardRef(CheckBoxBase);

export default Dashboard;
