import{ref, reactive } from 'vue';

export default {
    props: ['productItem', 'incFunc', 'decFunc'],
    setup(props){


        return{
            props
        }
    },
    template: `
    <div class="py-2 " >
                <div class="card m-2 h-100" >
                    <img :src="props.productItem.image" class="card-img-top p-3" style="height:250px">
                    <div class="card-body d-flex flex-column">
            
                        <h5 class="card-title" >
                            {{props.productItem.title}}
                        </h5>
            
                        <p class="card-text flex-grow-1">
                            {{props.productItem.description}}
                        </p>
            
                        <p class="text-end fs-3">
                            {{props.productItem.price}} $
                        </p>

                        <button @click="props.decFunc" class="btn btn-danger">-1</button>
                        <p class="text-center fs-3">{{props.productItem.qt}}</p>

                        <button @click="props.incFunc" :class="{'btn-info': props.productItem.selected}" class="btn btn-success"> +1 </button>

                        <p class="fs-3">= {{(props.productItem.qt * props.productItem.price).toFixed(2)}} $.</p>
                    
                    </div>
                    
                </div>
            
            </div>
    `
}