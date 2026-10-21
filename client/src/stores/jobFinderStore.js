import { create } from "zustand";
import api from "../api/api";

const useJobFinderStore = create((set) => ({
    loading: false,
    error: null,
    jobResults: [],
    findJobs: async () => {
        set({ loading: true, error: null, jobResults: [] });
        try {
            const response = await api.post(`/api/v1/job-finder/find-jobs`);
            if (response.status === 200) {
                set({ jobResults: response.data });
            } else {
                set({ error: "Failed to find jobs" });
            }
        } catch (error) {
            set({ error: error.message, jobResults : [] });
        } finally {
            set({ loading: false });
        }
    }
}))

export default useJobFinderStore;