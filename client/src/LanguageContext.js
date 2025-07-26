import React, { createContext, useContext, useState } from "react";

const translations = {
  bg: {
    welcome: "Добре дошли в Dashboard",
    logout: "Изход",
    user: "Потребител",
    admin: "Администратор",
    editProfile: "Редактирай профил",
    changePassword: "Промени парола",
    settings: "Настройки",
    name: "Име",
    email: "Имейл",
    saveChanges: "Запази промените",
    oldPassword: "Стара парола",
    newPassword: "Нова парола",
    changePasswordBtn: "Смени паролата",
    settingsTitle: "Настройки",
    settingsDesc: "Тук ще има бъдещи настройки на профила и приложението.",
    profileUpdated: "Профилът е обновен! (пример)",
    passwordChanged: "Паролата е сменена! (пример)",
    status: "Статус на акаунта",
    active: "✅ Активен",
    lastLogin: "Последен вход:",
    actions: "Действия",
    editProfileAction: "• Редактирай профил",
    changePasswordAction: "• Промени парола",
    settingsAction: "• Настройки",
    hello: "Добре дошли,",
    loggedIn: "Успешно сте влезли в системата. Тук можете да управлявате профила си и да използвате всички функции на приложението.",
    login: "Вход",
    register: "Регистрация",
    noAccount: "Нямаш акаунт?",
    haveAccount: "Вече имаш акаунт?",
    registerHere: "Регистрирай се тук",
    loginHere: "Влез тук",
    registrationSuccess: "Регистрацията е успешна!",
    registrationError: "Грешка при регистрация.",
    loginSuccess: "Успешен вход!",
    loginError: "Грешка при вход.",
    networkError: "Мрежова грешка.",
    switchToEn: "Switch to English",
    switchToBg: "Превключи на български"
  },
  en: {
    welcome: "Welcome to Dashboard",
    logout: "Logout",
    user: "User",
    admin: "Admin",
    editProfile: "Edit Profile",
    changePassword: "Change Password",
    settings: "Settings",
    name: "Name",
    email: "Email",
    saveChanges: "Save Changes",
    oldPassword: "Old Password",
    newPassword: "New Password",
    changePasswordBtn: "Change Password",
    settingsTitle: "Settings",
    settingsDesc: "Here you will find future profile and app settings.",
    profileUpdated: "Profile updated! (demo)",
    passwordChanged: "Password changed! (demo)",
    status: "Account Status",
    active: "✅ Active",
    lastLogin: "Last login:",
    actions: "Actions",
    editProfileAction: "• Edit profile",
    changePasswordAction: "• Change password",
    settingsAction: "• Settings",
    hello: "Welcome,",
    loggedIn: "You have successfully logged in. Here you can manage your profile and use all app features.",
    login: "Login",
    register: "Register",
    noAccount: "Don't have an account?",
    haveAccount: "Already have an account?",
    registerHere: "Register here",
    loginHere: "Login here",
    registrationSuccess: "Registration successful!",
    registrationError: "Registration failed.",
    loginSuccess: "Login successful!",
    loginError: "Login error.",
    networkError: "Network error.",
    switchToEn: "Switch to English",
    switchToBg: "Switch to Bulgarian"
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('bg');
  const t = translations[lang];
  const switchLang = () => setLang(l => (l === 'bg' ? 'en' : 'bg'));
  return (
    <LanguageContext.Provider value={{ lang, t, switchLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
} 