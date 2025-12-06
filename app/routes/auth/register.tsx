import type { Route } from "./+types/register";
import { forwardRef, useEffect, useMemo, useState } from "react";
import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from "react-router";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
import {
  //   type CountryIso2,
  defaultCountries,
  FlagImage,
  parseCountry,
  usePhoneInput,
} from "react-international-phone";
import { giftboxDarkMobile, Logo } from "~/utils";
import { TitleSuffix } from "~/consts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const LoginTab = [
  { symbol: "mobile", label: "Mobile Phone" },
  { symbol: "email", label: "Email" },
  { symbol: "account", label: "Account Registration" },
] as const;

type LoginTabKey = (typeof LoginTab)[number]["symbol"];

type ActionResponse = {
  ok?: boolean;
  message?: string;
  errors?: Record<string, string>;
};

const INPUT_CLASSES =
  "w-full border-gray-800 lg:border-gray-800 border rounded-md px-3 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-800 lg:focus:ring-gray-900 bg-transparent text-white";

type FormInputProps = React.ComponentPropsWithoutRef<"input"> & {
  label?: string;
  error?: string | null;
};

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="text-white w-full relative">
        {label && <label className="sr-only">{label}</label>}
        <input ref={ref} {...props} className={INPUT_CLASSES} />
        {error && <p className="text-xs text-rose-400 mt-1 absolute bottom--">!{error}</p>}
      </div>
    );
  }
);
FormInput.displayName = "FormInput";

const SubmitButton = ({
  children,
  loading,
}: {
  children: React.ReactNode;
  loading?: boolean;
}) => {
  return (
    <button
      type="submit"
      className="bg-amber-300 w-full py-3 rounded text-gray-950 font-bold disabled:opacity-60 cursor-pointer"
      disabled={loading}
    >
      {loading ? "Processing..." : children}
    </button>
  );
};

