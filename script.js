const articles = {
  door: {
    date: "2025.06.24", category: "工作笔记", title: "给复杂系统留一扇可以推开的门",
    paragraphs: ["复杂不是问题，突然被迫理解复杂才是。后台产品往往承载了业务长期生长出的全部枝杈，设计的责任并不是把枝杈藏起来，而是让人知道自己从哪里可以开始。", "我越来越喜欢先做一个能完成任务的窄入口：少一点默认选项，少一点系统内部的语言。等用户带着明确目的走近，再把下一层信息交到他手上。", "好的渐进披露像一扇虚掩的门。它不替人决定要不要进门，但光线已经从门缝里透出来了。"]
  },
  june: {
    date: "2025.06.18", category: "书与电影", title: "六月读到的五个小念头",
    paragraphs: ["一，节奏不是速度。二，空白是叙事的一部分。三，真正的专注常常从一次毫无功利的散步开始。", "这个月的阅读很零碎，像在不同的句子间搭临时的桥。它们没有汇成一条结论，却让我更愿意相信：保留一些未完成，也是一种诚实。", "把这五个念头记下，不是为了以后遵循，而是为了在需要的时候重新遇见它们。"]
  },
  empty: {
    date: "2025.06.28", category: "设计", title: "从一个空状态，重新认识产品的耐心",
    paragraphs: ["空状态经常被当作需要尽快填满的地方。可是第一次来到这里的人，眼前的空白恰好是产品最安静、也最诚实的一次自我介绍。", "比起一段冗长的说明，更重要的是一个清楚的动作，和一个不催促人的理由。产品的耐心，藏在它能不能允许用户先看看、再决定。"]
  },
  rain: {
    date: "2025.06.12", category: "生活", title: "雨天在永嘉路散步",
    paragraphs: ["雨落下来以后，街道突然有了更明确的边界。咖啡店的灯、梧桐的叶子和路边的积水，像被重新擦拭过。", "我沿着永嘉路慢慢走，没有要抵达的地方。这样的下午，城市没有要求我解释任何事。"]
  },
  zen: {
    date: "2025.05.29", category: "阅读", title: "重读《禅与摩托车维修艺术》的一些旁枝",
    paragraphs: ["第二次读这本书，记住的不是那些宏大的命题，而是修理一件具体物品时的注意力。那种注意力不浪漫，却让人踏实。", "也许所谓品质，首先是一种不逃离眼前细节的方式。"]
  },
  review: {
    date: "2025.05.08", category: "设计", title: "让设计评审成为一次共同写作",
    paragraphs: ["评审不应该是交作业。更理想的状态是，所有人围着一个还没写完的句子，补上自己知道的那部分。", "当问题被摆在桌面上，设计师不再负责捍卫一张页面，而是帮助团队一起找到更准确的表达。"]
  }
};

const dialog = document.querySelector(".article-dialog");
const title = document.querySelector("#dialog-title");
const date = document.querySelector("#dialog-date");
const category = document.querySelector("#dialog-category");
const content = document.querySelector("#dialog-content");

document.querySelectorAll(".article-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const article = articles[trigger.dataset.article];
    date.textContent = article.date;
    category.textContent = article.category;
    title.textContent = article.title;
    content.replaceChildren(...article.paragraphs.map((paragraph) => {
      const element = document.createElement("p");
      element.textContent = paragraph;
      return element;
    }));
    dialog.showModal();
  });
});

document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });

const filters = document.querySelectorAll(".filter");
const rows = document.querySelectorAll(".article-row");
const empty = document.querySelector(".empty-state");
filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    filters.forEach((item) => item.classList.toggle("active", item === filter));
    let count = 0;
    rows.forEach((row) => {
      const visible = filter.dataset.filter === "all" || row.dataset.category === filter.dataset.filter;
      row.hidden = !visible;
      if (visible) count += 1;
    });
    empty.hidden = count > 0;
  });
});

const menu = document.querySelector(".mobile-nav");
const menuButton = document.querySelector(".menu-toggle");
menuButton.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("title", open ? "关闭导航" : "打开导航");
  menuButton.setAttribute("aria-label", open ? "关闭导航" : "打开导航");
  menuButton.innerHTML = `<i data-lucide="${open ? "x" : "menu"}"></i>`;
  lucide.createIcons();
});
menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  menu.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));

lucide.createIcons();
