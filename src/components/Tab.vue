<template>
  <section id="tabContainer">
     <ul class="tab-wrap">
         <li class="tab-item" v-for="(tab,index) in tabList" :key="tab.key" @click="clickTab(index)">{{tab.key}}</li>
     </ul>
     <section class="tab-content">
         {{tabContent.name}}
     </section>
  </section>
</template>

<script>
export default {
    metaInfo: {
       title:"Tab"
    },
    data() {
        return {
            tabList:[
                {key:'A',name:'AAA'},
                {key:'B',name:'BBB'},
                {key:'C',name:'CCC'}
            ],
            tabContent:''
        }
    },

    methods: {
      clickTab(index) {
         console.log('index',index);
        this.tabContent = this.tabList[index];
      }
    },
    created() {
       this.tabContent = this.tabList[0]
    },

}
</script>

<style scoped>
ul,li {
    list-style: none;
    padding: 0;
    margin: 0;
}
.tab-item {
    padding: 10px 20px;
    border: 1px solid blue
}
.tab-content {
    height: 300px;
    border: 1px solid red;
}

</style>