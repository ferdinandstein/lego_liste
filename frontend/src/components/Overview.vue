<template>
  <div class="position-absolute top-0 right-0 rounded-lg pa-3">
    <v-expansion-panels variant="accordion">
      <v-expansion-panel title="General infos for Part">
        <v-expansion-panel-text v-if="searchResult">
          <v-list-item v-for="quantityPerColor in searchResult.quantityPerColor"
                       :key="quantityPerColor.colorId">
            <h4>
              <strong class="text-grey-lighten-1">
                {{ quantityPerColor.quantity }} in {{ quantityPerColor.colorId }}
              </strong>
            </h4>
          </v-list-item>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup lang="ts">
import type { SearchResult } from "@/model/SearchResult";

defineProps<{
  searchResult: SearchResult | undefined;
}>();
</script>
