<script setup lang="ts">
  import { ref, Ref } from 'vue';
  import axios from 'axios';
  import {extractCouponCode, extractCourseName} from './composables/urls'
  import InputField from './components/InputField.vue';
  import ResultsArea from './components/ResultsArea.vue';

  const mainView: Ref<HTMLDivElement | null> = ref(null);
  const scrollToBottom = ()=> {
    if (mainView.value) {
        mainView.value.scrollTo({
        top: mainView.value.scrollHeight,
        behavior: 'smooth'
      })
    }
  }
  
  const couponsList = ref([] as Array<object>)
  const couponsCount = ref(0)
  const couponsResolvedCount  = ref(0)
  const scraping = ref(false)
  const done = ref(false)
  const totalFree = ref(0)
  const totalSkipped = ref(0)
  const timelapse = ref(0)
  const fastMode = ref(true)

  const updateFastMode = (mode:boolean)=> fastMode.value = mode


  // Connect to server and scrape data
  const updateCouponsList = async (vals: Array<string>) => {
    startTimer()
    couponsCount.value = vals.length
    scraping.value = true
    
    for(const val of vals) {
      
      try{
        const response = await checkCoupon(val)
        if (response.free) totalFree.value ++
        couponsList.value.push(response)
        couponsResolvedCount.value = couponsList.value.length;
      }catch(e){
        couponsList.value.push({
          "course":val,
          "skipped":true,
          "reason": "Server error"
        })
        totalSkipped.value ++
      }
    }
    // To default
      scraping.value = false
      done.value = true
      stopTimer()
      console.log(couponsList.value)
  }

  const checkCoupon = async (url:string)=> {
    const couponCode = extractCouponCode(url)
    const courseName = extractCourseName(url)
    const response = await axios.get(`scrape/${courseName}/${couponCode}/${fastMode.value}`)
    return response.data
  }

  
  const reset = ()=> {
    couponsList.value = [];
    couponsCount.value = 0;
    couponsResolvedCount.value = 0;
    scraping.value = false;
    done.value = false;
    totalFree.value = 0;
    timelapse.value = 0;
  }

  // Timelapse functions
  let timer:any;
  const startTimer = ()=> timer = setInterval(()=> timelapse.value ++,1000);
  const stopTimer = ()=> clearInterval(timer);

</script>

<template>
  

  <div class="w-full h-screen overflow-auto py-10" ref="mainView">
    <InputField @change="updateCouponsList" @reset="reset" @toggle="updateFastMode"
      :scraping="scraping" 
      :couponsCount="couponsCount" 
      :couponsResolvedCount="couponsResolvedCount" 
      :done="done" 
      :totalFree="totalFree"
      :timelapse="timelapse"
      :totalSkipped="totalSkipped"
      :fastMode="fastMode"/>
    <Transition>
      <div class="w-full pt-44 md:px-32" v-if="couponsList.length">
        <ResultsArea 
        :couponsList="(couponsList as Array<any>)"
        @added="scrollToBottom"/>
      </div>
    </Transition>
    
  </div>
</template>

<style scoped>
</style>
