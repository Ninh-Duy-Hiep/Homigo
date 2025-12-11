// src/app/(public)/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const ROOMS = [
  { id: 1, name: "Villa View Biển", price: "2.500.000đ", image: "/placeholder-1.jpg", address: "Vũng Tàu" },
  { id: 2, name: "Homestay Đà Lạt", price: "800.000đ", image: "/placeholder-2.jpg", address: "Đà Lạt" },
  { id: 3, name: "Căn hộ cao cấp", price: "1.200.000đ", image: "/placeholder-3.jpg", address: "Hồ Chí Minh" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full h-[400px] bg-gray-100 flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Tìm chốn nghỉ dưỡng lý tưởng
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Khám phá hàng ngàn homestay, villa với giá tốt nhất
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-full px-8">
            Khám phá ngay
          </Button>
        </div>
      </section>

      <section className="container py-12 mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-foreground">Địa điểm nổi bật</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ROOMS.map((room) => (
            <Card key={room.id} className="overflow-hidden hover:shadow-lg transition-shadow border-none shadow-md">
              <div className="relative h-48 w-full bg-muted">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-gray-200">
                   Ảnh phòng
                </div>
              </div>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg">{room.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{room.address}</p>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="font-bold text-primary text-xl">{room.price} <span className="text-sm text-foreground font-normal">/ đêm</span></p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full" asChild>
                  <Link href={`/rooms/${room.id}`}>Xem chi tiết</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}