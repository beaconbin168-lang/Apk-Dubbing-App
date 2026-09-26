# 🎬 Panharith Dubbing V1.0

កម្មវិធីទូរស័ព្ទ Android (APK) សម្រាប់ស្ទូឌីយោបញ្ចូលសម្លេង (AI Video Dubbing Studio) និងបង្កើត Subtitle ស្វ័យប្រវត្តិ។

---

## 🌟 លក្ខណៈពិសេស (Features)

### ១. អេក្រង់កែសម្រួលវីដេអូ (Video Dubbing Studio - Image 1)
- **ស៊ុមវីដេអូ 9:16 Neon Cyan:** អាចរើសវីដេអូពីទូរស័ព្ទ ឬកុំព្យូទ័រមកចាក់ Preview ភ្លាមៗ។
- **របារឧបករណ៍ឆ្វេង (Sidebar):**
  - ⚙️ **Setting:** បើកផ្ទាំងកំណត់រចនាសម្ព័ន្ធ Auto Run។
  - 📄 **Script:** កែសម្រួលអត្ថបទ Subtitle។
  - 🔄 **Reset:** បើកវីដេអូគំរូ ឬ Refresh។
  - ✨ **AI Magic FX:** ចុចដំណើរការ AI Auto Dubbing ស្វ័យប្រវត្តិ។
- **Top Actions:** `Blur`, `Text`, `Sub`, `Med`, `Sav` (រក្សាទុក និង Export)។
- **Video Controls:** របារ Timecode (0:00 / 0:00), ប៊ូតុង `Color`, `<<`, Play/Pause ភ្លើង Neon, `>>`, និងប៊ូតុងប្តូរ Aspect Ratio (`9:16`, `16:9`, `1:1`)។
- **Bottom Dock:** Home, Dubbed, Subtitle, Voice, Profile។

---

### ២. ផ្ទាំងកំណត់រចនាសម្ព័ន្ធ Auto Run (Image 2)
- គណនី និងស្ថានភាពអាជ្ញាបណ្ណ៖ `tongchhunleng772@gmail.com` (សកម្ម ២៩ ថ្ងៃ) + ប៊ូតុង Log out។
- 🤖 **Transcript Model:** `⚡ Whisper Large-V3 Turbo + Silero VAD (Tr...`
- 🗣️ **ភាសានិយាយក្នុងវីដេអូ:** `🇨🇳 ចិន (Chinese - zh)`, អង់គ្លេស, ថៃ, កូរ៉េ, ជប៉ុន, វៀតណាម។
- 🌐 **Model បកប្រែ:** `⚡ Trabekprey-Turbo-Server (AI Turbo លឿន...)`, Google Gemini, Claude 3.5 Sonnet។
- 🎭 **សម្លេងបកប្រែ:** `🇰🇭 ខ្មែរ (Khmer - km)`, អង់គ្លេស, ថៃ, ចិន។
- 👥 **សម្លេងតួអង្គ:** `👤 Piseth (ប្រុស)`, `👩 Sreymom (ស្រី)`, `👥 Detect ប្រុស/ស្រី Auto` (មានប៊ូតុងតេស្តសម្លេងជាក់ស្ដែង)។
- ☑️ **💬 បង្ហាញ ម៉ូត Subtitle លើវីដេអូ (Burn Subtitles)**

---

## 🚀 របៀបដំណើរការតេស្តភ្លាមៗ (Run Locally)

បើក Terminal ក្នុង Folder នេះ រួចវាយ៖
```bash
npm run dev
```
រួចបើក Browser តាមរយៈ `http://localhost:5173` ដើម្បីមើល និងតេស្តកម្មវិធី។

---

## 📱 របៀប Build ចេញជា Android APK

គម្រោងនេះត្រូវបានបំពាក់ដោយ **Capacitor Android** រួចជាស្រេច នៅក្នុង folder `android/`៖

### វិធីទី១៖ បើកជាមួយ Android Studio (នៅលើកុំព្យូទ័រ)
1. បើកកម្មវិធី **Android Studio**
2. ចុច `Open` រួចជ្រើសរើស Folder `d:\2026\Apk Dubbing App\android`
3. រង់ចាំ Gradle Sync រួចចូលទៅកាន់ Menu: `Build` -> `Build Bundle(s) / APK(s)` -> `Build APK(s)`
4. អ្នកនឹងទទួលបាន file: `app-debug.apk` សម្រាប់ផ្ទេរទៅដំឡើងលើទូរស័ព្ទ Android!

### វិធីទី២៖ Build តាម GitHub Actions (មិនបាច់ដំឡើង Android Studio លើម៉ាស៊ីន)
1. Push កូដទាំងអស់នេះឡើងទៅ GitHub
2. GitHub Actions នឹងដំណើរការ script `.github/workflows/build-apk.yml` ដោយស្វ័យប្រវត្តិតែ ៣ នាទី
3. អ្នកអាចចុចទាញយក file `Panharith-Dubbing-V1.0-APK.zip` ពី GitHub Releases/Artifacts បានភ្លាមៗ!
