import { useParts, useSetInfos } from "@/client/DatabaseApi";
import type { Part } from "@/model/Part";
import type { SetInfo } from "@/model/SetInfo";
import { usePartStore } from "@/stores/partStore";
import { useSetInfoStore } from "@/stores/setInfoStore";
import { ref } from "vue";

export const useSearchBrick = () => {
  const { fetchPart } = useParts();
  const partStore = usePartStore();

  const isLoading = ref<boolean>(false);
  const partNotFound = ref<boolean>(false);
  const searchCounter = ref<number>(0);

  const searchBrick = async (partNumber: string): Promise<Part | undefined> => {
    isLoading.value = true;
    partNotFound.value = false;
    searchCounter.value += 1;

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
    searchCounter,
    searchBrick,
  };
};

export const useSearchResults = () => {
  const { fetchSetInfo } = useSetInfos();

  const currentPart = ref<Part | undefined>(undefined);
  const setInfos = ref<SetInfo[]>([]);

  const loadPartResults = async (part: Part) => {
    currentPart.value = part;
    const setInfoStore = useSetInfoStore();

    setInfos.value = [];
    for (const setId of part.setIds) {
      const setInfoFromCache = setInfoStore.getSetInfo(setId);

      // use setInfo from cache if available
      if (setInfoFromCache) {
        setInfos.value.push(setInfoFromCache);
        continue;
      }

      // if not in cache, fetch from API
      fetchSetInfo(setId)
        .then((setInfo) => {
          setInfos.value.push(setInfo);
          setInfoStore.addSetInfo(setId, setInfo);
        })
        .catch((error) => {
          console.error(`Error fetching set info for ${setId}:`, error);
        });
    }
  };

  return {
    currentPart,
    setInfos,
    loadPartResults,
  };
};
