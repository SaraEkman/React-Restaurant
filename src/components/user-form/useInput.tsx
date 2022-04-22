import { useState } from "react";

const useInput = (valueFn: any) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [enteredValueIsTouched, setEnteredValueIsTouched] = useState(false);

    const enteredValueIsValid = valueFn(enteredValue);
    const valueInputIsInvalid = enteredValueIsTouched && !enteredValueIsValid;
    // Sätter input värden till EnteredValue
    const valueInputChangeHandler = (e:any) => {
        setEnteredValue(e.target.value);
    };
    // Kör funktioner på blur
    const valueInputBlurHandler = () => {
        setEnteredValueIsTouched(true);
    };

    return {
        enteredValue,
        enteredValueIsValid,
        valueInputIsInvalid,
        valueInputChangeHandler,
        valueInputBlurHandler,
    };
};

export default useInput;