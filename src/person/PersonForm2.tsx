import React, { useState } from "react";
import { useInput } from "./useInput";

export const PersonForm2 = () => {
  const initialState = {
    persons: [] as Array<{ firstName: string; lastName: string }>,
    loading: false,
  };

  const [persons, setPersons] = useState(initialState);

  const {
    value: firstNameValue,
    reset: resetFirstName,
    Input: InputFirstName,
  } = useInput("John");

  const {
    value: lastNameValue,
    reset: resetLastName,
    Input: InputLastName,
  } = useInput("Doe");

  const handleReset = () => {
    resetFirstName();
    resetLastName();
    setPersons(initialState);
  };

  const handleAdd = () => {
    setPersons((pv) => ({
      ...pv,
      persons: pv.persons.concat({
        firstName: firstNameValue,
        lastName: lastNameValue,
      }),
    }));
  };

  return (
    <>
      <InputFirstName id="firstName" name="firstName" />
      <InputLastName id="lastName" name="lastName" />
      <button type="button" onClick={handleAdd}>
        Add
      </button>
      <button type="button" onClick={handleReset}>
        Reset
      </button>
      {persons.persons.map((p) => (
        <p>
          {p.firstName} {p.lastName}
        </p>
      ))}
    </>
  );
};
