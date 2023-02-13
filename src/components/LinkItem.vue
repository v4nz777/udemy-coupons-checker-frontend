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
    
    onMounted(() => {
        const exp = moment(props.item?.coupon_details.price_text.data.pricing_result.campaign.end_time)
        expiration.value = exp.fromNow()
    })


</script>

<template>
    <div class="border my-1 bg-white flex justify-between items-center p-2 gap-10 " @mouseover="hovered = true" @mouseout="hovered=false"
        :class="hovered?'shadow-lg scale-y-110 transform-gpu':''">
        <div class="flex gap-1 w-max items-center justify-between">
            <span class="p-1 shadow font-bold text-xs bg-gray-200 w-6 flex justify-center">
                {{ itemNum }}
            </span>
            
            <div v-if="item?.free" class="flex gap-3">
                <span class="p-1 shadow font-bold text-xs bg-green-100 text-green-500">
                    {{ item?.coupon }}
                </span>
                <div class="flex md:flex-row flex-col">
                    <span class="text font-bold text-green-500">Free</span>
                    <span class="p-1 font-thin text-xs line-through">
                        {{ `${item?.details.price_detail.currency_symbol} ${item?.details.price_detail.amount}` }} 
                    </span>
                </div>
                
                <span class="p-1 shadow font-thin text-xs bg-gray-100">
                    {{ `${item?.coupon_details.price_text.data.pricing_result.campaign.uses_remaining}/${item?.coupon_details.price_text.data.pricing_result.campaign.maximum_uses} pcs` }} 
                </span>
                <span class="p-1 shadow font-thin text-xs bg-gray-100">
                    {{ `Expire ${expiration}` }} 
                </span>
            </div>
            <div v-else class="flex gap-3">
                <span class="p-1 shadow font-bold text-xs bg-red-100 text-red-500">
                    {{ item?.coupon }}
                </span>
                <span class="text-sm font-thin text-red-500">{{ `${item?.details.price_detail.currency_symbol} ${item?.details.price_detail.amount}` }}</span>
            </div>
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
