<template>
    <div class="position-absolute top-0 left-0 rounded-lg pa-3 cursor-progress">
        <v-expansion-panels variant="accordion">
            <v-expansion-panel title="Statistics" class="elevation-4">
                <v-expansion-panel-text>
                    Here are some statistics about my Lego sets and parts:
                    <v-divider class="mb-3" />
                    <div class="mb-2">Unique Sets: {{ statistics.uniqueSets }}</div>
                    <div class="mb-2">Total Sets: {{ statistics.totalSets }}</div>
                    <div class="mb-2">Non-Model Parts: {{ statistics.NonModelParts }}</div>
                    <div class="mb-2">Non-Lego Parts: {{ statistics.NonLegoParts }}</div>
                    <div class="mb-2">Total Database Parts: {{ statistics.totalDatabaseParts }}</div>
                    <div class="mb-2">Total Lego Parts: {{ statistics.totalLegoParts }}</div>
                    <div class="mb-2">Total Parts: {{ statistics.totalParts }}</div>


                    <v-btn href="https://rebrickable.com/parts/" class="cursor-wait" size="large"
                        color="rgba(50, 200, 200, 1)" @click="">Search Parts on Rebrickable
                    </v-btn>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Reactive variable to store the statistics
const statistics = ref({
    uniqueSets: 0,
    totalSets: 0,
    NonModelParts: 0,
    NonLegoParts: 0,
    totalDatabaseParts: 0,
    totalLegoParts: 0,
    totalParts: 0,
});


// Load the JSON file when the component is mounted
onMounted(async () => {
    const response = await fetch('lego_liste/database/statistics.json'); // Relative to the public folder
    statistics.value = await response.json();
});

</script>
