
    export interface Product {
        productId: number;
        productName: string;
        UrlCode: string;
        IsActice: boolean;
        Price: number;
        FinalPrice: number;
        ProfitPrice: number;
        Avlable: boolean;
        GroupName: string;
        BrandName: string;
        Images: string;
    }

    export interface Filterproducts {
        Info: { Count: number;
        Min: number;
        Max: number;
        Row:number;
        Index:number;
        attributeValues: string;   
    };
        mytemp: number;
        products: Product[];
    }

    export default interface IFilterProducts {
        filterproducts: Filterproducts;
    }
