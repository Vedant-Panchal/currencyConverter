import { React, useId } from "react";

function InputBox({
    label,
    className="",
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectCurrency = "usd",
    amountDisable = false,
    currencyDisable = false,
    }) {
   
        const amountInputId = useId()

    return (
        <div className={`bg-slate-600 p-4 rounded-lg text-sm flex ${className}`}>
            <div className="w-1/2">
                <label htmlFor={amountInputId} className="text-white/90 mb-2 inline-block">
                    {label}
                </label>
                <input
                    id = {amountInputId}
                    className="outline-none w-full bg-slate-300 rounded-lg px-2 py-1.5 placeholder-slate-800"
                    type="number"
                    
                    disabled = {amountDisable}
                    value={amount}
                    onChange={(e)=> onAmountChange && onAmountChange(Number(e.target.value))}
                />
            </div>
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-white/90 mb-2 w-full">Currency Type</p>
                <select
                    className="rounded-lg px-1 py-1 bg-slate-300 cursor-pointer outline-none text-black/80"
                    value={selectCurrency}
                    onChange={(e)=>{
                        onCurrencyChange && onCurrencyChange(e.target.value)
                    }}
                    disabled = {currencyDisable}
                >
                    {currencyOptions.map((currency)=> (
                        <option value={currency} key={currency}>
                            {currency.toUpperCase()}
                            </option>
                    ) )}
                        
                
                </select>
            </div>
        </div>
    );
}

export default InputBox;
