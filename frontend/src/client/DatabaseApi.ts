import type { Color } from "@/model/Color"
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