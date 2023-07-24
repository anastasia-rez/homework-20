import { createApp, ref, reactive, watch, onMounted, computed } from "vue";

import OneItem from "./components/OneItem.js";

const url = 'https://fakestoreapi.com/products';

createApp({

    setup(){

        const title = ref('Список товаров');

        const list = reactive([]);

        onMounted( async() => {
            let data = await fetch(url);
                data = await data.json();
            

            for(let item of data){
                item.qt = 0;
                item.selected = false;
            }

            list.push(...data);

            console.log(data);
            
        });

        const sort = ref('');

        const search = ref('');

        const sortRange = ref('');

        console.log(list);

        const listToShow = computed(() => {

            let filteredList = list
            .filter( item => 
                
                item
                .description
                .toLowerCase().
                includes(search
                    .value
                    .toLowerCase()) || 
                item
                .title
                .toLowerCase().
                includes(search
                    .value
                    .toLowerCase()))

                .filter(item => item.price >= minPrice.value && item.price <= maxPrice.value);

            if(sort.value == 'up'){
                filteredList.sort ((a, b) => a.price - b.price);
            } else if (sort.value == 'down'){
                filteredList.sort((a, b) => b.price - a.price);
            }

            return filteredList
        });

        const minPrice = ref(0);

        const maxPrice = ref(1000);

        const incQtFactory = (price) => {
            return() => price.qt++;
            
        }

        const decQtFactory = (price) => {
            return() => price.qt > 0 ? price.qt-- : null;
        }

        const totalCost = computed(() => 
            list.reduce(
                (acc, item) => acc + item.price * item.qt, 0
            )
        );

        const selectedSum = reactive([]);

        const selectedList = computed(() => selectedSum
        .filter(item => item.selected)
        .map(item => item.price));

        const changeSelect = (item) => {
            return () => {
                item.selected = !item.selected;
                console.log(`${item.qt} : ${item.selected}`)
            }
        }


        return {
            title,
            list,
            sort,
            search,
            listToShow,
            minPrice,
            maxPrice,
            sortRange,
            incQtFactory,
            decQtFactory,
            totalCost,
            selectedSum,
            selectedList,
            changeSelect
        }
    },

    components: {
        OneItem
    }


}).mount('#app');



