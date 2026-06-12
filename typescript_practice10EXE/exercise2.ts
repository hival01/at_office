
interface Product{
    id:number,
    name:string,
    priceCents:number,
    inStock:boolean,
    discountPercent?:number,
    readonly sku:string;
}

const catalog:Product[]=[
    {id:1 ,name:"keyboard" , priceCents:10000 , inStock:true , sku:"kb-123" , discountPercent:10},
    { id: 2, name: "Wireless Mouse", priceCents: 5000, inStock: true, sku: "MS-456" },
    { id: 3, name: "Gaming Monitor", priceCents: 30000, inStock: false, sku: "MN-789" },
    { id: 4, name: "USB-C Cable", priceCents: 1500, inStock: false, sku: "CB-012" }
];

function finalPrice(p:Product):number{
    const discount = p.discountPercent ?? 0;
    return p.priceCents * (1- discount/100);

}

function availableProducts(items:Product[]): Product[]{
    return items.filter(item=> item.inStock);
}

function cheapestName(items:Product[]):string | undefined{
    const inStockItems = availableProducts(items);
    if(inStockItems.length === 0) return undefined;

    const cheapest = inStockItems.reduce((min , current)=>{
        if(current.priceCents < min.priceCents){
            return current;
        }else{
            return min;
        }
    })
    return cheapest.name;
}

console.log(`final price of ${catalog[0]!.name} : ${finalPrice(catalog[0]!) } cents`);


console.log("available items:"  ,availableProducts(catalog).map(p=>p.name));

// Cheapest Name test (Mouse is 5000, Keyboard is 10000 -> Should print Wireless Mouse)
console.log("Cheapest available item:", cheapestName(catalog));

// 6. Proving Readonly constraint:
catalog[0]!.sku = "NEW-SKU-999";                         
// ❌ TS Error: Cannot assign to 'sku' because it is a read-only property.
 