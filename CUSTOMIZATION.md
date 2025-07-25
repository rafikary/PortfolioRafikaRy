# Portfolio Website Customization Guide

Panduan lengkap untuk mengkustomisasi website portfolio Anda.

## 🎯 Langkah-langkah Kustomisasi

### 1. Informasi Pribadi

#### Edit file `index.html`:

**Hero Section:**
```html
<!-- Ganti bagian ini -->
<h1>Halo, Saya <span class="highlight">NAMA_ANDA</span></h1>

<!-- Update bio -->
<p>Passionate Fullstack Developer dengan X+ tahun pengalaman...</p>

<!-- Update social links -->
<a href="https://github.com/USERNAME_ANDA" target="_blank">
<a href="https://linkedin.com/in/USERNAME_ANDA" target="_blank">
<a href="https://instagram.com/USERNAME_ANDA" target="_blank">
<a href="mailto:EMAIL_ANDA@example.com">
```

**About Section:**
```html
<!-- Update informasi kontak -->
<strong>Nama:</strong> <span>NAMA_LENGKAP_ANDA</span>
<strong>Email:</strong> <span>EMAIL_ANDA@example.com</span>
<strong>Phone:</strong> <span>+62 XXX-XXXX-XXXX</span>
<strong>Lokasi:</strong> <span>KOTA_ANDA, Indonesia</span>
```

### 2. Skills & Keahlian

#### Edit bagian Skills di `index.html`:

**Frontend Skills:**
```html
<div class="skill-item">
    <span>HTML5</span>
    <div class="skill-bar">
        <div class="skill-progress" data-width="95%"></div>
    </div>
</div>
<!-- Sesuaikan persentase dengan kemampuan Anda -->
```

**Tambah Skill Baru:**
```html
<div class="skill-item">
    <span>NAMA_SKILL</span>
    <div class="skill-bar">
        <div class="skill-progress" data-width="XX%"></div>
    </div>
</div>
```

### 3. Portfolio Projects

#### Edit file `js/script.js` di bagian `portfolioData`:

```javascript
const portfolioData = {
    1: {
        title: 'NAMA_PROJECT_ANDA',
        description: 'Deskripsi lengkap project Anda. Jelaskan fitur utama, tantangan yang dihadapi, dan solusi yang diterapkan.',
        image: 'assets/project1.jpg',
        tech: ['Technology', 'Stack', 'Used'],
        demo: 'https://link-demo-anda.com',
        github: 'https://github.com/username/repo-name'
    },
    // Tambahkan project lainnya...
};
```

#### Update Portfolio HTML:
```html
<!-- Update kategori filter sesuai kebutuhan -->
<button class="filter-btn" data-filter="web">Web App</button>
<button class="filter-btn" data-filter="mobile">Mobile App</button>
<button class="filter-btn" data-filter="YOUR_CATEGORY">Your Category</button>

<!-- Update portfolio items -->
<div class="portfolio-item" data-category="YOUR_CATEGORY">
    <!-- Content portfolio item -->
</div>
```

### 4. Contact Information

#### Edit file `contact.php`:
```php
$config = [
    'to_email' => 'email-anda@example.com',
    'to_name' => 'Nama Anda',
    'subject_prefix' => '[Portfolio Contact] ',
    // ... konfigurasi lainnya
];
```

#### Update Contact Section di `index.html`:
```html
<div class="contact-details">
    <h4>Email</h4>
    <p>email-anda@example.com</p>
</div>
<div class="contact-details">
    <h4>Phone</h4>
    <p>+62 XXX-XXXX-XXXX</p>
</div>
<div class="contact-details">
    <h4>Lokasi</h4>
    <p>Kota Anda, Indonesia</p>
</div>
```

### 5. Gambar & Media

#### Upload gambar ke folder `assets/`:

**Profile Images:**
- `profile.jpg` - Foto utama (400x400px, square)
- `about.jpg` - Foto untuk section about (landscape)

**Project Screenshots:**
- `project1.jpg` - Screenshot project pertama
- `project2.jpg` - Screenshot project kedua
- `project3.jpg` - Screenshot project ketiga
- `project4.jpg` - Screenshot project keempat

**Dokumen:**
- `cv.pdf` - File CV terbaru

**Tips Optimasi Gambar:**
- Ukuran maksimal: 500KB per gambar
- Format: JPG untuk foto, PNG untuk screenshot
- Gunakan tools seperti TinyPNG untuk kompresi

