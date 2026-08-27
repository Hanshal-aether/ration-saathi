# Ration Saathi - Quick Start Guide

## 🚀 Start the App

```bash
npm install
npx prisma db push --skip-generate --force-reset
node prisma/seed.js
npm run dev
```

Then open: **http://localhost:3000**

---

## 📱 Login Flow (What You'll See)

### 1️⃣ **Login Page** (Redirected automatically)
   - **Welcome to Ration Saathi** screen
   - Enter any 10-digit phone number
   - Example: `9876543210`
   - Click **Continue →**

### 2️⃣ **OTP Verification**
   - Enter code: `123456`
   - Click **Verify →**
   - ✅ You're logged in!

### 3️⃣ **State Selection Modal**
   - Choose a state from the list
   - Select **Maharashtra** (fully implemented)
   - Other states show "Coming soon"

### 4️⃣ **Landing Page** (Home)
   - 4 service cards (Apply options)
   - Quick access buttons
   - Navigation bottom bar

---

## 🔑 Test Credentials

**Phone**: Any 10-digit number
- `9876543210`
- `1234567890`
- `9999999999`
- etc.

**OTP**: Always `123456`

---

## 📝 What to Try

1. **Apply for New Card**: Home → "I need a new ration card" → Multi-step form
2. **Check Status**: Status page → Enter reference number (from confirmation after apply)
3. **Find Shops**: Shops page → See 8 Maharashtra fair price shops
4. **Chat**: Click 💬 button on Status or Apply pages to chat with AI
5. **Change Language**: Click EN/हिं in header

---

## 🛠️ Common Issues

### **Stuck on login?**
- Clear browser cache/localStorage
- Check browser console for errors
- Ensure .env has DATABASE_URL

### **No shops showing?**
- Run seed again: `node prisma/seed.js`
- Check database: `npx prisma studio`

### **Build fails?**
- Delete `.next` folder
- Run `npm install` again
- Try `npm run build`

---

## 💡 Key Features

✅ **Auth**: Phone + OTP (mock)  
✅ **Forms**: Multi-step with auto-save  
✅ **Tracking**: Real-time status updates  
✅ **Shops**: 8 Maharashtra locations with slots  
✅ **Chat**: Gemini AI assistant (if GEMINI_API_KEY added)  
✅ **Polish**: Smooth transitions, mobile-first design  
✅ **Bilingual**: English + Hindi support  

---

## 📊 Seeded Data

**3 Sample Citizens**:
- Ravi Kumar
- Aisha Khan
- Meera Nair

**8 Fair Price Shops** (Maharashtra):
- Andheri
- Dombivli
- Thane
- Malad
- Dadar
- Chembur
- Kurla
- Worli

**4 Sample Applications**:
- New card (submitted)
- Add member (under review)
- Correction needed
- Lost card (approved)

---

## 🎯 Production Build

```bash
npm run build
npm run start
```

App will be production-ready at **http://localhost:3000**

---

**Questions?** Check README.md for full documentation.
