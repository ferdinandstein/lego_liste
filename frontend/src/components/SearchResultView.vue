<template>
    <div v-if="part" class="mb-4">
        <v-row>
            <v-col cols="12" md="6">
                <v-img class="cursor-move" :src="part.imageUrl" :alt="part.name" height="200" width="200"></v-img>
            </v-col>
            <v-col cols="12" md="6">
                <h2>{{ part.name }}</h2>
            </v-col>
            <v-list v-if="searchResult">
                <v-list-item v-for="setInfo in searchResult.setInfosWithColorQuantity" :key="setInfo.id">
                    <v-list-item-media>
                        <v-img class="cursor-move" :src="setInfo.imageUrl" :alt="setInfo.name"></v-img>
                    </v-list-item-media>
                    <h3>{{ setInfo.name }} - {{ setInfo.id }}</h3>
                    <v-list-item v-for="quantityPerColor in setInfo.quantityPerColor" :key="quantityPerColor.colorId">
                        <v-chip class="cursor-help" variant="elevated" v-if="colors && colors[quantityPerColor.colorId]"
                            :color="convertHexToRgba(colors[quantityPerColor.colorId].rgb)">
                            {{ quantityPerColor.quantity }} in {{ colors[quantityPerColor.colorId].name }}
                        </v-chip>
                    </v-list-item>
                    <v-divider class="mb-10"></v-divider>
                </v-list-item>
            </v-list>

        </v-row>
    </div>
</template>


<script setup lang="ts">
import { useColors } from "@/client/DatabaseApi";
import type { Part } from "@/model/Part";
import type { SearchResult } from "@/model/SearchResult";
import { convertHexToRgba } from "@/service/ColorService";

defineProps<{
    part: Part | undefined;
    searchResult: SearchResult | undefined;
}>();

const { colors } = useColors();
</script>
