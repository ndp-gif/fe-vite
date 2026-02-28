import { useState } from "react";

interface IProduct {
    id: number;
    name: string;
    price: number;
    isFavorite: boolean;
}
interface IProps {
    category?: string;
    isSale?: boolean;
}
const Product = (props: IProps) => {
    const { category = 'Điện thoại', isSale = false } = props

    const [products, setProducts] = useState<IProduct[]>([
        { id: 1, name: 'Laptop', price: 10000000, isFavorite: false },
        { id: 2, name: 'Laptop Gaming', price: 13000000, isFavorite: false },
    ])
    const handleCreateProduct = () => {
        const newProduct: IProduct = {
            id: Math.random(),
            name: "Sản phẩm mới " + products.length + 1,
            price: 500,
            isFavorite: false
        }
        setProducts(prev => [...prev, newProduct])
    }
    const handleDeleteProduct = (id: number) => {
        const deleteProduct = products.filter(item => item.id != id)
        setProducts(deleteProduct)
    }
    const changeFavorite = (idClicked: number) => {
        setProducts(
            prev => prev.map(item => 
                item.id === idClicked ? {...item, isFavorite: !item.isFavorite} : item
            )
        )
    }
        console.log(products)

    return (
        <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
            <h2>Danh mục: {category}</h2>
            <p>Trạng thái: {isSale ? "Đang giảm giá 🔥" : "Giá thường"}</p>

            <ul>
                {/* 5. Render danh sách sản phẩm tại đây */}
                {products.map((item) => (
                    <li key={item.id}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>{item.name} - ${item.price} - <button onClick={() => changeFavorite(item.id)}>${item.isFavorite ? "❤️" : "🤍"}</button></div>
                            <button onClick={() => handleDeleteProduct(item.id)}>Xóa</button>
                        </div>

                    </li>

                ))}
            </ul>

            <button onClick={handleCreateProduct}>Thêm sản phẩm</button>
        </div>
    );
}
export default Product;
