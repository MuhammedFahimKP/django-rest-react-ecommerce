import useData from "./useData";
import { getState } from "../store";
import type { AdminProduct } from "../types";


export function useProduct(deps:any[]){

    const params = getState().adminProductSearchSlice

    return useData<AdminProduct>("admin/product/",{
        params:params
    },[...deps])
}