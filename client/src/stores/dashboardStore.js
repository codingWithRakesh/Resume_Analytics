import { create } from "zustand";
import api from "../api/api";

const useDashboardStore = create((set) => ({
    message: null,
    isLoading: false,
    error: null,
    interviewCount: 0,
    fetchInterviewCount: async () => {
        set({ isLoading: true, error: null, interviewCount: 0 });
        try {
            const response = await api.get("/api/v1/dashboard/interview-count");
            if (response.status === 200) {
                set({ interviewCount: response.data });
            } else {
                set({ error: "Failed to fetch interview count" });
            }
        } catch (error) {
            set({ error: error.message, interviewCount: 0 });
        } finally {
            set({ isLoading: false });
        }
    },
    averageInterviewScore: 0,
    fetchAverageInterviewScore: async () => {
        set({ isLoading: true, error: null, averageInterviewScore: 0 });
        try {
            const response = await api.get("/api/v1/dashboard/average-interview-score");
            if (response.status === 200) {
                set({ averageInterviewScore: response.data });
            } else {
                set({ error: "Failed to fetch average interview score"});
            }
        } catch (error) {
            set({ error: error.message, averageInterviewScore: 0 });
        } finally {
            set({ isLoading: false });
        }
    },
    strikeCount: 0,
    fetchStrikeCount: async () => {
        set({ isLoading: true, error: null, strikeCount: 0 });
        try {
            const response = await api.get("/api/v1/dashboard/strike-count-update");
            if (response.status === 200) {
                set({ strikeCount: response.data });
            } else {
                set({ error: "Failed to fetch strike count" });
            }
        } catch (error) {
            set({ error: error.message, strikeCount: 0 });
        } finally {
            set({ isLoading: false });
        }
    },
    atsScore: 0,
    fetchATSScore: async () => {
        set({ isLoading: true, error: null, atsScore: 0 });
        try {
            const response = await api.get("/api/v1/dashboard/ats-score");
            if (response.status === 200) {
                set({ atsScore: response.data });
            } else {
                set({ error: "Failed to fetch ATS score" });
            }
        } catch (error) {
            set({ error: error.message, atsScore: 0 });
        } finally {
            set({ isLoading: false });
        }
    }
}));

export default useDashboardStore;