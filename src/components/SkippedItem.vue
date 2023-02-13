<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import NewTab from './icons/NewTab.vue'
    import moment from 'moment';
    
    const props = defineProps({
        item:Object,
        itemNum:Number,
    })

    const expiration = ref("")
    const hovered = ref(false)

    const shortenName = (name:string, limit:number=20)=> {
        const exact = name.length <= limit
        return `${name.substring(0,limit)}${!exact?'...':''}`
    }
    

</script>

<template>
    <div class="border my-1 bg-white flex justify-between items-center p-2 gap-10 " @mouseover="hovered = true" @mouseout="hovered=false"
        :class="hovered?'shadow-lg scale-y-110 transform-gpu':''">
        <div class="flex gap-1 w-max items-center justify-between">
            <span class="p-1 shadow font-bold text-xs bg-gray-200 w-6 flex justify-center">
                {{ itemNum }}
            </span>
            <span class="shadow font-bold text-xs bg-gray-200 px-1">Skipped</span>
            <span class="text-xs font-thin text-gray-500">Reason: {{ item?.reason }}</span>

        </div>

        <div class="flex gap-2 w-max items-center justify-end">
            <span class="p-1 shadow font-bold text-xs bg-gray-200">
                {{ shortenName(item?.course, 40) }}
            </span>
            <a :href="item?.url" target="_blank" rel="noopener noreferrer" class="w-max h-max">
                <i class="w-2 h-2"><NewTab/></i>
            </a>
        </div>

    </div>
    
</template>
