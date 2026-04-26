# Todo List (React + TypeScript + Vite)

แอป Todo List แบบง่าย พัฒนาด้วย React, TypeScript และ Vite

## Requirements

- Node.js 20+ (แนะนำใช้ LTS)
- npm 10+

## Install

```bash
npm install
```

## Run บนคอมพิวเตอร์ (Local)

```bash
npm run dev
```

จากนั้นเปิด:

- [http://localhost:5173](http://localhost:5173)

## Run ผ่านมือถือ (วง Wi-Fi เดียวกัน)

1. ให้มือถือและคอมพิวเตอร์เชื่อมต่อ Wi-Fi เดียวกัน
2. รัน dev server แบบเปิดให้เครื่องอื่นในวงแลนเข้าถึง:

```bash
npm run dev -- --host 0.0.0.0 --port 5173
```

3. หา IP ของเครื่องคอมพิวเตอร์

macOS:

```bash
ipconfig getifaddr en0
```

4. เปิดเบราว์เซอร์บนมือถือ แล้วเข้า URL:

```text
http://<YOUR_LOCAL_IP>:5173
```

ตัวอย่าง:

```text
http://192.168.1.15:5173
```

### ถ้าเปิดจากมือถือไม่ได้

- ตรวจสอบว่าอยู่ Wi-Fi เดียวกันจริง
- ปิด VPN ชั่วคราวทั้งบนมือถือและคอม
- อนุญาต firewall ให้ `node` รับ connection ขาเข้า
- ลองเปลี่ยนพอร์ต เช่น `--port 4173` แล้วเข้า `http://<IP>:4173`

## Test

```bash
npm test
```

## Build Production

```bash
npm run build
npm run preview
```
