<template>
  <div class="position-absolute top-0 right-0 rounded-lg pa-3">
    <v-expansion-panels variant="accordion">
      <v-expansion-panel class="cursor-not-allowed" title="General infos for Part">
        <v-expansion-panel-text v-if="searchResult">
          <v-list-item v-for="quantityPerColor in searchResult.quantityPerColor" :key="quantityPerColor.colorId">
            <v-chip variant="elevated" v-if="colors && colors[quantityPerColor.colorId]"
              :color="convertHexToRgba(colors[quantityPerColor.colorId].rgb)">
              {{ quantityPerColor.quantity }} in {{ colors[quantityPerColor.colorId].name }}
            </v-chip>
          </v-list-item>
          <v-chip>
            {{ totalQuantity }} insgesamt
          </v-chip>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup lang="ts">
import { useColors } from "@/client/DatabaseApi.ts";
import type { SearchResult } from "@/model/SearchResult";
import { convertHexToRgba } from "@/service/ColorService.ts";
import { computed } from "vue";

const props = defineProps<{
  searchResult: SearchResult | undefined;
}>();

const { colors } = useColors();

const totalQuantity = computed(() => props.searchResult?.quantityPerColor?.reduce((a, b) => a + b.quantity, 0) || 0);
</script>
