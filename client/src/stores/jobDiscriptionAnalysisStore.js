import { create } from "zustand";
import api from "../api/api";

const useJobDescriptionAnalysisStore = create((set) => ({
    loading: false,
    error: null,
    analysisResult: null,
    analyzeJobDescription: async (jobDescription) => {
        set({ loading: true, error: null, analysisResult: null });
        try {
            const response = await api.post("/api/v1/job-description-analysis/get-job-description-analysis", { jobDescription });
            if (response.status === 200) {
                set({ analysisResult: response.data });
            } else {
                set({ error: "Failed to analyze job description" });
            }
        } catch (error) {
            set({ error: error.message, analysisResult: null });
        } finally {
            set({ loading: false });
        }
    }
}))

export default useJobDescriptionAnalysisStore;