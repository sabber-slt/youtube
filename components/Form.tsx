import { Input } from "@nextui-org/react";
import React from "react";
import { SubmitHandler, UseFormRegister } from "react-hook-form";
import { IoMdSearch } from "react-icons/io";

interface FormValues {
  // example field
  link: string;
}

type Props = {
  register: UseFormRegister<FormValues>;
  handleSubmit: SubmitHandler<FormValues>;
};

const Form = ({ register, handleSubmit }: Props) => {
  return (
    <div>
      <form
        onSubmit={handleSubmit as any}
        className="hstack"
        style={{
          direction: "ltr",
        }}
      >
        <input
          type="text"
          style={{
            direction: "ltr",
          }}
          placeholder="youtube.com"
          {...register}
          className="w-72 h-12 bg-secondary text-zinc-200 px-3 rounded-l-xl overflow-hidden outline-none border-none"
        />
        <button
          type="submit"
          className="pointer-events-none center bg-secondary rounded-r-xl w-14 h-12"
        >
          <IoMdSearch className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default Form;
