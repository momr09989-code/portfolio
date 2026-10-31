// notify.js — إشعار عاجل على الموبايل عبر ntfy.sh لما الإيجنت يخلص المهمة
const fs = require("fs");
const path = require("path");

// قراءة NTFY_TOPIC من ملف .env (الملف مستبعد من git عشان محدش يعرف اسم القناة)
function loadTopic() {
  if (process.env.NTFY_TOPIC) return process.env.NTFY_TOPIC;
  const envPath = path.join(__dirname, ".env");
  if (!fs.existsSync(envPath)) return null;
  const match = fs
    .readFileSync(envPath, "utf8")
    .replace(/^\uFEFF/, "")
    .match(/^\s*NTFY_TOPIC\s*=\s*(.+?)\s*$/m);
  return match ? match[1] : null;
}

const message =
  process.argv[2] ||
  "أهلاً يا باشمهندس عمر، الإيجنت خلص المهمة ورفع الكود على جيت هاب بنجاح. تقدر تراجع الشغل دلوقتي.";

async function notify() {
  const topic = loadTopic();
  if (!topic) {
    console.error("NTFY_TOPIC مش موجود في .env");
    process.exit(1);
  }

  try {
    console.log("جاري إرسال الإشعار على الموبايل...");
    const response = await fetch(`https://ntfy.sh/${topic}`, {
      method: "POST",
      body: message,
      headers: {
        Title: "Task Completed",
        Priority: "urgent", // أعلى أولوية: صوت مستمر + اهتزاز حتى والموبايل مقفول
        Tags: "white_check_mark,rotating_light",
      },
    });

    if (response.ok) {
      console.log("تم إرسال الإشعار بنجاح!");
    } else {
      console.error(`فشل الإرسال: ${response.status} ${await response.text()}`);
      process.exit(1);
    }
  } catch (error) {
    console.error("خطأ:", error);
    process.exit(1);
  }
}

notify();
