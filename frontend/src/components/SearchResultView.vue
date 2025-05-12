<template>
    <div v-if="part" class="mb-4">
        <v-row>
            <v-col cols="12" md="6">
                <v-img :src="part.imageUrl" :alt="part.name" height="200" width="200"></v-img>
            </v-col>
            <v-col cols="12" md="6">
                <h2>{{ part.name }}</h2>
            </v-col>
            <v-list v-if="searchResult">
                <v-list-item v-for="setInfo in searchResult.setInfosWithColorQuantity" :key="setInfo.id">
                    <v-list-item-media>
                        <v-img :src="setInfo.imageUrl" :alt="setInfo.name"></v-img>
                    </v-list-item-media>
                    <h3>{{ setInfo.name }} - {{ setInfo.id }}</h3>
                    <v-list-item v-for="quantityPerColor in setInfo.quantityPerColor" :key="quantityPerColor.colorId">
                        <h4>
                            <strong class="text-grey-lighten-1">
                                {{ quantityPerColor.quantity }} in {{
                                    colors && colors[quantityPerColor.colorId] ? colors[quantityPerColor.colorId].name : quantityPerColor.colorId }}
                            </strong>
                        </h4>
                    </v-list-item>
                </v-list-item>
            </v-list>

        </v-row>

    </div>

    <v-expansion-panels variant="accordion">
        <v-expansion-panel v-for="color in colors ? Object.values(colors) : []" :key="color.name" :title="color.name" :text="color.rgb"
            :bg-color="convertHexToRgba(color.rgb)" :expand-icon="mdiToyBrick" :collapse-icon="mdiToyBrick">
        </v-expansion-panel>
    </v-expansion-panels>
</template>


<script setup lang="ts">
import { useColors } from "@/client/DatabaseApi";
import type { Part } from "@/model/Part";
import type { SearchResult } from "@/model/SearchResult";
import { convertHexToRgba } from "@/service/ColorService";
import { mdiToyBrick } from "@mdi/js";

defineProps<{
  part: Part | undefined;
  searchResult: SearchResult | undefined;
}>();

const { colors } = useColors();
</script>
