import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useProducts() {

    function getProducts() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      }
    
      let productInfo = useQuery({
        queryKey: ["recentProduct"], //bnsmeh 3shan lw 3iza astkhdem el query fe component tanya
        queryFn: getProducts, // bb3tlo el function ely bt3ml request
        staleTime: 10000, //b3d 10s htb2a stale {y3ny mesh hy7sal loading gher ama elw2t da y3dy}
        // retry: 4, // lw 7sal moshkela fe el request by7awel y load tany 4 marat
        // retryDelay: 3000, //lw 7sal moshkela fe elrequest by7awel yload brdo bs been kol load w load 3s
        // refetchInterval: 30000, //byfetch kol 30s
      });

        return productInfo

}
