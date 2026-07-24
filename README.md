# ⚡ KURUMA MODS // THEATER OF WAR EXECUTIVE MEMORY ENGINE

<div align="center">

![Kuruma Mods Cover Banner](path/to/cover_pic.png)

`Rule the theater of war with an unyielding aim and sight that knows no shadow.`

![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen)
![Kernel Hook](https://img.shields.io/badge/Kernel-Hooked-blue)
![Architecture](https://img.shields.io/badge/Arch-ARM64--v8a-orange)
![Language](https://img.shields.io/badge/Language-C%2B%2B%20%7C%20Assembly-red)

</div>

---

## ── [ SYSTEM OVERVIEW & ARCHITECTURE ] ──

`Kuruma Mods` is an advanced runtime injection suite engineered exclusively for low-level memory manipulation, pointer offset manipulation, and dynamic overlay rendering within modern mobile environments. Operating inside the Android user-space and kernel layers, this panel utilizes Superuser (SU) privileges to attach to active process IDs (PIDs), allowing analysis of 3D coordinate matrices, player entities, and vector calculations in real time.

By hooking into the native graphics rendering pipeline (OpenGL ES / Vulkan API) and the game's centralized memory space (`libil2cpp.so`), Kuruma Mods outputs real-time tactical telemetry directly onto an isolated system overlay layer.

> **[!] CRITICAL WARNING & LEGAL MANIFESTO:** This framework is published strictly for educational validation, digital forensics, reverse-engineering coursework, and memory-hooking research. Executing these scripts against live commercial production servers violates third-party Terms of Service (ToS) and End User License Agreements (EULA). The developers assume zero liability for downstream mitigation or account suspensions.

---

## ── [ DEEP-DIVE TECHNICAL SPECIFICATIONS ] ──

### 🎯 INFALLIBLE AIM ENGINE (VECTOR INTERCEPTION)
* **Direct Memory Pointer Hooking:** Intercepts active player transform structures (`Transform_GetPosition`) to compute exact XYZ relative coordinate matrices instantly.
* **Dynamic FOV Matrix Scaler:** Implements an interactive field-of-view bounding circle. The calculation loop discards any entity vectors falling outside the user-defined radial pixel tolerance.
* **Organic Smooth Math Drag:** Utilizes advanced linear interpolation (LERP) algorithms and bezier curve smoothing to mimic human finger friction, successfully evading automated server-side heuristic detection models.
* **Target Priority Sorting:** Real-time distance, health, or crosshair-proximity sorting algorithms ensure the injection engine locks onto the optimal tactical target.

### 👁️ OMNIPRESENT VISUAL TELEMETRY (ADVANCED ESP)
* **Chams Overlay (Depth Buffer Manipulation):** Forces custom structural material rendering models by patching OpenGL depth test functions (`glDepthFunc`), making entities visible behind solid geometry.
* **Skeletal Wireframe Mapping:** Queries the client-side bone array matrices (`GetBoneTransform`) to map multi-joint skeletons, real-time animation postures, and directional vectors.
* **Dynamic Bounding Boxes & Distance Arrays:** Draws real-time 2D/3D bounding boxes around entities, integrated with a live mathematical rangefinder calculating distance variables down to the millisecond.
* **Resource & Drop Radar:** Filters and projects ground item drop IDs, supply drop crates, and vehicle coordinates onto an independent radar UI configuration.

### 🛡️ ANOMALY BYPASS & HEURISTIC SHIELDING
* **Memory Address Masking:** Dynamically freezes, unfreezes, and hides modified memory values within random virtual address spaces to mitigate real-time active scanning sweeps.
* **Log Invalidation & Voiding:** Hooks directly into native logging systems (`__android_log_print`) to intercept, drop, and wipe security error flags before they are compiled or transmitted.
* **System Properties Spoofer:** Emulates clean, non-rooted device identification signatures to obfuscate the presence of superuser environments from integrity checks.

---

## ── [ VISUAL DEPLOYMENT SPREAD ] ──

### 📱 MOBILE FIELD TELEMETRY (PORTRAIT TELEMETRY)

<div align="center">
  <img src="path/to/portrait_screenshot1.png" width="30%" alt="Menu UI Hook Overview" />
  <img src="path/to/portrait_screenshot2.png" width="30%" alt="ESP Configuration Arrays" />
  <img src="path/to/portrait_screenshot3.png" width="30%" alt="Memory Injection Terminal Console" />
</div>

### 🖥️ TACTICAL OVERVIEW LAYOUT (LANDSCAPE MATRIX)

<div align="center">
  <img src="path/to/landscape_screenshot1.png" width="95%" alt="In-Game HUD Overlay Grid View" /><br/><br/>
  <img src="path/to/landscape_screenshot2.png" width="95%" alt="Active Entity Telemetry Display HUD" /><br/><br/>
  <img src="path/to/landscape_screenshot3.png" width="95%" alt="Bypass System Diagnostics Matrix Interface" />
</div>

---

## ── [ DETAILED DIRECTORY TREE ] ──

```text
kuruma-mods-executive/
├── .github/                  # Repository workflow automated configurations
├── assets/                   # Static brand images, icons, and UI rendering models
├── bypass/                   # Anti-cheat mitigation, memory masking, log voids
│   ├── log_nullifier.cpp     # Intercepts and drops system logging events
│   └── signature_cloner.h    # Spoofs valid device identification tokens
├── core/                     # Native memory hacking backend engines
│   ├── aimbot_calc.cpp       # Vector mathematics and LERP smoothing logic
│   ├── esp_driver.cpp        # OpenGL texturing, chams rendering, bone queries
│   └── injector.sh           # Linux shell root injector initializer script
├── overlay/                  # High-performance ImGui floating UI frameworks
│   ├── fonts/                # Hardcoded terminal monospace text styles
│   └── floating_window.h     # Input touch event passthrough management layer
├── CMakeLists.txt            # Cross-compilation configuration file for Android NDK
└── README.md                 # System operations manual text documentation
