import { Input } from "@nextui-org/react";
import React from "react";
import { useForm } from "react-hook-form";
import { IoMdSearch } from "react-icons/io";

type Props = {
  register: any;
  handleSubmit: any;
};

const Form = ({ register, handleSubmit }: Props) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          style={{
            direction: "ltr",
          }}
          placeholder="youtube.com"
          {...register}
          labelPlacement="outside"
          className="w-80"
          variant="faded"
          startContent={
            <button
              type="submit"
              className="pointer-events-none flex items-center"
            >
              <IoMdSearch className="w-5 h-5" />
            </button>
          }
        />
      </form>
    </div>
  );
};

export default Form;
