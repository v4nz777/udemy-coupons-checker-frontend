<script setup lang="ts">
    import PasteIcon from './icons/PasteIcon.vue';
    import HeaderArea from './HeaderArea.vue';
    import { ref,reactive, onMounted, watch } from 'vue';
    const props = defineProps({
        scraping:Boolean,
        couponsCount: Number,
        couponsResolvedCount: Number,
        totalFree: Number,
        done:Boolean,
        timelapse: Number,
        totalSkipped:Number,
        fastMode:Boolean,
    })
    const textAreaField = ref("")
    const linksList = ref([] as Array<string>)

    const emits = defineEmits(["change", "reset", "toggle"])
    const style = reactive({height: 'max-content'})
    // const fastModeToggle = ref(true)

    const calculateHeight = (value:string)=> {
        const numberOfLineBreaks = (value.match(/\n/g) || []).length;
        // min-height + lines x line-height + padding + border
        const newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
        return {newHeight,numberOfLineBreaks};
    }

    const linksStringToArray = (value:string)=> {
        return value.split(/\n/g)
    }

    // Watch for changes in the textarea and update List.
    watch(()=>textAreaField.value,(newVal:string,oldVal:string)=> {
        const {newHeight} = calculateHeight(newVal)
        style.height = newHeight + 'px'
        linksList.value = [...linksStringToArray(newVal)].filter(item => item.trim() !== "");
        
    })

    const startScraping = ()=> {
        emits('change',linksList.value)
    }

    const reset = () => {
        localStorage.setItem("input",textAreaField.value)
        textAreaField.value = ""
        emits("reset")
    }

    const loadLatestEntry = ()=> {
        textAreaField.value = localStorage.getItem("input")??''
    }

    const pasteFromClipboard = ()=> {
        navigator.clipboard.readText().then(cliptext =>(textAreaField.value = cliptext));
    }


</script>

<template>
    <div class="bg-white shadow-lg pb-5 h-max w-screen fixed top-0 z-40">
        <HeaderArea />
        
        <div class="flex mx-5 flex-col gap-4 px-24" v-if="!done && !scraping">
            <p class="w-full text-center text-sm font-bold">Paste Udemy links</p>
            <div class="border border-black p-2 w-full self-center">
                <textarea class="text-xs focus-within:outline-none text-sky-500 w-full h-96" v-model="textAreaField" autofocus>
                </textarea>
            </div>
            <div class="flex gap-2 w-full justify-between">
                <div class="flex gap-2 w-full justify-start">
                    <button class="w-max p-1 text-white bg-gray-500 text-xs hover:bg-gray-600" @click="loadLatestEntry">Load last entry</button>
                    <button class="w-max p-1 text-white bg-gray-500 text-xs hover:bg-gray-600" @click="pasteFromClipboard">Paste from clipboard</button>
                </div>
                <div class="flex gap-2 w-full justify-end">
                    <span class="ml-3 text-sm font-medium text-gray-900">Fast Mode</span>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" class="sr-only peer outline-none" :checked="fastMode" @change="emits('toggle',!fastMode)">
                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                            peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 rounded-full peer 
                            dark:bg-gray-500 peer-checked:after:translate-x-full peer-checked:after:border-white 
                            after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white
                            after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                            dark:border-gray-400 peer-checked:bg-yellow-600">
                        </div>
                        
                    </label>

                     
                </div>
                
            </div>
        </div>
        <div class="w-full flex flex-col items-center py-2">
            <button v-if="done" class="flex items-center gap-2 text-white shadow-lg bg-gray-500 hover:bg-gray-600 font-bold p-2"
                @click="reset">
                <span>New</span>
            </button>
            <button v-else class="flex items-center gap-2 text-white shadow-lg bg-black font-bold p-2"
                :class="scraping?'cursor-not-allowed':'cursor-pointer'"
                @click="startScraping" :disabled="scraping">
                <span v-if="scraping" class="inline-block w-4 h-4 rounded-full border-gray-500 border-b-white border-2 animate-spin"></span>
                <span>{{scraping?`Scraping ${couponsResolvedCount}/${couponsCount}`:'Scrape'}}</span>
            </button>
            <div class="flex items-center justify-center gap-5 border-t my-2 md:w-1/2 w-full" v-if="done">
                <span class="text-sm">Free: <span class="font-bold">{{ `${totalFree??0}` }}</span></span>
                <span class="text-sm">Skipped: <span class="font-bold">{{ `${totalSkipped??0}` }}</span></span>
                <span class="text-sm">Total: <span class="font-bold">{{ `${couponsResolvedCount}` }}</span></span>
                <span class="text-sm">Elapsed: <span class="font-bold">{{ `${timelapse}s` }}</span></span>
            </div>
        </div>
    </div>
</template>