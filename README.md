# React Native Booking App Assessment

A React Native mobile app built as part of the Daiviksoft selection process. The app demonstrates authentication flow, product listing with API, session management, navigation, and design matching a provided Figma spec.

## Features

- **SignUp & SignIn** screens using local MMKV storage for user/session data.
- **Authentication guard:** Only signed-in users can access Home/Profile.
- **Home Screen:** 
  - Product list with images, price, and pagination via [Platzi Fake API](https://api.escuelajs.co/api/v1/products).
  - "Recommendations for you" and personal info display.
- **Profile Screen:** User info, settings/options list, Logout button (clears MMKV and session).
- **State management:** Redux Toolkit for user/product data.
- **Local storage:** react-native-mmkv (fast, secure, persistent).
- **Navigation:** Stack navigator with custom Bottom Tab navigation bar.
- **Error handling:** Graceful feedback for invalid login, empty fields, and failed API calls.
- **Styled UI:** Matches Figma design using native React Native styles only (*see design link below*).

## Tech Stack

- React Native
- @reduxjs/toolkit
- react-native-mmkv
- @react-navigation/native, @react-navigation/native-stack
- axios

## Figma Design

[https://www.figma.com/design/Inex28pCw6AXzKMNxvONeB/Untitled?node-id=1-83&t=T1fjIkFRg30dING6-0](https://www.figma.com/design/Inex28pCw6AXzKMNxvONeB/Untitled?node-id=1-83&t=T1fjIkFRg30dING6-0)


## Setup Instructions

1. **Clone repo**  
   `git clone <your-repo-link>`
2. **Install dependencies**  
   `npm install`
3. **Run app (Android example):**  
   `npx react-native run-android`
4. **Run app (iOS example):**  
   `npx react-native run-ios`
5. Make sure to set up your emulator/device accordingly.

## Usage

- **Sign up as a new user.**
- **Sign in with your credentials.**
- **Browse and paginate products on Home.**
- **View and update profile.**
- **Logout to clear session (returns to SignIn screen).**
- Every major navigation tab and screen is available from the custom bottom navigation bar.

## Commit History

- All commits include meaningful messages showing progress and feature milestones.

## Notes

- All logic, UI, API, and session handling are written using recommended React Native best practices.
- MMKV is used for local data only—no sensitive data sent outside the app.

## Author

Mohamed Suhail  
Email: mohamedsuhail065@gmail.com

---

