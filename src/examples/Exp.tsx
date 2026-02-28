import { useState } from "react"
import { orderExample } from './Baitap'

function createPair<S, T>(v1: S, v2: T): [S, T] {
    return [v1, v2]
}
const Exp = () => {


    const [count, setCount] = useState(0)
    console.log(count)
    const handleClick = () => {
        setCount(prev => prev + 1)  
    }
    const pair = createPair("Count is", count)
    return (
        <>
            <h1>{count}</h1>
            <p>{pair[0]} :{pair[1]}</p>
            <button onClick={handleClick}>click me</button>

            <section style = {{border: '1px solid black', padding: '10px'}}>
                <h3>Thông tin đơn hàng (từ Baitap.ts)</h3>
                <p>Mã đơn: {orderExample.orderId}</p>
                <i>Trạng thái: {orderExample.status}</i> <br/>
                <strong>Tổng tiền: {orderExample.total.toLocaleString()}đ</strong>
            </section>
        </>
    )
}

export default Exp