### 6. Warna & Theme

#### Edit file `css/style.css`:

**Color Variables:**
```css
:root {
    /* Ganti warna sesuai brand Anda */
    --primary-color: #YOUR_PRIMARY_COLOR;
    --secondary-color: #YOUR_SECONDARY_COLOR;
    --accent-color: #YOUR_ACCENT_COLOR;
    
    /* Gradient customization */
    --gradient-primary: linear-gradient(135deg, #COLOR1 0%, #COLOR2 100%);
}
```

**Popular Color Schemes:**
```css
/* Blue Theme */
--primary-color: #3182ce;
--secondary-color: #2c5aa0;

/* Green Theme */
--primary-color: #38a169;
--secondary-color: #2f855a;

/* Purple Theme */
--primary-color: #805ad5;
--secondary-color: #6b46c1;

/* Orange Theme */
--primary-color: #dd6b20;
--secondary-color: #c05621;
```

### 7. Typography

#### Ganti Google Font di `index.html`:
```html
<!-- Ganti Poppins dengan font pilihan Anda -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

#### Update CSS Font Family:
```css
body {
    font-family: 'Inter', sans-serif; /* Ganti sesuai font yang dipilih */
}
```

### 8. Typing Animation

#### Edit file `js/script.js`:
```javascript
const texts = [
    'Fullstack Developer',
    'YOUR_PROFESSION_1',
    'YOUR_PROFESSION_2',
    'YOUR_SPECIALIZATION',
    'YOUR_PASSION'
];
```

### 9. Meta Tags & SEO

#### Update `index.html`:
```html
<title>Nama Anda - Fullstack Developer</title>
<meta name="description" content="Portfolio Fullstack Developer - Deskripsi singkat tentang keahlian Anda">
<meta name="keywords" content="fullstack developer, web developer, nama anda, teknologi yang dikuasai">
<meta name="author" content="Nama Anda">

<!-- Open Graph Meta Tags -->
<meta property="og:title" content="Nama Anda - Fullstack Developer">
<meta property="og:description" content="Portfolio Fullstack Developer dengan pengalaman dalam teknologi modern">
<meta property="og:image" content="assets/profile.jpg">
<meta property="og:url" content="https://yourwebsite.com">
```

### 10. Testing Checklist

**Sebelum Go Live:**

- [ ] Test semua link internal dan eksternal
- [ ] Verify contact form berfungsi
- [ ] Test responsive design di berbagai device
- [ ] Optimize loading speed
- [ ] Test dark/light mode toggle
- [ ] Verify all images loaded correctly
- [ ] Check spelling dan grammar
- [ ] Test cross-browser compatibility
- [ ] Validate HTML & CSS
- [ ] Test accessibility features

### 11. Advanced Customizations

#### Menambah Section Baru:
```html
<!-- Tambahkan di index.html -->
<section id="experience" class="experience">
    <div class="container">
        <h2 class="section-title" data-aos="fade-up">Pengalaman</h2>
        <!-- Content experience -->
    </div>
</section>
```

#### Update Navigation:
```html
<!-- Tambahkan link di navbar -->
<a href="#experience" class="nav-link">Experience</a>
```

#### Custom CSS untuk Section Baru:
```css
/* Tambahkan di style.css */
.experience {
    padding: 100px 0;
    background: var(--bg-primary);
}
```

### 12. Performance Optimization

**Image Optimization:**
- Gunakan format WebP jika memungkinkan
- Implementasi lazy loading
- Compress gambar sebelum upload

**CSS/JS Optimization:**
- Minify CSS dan JavaScript untuk production
- Gunakan CDN untuk libraries
- Enable GZIP compression

**Caching:**
- Set proper cache headers
- Implement service worker untuk PWA

---

## 🚀 Quick Start Commands

```bash
# 1. Clone/Download repository
git clone https://github.com/your-repo/portfolio.git

# 2. Navigate to project
cd portfolio

# 3. Start XAMPP (Windows)
./start-server.bat

# 4. Open in browser
http://localhost/Portofolio
```

## 📞 Need Help?

Jika Anda membutuhkan bantuan dalam kustomisasi:

- Email: your-email@example.com
- Create issue di GitHub repository
- Join Discord community (jika ada)

---

**Happy Coding! 🎉**
