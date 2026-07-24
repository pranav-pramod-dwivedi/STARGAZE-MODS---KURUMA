

<div align="center">

![Kuruma Mods Cover Banner](IMG/Gemini_Generated_Image_n8kv89n8kv89n8kv-clean.png)
# ⚡ STARGAZE MODS
`Antiban Free Fire Game MOD ESP PANEL [root]`

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

## ── [ FEATURES ] ──

###  AIMBOT
* **Direct Memory Pointer Hooking:** Intercepts active player transform structures (`Transform_GetPosition`) to compute exact XYZ relative coordinate matrices instantly.
* **Dynamic FOV Matrix Scaler:** Implements an interactive field-of-view bounding circle. The calculation loop discards any entity vectors falling outside the user-defined radial pixel tolerance.
* **Organic Smooth Math Drag:** Utilizes advanced linear interpolation (LERP) algorithms and bezier curve smoothing to mimic human finger friction, successfully evading automated server-side heuristic detection models.
* **Target Priority Sorting:** Real-time distance, health, or crosshair-proximity sorting algorithms ensure the injection engine locks onto the optimal tactical target.

###  ADVANCED ESP
* **Chams Overlay (Depth Buffer Manipulation):** Forces custom structural material rendering models by patching OpenGL depth test functions (`glDepthFunc`), making entities visible behind solid geometry.
* **Skeletal Wireframe Mapping:** Queries the client-side bone array matrices (`GetBoneTransform`) to map multi-joint skeletons, real-time animation postures, and directional vectors.
* **Dynamic Bounding Boxes & Distance Arrays:** Draws real-time 2D/3D bounding boxes around entities, integrated with a live mathematical rangefinder calculating distance variables down to the millisecond.
* **Resource & Drop Radar:** Filters and projects ground item drop IDs, supply drop crates, and vehicle coordinates onto an independent radar UI configuration.

### SECURITY BYPASS [ANTIBAN]
* **Memory Address Masking:** Dynamically freezes, unfreezes, and hides modified memory values within random virtual address spaces to mitigate real-time active scanning sweeps.
* **Log Invalidation & Voiding:** Hooks directly into native logging systems (`__android_log_print`) to intercept, drop, and wipe security error flags before they are compiled or transmitted.
* **System Properties Spoofer:** Emulates clean, non-rooted device identification signatures to obfuscate the presence of superuser environments from integrity checks.

---

## ── [ GALLERY ] ──

### 📱 SCREENSHOTS (ANDROID)

<div align="center">
  <img src="IMG/photo_2026-07-24 09.44.23.jpeg" width="30%" alt="Menu UI Hook Overview" />
  <img src="IMG/photo_2026-07-24 09.44.26.jpeg" width="30%" alt="ESP Configuration Arrays" />
  <img src="IMG/photo_2026-07-24 09.44.29.jpeg" width="30%" alt="Memory Injection Terminal Console" />
</div>

### 🖥️ SCREENSHOTS (WINDOWS [BLUESTACKS])

<div align="center">
  <img src="IMG/photo_2026-07-24 09.47.57.jpeg" width="95%" alt="In-Game HUD Overlay Grid View" /><br/><br/>
  <img src="IMG/photo_2026-07-24 09.48.00.jpeg" width="95%" alt="Active Entity Telemetry Display HUD" /><br/><br/>
  <img src="IMG/photo_2026-07-24 09.47.59.jpeg" width="95%" alt="Bypass System Diagnostics Matrix Interface" />
</div>

---


