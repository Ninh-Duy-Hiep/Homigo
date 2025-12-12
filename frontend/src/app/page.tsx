"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthAction } from "@/hooks/useAuthAction";
import { motion } from "framer-motion";
import Image from "next/image";

interface Destination {
  id: number;
  name: string;
  image: string;
  price: string;
}

const mockDestinations: Destination[] = [
  { id: 1, name: "Hạ Long Bay", image: "", price: "2.000.000đ" },
  { id: 2, name: "Đà Lạt", image: "", price: "1.500.000đ" },
  { id: 3, name: "Phú Quốc", image: "", price: "3.000.000đ" },
];

const fetchDestinations = async (): Promise<Destination[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockDestinations;
};

export default function HomePage() {
  const { execute } = useAuthAction();

  const { data, isLoading, error } = useQuery({
    queryKey: ["destinations"],
    queryFn: fetchDestinations,
  });

  const handleBooking = (destinationName: string) => {
    execute(() => {
      alert(`Đã đặt thành công tour đi ${destinationName}!`);
    });
  };

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Đang tải...</div>;
  }

  if (error) return <div>Lỗi tải dữ liệu</div>;

  return (
    <main className="container mx-auto min-h-screen p-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">Khám phá điểm đến</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((dest, index) => (
          <motion.div
            key={dest.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="overflow-hidden rounded-xl bg-white shadow-lg transition-shadow hover:shadow-xl"
          >
            <div className="h-48 bg-gray-300">
              <Image src={dest.image} alt={dest.name} fill className="h-full w-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold">{dest.name}</h3>
              <p className="mt-2 text-gray-600">{dest.price} / người</p>

              <button
                onClick={() => handleBooking(dest.name)}
                className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Đặt ngay
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