function useSendCode(initialSeconds = 60) {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    let timer: number | undefined;
    if (seconds > 0) {
      timer = window.setInterval(() => {
        setSeconds((s) => (s > 0 ? s - 1 : 0));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [seconds]);

  function start(count = initialSeconds) {
    setSeconds(count);
  }

  return {
    seconds,
    start,
    disabled: seconds > 0,
  };
}

function SendCodeButton({
  onSend,
  seconds,
  disabled,
}: {
  onSend: () => Promise<void> | void;
  seconds: number;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onSend()}
      className="bg-gray-800 p-3 rounded px-6 cursor-pointer disabled:opacity-60 w-full"
      disabled={disabled}
    >
      {disabled ? `Resend in ${seconds}s` : "Send"}
    </button>
  );
}

function FormContainer({ children }: { children: React.ReactNode }) {
  return <div className="text-white space-y-7">{children}</div>;
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const data = await request.formData();

  const password1 = String(data.get("password1") ?? "");
  const password2 = String(data.get("password2") ?? "");
  const email = String(data.get("email") ?? "");
  const phone = String(data.get("phone") ?? "");
  const userName = String(data.get("userName") ?? "");
  const type = String(data.get("type") ?? "");

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i; // simple, reliable email check
  const phoneRe = /^\+?[0-9]{7,15}$/; // E.164-like: optional +, 7-15 digits (no formatting)
  const userNameRe = /^[A-Za-z0-9_.-]{3,20}$/; // alphanumeric + . _ - , length 3-20
  const passwordRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/; // min 8, upper, lower, digit, special

  const errors: Record<string, string> = {};

  if (type === "phone") {
    if (!phone) errors.phone = "Phone number is required for phone sign up.";
  } else if (type === "email") {
    if (!email) errors.email = "Email is required for email sign up.";
  } else {
    if (!userName) errors.userName = "Username is required.";
    if (!email && !phone)
      errors.contact = "Please provide either email or phone number.";
  }

  // Password presence
  if (!password1) errors.password1 = "Password is required.";

  // If any required-field errors, return them immediately (step 1)
  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  // 2) Type-specific format checks (step-by-step)
  if (email) {
    if (!emailRe.test(email)) errors.email = "Enter a valid email address.";
  }

  if (phone) {
    // normalize common separators (strip spaces, hyphens, parentheses) for validation,
    // but keep original in errors if desired
    const normalizedPhone = phone.replace(/[\s()-]/g, "");
    if (!phoneRe.test(normalizedPhone)) {
      errors.phone =
        "Phone must be 7–15 digits and may start with +. Remove spaces or special chars.";
    }
  }

  if (userName) {
    if (!userNameRe.test(userName))
      errors.userName =
        "Username: 3–20 chars; letters, numbers, ., _, - allowed (no spaces).";
  }

  // 3) Password complexity
  if (password1 && !passwordRe.test(password1)) {
    errors.password1 =
      "Password must be ≥8 chars, include upper & lower case, a number and a special character.";
  }

  // 4) Passwords match
  if (password1 && password2 && password1 !== password2) {
    errors.password2 = "Passwords don't match.";
  }

  // If we have any validation errors, return them (step 4)
  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  // 5) Cross-field / business checks (example: uniqueness)
  // NOTE: replace the following with real DB/API checks.
  // Example: check username or email availability
  // const isTaken = await db.isUserNameTaken(userName);
  // if (isTaken) errors.userName = "Username already taken.";

  // For demo: fake server-side credential check (remove in real registration)
  // If you are performing "registration", don't validate with a "test account".
  // This block below is purely example to show server-side rejection.
  if (email === "test@mail.com") {
    errors.email = "This email is reserved / already in use.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  // 6) All validation passed -> perform registration logic (DB, API, etc.)
  // const newUser = await createUser({ userName, email, phone, password: password1 });

  // Example: on success, redirect
  return redirect("/dashboard");
}

export default function Registration() {
  const [activeTab, setActiveTab] = useState("mobile");
  const navigation = useNavigation();
  const loading = navigation.state === "submitting";
  const [value, setValue] = useState("");
  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } =
    usePhoneInput({
      defaultCountry: "us",
      value,
      countries: defaultCountries,
      onChange: (data) => {
        setValue(data.phone);
      },
    });
  const { seconds, start, disabled } = useSendCode(60);
  const actionData = useActionData() as ActionResponse | undefined;
  const errors = actionData?.errors ?? null;

  async function handleSend() {
    // TODO: hook this up to actual send API
    start(60);
  }
  console.log(loading);
  const tabButtons = useMemo(
    () =>
      LoginTab.map(({ symbol, label }) => (
        <div key={symbol} className="shrink-0 w-65ss scroll-snap-align-start">
          <button
            onClick={() => setActiveTab(symbol)}
            role="tab"
            aria-selected={activeTab === symbol}
            className={`py-2 text-center transition-colors duration-300 ${
              activeTab === symbol
                ? "text-gray-100 border-b-2 border-amber-300"
                : "text-gray-400 hover:text-gray-100"
            }`}
          >
            {label}
          </button>
        </div>
      )),
    [activeTab]
  );
  useEffect(() => {
    activeTab ==="account"&& loadCaptchaEnginge(6);
  }, [activeTab]);
  return (
    <>
      <main className="bg-gray-900 lg:bg-gray-950 min-h-screen overflow-x-hidden">
        <section id="hero" className="flex flex-col lg:items-center">
          <article
            id="hero1"
            className="flex flex-col gap-4 lg:gap-y-8 lg:max-w-6xl w-full"
          >
            <div className="w-full lg:py-10">
              <div className="text-gray-300 p-6 md:p-5 lg:space-y-10">
                <div className="flex flex-col-reverse md:flex-row gap-4">
                  <div className="space-y-7 flex-1 py-10 justify-center">
                    <div className="flex flex-col items-center md:items-start">
                      <div className="text-3xl font-extrabold space-y-4 lg:text-4xl mb-4">
                        <h1>
                          Up to <span className="text-amber-300">100 USD</span>
                        </h1>
                        <h1>Sign Up Rewards</h1>
                      </div>
                      <img
                        src={giftboxDarkMobile}
                        alt=""
                        className="h-100 rounded-sm"
                      />
                    </div>
                    <div className="flex flex-row gap-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M9 9.5L12 6.5L15 9.5L12 12.5L9 9.5Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M18.0005 1.99999C18.7705 1.99999 19.4005 2.62999 19.4005 3.39999V4.99999H21.4905C22.0705 4.99999 22.5305 5.49999 22.4905 6.07999L22.0905 11.35C21.9705 12.96 20.4005 13.84 19.0605 13.45C18.3205 15.56 16.4305 17.14 14.1005 17.4C13.6105 17.45 13.1605 17.1 13.1105 16.61C13.0605 16.12 13.4105 15.67 13.9005 15.62C16.0105 15.39 17.6005 13.6 17.6005 11.48V3.79999H6.40047V5.99999V11.25V11.47V11.67C6.50047 13.7 8.06047 15.38 10.1005 15.61L9.90047 17.4C7.54047 17.14 5.62047 15.51 4.90047 13.36C3.56047 13.73 2.02047 12.85 1.90047 11.25L1.50047 5.96999C1.46047 5.38999 1.92047 4.89999 2.50047 4.88999H4.60047V3.38999C4.60047 2.61999 5.22047 1.98999 6.00047 1.98999H18.0105L18.0005 1.99999ZM19.4005 11.47C19.4005 11.52 19.4005 11.58 19.4005 11.63C19.7405 11.88 20.2705 11.67 20.3005 11.21L20.6305 6.79999H19.4005V11.47ZM3.70047 11.11C3.74047 11.57 4.26047 11.78 4.60047 11.53C4.60047 11.51 4.60047 11.49 4.60047 11.47V6.69999H3.37047L3.70047 11.11Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M11.1496 18.5C11.1496 19.27 10.5196 19.9 9.74961 19.9H6.39961V21.1H17.5996V19.9H14.2496C13.4796 19.9 12.8496 19.27 12.8496 18.5V16.5C12.8496 16 13.2496 15.6 13.7496 15.6C14.2496 15.6 14.6496 16 14.6496 16.5V18.1H17.9996C18.7696 18.1 19.3996 18.73 19.3996 19.5V21.5C19.3996 22.27 18.7696 22.9 17.9996 22.9H5.99961C5.22961 22.9 4.59961 22.27 4.59961 21.5V19.5C4.59961 18.73 5.22961 18.1 5.99961 18.1H9.34961V16.5C9.34961 16 9.74961 15.6 10.2496 15.6C10.7496 15.6 11.1496 16 11.1496 16.5V18.5Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                      <p>25,541,439 Users Trust {TitleSuffix}</p>
                    </div>
                    <div className="flex flex-row gap-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 28 29"
                        fill="none"
                      >
                        <path
                          d="M4.43278 19.6067L13.9997 24.2665L23.5666 19.6067V4.49699H4.43278V19.6067ZM25.6663 19.8266L25.6618 19.9519C25.6175 20.5713 25.247 21.1252 24.6831 21.4L14.7664 26.2296L14.5807 26.307C14.2049 26.4394 13.7945 26.4394 13.4186 26.307L13.2329 26.2296L3.31624 21.4C2.75239 21.1252 2.38186 20.5713 2.33757 19.9519L2.33301 19.8266V4.14722C2.33301 3.24111 3.02166 2.49593 3.90413 2.40633L4.08301 2.39722H23.9163C24.8828 2.39722 25.6663 3.18072 25.6663 4.14722V19.8266Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M11.1994 17.1728H16.7992V13.4392H11.1994V17.1728ZM18.9001 17.5226L18.891 17.7015C18.8015 18.5839 18.0561 19.2724 17.1501 19.2726H10.8496L10.6707 19.2635C9.84702 19.1798 9.19225 18.5252 9.10872 17.7015L9.09961 17.5226V13.0895C9.09961 12.1834 9.78827 11.4382 10.6707 11.3486L10.8496 11.3395H17.1501C18.1164 11.3397 18.9001 12.1231 18.9001 13.0895V17.5226Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M15.3991 11.9978V10.7764C15.3991 9.83391 14.7042 9.19861 14 9.19845C13.2957 9.19845 12.6009 9.83379 12.6009 10.7764V11.9978C12.6009 12.5777 12.1304 13.0482 11.5505 13.0482C10.9706 13.0482 10.5 12.5777 10.5 11.9978V10.7764C10.5 8.81594 11.9989 7.09753 14 7.09753C16.001 7.09769 17.4989 8.81603 17.4989 10.7764V11.9978C17.4989 12.5775 17.0292 13.0479 16.4495 13.0482C15.8696 13.0482 15.3991 12.5777 15.3991 11.9978Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                      <p>Top Listed In Trading Volume & Customer Asset</p>
                    </div>
                    <div className="flex flex-row gap-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 28 29"
                        fill="none"
                      >
                        <path
                          d="M26.565 7.79165C27.0083 9.15665 27.125 10.615 26.8916 12.0267C26.6583 13.45 26.075 14.78 25.2116 15.935C24.4883 16.8917 23.5783 17.6967 22.5283 18.2917L22.0733 18.5367L21.9683 18.5833C21.4666 18.77 20.9066 18.56 20.6616 18.07C20.4166 17.58 20.5916 16.9967 21.035 16.7167L21.1283 16.6583L21.4783 16.4717C22.2716 16.0167 22.9716 15.3983 23.5316 14.6633C24.1966 13.7883 24.6283 12.7617 24.815 11.6767C24.99 10.5917 24.9083 9.48332 24.57 8.43332C24.2316 7.39499 23.6366 6.44999 22.855 5.67999C22.0733 4.90999 21.105 4.34999 20.055 4.03499C19.005 3.71999 17.885 3.67332 16.8116 3.88332C15.7383 4.09332 14.7233 4.55999 13.86 5.24832C13.16 5.80832 12.5766 6.50832 12.145 7.28999C11.865 7.80332 11.2233 7.97832 10.7216 7.70999C10.2083 7.42999 10.0333 6.78832 10.3016 6.28665C10.8616 5.25999 11.6316 4.34999 12.5416 3.61499C13.6616 2.71665 14.9916 2.10999 16.3916 1.82999C17.8033 1.54999 19.2616 1.61999 20.6383 2.03999C22.015 2.44832 23.275 3.18332 24.3016 4.18665C25.3283 5.18999 26.11 6.42665 26.5533 7.79165H26.565Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M16.3337 18.0233C16.3337 14.4183 13.4053 11.49 9.80033 11.49C6.19533 11.49 3.26699 14.4183 3.26699 18.0233C3.26699 21.6283 6.19533 24.5567 9.80033 24.5567C13.4053 24.5567 16.3337 21.6283 16.3337 18.0233ZM18.4337 18.0233C18.4337 22.795 14.572 26.6567 9.80033 26.6567C5.02866 26.6567 1.16699 22.795 1.16699 18.0233C1.16699 13.2517 5.02866 9.39001 9.80033 9.39001C14.572 9.39001 18.4337 13.2517 18.4337 18.0233Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M6.2998 18.0233L9.7998 14.5233L13.2998 18.0233L9.7998 21.5233L6.2998 18.0233Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                      <p>1,000,000,000 USDC SAFU Fund</p>
                    </div>
                  </div>
                  <div className="flex flex-1 gap-7 flex-col">
                    <Link to="/">
                      <img src={Logo} className="w-40 z-50 lg:w-40" />
                    </Link>
                    <h1 className="text-2xl font-extrabold">
                      Welcome to {TitleSuffix}
                    </h1>
                    <div className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] touch-pan-x pb-6">
                      <div
                        className="flex space-x-4 md:space-x-4 lg:space-x-6 w-20 "
                        role="tablist"
                      >
                        {tabButtons}
                      </div>
                    </div>

                    <Form className="space-y-7" method="post" replace>
                      {loading ? (
                        <div className="flex flex-col items-center justify-center my-4 h-52">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
                          <span className="mt-3 text-gray-400">
                            Loading content...
                          </span>
                        </div>
                      ) : (
                        <>
                          {activeTab === "mobile" && (
                            <FormContainer>
                              <div className="h-12 w-full items-center bg-gray-900 lg:bg-gray-950 flex gap-2 ">
                                <Select
                                  onValueChange={(e) => setCountry(e)}
                                  defaultValue={"us"}
                                >
                                  <SelectTrigger className=" bg-gray-900 border max-w-1/3 lg:bg-gray-950 lg:border-gray-950 border-gray-800 rounded-lg py-6 px-3 text-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-800 hover:bg-gray-900">
                                    <SelectValue></SelectValue>
                                  </SelectTrigger>
                                  <SelectContent className="bg-gray-800  border-gray-700 text-white hover:bg-gray-900">
                                    <SelectGroup>
                                      <SelectLabel>
                                        Select Area Code
                                      </SelectLabel>
                                      {defaultCountries.map((e) => {
                                        const country = parseCountry(e);
                                        return (
                                          <SelectItem
                                            value={country.iso2}
                                            key={country.iso2}
                                            className="flex gap-2"
                                          >
                                            <FlagImage
                                              iso2={country.iso2}
                                              style={{
                                                marginRight: "8px",
                                                width: "20px",
                                              }}
                                            />
                                            <p>{country.name}</p>
                                            <p>+{country.dialCode}</p>
                                          </SelectItem>
                                        );
                                      })}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>

                                <input
                                  placeholder="Phone number"
                                  value={inputValue}
                                  onChange={handlePhoneValueChange}
                                  type="tel"
                                  ref={inputRef}
                                  name="phone"
                                  className="w-full h-full pl-2 min-w-2/3 outline-0 bg-gray-900 lg:bg-gray-950  border-1 border-gray-800 rounded-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-800 lg:focus:ring-gray-900"
                                />
                              </div>
                              <input
                                type="hidden"
                                name="type"
                                value={"phone"}
                              />
                              <div className="flex flex-row gap-3">
                                <div className="text-white w-full">
                                  <FormInput
                                    type="text"
                                    name="otp"
                                    placeholder="Enter the verification code"
                                    error={errors && errors?.otp}
                                  />
                                </div>
                                <div className="text-white basis-64">
                                  <SendCodeButton
                                    onSend={handleSend}
                                    seconds={seconds}
                                    disabled={disabled}
                                  />
                                </div>
                              </div>

                              <FormInput
                                type="text"
                                name="password1"
                                placeholder="Please enter password"
                                error={errors && errors?.password1}
                              />

                              <FormInput
                                type="text"
                                name="password2"
                                placeholder="Please confirm password"
                                error={errors && errors?.password2}
                              />

                              <FormInput
                                type="text"
                                placeholder="Enter invitation code (Optional)"
                              />
                            </FormContainer>
                          )}
                          {activeTab === "email" && (
                            <FormContainer>
                              <input
                                type="hidden"
                                name="type"
                                value={"email"}
                              />

                              <FormInput
                                type="text"
                                placeholder="Please enter your Email"
                                name="email"
                                error={errors && errors?.email}
                              />

                              <div className="flex flex-row gap-4">
                                <div className="text-white w-full">
                                  <FormInput
                                    type="text"
                                    name="otp"
                                    placeholder="Please enter the verification code"
                                  />
                                </div>
                                <div className="text-white basis-64">
                                  <SendCodeButton
                                    onSend={handleSend}
                                    seconds={seconds}
                                    disabled={disabled}
                                  />
                                </div>
                              </div>
                              <FormInput
                                type="text"
                                name="password1"
                                placeholder="Please enter password"
                                error={errors && errors?.password1}
                              />

                              <FormInput
                                type="text"
                                name="password2"
                                placeholder="Please confirm password"
                                error={errors && errors?.password2}
                              />

                              <FormInput
                                type="text"
                                placeholder="Enter the invitation code (Optional)"
                              />
                            </FormContainer>
                          )}
                          {activeTab === "account" && (
                            <FormContainer>
                              <input
                                type="hidden"
                                name="type"
                                value={"userName"}
                              />
                              <FormInput
                                type="text"
                                placeholder="Please enter your Name"
                                name="userName"
                                error={errors && errors?.userName}
                              />

                              <div className="flex flex-row gap-3">
                                <div className="text-white w-full">
                                  <FormInput
                                    type="text"
                                    placeholder="Enter the words beside"
                                    name="recha"
                                  />
                                </div>
                                <div className="text-white">
                                  <LoadCanvasTemplate />
                                </div>
                              </div>

                              <FormInput
                                type="text"
                                placeholder="Enter password"
                                name="password1"
                                error={errors && errors?.password1}
                              />

                              <FormInput
                                type="text"
                                placeholder="Please confirm password "
                                name="password2"
                                error={errors && errors?.password2}
                              />

                              <FormInput
                                type="text"
                                placeholder="Enter the invitation code (Optional)"
                              />
                            </FormContainer>
                          )}
                        </>
                      )}

                      <div className="flex items-center gap-3">
                        <Checkbox
                          id="terms-2"
                          defaultChecked
                          className="ata-[state=checked]:border-blue-600 data-[state=checked]:bg-gray-600 data-[state=checked]:text-white dark:data-[state=checked]:border-gray-700 dark:data-[state=checked]:bg-gray-700"
                        />
                        <div className="grid gap-2">
                          <p className="text-sm text-gray-400">
                            Please ensure the security of your account. When you
                            click confirm and log in, you agree to use our
                            <Link to={`/term`} className="underline text-white">
                              &nbsp;Terms of Service
                            </Link>
                            &nbsp; and
                            <Link
                              to={`/privacy`}
                              className="underline text-white"
                            >
                              {" "}
                              &nbsp;Privacy Notice
                            </Link>
                          </p>
                        </div>
                      </div>
                      {/* {actionData?.error && (
                        <p className="bg-red-100 text-red-600 p-3 rounded">
                          {actionData.error}
                        </p>
                      )} */}
                      <div className="text-white">
                        <SubmitButton loading={loading}>Continue</SubmitButton>
                      </div>
                    </Form>
                    <Label htmlFor="terms-2">
                      Already have an account?
                      <Link to={`/login`} className="underline text-amber-300">
                        Immediately Log in
                      </Link>
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}
