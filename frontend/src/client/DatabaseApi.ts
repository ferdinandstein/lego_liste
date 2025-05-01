import type { Color } from "@/model/Color"
import type { Part } from "@/model/Part"
import axios from "axios"
import { onMounted, ref } from "vue"

export const useColors = () => {
    const colors = ref<Color[]>()

    const fetchColors = async (): Promise<void> => {
        colors.value = (await axios.get("/lego_liste/database/colors.json")).data
    }

    onMounted(fetchColors)

    return {
        colors,
        fetchColors
    }
}

export const useParts = () => {
    const fetchPart = async (partId: string): Promise<Part> => {

        const partResponse = await axios.get(`/lego_liste/database/parts/${partId}.json`)

        if (partResponse.headers['content-type']?.includes('application/json')) {
            return partResponse.data as Part;
        } else {
            throw new Error("Response is not JSON");
        }
    }

    return {
        fetchPart
    }
}