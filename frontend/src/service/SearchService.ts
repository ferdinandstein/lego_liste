import { ref } from "vue";
import type { Part } from "@/model/Part";
import type { SetInfo } from "@/model/SetInfo";
import { useSetInfos } from "@/client/DatabaseApi";

export const useSearchResults = () => {
  const { fetchSetInfo } = useSetInfos();

  const currentPart = ref<Part | undefined>(undefined);
  const setInfos = ref<SetInfo[]>([]);

  const loadPartResults = async (part: Part) => {
    currentPart.value = part;

    if (part) {
      setInfos.value = [];
      for (const setId of part.setIds) {
        fetchSetInfo(setId).then((setInfo) => {
          setInfos.value.push(setInfo);
        });
      }
    } else {
      setInfos.value = [];
    }
  };

  return {
    currentPart,
    setInfos,
    loadPartResults
  };
};
