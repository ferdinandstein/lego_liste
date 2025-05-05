<template>
    <div v-if="part" class="mb-4">
        <v-row>
            <v-col cols="12" md="6">
                <v-img :src="part.imageUrl" :alt="part.name" height="200" width="200"></v-img>
            </v-col>
            <v-col cols="12" md="6">
                <h2>{{ part.name }}</h2>
            </v-col>
            <v-list>
                <v-list-item v-for="setInfo in setInfos" :key="setInfo.id">
                    <v-list-item-media>
                        <v-img :src="setInfo.imageUrl" :alt="setInfo.name"></v-img>
                    </v-list-item-media>
                    <v-list-item-title>{{ setInfo.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ setInfo.id }}</v-list-item-subtitle>
                </v-list-item>
            </v-list>

        </v-row>

    </div>

    <v-expansion-panels variant="accordion">
        <v-expansion-panel v-for="color in colors" :key="color.name" :title="color.name" :text="color.rgb"
            :bg-color="convertHexToRgba(color.rgb)" :expand-icon="mdiToyBrick">
        </v-expansion-panel>
    </v-expansion-panels>
</template>


<script setup lang="ts">
import { useColors } from "@/client/DatabaseApi";
import type { Part } from "@/model/Part";
import type { SetInfo } from "@/model/SetInfo";
import { convertHexToRgba } from "@/service/ColorService";
import { mdiToyBrick } from "@mdi/js";

defineProps<{
  part: Part | undefined;
  setInfos: SetInfo[];
}>();

const { colors } = useColors();
</script>