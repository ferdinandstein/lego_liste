<template>
    <v-row>
        <v-col cols="12">
            <v-text-field v-model="search" class="mb-4" label="Search for a brick by part number"
                placeholder="Enter a part number like 3001" required prepend-inner-icon="mdi-magnify" single-line
                :disabled="isLoading">
            </v-text-field>

            <v-btn size="large" color="rgba(50, 200, 200, 1)" @click="searchBrickClicked()" :disabled="isLoading">Search</v-btn>

            <v-chip v-if="partNotFound" class="mt-4" color="red" label>Part not found</v-chip>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import type { Part } from "@/model/Part";
import { useSearchBrick } from "@/service/SearchService";
import { defineEmits, ref } from "vue";

const search = ref<string>("");
const { isLoading, partNotFound, searchBrick } = useSearchBrick();

const emit = defineEmits<(event: "part-loaded", part: Part | undefined) => void>();

const searchBrickClicked = async () => {
  const part = await searchBrick(search.value);
  emit("part-loaded", part);
};
</script>
