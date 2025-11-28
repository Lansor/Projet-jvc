import React, { useState } from 'react'
import Input from '../../../components/Form';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    identifier: "",
    password: "",
  });


const [errors, setErrors] = useState({
    identifier: "",
    password: "",
    request: "",
  });


  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors({
      identifier: "",
      password: "",
      request: "",
    });

    const newErrors = {};

    if (!data.identifier) {
      newErrors.identifier = "Le nom d'utilisateur n'est pas valide";
    }

    if (!data.password) {
      newErrors.password = "Le mot de passe n'est pas valide";
    }

    if (newErrors.identifier || newErrors.password) {
      setErrors(newErrors);
      return;
    }

 const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

 return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white text-center">Sign In</h1>
      <form
        className="mt-8 max-w-lg flex flex-col gap-2 mx-auto w-full"
        onSubmit={handleSubmit}
      >
        <Input
          id={"identifier"}
          type={"text"}
          label={"Identifier (email/username)"}
          onChange={handleChange}
          value={data.identifier}
          placeholder={"Enter your email or username"}
          errorMessage={errors?.identifier || ""}
        />
        <Input
          id={"password"}
          type={"password"}
          label={"Password"}
          onChange={handleChange}
          value={data.password}
          placeholder={"********"}
          errorMessage={errors?.password || ""}
        />
        {errors?.request && (
          <p className="mt-4 text-lg !text-red-600 text-center">
            {errors?.request}
          </p>
        )}
        <button
          type={"submit"}
          className={`px-4 py-2 font-bold bg-blue-600 rounded-md mt-4`}
        >
          Login to my account
        </button>
      </form>
      <Link
        to={"/auth/sign-up"}
        className="text-white/75 text-bold mt-4 w-fit mx-auto underline"
      >
        I don't have an account
      </Link>
    </div>
  );
}}

export default SignIn

