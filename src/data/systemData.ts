export interface SkillCategory {
  category: string;
  items: { name: string; level: string; note?: string }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link?: string;
  linkText?: string;
  type: 'Web' | 'Game' | 'Open Source';
  badge?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  tasks: string[];
}

export interface EducationItem {
  school: string;
  degree: string;
  period: string;
  details: string[];
}

export interface CertificateItem {
  name: string;
  issuer: string;
  date: string;
}

export interface LanguageItem {
  language: string;
  level: string;
}

export const PERSONAL_INFO = {
  name: "Burak Özdemir",
  nickname: "florexdev",
  title: "Junior Web Developer",
  summary: "Bilgisayar Programcılığı öğrencisiyim. HTML, CSS, JavaScript ve modern web teknolojileri ile kullanıcı odaklı web uygulamaları geliştiriyorum. Kendimi özellikle frontend geliştirme alanında ilerletiyor, yeni teknolojileri öğrenmeye önem veriyorum.",
  email: "florexdev@proton.me",
  whatsapp: "https://wa.me/905050483471?text=Merhaba,%20florexdev.com.tr%20%C3%BCzerinden%20size%20ula%C5%9Ft%C4%B1m!",
  location: "Bursa, Türkiye",
  website: "florexdev.com.tr",
  github: "https://github.com/florexdev",
  linkedin: "https://linkedin.com/in/florexdev",
  itchio: "https://florexdev.itch.io/bloom"
};

export const SYSTEM_INFO = {
  os: "Arch Linux x86_64",
  host: "burak-thinkpad",
  kernel: "Linux 6.12.9-arch1",
  uptime: "14 hours, 28 mins",
  packages: "842 (pacman)",
  shell: "zsh 5.9 (pure prompt)",
  wm: "Hyprland / Wayland",
  editor: "VS Code / Neovim",
  developer: "Burak Özdemir (florexdev)"
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    role: "Bilgi İşlem Stajyeri",
    company: "Marsala Textile",
    period: "2024-09 — 2025-06",
    location: "Bursa",
    tasks: [
      "Sunucu (Server) odasının fiziksel altyapı ve kablolama düzeninin sağlanmasına teknik destek verilmesi.",
      "Üretim ve ofis alanlarındaki network (internet) hatlarının çekilmesi ve donanımsal cihaz kontrollerinin yapılması.",
      "Departmana gelen teknik destek taleplerinin karşılanması ve ilgili birimlere aktarılması."
    ]
  }
];

export const EDUCATIONS: EducationItem[] = [
  {
    school: "Bilecik Şeyh Edebali Üniversitesi",
    degree: "Ön Lisans - Bilgisayar Programcılığı",
    period: "2025-10 — Halen",
    details: [
      "Yazılım geliştirme, veri tabanı ve bilgisayar ağları üzerine eğitim alıyorum.",
      "Web geliştirme ve modern JavaScript teknolojileri üzerine çalışmalar yapıyorum.",
      "Algoritma ve nesne yönelimli programlama becerilerimi geliştiriyorum."
    ]
  },
  {
    school: "Öztimurlar Mesleki ve Teknik Anadolu Lisesi",
    degree: "Lise Diploması - Bilişim Teknolojileri",
    period: "2020-09 — 2025-06",
    details: [
      "HTML, CSS ve JavaScript ile web uygulamaları geliştirdim.",
      "C#, Python ve Java kullanarak temel ve orta seviye projeler geliştirdim.",
      "Algoritma, veritabanı ve yazılım geliştirme temelleri üzerine eğitim aldım.",
      "Takım çalışması ve proje geliştirme süreçlerinde aktif rol aldım."
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Frontend",
    items: [
      { name: "HTML5", level: "İleri Seviye" },
      { name: "CSS3", level: "İleri Seviye" },
      { name: "JavaScript (ES6+)", level: "Orta-İleri" },
      { name: "Responsive Design", level: "İleri Seviye" },
      { name: "React & Modern UI", level: "Temel-Orta" }
    ]
  },
  {
    category: "Backend & Veritabanı",
    items: [
      { name: "Python", level: "Temel-Orta" },
      { name: "C#", level: "Temel-Orta" },
      { name: "SQL", level: "Temel" },
      { name: "Go (Temel Ağ & API)", level: "Temel" }
    ]
  },
  {
    category: "Araçlar & Ortam",
    items: [
      { name: "Git & GitHub", level: "Orta Seviye" },
      { name: "VS Code", level: "İleri Seviye" },
      { name: "Linux / Arch", level: "Günlük Kullanım" },
      { name: "SEO Basics", level: "Temel Seviye" }
    ]
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "lanshare",
    title: "LANShare",
    type: "Web",
    description: "Web tabanlı yerel ağ dosya paylaşım uygulaması. Aynı ağdaki cihazlar arasında hızlı ve kolay dosya transferi sağlar. Responsive arayüz ve kullanıcı dostu deneyim hedeflenmiştir.",
    tech: ["HTML5", "CSS3", "JavaScript", "Go"],
    badge: "Local Network Tool"
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    type: "Web",
    description: "Kişisel portföy sitesi. Projelerimi, becerilerimi ve iletişim bilgilerimi sergilemek amacıyla geliştirildi. Responsive tasarım ve SEO odaklı yapı kullanıldı.",
    tech: ["HTML5", "CSS3", "JavaScript", "React"],
    link: "https://www.florexdev.com.tr",
    linkText: "florexdev.com.tr"
  },
  {
    id: "bloom",
    title: "Bloom",
    type: "Game",
    description: "Hanahaki Disease temasından ilham alan psikolojik hikâye tabanlı oyun. Oyuncu seçimlerine göre değişen çoklu sonlar, diyalog sistemi ve atmosferik oyun deneyimi sunar.",
    tech: ["Unity", "C#"],
    link: "https://florexdev.itch.io/bloom",
    linkText: "itch.io/bloom"
  },
  {
    id: "openutau",
    title: "OpenUtau Turkish Localization",
    type: "Open Source",
    description: "OpenUtau açık kaynak projesine Türkçe dil desteği eklendi. Arayüz çevirileri hazırlanarak GitHub üzerinden katkı sağlandı.",
    tech: ["XML", "Git", "GitHub"],
    badge: "Katkı / Çeviri"
  }
];

export const CERTIFICATES: CertificateItem[] = [
  {
    name: "Uygulamalı Giriş: Python",
    issuer: "LinkedIn Learning",
    date: "2026-08"
  },
  {
    name: "Seviye Atlayın: Python",
    issuer: "LinkedIn Learning",
    date: "2026-08"
  }
];

export const LANGUAGES: LanguageItem[] = [
  { language: "Türkçe", level: "Ana Dil" },
  { language: "İngilizce", level: "B2 (Orta-İleri)" },
  { language: "Japonca", level: "Başlangıç Seviyesi" }
];

export const DESKTOP_SHORTCUTS = [
  { id: "about", name: "ozgecmis.md", icon: "FileText", app: "about", color: "#60a5fa" },
  { id: "projects", name: "projeler", icon: "FolderGit2", app: "projects", color: "#38bdf8" },
  { id: "skills", name: "yetenekler.txt", icon: "Code2", app: "skills", color: "#34d399" },
  { id: "terminal", name: "terminal", icon: "Terminal", app: "terminal", color: "#a78bfa" },
  { id: "contact", name: "iletisim.vcf", icon: "Mail", app: "contact", color: "#f472b6" }
];
