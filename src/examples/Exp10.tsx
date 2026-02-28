import { useState } from "react";


interface IUser {
    name: string; age: number | string; city: string;
}

interface IProps {
    name?: string;
    age?: number;
    address?: string;
}
const Exp10 = (props: IProps) => {
    const { name = 'Thao', age = 19, address = 'Hung Yen' } = props

    const [user, setUser] = useState<IUser[] | null>([
        { name: 'Thao', age: 19, city: 'Hà nội' },
        { name: 'Phuong', age: 22, city: 'Bắc Ninh' }
    ])
    return (
        <>
            {
                user?.map((value, index) => {
                    console.log(`User ${index}: `, value.name, value.age, value.city)
                    return (
                        <div key={index}>
                            <p>Tên: {value.name} - Tuổi: {value.age} - Thành phố: {value.city}</p>
                        </div>
                    )
                })
            }
            <div>
                {name}
                {age}
                {address}
            </div>
        </>
    )
}
export default Exp10;