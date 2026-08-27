# Ration Saathi - Complete Test Flow

## Setup
- **Dev Server**: http://localhost:3002
- **Demo Phone**: 9876543210
- **Demo PIN**: 123456

---

## Test Cases

### ✅ Test 1: Login Flow
1. Open http://localhost:3002
2. Should redirect to http://localhost:3002/login (NO home page content visible)
3. Enter phone: `9876543210`
4. Should accept only 10 digits
5. Click Continue
6. Should show spinner animation
7. Should redirect to home page after ~600ms

**Expected Result**: Login page shows → spinner → home page loads ✓

---

### ✅ Test 2: Navigation After Login
1. From home, click "Status" (◷)
2. Should load status page with applications list
3. Click "Shops" (🏪)
4. Should load shops page with FPS locations
5. Click "Apply" (➕)
6. Should load service selection page
7. Bottom nav should show active indicator on current page

**Expected Result**: All pages load smoothly, nav updates correctly ✓

---

### ✅ Test 3: Form Submission
1. From home, click "Add family member" (or any service)
2. Fill form: Contact method → Reason → Select documents → Review
3. Try to submit without selecting reason (Step 2)
   - Should show error: "Please select a reason"
4. Try to submit without selecting documents (Step 3)
   - Should show error: "Please select at least one document"
5. Fill all fields correctly and submit
   - Should show spinner while submitting
   - Should redirect to confirmation page with reference number

**Expected Result**: Validation works, form submits successfully ✓

---

### ✅ Test 4: State Persistence
1. Click state selector in header
2. Select "Maharashtra" 
3. Navigate to different pages (Status, Shops)
4. Refresh page (F5)
5. State should still be "Maharashtra" in header

**Expected Result**: State persists across navigation and page refreshes ✓

---

### ✅ Test 5: Language Toggle
1. Click "हिं" button in header
2. All text should change to Hindi (राशन साथी, स्थिति, दुकानें, etc)
3. Click "EN" button
4. All text should change back to English
5. Refresh page
6. Language should persist

**Expected Result**: Language toggles and persists ✓

---

### ✅ Test 6: Logout
1. Click ⚙️ (settings) menu in header
2. Click "Logout"
3. Should clear auth from localStorage
4. Should redirect to login page
5. Try to go back with browser back button
6. Should NOT return to home page (should stay at login)

**Expected Result**: Logout clears auth, browser back button doesn't bypass ✓

---

### ✅ Test 7: Auth Persistence / Bypass Prevention
1. Complete login flow (phone 9876543210)
2. Go to http://localhost:3002 (home)
3. Should see home page content
4. Manually clear localStorage:
   - Open DevTools (F12)
   - Console tab: `localStorage.removeItem('ration_saathi_logged_in')`
5. Refresh page (F5)
6. Should redirect immediately to /login
7. Should NOT see any home content flash

**Expected Result**: Cannot bypass auth, immediate redirect to login ✓

---

### ✅ Test 8: Direct URL Access Without Auth
1. Logout first
2. Try to access http://localhost:3002/status directly
3. Should redirect to http://localhost:3002/login
4. Try to access http://localhost:3002/shops directly
5. Should redirect to /login

**Expected Result**: Protected routes redirect to login ✓

---

### ✅ Test 9: Draft Autosave
1. Start filling out a form (e.g., "Add family member")
2. Select a contact method (Step 1)
3. Click Continue (Step 2)
4. Select a reason
5. Refresh page (F5)
6. Should show "Resume draft?" prompt
7. Click "Resume"
8. Should restore your answers from Step 2

**Expected Result**: Draft saves and resumes correctly ✓

---

### ✅ Test 10: Responsive Design
1. Open app at http://localhost:3002
2. Resize browser to mobile width (< 768px)
3. Header should be compact
4. Navigation should stack properly
5. Forms should be readable
6. Touch interactions should work smoothly
7. Resize back to desktop
8. Layout should adapt correctly

**Expected Result**: Responsive design works at all breakpoints ✓

---

## Device Testing

### Mobile (iPhone, Android)
- Open http://localhost:3002 on mobile browser
- Login flow should work
- Bottom nav should be usable with thumbs
- Forms should be touch-friendly
- No text cutoff or overflow

### Tablet
- Similar to desktop but with more compact spacing
- Forms should fit on screen without scrolling

### Desktop
- All features should be accessible
- Hover states should work on buttons
- Keyboard navigation should work

---

## Performance Checks

- **Login page load**: < 2s
- **Home page load**: < 1.5s after login
- **Form submission**: ~600ms (expected delay)
- **State changes**: Instant
- **Language toggle**: Instant

---

## Visual Checks

- ✓ Login page has gradient blur background (Codex style)
- ✓ Header has backdrop blur effect
- ✓ All buttons have hover animations
- ✓ Cards have shadow on hover
- ✓ Progress bar animates smoothly
- ✓ Text is crisp and readable
- ✓ No visual glitches or layout shifts

---

## Summary

All 10 test cases should pass. The app is production-ready when:
1. Login works with phone number only
2. Auth persists correctly
3. Cannot bypass auth
4. Forms validate before submit
5. All pages load smoothly
6. UI matches Codex aesthetic
7. Mobile responsive
8. No console errors
