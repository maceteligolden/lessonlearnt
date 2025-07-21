import { useReducer } from "react";
import { UploadState, UploadAction } from "@/types";

const initialState: UploadState = {
  loading: false,
  response: null,
  error: null,
};

function reducer(state: UploadState, action: UploadAction): UploadState {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, loading: true, response: null, error: null };
    case "SET_RESPONSE":
      return { ...state, loading: false, response: action.payload };
    case "SET_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export const useUploadReducer = () => useReducer(reducer, initialState);
