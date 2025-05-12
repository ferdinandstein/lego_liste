import { useParts, useSetInfos } from "@/client/DatabaseApi";
import type { Part } from "@/model/Part";
import type { PartColorQuantity } from "@/model/PartColorQuantity";
import type { SearchResult } from "@/model/SearchResult";
import type { SetInfo } from "@/model/SetInfo";
import type { SetInfoWithColorQuantity } from "@/model/SetInfoWithColorQuantity";
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
  const currentPart = ref<Part | undefined>(undefined);
  const searchResult = ref<SearchResult | undefined>(undefined);

  const setInfoStore = useSetInfoStore();
  const { fetchSetInfo } = useSetInfos();

  const loadPartResults = async (part: Part) => {
    const setInfos = await loadSetInfos(part);
    const setInfosWithColorQuantity = loadColorQuantityPerSet(setInfos, part);
    const quantityPerColor = loadColorQuantity(setInfosWithColorQuantity);

    currentPart.value = part;
    searchResult.value = {
      quantityPerColor: quantityPerColor,
      setInfosWithColorQuantity: setInfosWithColorQuantity,
    } as SearchResult;
  };

  return {
    currentPart,
    searchResult,
    loadPartResults,
  };

  function loadColorQuantity(setInfosWithColorQuantity: SetInfoWithColorQuantity[]) {
    const quantityPerColorSet: Record<number, number> = {};
    for (const setInfoWithColorQuantity of setInfosWithColorQuantity) {
      for (const partColorQuantity of setInfoWithColorQuantity.quantityPerColor) {
        const colorId = partColorQuantity.colorId;
        if (quantityPerColorSet[colorId]) {
          quantityPerColorSet[colorId] += partColorQuantity.quantity;
        } else {
          quantityPerColorSet[colorId] = partColorQuantity.quantity;
        }
      }
    }

    return Object.entries(quantityPerColorSet).map(
      ([colorId, quantity]) =>
        ({
          colorId: Number(colorId),
          quantity,
        }) as PartColorQuantity,
    );
  }

  function loadColorQuantityPerSet(setInfos: SetInfo[], part: Part) {
    return setInfos.map((setInfo) => {
      return {
        id: setInfo.id,
        quantity: setInfo.quantity,
        name: setInfo.name,
        year: setInfo.year,
        imageUrl: setInfo.imageUrl,
        quantityPerColor: setInfo.parts[part.id] || [],
      } as SetInfoWithColorQuantity;
    });
  }

  async function loadSetInfos(part: Part) {
    const setInfos: SetInfo[] = [];
    for (const setId of part.setIds) {
      const setInfoFromCache = setInfoStore.getSetInfo(setId);

      // use setInfo from cache if available
      if (setInfoFromCache) {
        setInfos.push(setInfoFromCache);
        continue;
      }

      // if not in cache, fetch from API
      try {
        const setInfo = await fetchSetInfo(setId);
        setInfos.push(setInfo);
        setInfoStore.addSetInfo(setId, setInfo);
      } catch (error) {
        console.error(`Error fetching set info for ${setId}:`, error);
      }
    }

    return setInfos;
  }
};
