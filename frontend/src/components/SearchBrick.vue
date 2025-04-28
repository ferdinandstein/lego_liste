<template>
    <v-row>
        <v-col cols="12">
            <v-text-field v-model="search" class="mb-4" label="Search for a brick by part number"
                placeholder="Enter a part number like 3001" required prepend-inner-icon="mdi-magnify" single-line>
            </v-text-field>

            <v-btn size="large" color="rgba(50, 200, 200, 1)" @click="searchBrick()">Search - {{ zahl }}</v-btn>

        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"

const search = ref<string>("")
const zahl = ref<number>(0)


const searchBrick = async () => {
    console.log("Searching for brick with part number: ", search.value)
    zahl.value++
}
</script>
