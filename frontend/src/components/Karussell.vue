<template>
    <v-carousel v-if="searchResult" :continuous="false" :show-arrows="true" :delimiter-icon="mdiToyBrick" height="1000">
        <v-carousel-item v-for="setInfo in searchResult.setInfosWithColorQuantity" :key="setInfo.id"
            reverse-transition="fade-transition" transition="fade-transition">
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
        </v-carousel-item>
    </v-carousel>
</template>



<script setup lang="ts">
import { mdiToyBrick } from "@mdi/js";
import { useColors } from "@/client/DatabaseApi.ts";
import type { SearchResult } from "@/model/SearchResult";
import { convertHexToRgba } from "@/service/ColorService.ts";

defineProps<{
    searchResult: SearchResult | undefined;
}>();

const { colors } = useColors();
</script>