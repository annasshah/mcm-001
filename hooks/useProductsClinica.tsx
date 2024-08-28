const { useEffect, useState } = require("react");
import { fetch_content_service } from '@/utils/supabase/data_services/data_services'

interface ProductDataInterface {
    category_id: number;
    price: number;
    product_id: number;
    product_name: string;
    quantity_available: number;

}


export function useProductsClinica() {


    const [data, setdata] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(0)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    const onChangeCategory = (cat_id: number) => {
        setSelectedCategory(cat_id)
        setSelectedProduct(0)
    }
    const onChangeProduct = (pro_id: number) => {
        const findProduct = data.find(({ product_id }:any) => product_id == pro_id)
        console.log(findProduct)
        setSelectedProduct(findProduct)
    }



    useEffect(() => {
        setLoading(true)
        let matchCase = null
        if (selectedCategory) {
            matchCase = {
                key: 'category_id',
                value: selectedCategory
            }
        }
        !(async function fetch_data() {
            const data = await fetch_content_service({ table: 'products' })
            setdata(data);
            setLoading(false)
        })()

    }, [selectedCategory]);



    return { products: data, getCategoriesByLocationId: onChangeCategory, loadingProducts: loading, selectedCategory, selectedProduct, selectProductHandle: onChangeProduct }



}