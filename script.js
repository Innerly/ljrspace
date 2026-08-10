const articles = {
  rudin: {
    date: "持续更新", category: "学习笔记", title: "Rudin 的数学分析",
    paragraphs: ["以 Rudin《数学分析原理》为主线，记录每一章中需要反复回看的定义、命题和证明结构。", "笔记会重点区分直觉、严格表述与证明中的关键步骤，并把容易混淆的概念放在同一处比较。", "每次完成一组习题后，会补充可复用的解题思路和仍待澄清的问题。"]
  },
  control: {
    date: "持续更新", category: "学习笔记", title: "控制理论学习笔记",
    paragraphs: ["从线性系统的状态空间表达出发，逐步整理可控性、可观性、稳定性和反馈设计之间的关系。", "每篇笔记都会保留模型假设、推导过程和简单例子，帮助把公式和系统行为对应起来。", "后续将逐步加入经典控制、现代控制与机器人控制中的具体问题。"]
  },
  papers: {
    date: "持续更新", category: "阅读笔记", title: "论文阅读笔记",
    paragraphs: ["每篇阅读笔记围绕一个明确问题展开：作者试图解决什么、为什么现有方法不足、核心方法依赖哪些假设。", "同时记录数据集、基线、评价指标与失败条件，避免只保留结论而丢失可复现的上下文。", "对于值得跟进的工作，会补充代码、实验复现和后续问题。"]
  },
  empty: {
    date: "2026.05.30", category: "项目", title: "一台网球收集机器人，如何学会绕开障碍",
    paragraphs: ["真正的自主，不是让机器人一直向前，而是让它在遇到新信息时知道什么时候停下来重新判断。", "在项目里，我用一个 20 Hz 的任务仲裁器管理导航、视觉追踪和回收动作，让每个状态都能被单独测试，也能被下一次实验复盘。"]
  },
  rain: {
    date: "2026.02.18", category: "研究", title: "严重类别不平衡下的蛋白质分类",
    paragraphs: ["当少数类别只占训练数据的一小部分时，准确率很容易制造一种虚假的安全感。真正需要观察的是少数类的召回，以及模型是否学到了可迁移的特征。", "EAGP 项目让我重新理解数据增强：它不是训练阶段的装饰，而是整个建模假设的一部分。"]
  },
  zen: {
    date: "2025.12.08", category: "阅读", title: "读论文时，如何记录一个真正可复现的想法",
    paragraphs: ["读到一个漂亮的结果时，我现在会先记下数据、基线和失败条件，而不是只保存结论。", "一条能够被别人重新跑出来的想法，才真正从阅读变成了研究资产。"]
  },
  review: {
    date: "2025.10.21", category: "研究", title: "把实验指标写成团队都能读懂的句子",
    paragraphs: ["指标不是结果的装饰，而是团队对问题的共同定义。每一个数字都应该能回答：在哪个数据集上、和谁相比、改善了什么。", "当指标被写成完整的句子，复盘就不再只是看表格，而是重新检查我们的判断。"]
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
