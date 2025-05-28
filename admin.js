import { db, collection, addDoc } from './firebase-config.js';

document.getElementById("news-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  if (!title || !content) {
    alert("Iltimos, barcha maydonlarni to'ldiring.");
    return;
  }

  try {
    await addDoc(collection(db, "news"), {
      title,
      content,
      createdAt: new Date()
    });

    alert("Ma'lumot muvaffaqiyatli qo'shildi!");
    document.getElementById("news-form").reset();
  } catch (error) {
    console.error("Xato:", error);
    alert("Xato: Ma'lumot qo'shilmadi.");
  }
});