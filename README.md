# Homigo 🏠

**Homigo** là nền tảng đặt phòng và thuê nhà trực tuyến hiện đại, kết nối chủ nhà (Host) và khách thuê (Guest). Dự án được xây dựng theo kiến trúc Monorepo, tách biệt rõ ràng giữa Backend (API) và Frontend (Client).

---

## 🚀 Công Nghệ Sử Dụng

### 🔙 Backend (`/backend`)
Dựa trên nền tảng **NestJS** mạnh mẽ và linh hoạt.
* **Core Framework**: [NestJS](https://nestjs.com/) (Modular architecture)
* **Language**: TypeScript
* **Database**: MySQL
* **ORM**: [Prisma](https://www.prisma.io/) (Database modeling & migrations)
* **Authentication**: JWT, Passport (Google OAuth2 Strategy)
* **Validation**: class-validator, class-transformer
* **Testing**: Jest

### 🎨 Frontend (`/frontend`)
Xây dựng trải nghiệm người dùng mượt mà với **Next.js**.
* **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
* **Language**: TypeScript
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix UI based)
* **State Management**: [Zustand](https://github.com/pmndrs/zustand)
* **Form Handling**: React Hook Form + Zod validation
* **HTTP Client**: Axios

---

## 📂 Cấu Trúc Dự Án

```text
Homigo/
├── backend/                # Mã nguồn Server (NestJS)
│   ├── prisma/             # Schema database & Migrations
│   ├── src/
│   │   ├── auth/           # Login, Register, Google OAuth
│   │   ├── users/          # Quản lý người dùng (Host/Guest)
│   │   ├── database/       # Seeding data
│   │   └── main.ts         # Entry point
│   ├── test/               # E2E Tests
│   └── ...
│
├── frontend/               # Mã nguồn Client (Next.js)
│   ├── src/
│   │   ├── app/            # App Router (Pages)
│   │   ├── components/     # Reusable UI components
│   │   ├── features/       # Feature-based modules (Auth, Booking...)
│   │   ├── stores/         # Global state (Zustand)
│   │   └── lib/            # Utilities & Config (Axios, Utils)
│   └── ...
└── README.md
```

---

## 🛠️ Hướng Dẫn Cài Đặt (Setup Guide)
Làm theo các bước dưới đây để chạy dự án trên máy local của bạn.

### 📋 Yêu cầu tiên quyết (Prerequisites)
* **Node.js**: Phiên bản 18 trở lên (Khuyên dùng bản LTS mới nhất).
* **Package Manager**: npm, yarn hoặc pnpm.
* **Database**: MySQL (đã cài đặt và service đang chạy).

### 1️⃣ Thiết lập Backend (Server)

**Di chuyển vào thư mục backend:**

```bash
cd backend
```

**Cài đặt các gói phụ thuộc (dependencies):**

```bash
npm install
```

**Cấu hình biến môi trường:**

Tạo file `.env` tại thư mục gốc của backend (cùng cấp với package.json). Copy và chỉnh sửa nội dung sau:

```env
# Cấu hình App
PORT=5045

# Cấu hình Database (PostgreSQL)
# Định dạng: mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME?schema=public
DATABASE_URL="mysql://root:password@localhost:3306/homigo-booking"

# Cấu hình JWT (Authentication)
JWT_SECRET="your_secret"
JWT_EXPIRATION_TIME="1d"

# Cấu hình Google OAuth (Tùy chọn - Nếu muốn test login Google)
GOOGLE_CLIENT_ID="your_google_client_id_here"
GOOGLE_CLIENT_SECRET="your_google_client_secret_here"
GOOGLE_CALLBACK_URL="http://localhost:5045/api/auth/google/callback"
```

**Khởi tạo Database:**

Chạy lệnh migration để tạo các bảng trong database dựa trên schema Prisma:

```bash
npx prisma migrate dev
```
**Khởi chạy Server (đồng thời chạy seed data nếu chưa có dữ liệu):**

```bash
npm run start:dev
```

🚀 **Backend sẽ chạy tại:** http://localhost:5045  
📚 **Swagger API Docs (nếu có cài):** http://localhost:5045/api

### 2️⃣ Thiết lập Frontend (Client)

**Mở một terminal MỚI và di chuyển vào thư mục frontend:**

(Từ thư mục gốc của dự án)

```bash
cd frontend
```

**Cài đặt các gói phụ thuộc:**

```bash
npm install
```

**Cấu hình biến môi trường:**

Tạo file `.env.local` tại thư mục gốc của frontend. Copy nội dung sau:

```env
# Đường dẫn API tới Backend
NEXT_PUBLIC_API_URL="http://localhost:5045"
```

**Khởi chạy Ứng dụng:**

```bash
npm run dev
```

🚀 **Frontend sẽ chạy tại:** http://localhost:3000  

---

