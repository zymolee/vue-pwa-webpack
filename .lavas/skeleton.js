import Vue from 'vue';

import Skeleton from '/Users/zymo/work/vue-pwa-webpack/core/Skeleton.vue';


export default new Vue({
    components: {
        
        Skeleton,
        
    },
    template: `
        <div>
            
            <skeleton id="my-skeleton" style="display:none"/>
            
        </div>
    `
});
