<template>
    <div class="position-fixed top-0 right-0 rounded-lg pa-3">
        <v-expansion-panels variant="accordion">
            <v-expansion-panel title="Add new Set" :collapse-icon="mdiPlusCircleOutline"
                :expand-icon="mdiPlusCircleOutline">
                <v-expansion-panel-text>
                    Enter a set number to add a new set to the database
                    <v-divider class="mb-3" />
                    <v-text-field class="mb-4" placeholder="Enter a set number like 10220" single-line>
                    </v-text-field>
                    <v-btn size="large" color="rgba(50, 200, 200, 1)" @click="">Search
                    </v-btn>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script setup lang="ts">
import { mdiPlusCircleOutline } from "@mdi/js";
</script>