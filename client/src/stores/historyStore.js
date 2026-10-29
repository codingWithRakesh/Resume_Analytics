import { create } from "zustand";
import api from "../api/api";

const useHistoryStore = create((set) => ({
    history: [],
}));

export default useHistoryStore;