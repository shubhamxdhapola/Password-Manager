import { useContext } from "react";
import { InfoContext } from "./Manager.jsx";
import { copyText, editPassword, deletePassword } from "../utils/helper.js";

export default function PassportForm() {

  const info = useContext(InfoContext);

  return (
    <>
    <table className="table-auto w-full rounded-md overflow-hidden">
      <thead className="bg-green-800 text-white">
        <tr>
          <th className="py-2 font-semibold">Site URL</th>
          <th className="py-2 font-semibold">Username</th>
          <th className="py-2 font-semibold">Password</th>
          <th className="py-2 font-semibold">Actions</th>
        </tr>
      </thead>

      <tbody className="bg-green-100 text-center">
        {info.passwordArray.map((item) => {
          return (
            <tr key={item.id} className="text-black text-sm">
              
              <td className="border border-white p-2">
                <a href={item.siteURL} target="__blank" className="underline hover:text-blue-800 transition-text duration-300">
                  {item.siteURL}
                </a>
              </td>

              <td className="border border-white p-2 space-x-1">
                <span>{item.username}</span>
                <i
                  className="fa-regular fa-copy cursor-pointer hover:-translate-y-0.5 transition-translate duration-300"
                  onClick={() => copyText(item.username)}
                ></i>
              </td>

              <td className="border border-white p-2 space-x-1">
                <span type="password">{item.password}</span>
                <i
                  className="fa-regular fa-copy cursor-pointer hover:-translate-y-0.5 transition-translate duration-300"
                  onClick={() => copyText(item.password)}
                ></i>
              </td>

              <td className="border border-white p-2 space-x-2">
                <span>
                  <i
                    className="fa-regular fa-pen-to-square cursor-pointer hover:-translate-y-0.5 transition-translate duration-300"
                    onClick={() => editPassword(item.id, info.buttonRef, info.passwordArray, info.setPasswordArray, info.setValue)}
                  ></i>
                </span>

                <span>
                  <i
                    className="fa-solid fa-trash-can cursor-pointer hover:-translate-y-0.5 transition-translate duration-300"
                    onClick={() => deletePassword(item.id, info.passwordArray, info.setPasswordArray)}
                  ></i>
                </span>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
    </>
  )
}
