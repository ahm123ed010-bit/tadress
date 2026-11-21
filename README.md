# تدريس — Tadris

منصة للمدرس والطالب بالعربي والإنجليزي: أدمن، مدرس، طالب. حضور بـ QR وتقييد بالموقع (وتسجيل حضور بدون نت)، واجبات، امتحانات (صورة ورقة الامتحان + إجابات الطالب تحتها، أو أسئلة مكتوبة)، درجات، فيديوهات (رابط أو رفع من الجهاز)، إعلانات، جدول، وضع ليلي، وتثبيت على الشاشة الرئيسية.

## الملفات (ارفعها كلها في نفس المكان على GitHub)
`index.html` · `sw.js` · `manifest.webmanifest` · `icon-192.png` · `icon-512.png` · `README.md`

## 1) النشر على GitHub Pages
Settings → Pages → Branch: main → Folder: / (root) → Save.

## 2) ربط قاعدة بيانات (عشان البيانات تتشارك بين الأجهزة)
1. حساب مجاني على supabase.com وأنشئ Project.
2. من **SQL Editor** شغّل:
```sql
create table items (coll text not null, id text not null, data jsonb not null, primary key (coll, id));
alter table items enable row level security;
create policy "open" on items for all using (true) with check (true);
insert into storage.buckets (id, name, public) values ('files', 'files', true);
create policy "open_files" on storage.objects for all using (bucket_id = 'files') with check (bucket_id = 'files');
```
3. من **Project Settings → API** انسخ **Project URL** والمفتاح.
4. في أول `index.html` غيّر السطر:
```js
const SB_URL='https://xxxx.supabase.co',SB_KEY='المفتاح';
```
5. ارفع الملف المعدّل، وافتح الموقع **أنت الأول** وأنشئ حساب الأدمن.

## التثبيت على الموبايل
- أندرويد (Chrome): من صفحة الدخول زر "تثبيت التطبيق" أو القائمة ← Add to Home screen.
- آيفون (Safari): مشاركة ← إضافة إلى الشاشة الرئيسية.

## الحضور بدون نت
افتح الموقع مرة واحدة وانت متصل (عشان يتخزن على الجهاز). بعدها من صفحة الدخول: اكتب الاسم واليوزر وصوّر الـ QR. الحضور بيتأكد تلقائي أول ما النت يرجع. على آيفون القارئ بيحتاج نت أول مرة بس.

## تنبيهات
- الأمان محدود: المفتاح ظاهر في الملف والسياسات مفتوحة، فمتحطش بيانات حساسة.
- رفع الفيديو في الخطة المجانية لحد 50MB للملف و1GB إجمالي.
- بعد أي تحديث للموقع قد تحتاج تفتحه مرتين عشان النسخة الجديدة تظهر.
