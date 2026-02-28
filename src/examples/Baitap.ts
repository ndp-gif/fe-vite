// =============================================
// FILE: types-and-basics.ts
// Mục đích: Ôn tập TypeScript cơ bản (union, interface, type alias, generic, Record...)
// =============================================

// 1. Union type đơn giản (string | number)
const name: string | number = "Nguyen Dinh Phuong";
// name = 10;  // vẫn hợp lệ nếu muốn, nhưng hiện tại không gán lại → dùng const
console.log("Tên người dùng:", name);

// 2. Type alias cho Employee
export type TEmployee = {
  firstName: string;
  lastName: string;
  age: number;
};

// Khai báo biến employee (dùng const vì không gán lại)
export const employee: TEmployee = {
  firstName: "Phương",
  lastName: "Thảo",
  age: 19,
};

console.log("Nhân viên:", employee);

// 3. Interface UserProfile (có optional fields)
export interface UserProfile {
  id: number;
  username: string;
  email: string;
  age?: number;               // optional
  isActive: boolean;
  lastLogin?: Date | null;    // optional, có thể là Date hoặc null
}

export const currentUser: UserProfile = {
  id: 1,
  username: "user01",
  email: "user@gmail.com",    // sửa typo từ .omc → .com
  age: 19,
  isActive: true,
  lastLogin: new Date(),
};

console.log("Người dùng hiện tại:", currentUser);

// 4. Union types cho Status và PaymentMethod
export type Status = "pending" | "processing" | "shipped" | "delivered";

export type PaymentMethod = "cash" | "card" | "bank" | "momo" | "vnpay";

// Interface Order sử dụng union types ở trên
export interface Order {
  orderId: string;
  status: Status;
  total: number;
  paymentMethod: PaymentMethod;
}

export const orderExample: Order = {
  orderId: "ORD-2025-001",         // ý nghĩa hơn "thaophuong"
  status: "pending",
  total: 200000,
  paymentMethod: "cash",
};

console.log("Đơn hàng mẫu:", orderExample);

// 5. Intersection types (kết hợp nhiều interface)
interface HasName {
  name: string;
}

interface HasAge {
  age: number;
}

// Kết hợp HasName + HasAge + thêm email
export interface Person extends HasName, HasAge {
  email: string;
}

// Khai báo teacher (không để rỗng nữa)
export const teacher: Person = {
  name: "Nguyễn Văn A",
  age: 35,
  email: "teacher@school.vn",
};

console.log("Giáo viên:", teacher);

// 6. Mảng thông thường và Tuple array
const productBrands = ["Samsung", "LG", "Sony"];
console.log("Các thương hiệu sản phẩm:", productBrands.join(" | "));

// Tuple: [tên sản phẩm, giá, có giảm giá không]
const products: [string, number, boolean][] = [
  ["Áo thun", 100, true],
  ["Áo cánh", 120, true],
  ["Quần jeans", 350, false],
];

console.log("Danh sách sản phẩm (tuple):");
products.forEach(([name, price, hasDiscount], index) => {
  console.log(
    `Sản phẩm ${index + 1}: ${name} - ${price}k - Giảm giá: ${hasDiscount ? "Có" : "Không"}`
  );
});

// 7. Record Utility Type - điểm số theo môn
const scores: Record<string, number> = {
  Toan: 8.5,
  Ly: 7,
  Hoa: 9.2,
  Van: 6.8,
  Anh: 7.5,
};

console.log("Bảng điểm:", scores);

// 8. Generic function - lấy phần tử đầu tiên
function getFirst<T>(items: T[]): T | undefined {
  return items.length > 0 ? items[0] : undefined;
}

// Sử dụng generic với nhiều kiểu dữ liệu
const numbers = [10, 20, 30, 40];
const fruits = ["táo", "chuối", "cam"];
const users = [
  { id: 1, name: "An" },
  { id: 2, name: "Bình" },
];

console.log("\n--- Kết quả hàm generic getFirst ---");
console.log("Mảng số:", getFirst(numbers));
console.log("Mảng chuỗi:", getFirst(fruits));
console.log("Mảng object:", getFirst(users));           // { id: 1, name: 'An' }
console.log("Tên người đầu tiên:", getFirst(users)?.name);

// 9. Generic API Response
export interface ApiResponse<T> {
  success: boolean;
  data?: T;             // optional, generic
  error?: string;       // optional
  statusCode: number;
}

// Ví dụ response thành công
const successApiResponse: ApiResponse<UserProfile> = {
  success: true,
  data: currentUser,
  statusCode: 200,
};

// Ví dụ response lỗi (không có data, status code phù hợp hơn)
const errorApiResponse: ApiResponse<Person> = {
  success: false,
  error: "Không tìm thấy thông tin giáo viên",
  statusCode: 404,      // 404 Not Found thay vì 200
};

console.log("\n--- API Response ---");
console.log("Thành công:", successApiResponse);
console.log("Lỗi:", errorApiResponse);

// =============================================
// Kết thúc file
// =============================================

// Generic
function wrapInArray<T>(value: T): T[] {
    return [value];
}

const str = wrapInArray("Đây là kiểu string")
const num = wrapInArray(100)
const objj = wrapInArray({name: "Types", id:1, status: true})
const boo = wrapInArray(true)
console.log(`${str}
    ${num}
    ${JSON.stringify(objj, null, 1)}
    ${boo}
    `)

interface Box<T>{
    content: T;
}
const box1: Box<number[]> = {
    content: [1,2,3,4,5]
}
const box2: Box<string> = {
    content: "Xin chao"
}

const box3: Box<object>= {
    content: {
        id: 1,
        name: "Box 3",
        status: true,
        lastLogin: new Date()
    }
}
console.log(JSON.stringify(box1));
console.log(JSON.stringify(box2));
console.log(JSON.stringify(box3, null, 2)); 

function identity<T>(value: T): T {
    return value;
}

const nameStr = identity<string>("Phương Thảo")
console.log("1. String:", nameStr);
const ageNum = identity<number>(19)
console.log("2. Number:", ageNum);
const skills = identity<string[]>(["Java","Go","TS","JS"])
console.log("3. Array:", skills);
interface UserProfileIdentity {
    id: number;
    name: string;
}
const userIdentity: UserProfileIdentity = {
    id: 1,
    name: "Lỗi rồi"
}
const objjj = identity<UserProfileIdentity>(userIdentity)
console.log("4. Object",JSON.stringify(objjj, null, 4))
const isActive = identity(true);
console.log(`5. Trạng thái hoạt động: ${isActive}`);

//extends


interface Personn {
  name: string;
  age: string;
}

function greet(person : Personn) {
  return "Greet: " + person.name + " and age: " + person.age; 
}
const user : Personn = {
  name: "Thảo",
  age : "19"
}
console.log("---- Lấy ra persion : "+ JSON.stringify(greet(user)))

// Destructuring

const a = [10,20,30,40]
const [first, ...third] = a
console.log(`${first} +  ${third}`)



