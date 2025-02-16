import { v4 as uuidv4 } from 'uuid'
import { toast } from "react-toastify";

export function displaySuccessToast(msg) {
    if (msg) toast.success(msg)
}

export function displayErrorToast(msg) {
    if (msg) toast.error(msg)
}

export function copyText(text) {
    navigator.clipboard.writeText(text);
    displaySuccessToast("Text copied to clipboard!");
}

export function showPassword(passRef, showPassRef) {
    if (passRef.current.innerText === "visibility_off") {
        passRef.current.innerText = "visibility";
        showPassRef.current.type = "text";
    } else {
        passRef.current.innerText = "visibility_off";
        showPassRef.current.type = "password";
    }
}

export function getPasswords(setPasswordArray) {
    let passwords = JSON.parse(localStorage.getItem("passwords")) || []
    if (passwords) {
        setPasswordArray(passwords);
    }
}

export function savePassword(data, passwordArray, setPasswordArray, reset) {
    setPasswordArray([...passwordArray, { ...data, id: uuidv4() }]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, { id: uuidv4(), ...data }]));
    reset()
    displaySuccessToast("Password saved successfully!");
}

export function editPassword(id, buttonRef, passwordArray, setPasswordArray, setValue) {
    buttonRef.current.innerText = "Update Password";
    let passwordToEdit = passwordArray.filter((item) => item.id === id)[0];
    if (passwordToEdit) {
        setValue("siteURL", passwordToEdit.siteURL);
        setValue("username", passwordToEdit.username);
        setValue("password", passwordToEdit.password);
    }
    buttonRef.current.addEventListener('click', () => {
        updatePassword(id, setPasswordArray, passwordArray, buttonRef)
    })
}

export function updatePassword(id, setPasswordArray, passwordArray, buttonRef) {
    setPasswordArray(passwordArray.filter((item) => item.id !== id))
    buttonRef.current.innerText = "Save Password";
}

export function deletePassword(id, passwordArray, setPasswordArray) {
    passwordArray = passwordArray.filter((item) => item.id !== id);
    setPasswordArray(passwordArray);
    localStorage.setItem("passwords", JSON.stringify(passwordArray));
    displaySuccessToast("Password deleted successfully!");
}

