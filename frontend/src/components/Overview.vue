<template>
  <div class="position-absolute top-0 right-0 rounded-lg pa-3">
    <v-expansion-panels variant="accordion">
      <v-expansion-panel title="General infos for Part">
        <v-expansion-panel-text v-if="searchResult">
          <v-list-item v-for="quantityPerColor in searchResult.quantityPerColor"
                       :key="quantityPerColor.colorId">
            <v-chip v-if="colors && colors[quantityPerColor.colorId]"
                    :color="convertHexToRgba(colors[quantityPerColor.colorId].rgb)">
              {{ colors[quantityPerColor.colorId].name }} ({{ quantityPerColor.quantity }})
            </v-chip>
          </v-list-item>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup lang="ts">
import { useColors } from "@/client/DatabaseApi.ts";
import type { SearchResult } from "@/model/SearchResult";
import { convertHexToRgba } from "@/service/ColorService.ts";

defineProps<{
  searchResult: SearchResult | undefined;
}>();

const { colors } = useColors();
</script>
