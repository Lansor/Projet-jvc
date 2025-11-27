import React, { useState } from "react";
import Input from "../../../components/Form/Input";
import Button from "../../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { apiService } from "../../../main";
import { useAppStore } from "../../../stores/app.store";

const SignIn = () => {
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
};