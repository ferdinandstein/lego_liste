<template>
    <div class="position-absolute top-0 left-0 rounded-lg pa-3 cursor-progress">
        <v-expansion-panels variant="accordion">
            <v-expansion-panel title="Add new Set" :collapse-icon="mdiPlusCircleOutline"
                :expand-icon="mdiPlusCircleOutline">
                <v-expansion-panel-text>
                    Enter a set number to add a new set to the database
                    <v-divider class="mb-3" />
                    <v-text-field class="mb-4 cursor-progress" placeholder="Enter a set number like 10220" single-line>
                    </v-text-field>
                    <v-btn href="https://rebrickable.com/parts/" class="cursor-wait" size="large"
                        color="rgba(50, 200, 200, 1)" @click="">Search
                    </v-btn>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script setup lang="ts">
import { mdiPlusCircleOutline } from "@mdi/js";
</script>