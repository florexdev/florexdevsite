import { PERSONAL_INFO, SYSTEM_INFO, SKILL_CATEGORIES, PROJECTS, EXPERIENCES, EDUCATIONS } from './systemData';

export interface CommandResult {
  output: string;
  action?: 'clear' | 'open_app';
  appToOpen?: string;
}

export function executeTerminalCommand(input: string): CommandResult {
  const trimmed = input.trim();
  const [cmd, ...args] = trimmed.split(' ');
  const lowerCmd = cmd.toLowerCase();

  if (!trimmed) {
    return { output: '' };
  }

  switch (lowerCmd) {
    case 'help':
      return {
        output: `Kullanılabilir Komutlar:
  - \x1b[34mneofetch\x1b[0m     : Sistem ve geliştirici özet bilgisi
  - \x1b[34mwhoami\x1b[0m       : Kullanıcı bilgisi
  - \x1b[34mabout\x1b[0m        : Burak Özdemir hakkında özet
  - \x1b[34mskills\x1b[0m       : Yetenekler ve teknolojiler listesi
  - \x1b[34mprojects\x1b[0m     : Geliştirilen projeler
  - \x1b[34mexperience\x1b[0m   : İş / staj deneyimleri
  - \x1b[34meducation\x1b[0m    : Eğitim bilgileri
  - \x1b[34mcontact\x1b[0m      : İletişim bilgileri ve bağlantılar
  - \x1b[34mclear\x1b[0m        : Terminal ekranını temizle`
      };

    case 'neofetch':
    case 'fetch':
      return {
        output: `\x1b[34m
   /\\       \x1b[1;37m${PERSONAL_INFO.nickname}\x1b[0m@\x1b[34m${SYSTEM_INFO.host}\x1b[0m
  /  \\      ------------------------------
 /\\   \\     \x1b[36mİsim:\x1b[0m    ${PERSONAL_INFO.name}
/      \\    \x1b[36mUnvan:\x1b[0m   ${PERSONAL_INFO.title}
/   ,,   \\  \x1b[36mEğitim:\x1b[0m  Bilecik Şeyh Edebali Üni (Bilgisayar Prog.)
/   |  |  -\\ \x1b[36mKonum:\x1b[0m   ${PERSONAL_INFO.location}
/_-''    ''-_\\\x1b[36mOS:\x1b[0m      ${SYSTEM_INFO.os}
            \x1b[36mShell:\x1b[0m   ${SYSTEM_INFO.shell}
            \x1b[36mWM:\x1b[0m      ${SYSTEM_INFO.wm}
            \x1b[36mEditör:\x1b[0m  ${SYSTEM_INFO.editor}
            \x1b[36mWebsite:\x1b[0m ${PERSONAL_INFO.website}
\x1b[0m`
      };

    case 'whoami':
      return {
        output: `${PERSONAL_INFO.name} (${PERSONAL_INFO.nickname}) — ${PERSONAL_INFO.title}\n${PERSONAL_INFO.location}`
      };

    case 'about':
      return {
        output: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.title}\n\n${PERSONAL_INFO.summary}`
      };

    case 'skills': {
      let result = `\x1b[1;34m=== YETENEKLER & TEKNOLOJİLER ===\x1b[0m\n\n`;
      SKILL_CATEGORIES.forEach(cat => {
        result += `\x1b[36m[${cat.category}]\x1b[0m\n`;
        cat.items.forEach(item => {
          result += `  • ${item.name.padEnd(24)} : ${item.level}\n`;
        });
        result += `\n`;
      });
      return { output: result.trimEnd() };
    }

    case 'projects': {
      let result = `\x1b[1;34m=== PROJELER ===\x1b[0m\n\n`;
      PROJECTS.forEach(p => {
        result += `★ \x1b[1m${p.title}\x1b[0m [${p.type}]\n  ${p.description}\n  \x1b[36mTeknolojiler:\x1b[0m ${p.tech.join(', ')}`;
        if (p.link) result += `\n  \x1b[34mLink:\x1b[0m ${p.link}`;
        result += `\n\n`;
      });
      return { output: result.trimEnd() };
    }

    case 'experience':
    case 'exp': {
      let result = `\x1b[1;34m=== İŞ & STAJ DENEYİMİ ===\x1b[0m\n\n`;
      EXPERIENCES.forEach(e => {
        result += `\x1b[1m${e.role}\x1b[0m — ${e.company} (${e.period}, ${e.location})\n`;
        e.tasks.forEach(t => {
          result += `  - ${t}\n`;
        });
        result += `\n`;
      });
      return { output: result.trimEnd() };
    }

    case 'education':
    case 'edu': {
      let result = `\x1b[1;34m=== EĞİTİM BİLGİSİ ===\x1b[0m\n\n`;
      EDUCATIONS.forEach(ed => {
        result += `\x1b[1m${ed.school}\x1b[0m\n${ed.degree} (${ed.period})\n`;
        ed.details.forEach(d => {
          result += `  - ${d}\n`;
        });
        result += `\n`;
      });
      return { output: result.trimEnd() };
    }

    case 'contact':
      return {
        output: `\x1b[1;34m=== İLETİŞİM BİLGİLERİ ===\x1b[0m
  E-posta : ${PERSONAL_INFO.email}
  WhatsApp: ${PERSONAL_INFO.whatsapp}
  Konum   : ${PERSONAL_INFO.location}
  Web     : https://${PERSONAL_INFO.website}
  GitHub  : ${PERSONAL_INFO.github}
  LinkedIn: ${PERSONAL_INFO.linkedin}`
      };

    case 'clear':
      return { output: '', action: 'clear' };

    case 'cat':
      if (args[0] === 'ozgecmis.md' || args[0] === 'cv.md') {
        return {
          output: `# ${PERSONAL_INFO.name}\n## ${PERSONAL_INFO.title}\n\n${PERSONAL_INFO.summary}`
        };
      }
      return { output: `cat: ${args[0] || 'dosya'}: Dosya bulunamadı.` };

    default:
      return {
        output: `zsh: komut bulunamadı: \x1b[31m${cmd}\x1b[0m. Mevcut komutlar için '\x1b[34mhelp\x1b[0m' yazabilirsiniz.`
      };
  }
}
