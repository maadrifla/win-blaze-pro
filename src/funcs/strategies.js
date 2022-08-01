import { getData } from "./getData";

const strategies = [
  [2,1,2,1,2,1],
  [1,2,2,2,2,2],
  [2,2,1,1,2,2,1,1],
  [1,1,2,2,1,1,2,2],
  [1,2,2,1,2,2,1],
  [2,1,1,1,1,1],
  [1,2,2,2,1]
];

const matchingStrategy = async (chosenStrategies) => {
  const data = await getData();

  let slices;
  let dataSlice;

  for (let strategy of strategies) {
    for (let chosenStrategy of chosenStrategies) {
      if (chosenStrategy) {
        slices = strategy.toString().length;
        dataSlice = data.toString().slice(0, slices);
        
        if (dataSlice === strategy) return strategy;
      }
    }
  }
};

export { matchingStrategy };
