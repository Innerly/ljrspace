const articles = {
  door: {
    date: "2026.05.30", category: "项目记录", title: "让机器人先学会找到回家的路",
    paragraphs: ["网球收集机器人最先遇到的问题，不是如何识别网球，而是如何在一次任务结束后稳定地回到可解释的位置。", "我把定位、建图和任务切换拆开验证：先用里程计确认运动状态，再让 GMapping 负责构建地图，最后交给任务仲裁器决定是继续导航还是进入视觉追踪。", "在 7 米轨迹上的漂移小于 0.10 m 之后，系统才真正有了继续迭代的地基。"]
  },
  june: {
    date: "2026.02.18", category: "研究笔记", title: "在不平衡数据里寻找更多样本",
    paragraphs: ["噬菌体蛋白功能分类中的困难，不只是类别少，而是少数类别很难被模型真正看见。", "生成式增强不是把样本数量简单变大，而是要先问：新样本是否保留了原始序列的结构约束，是否能让模型学习到不一样的边界。", "我把每一次增强都当作一个需要被验证的假设，记录来源、比例和对验证集的影响。"]
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
