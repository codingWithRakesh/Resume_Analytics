import { create } from "zustand";
import api from "../api/api";

const useResumeStore = create((set) => ({
    loading: false,
    error: null,
    resumeData: null,
    parseResume: async (resumeFile) => {
        set({ loading: true, error: null, resumeData: null });
        try {
            const formData = new FormData();
            formData.append("resume", resumeFile);
            const response = await api.patch("/api/v1/resume/parse", formData);
            if (response.status === 200) {
                set({ resumeData: response.data });
            } else {
                set({ error: "Failed to parse resume" });
            }
        } catch (error) {
            set({ error: error.message, resumeData: null });
        } finally {
            set({ loading: false });
        }
    },
    isResumeUploaded: false,
    checkResumeUpload: async () => {
        set({ loading: true, error: null, isResumeUploaded: false });
        try {
            const response = await api.get("/api/v1/resume/check");
            if (response.status === 200) {
                set({ isResumeUploaded: response.data.isUploaded });
            } else {
                set({ error: "Failed to check resume upload status" });
            }
        } catch (error) {
            set({ error: error.message, isResumeUploaded: false });
        } finally {
            set({ loading: false });
        }
    }
}));

export default useResumeStore;