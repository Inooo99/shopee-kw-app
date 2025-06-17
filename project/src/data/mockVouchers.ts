// src/data/mockVouchers.ts

import { Voucher } from "../types";

export const mockVouchers: Voucher[] = [
  {
    id: "VOUCHER001",
    code: "GRATISONGKIRJUNI",
    title: "Gratis Ongkir",
    description: "Min. belanja Rp50.000. Maks. potongan Rp10.000.",
    expiryDate: "2025-06-30",
    type: "Free Shipping",
  },
  {
    id: "VOUCHER002",
    code: "DISKON10RB",
    title: "Diskon Rp10.000",
    description: "Min. belanja Rp100.000 untuk semua produk.",
    expiryDate: "2025-07-15",
    type: "Discount",
  },
  {
    id: "VOUCHER003",
    code: "CASHBACK5PERSEN",
    title: "Cashback 5%",
    description: "Dapatkan cashback koin hingga 20.000.",
    expiryDate: "2025-06-25",
    type: "Discount",
  },
  {
    id: "VOUCHER004",
    code: "KIRIMHEMAT",
    title: "Gratis Ongkir Hemat",
    description: "Min. belanja Rp0 khusus metode pengiriman hemat.",
    expiryDate: "2025-12-31",
    type: "Free Shipping",
  },
];
