import { useParts, useSetInfos } from "@/client/DatabaseApi";
import type { Part } from "@/model/Part";
import type { SetInfo } from "@/model/SetInfo";
import { usePartStore } from "@/stores/partStore";
import { ref } from "vue";

export const useSearchBrick = () => {
  const { fetchPart } = useParts();
  const partStore = usePartStore();

  const isLoading = ref<boolean>(false);
  const partNotFound = ref<boolean>(false);

  const searchBrick = async (partNumber: string): Promise<Part | undefined> => {
    isLoading.value = true;
    partNotFound.value = false;

    try {
      // Check if the part is already in the cache
      if (partStore.hasPart(partNumber)) {
        return partStore.getPart(partNumber);
      }

      // If not in cache, fetch from API
      const part = await fetchPart(partNumber);

      // Store in cache for future use
      partStore.addPart(partNumber, part);

      return part;
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
    searchBrick,
  };
};

export const useSearchResults = () => {
  const { fetchSetInfo } = useSetInfos();

  const currentPart = ref<Part | undefined>(undefined);
  const setInfos = ref<SetInfo[]>([]);

  const loadPartResults = async (part: Part) => {
    currentPart.value = part;

    setInfos.value = [];
    for (const setId of part.setIds) {
      fetchSetInfo(setId).then((setInfo) => {
        setInfos.value.push(setInfo);
      });
    }
  };

  return {
    currentPart,
    setInfos,
    loadPartResults,
  };
};
