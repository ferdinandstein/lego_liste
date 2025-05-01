<template>
    <v-row>
        <v-col cols="12">
            <v-text-field v-model="search" class="mb-4" label="Search for a brick by part number"
                placeholder="Enter a part number like 3001" required prepend-inner-icon="mdi-magnify" single-line
                :disabled="isLoading">
            </v-text-field>

            <v-btn size="large" color="rgba(50, 200, 200, 1)" @click="searchBrick()" :disabled="isLoading">Search - {{
                zahl }}</v-btn>

            <v-chip v-if="partNotFound" class="mt-4" color="red" label>Part not found</v-chip>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { useParts } from "@/client/DatabaseApi";
import type { Part } from "@/model/Part";
import { ref, defineEmits } from "vue"

const search = ref<string>("")
const zahl = ref<number>(0)
const isLoading = ref<boolean>(false)
const partNotFound = ref<boolean>(false)

const { fetchPart } = useParts()

const emit = defineEmits<{
    (event: "part-loaded", part: Part | undefined): void
}>()

const searchBrick = async () => {
    isLoading.value = true
    partNotFound.value = false
    zahl.value++

    try {
        const part = await fetchPart(search.value)
        emit("part-loaded", part)
    } catch (error) {
        partNotFound.value = true
        emit("part-loaded", undefined)
    } finally {
        isLoading.value = false
    }
}
</script>
