import { useState } from "react";
import NumberCard from "@components/NumberCard";

const makePermutations = (array) => {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      newArray.push(`${array[i]}${array[j]}`);
    }
  }
  return newArray;
};

const numberGenerator = (numberPlate) => {
  const generatedNumbers = [];
  const splittedNumberPlate = numberPlate
    .replaceAll(" ")
    .replaceAll("-")
    .split("");
  const districtCode = splittedNumberPlate.slice(2, 4);
  const combinationCode = splittedNumberPlate.slice(-4);
  generatedNumbers.push(makePermutations(districtCode));
  generatedNumbers.push(makePermutations(combinationCode));
  const generatedNumbersArray = generatedNumbers.flat();
  const generatedNumbersUnique = [...new Set(generatedNumbersArray)];
  return generatedNumbersUnique.sort();
};

const NumberSuggester = () => {
  const [numbers, setNumbers] = useState([]);
  const [input, setInput] = useState("");
  const inputHandler = (e) => setInput(e.target.value.toUpperCase());

  const formHandler = (e) => {
    e.preventDefault();
    setNumbers(numberGenerator(input));
  };

  return (
    <main>
      <div className="container mx-auto px-5 mt-20 overflow-hidden">
        <div>
          <form
            className="flex justify-center"
            onSubmit={(e) => formHandler(e)}
          >
            <input
              value={input}
              onChange={(e) => inputHandler(e)}
              type="text"
              className="rounded-l-lg lg:min-w-[250px] py-2 px-4 text-black shadow-xl shadow-green-500/60 invalid:shadow-red-500/60 outline-none  transition-colors font-bold tracking-wider f placeholder:transition-colors"
              placeholder="GA06AB3874"
              pattern="^[A-Z]{2}[0-9]{2}[A-HJ-NP-Z]{1,2}[0-9]{4}$"
            />
            <button className="bg-slate-800 p-3 rounded-r-lg outline-none ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </form>
        </div>
        <ul className="flex items-center flex-wrap gap-5 mt-20 justify-center max-w-3xl mx-auto overflow-hidden">
          {numbers.map((number) => (
            <NumberCard key={number} number={number} />
          ))}
        </ul>
      </div>
    </main>
  );
};
export default NumberSuggester;
