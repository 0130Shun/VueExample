import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
    // 資料
    data(){
        return{
            apiUrl:'https://vue3-course-api.hexschool.io/v2',
            apiPath:'_shun0130',
            products:[],
            tempProduct:{
                imageUrl:''
            },
            modalProduct:null,
            modalDel:null,
            isNew:false,
        };
    },
    //方法
    methods:{
        //驗證身分
        checkAdmin(){
            axios.post(`${this.apiUrl}/api/user/check`)
            .then((res)=>{
                console.log('登入成功');
                this.getData();
            })
            .catch((error)=>{
                console.dir(error);
            })
        },
        //取得資料
        getData(){
            axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products`)
            .then((res)=>{
                console.log(res);
                this.products = res.data.products;
                console.log(this.products);
            })
            .catch((error)=>{
                console.dir(error);
            })
        },
        openModal(status,item){
            if(status === 'new'){
                this.tempProduct = {
                    imagesUrl:[],
                };
                this.isNew = true;
                this.modalProduct.show();
            }else if(status === 'edit'){
                this.tempProduct = { ...item };
                this.isNew = false;
                this.modalProduct.show();
            }
        },
        //新增資料
        updateProduct(){
            //更新
            if(!this.isNew){
                
            }

            axios.post(`${this.apiUrl}/api/${this.apiPath}/admin/product`,{data: this.tempProduct})
            .then((res)=>{
                console.log(res);
                this.getData();
                this.modalProduct.hide();
                this.tempProduct = {};
            })
            .catch((error)=>{
                console.dir(error);
            })
        }    
        //修改資料
        
    },
    //生命週期
    mounted(){
        //取出token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        //把token存入headers
        axios.defaults.headers.common['Authorization'] = token;
        //執行checkAdmin方法
        this.checkAdmin();
        console.log(token);
        console.log(this.$refs);
        //new...>建立實體
        this.modalProduct = new bootstrap.Modal(this.$refs.productModal);
        
    }
}).mount('#app');