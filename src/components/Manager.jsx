import { useEffect, useState, useRef } from "react";
import { createContext } from 'react'
import { useForm } from "react-hook-form";

import Toast from "./Toast.jsx";
import Logo from "./Logo.jsx";
import Background from "./Background.jsx";
import PasswordForm from "./PasswordForm.jsx";
import PasswordTable from "./PasswordTable.jsx";
import { getPasswords } from "../utils/helper.js";

const InfoContext = createContext()

export default function Manager() {

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  let passRef = useRef(null);
  let showPassRef = useRef(null);
  let buttonRef = useRef('Save Password')
  let [passwordArray, setPasswordArray] = useState([])

  useEffect(() => {
    getPasswords(setPasswordArray);
  }, []);

  return (

      <>
      <Toast />
      <Background />
      <div className="px-5 py-10 text-sm md:px-15 md:text-base lg:px-40 xl:px-50 2xl:px-70 mx-auto">
          <Logo />
          <InfoContext.Provider value={{handleSubmit, register, passRef, showPassRef, buttonRef, reset, setValue, errors, isSubmitting, passwordArray, setPasswordArray}}>
              <PasswordForm />
              <PasswordTable />
          </InfoContext.Provider>        
      </div>
      </>
  )
}

export {InfoContext}