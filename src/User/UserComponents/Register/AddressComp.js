import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import AsyncSelect from "react-select/async";

const AddressComp = () => {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (newValue) => {
    console.log(newValue, "inputchnage");
    setInputValue(newValue);
  };

  let cancelToken;
  const { refetch: refetchOptions, data } = useQuery(
    ["addressOptions"],
    () => {
      if (cancelToken) {
        cancelToken.cancel("Operation cancelled");
      }
      cancelToken = axios.CancelToken.source();
      return axios.get(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${inputValue}&apiKey=de8c9ba6d4a54eceb1ef0ed99adfd435`,
        { cancelToken: cancelToken.token }
      );
    },
    {
      onSuccess: (data) => {
        console.log(data.data.features);
      },
    },
    { enabled: false }
  );

  const loadOptions = (inputValue, callback) => {
    console.log(inputValue, "loadoptions");
    if (inputValue.length >= 3) {
      console.log(inputValue.length);
      refetchOptions();
      return data;
    }
    // return;
    // axios.get
  };
  return (
    <AsyncSelect
      cacheOptions
      tabSelectsValue
      loadOptions={loadOptions}
      defaultOptions
      onInputChange={handleInputChange}
    />
  );
};

export default AddressComp;
