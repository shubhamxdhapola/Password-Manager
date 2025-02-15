import { useContext } from "react";
import { InfoContext } from './Manager.jsx'
import {savePassword, displayErrorToast, showPassword} from '../utils/helper.js'

export default function PassportForm() {

const info = useContext(InfoContext)

  return (
    <>
    <form onSubmit={info.handleSubmit((data) => savePassword(data, info.passwordArray, info.setPasswordArray, info.reset))}>
      <div className="text-black py-4 space-y-5">
        <label className="text-sm lg:text-base ml-0.5" htmlFor="siteURL"> Enter website name </label>
        <input
          id="siteURL"
          type="text"
          placeholder="Enter complete URL e.g. https://www.instagram.com"
          {...info.register("siteURL", {
            required: { value: true, message: "Site name can't be empty!" },
          })}
          className="rounded-lg border-2 border-green-500 w-full px-4 py-2 focus:outline-green-600 placeholder:text-sm lg:placeholder:text-base"
        />
        {info.errors.siteURL && displayErrorToast(info.errors.siteURL.message)}

        <div className="flex flex-col space-y-5 sm:flex-row sm:space-x-5">
          <div className="w-full">
            <label className="text-sm lg:text-base ml-0.5" htmlFor="username"> Enter username </label>
            <input
              type="text"
              id="username"
              placeholder="e.g. @itadoriyuji"
              {...info.register("username", { 
                required: { value: true, message: "Username can't be empty!"}
              })}
              className="rounded-lg border-2 border-green-500 w-full px-4 py-2 focus:outline-green-600 placeholder:text-sm lg:placeholder:text-base"
            />
            {info.errors.username && displayErrorToast(info.errors.username.message)}
          </div>

          <div className="w-full">
            <label className="text-sm lg:text-base ml-0.5" htmlFor="password"> Enter password </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                placeholder="e.g. abc@123"
                {...info.register("password", { 
                  required: { value: true, message: "Password can't be empty!"}
                })}
                ref={(e) => {
                  info.register("password").ref(e);
                  info.showPassRef.current = e;
                }}
                className="rounded-lg border-2 border-green-500 w-full px-4 py-2 focus:outline-green-600 placeholder:text-sm lg:placeholder:text-base"
              />
              {info.errors.password && displayErrorToast(info.errors.password.message)}

              <span
                ref={info.passRef}
                className="material-symbols-outlined absolute bottom-2 right-3 sm:top-[50%] sm:bottom-0 sm:-translate-y-[50%] hover:cursor-pointer selection:hidden"
                style={{ fontSize: "20px" }}
                onClick={() => showPassword(info.passRef, info.showPassRef)}
              >
                visibility_off
              </span>
            </div>
          </div>
        </div>

        <button
          className="mx-auto cursor-pointer flex justify-center items-center bg-green-400 hover:bg-green-500 rounded-lg py-2 px-4 w-fit border border-green-900 transition-bg duration-300"
          disabled={info.isSubmitting}
          ref={info.buttonRef}>
            <span>Save Password</span>
        </button>
      </div>
    </form>
    </>
  )
}
