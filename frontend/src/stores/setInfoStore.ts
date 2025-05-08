import type { SetInfo } from "@/model/SetInfo";
import { defineStore } from "pinia";

export const useSetInfoStore = defineStore("setInfo", {
    state: () => ({
        setInfos: {} as Record<number, SetInfo>,
    }),
    actions: {
        addSetInfo(setNumber: number, setInfo: SetInfo) {
            this.setInfos[setNumber] = setInfo;
        },
        getSetInfo(setNumber: number): SetInfo | undefined {
            return this.setInfos[setNumber];
        },
        hasSetInfo(setNumber: number): boolean {
            return setNumber in this.setInfos;
        },
    },
});
