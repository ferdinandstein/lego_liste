import { ref } from "vue";
import type { Part } from "@/model/Part";
import type { SetInfo } from "@/model/SetInfo";
import { useParts, useSetInfos } from "@/client/DatabaseApi";

export const useSearchBrick = () => {
  const { fetchPart } = useParts();

  const isLoading = ref<boolean>(false);
  const partNotFound = ref<boolean>(false);

  const searchBrick = async (partNumber: string): Promise<Part | undefined> => {
    isLoading.value = true;
    partNotFound.value = false;

    try {
      return await fetchPart(partNumber);
    } catch (error) {
      partNotFound.value = true;
      return undefined;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    partNotFound,
    searchBrick
  };
};

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
