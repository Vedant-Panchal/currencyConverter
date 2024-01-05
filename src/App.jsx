import { InputBox } from "./components/index";
import useCurrencyInfo from "./hooks/useCurrency";
import { useEffect, useState } from "react";
function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState("");

  const currencyInfo = useCurrencyInfo(from); //get "FROM" currency conversion rates list from api

  const options = Object.keys(currencyInfo); //get all the list conversable keys of the list

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  useEffect(()=>{
    convert()
  },[from,to,amount])

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };
  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat bg-zinc-900"
      style={{
        backgroundImage: `url('${"https://images.pexels.com/photos/3531895/pexels-photo-3531895.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}')`,
        backgroundPosition: "center",
        objectFit: "center",
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-slate-200/25">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label={"From"} // label from
                amount={amount} //amount to be displayed
                currencyOptions={options} // currency list
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(amount) => {  //amount is fetched from the child component
                  setAmount(amount);
                }}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className=" text-center  absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label={"To"}
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} TO {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
