import { bet } from "./bet";

const bot = async (
  email, password
) => {
  await bet(
    email, password,
    1.80, 1,
    0, 0,
    0,
    false,
  );

  /*
  let strategyToBet;
  while (true) {
    // 1. Verificar estratégia
    strategyToBet = matchingStrategy() || null;

    if (!!strategyToBet) {
      // 2. Apostar
        // a) Gales

      // 3. Dashboard
    }

    // 4. Verificar condições abaixo
    // - verificar se deve permanecer ligado
    // - banco de dados
    // - stop win
    // - stop loss
  }
  */
};

export { bot };
