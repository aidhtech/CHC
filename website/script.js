const body = document.body;
const languageToggle = document.querySelector(".language-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const countdown = document.querySelector(".countdown");
const floatingActions = document.querySelector(".floating-actions");

const tabs = ["home", "rules", "submission", "training", "integrity", "ip", "resources", "registration", "contact"];

function lang(zh, en, tag = "span") {
  return `<${tag} data-lang="zh">${zh}</${tag}><${tag} data-lang="en">${en}</${tag}>`;
}

function paragraphPair(zh, en) {
  return `<div class="bilingual-pair">${lang(zh, en, "p")}</div>`;
}

function storyCard(label, zhTitle, enTitle, body) {
  return `<article class="story-card"><span class="section-label">${label}</span>${lang(zhTitle, enTitle, "h3")}${body}</article>`;
}

function miniCard(zhTitle, enTitle, zhBody, enBody) {
  return `<article class="mini-card"><b>${lang(zhTitle, enTitle)}</b>${lang(zhBody, enBody, "p")}</article>`;
}

function clauseCard(zh, en) {
  return `<aside class="clause-card"><strong>${lang("條款 / Clause", "Clause")}</strong>${paragraphPair(zh, en)}</aside>`;
}

function list(items, className = "rule-list") {
  return `<ul class="${className}">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

const examples = [
  {
    titleZh: "生成式 AI 協助經典閱讀",
    titleEn: "Generative AI for Classical Reading",
    zh: "應用生成式 AI 協助經典文本導讀、翻譯比較、註釋設計、學習活動或互動問答。",
    en: "Use generative AI to support guided reading of classical texts, comparative translation, annotation design, learning activities or interactive Q&A."
  },
  {
    titleZh: "NLP、NER、知識圖譜與 GIS",
    titleEn: "NLP, NER, Knowledge Graphs and GIS",
    zh: "運用 NLP、NER、知識圖譜、GIS、資料視覺化等方法分析古典文本或歷史材料。",
    en: "Apply NLP, NER, knowledge graphs, GIS and data visualisation to analyse classical texts or historical materials."
  },
  {
    titleZh: "自動化 AI Agent Workflow",
    titleEn: "Automated AI Agent Workflow",
    zh: "設計自動化 AI agent workflow，把「提取史料／文本 -> 組織與標註資料 -> 分析內容與關係 -> 數位化呈現與傳播」串連為完整流程，並說明其在古典文本研究、歷史材料分析、教學設計或公共傳播中的作用。",
    en: "Design an automated AI agent workflow that connect source / text extraction -> data organisation and annotation -> content and relationship analysis -> digital presentation and dissemination into an integrated process, and explain its role in classical text research, historical-material analysis, instructional design, or public communication."
  },
  {
    titleZh: "AI-enhanced DH Tools",
    titleEn: "AI-enhanced DH Tools",
    zh: "結合 AI-enhanced DH tools（如 CBDB、MARKUS、DocuSky 及台北中研院數位人文研究平台）進行文本標註、人物／地名抽取、資料比對、語料管理與視覺化分析。",
    en: "Integrate AI-enhanced DH tools (e.g. CBDB, MARKUS, DocuSky, and the Taipei Academia Sinica Digital Humanities Research Platform) for text annotation, extraction of persons and place names, data comparison, corpus management, and visual analysis."
  },
  {
    titleZh: "資料集、模型與檢索工具",
    titleEn: "Datasets, Models and Retrieval Tools",
    zh: "建立與古典文獻、人物、地名、概念、圖像相關的資料集、模型或檢索工具。",
    en: "Build datasets, models or retrieval tools related to classical texts, historical figures, place names, concepts or images."
  },
  {
    titleZh: "AR、VR、空間運算與多模態敘事",
    titleEn: "AR, VR, Spatial Computing and Multimodal Storytelling",
    zh: "利用 AR/VR、空間運算、多模態敘事等方式重構古典學習、古籍展示或文化傳播體驗。",
    en: "Use AR/VR, spatial computing or multimodal storytelling to reimagine classical learning, rare-book presentation or cultural communication."
  },
  {
    titleZh: "古典語言與跨文化經典",
    titleEn: "Classical Languages and Cross-cultural Classics",
    zh: "古典語言（如古典漢語、梵文等）的文本分析、翻譯比較或語音／誦讀重構，以及跨文化經典的接受史與詮釋研究。",
    en: "Text analysis, comparative translation, or speech/recitation reconstruction of classical languages (e.g. Classical Chinese, Sanskrit); and reception-history and interpretation studies of cross-cultural classics."
  }
];

const programmes = [
  ["人文學科課程組合", "Bachelor's Degree Scheme in Humanities"],
  ["中國歷史及文化（榮譽）文學士", "BA (Hons) in Chinese History and Culture"],
  ["英文及應用語言學（榮譽）文學士", "BA (Hons) in English and Applied Linguistics"],
  ["語言學及翻譯學（榮譽）文學士", "BA (Hons) in Linguistics and Translation"],
  ["語言科學與語言數據分析（榮譽）理學士", "BSc (Hons) in Language Science and Analytics"],
  ["言語治療（榮譽）理學士", "BSc (Hons) in Speech Therapy"]
];

const forms = [
  {
    titleZh: "研究型作品",
    titleEn: "Research-oriented Work",
    zh: "透過數位人文技術與量化分析，對古典文獻的數據進行分析與比較。",
    en: "Utilizing digital humanities technologies and quantitative methods to analyze and compare data derived from classical texts.",
    outputsZh: "資料集、文本語料庫、圖表、地圖、網絡（如人物關係網絡／社交網絡）、地理信息系統（GIS）、知識圖譜、翻譯比較研究、古典文本分析",
    outputsEn: "Datasets, Text Corpora, Charts, Maps, Networks (e.g., character relationship networks / Social Network), Geographic Information Systems (GIS), Knowledge Graphs, Comparative Translation Studies, Classical Text Analysis."
  },
  {
    titleZh: "工具型作品",
    titleEn: "Tool-oriented Work",
    zh: "開發專為處理古典文獻的工具，提升資料處理效率。",
    en: "Developing software or tools specifically designed for processing classical texts to enhance data processing efficiency.",
    outputsZh: "光學字元辨識工具、自然語言處理工具、檢索系統、AI Agent、圖像分類模型",
    outputsEn: "Optical Character Recognition (OCR) Tools, Natural Language Processing (NLP) Tools, Information Retrieval Systems, AI Agents, Image Classification Models."
  },
  {
    titleZh: "教學型作品",
    titleEn: "Education-oriented Work",
    zh: "結合數位人文技術與文史知識，設計有趣和可行的教學方案。",
    en: "Integrating digital humanities technologies with literary and historical knowledge to design engaging, practical, and feasible teaching plans or resources.",
    outputsZh: "互動教材、評估工具、影片、操作指南、課程單元設計",
    outputsEn: "Interactive Teaching Materials, Assessment Tools, Educational Videos, Tutorials, Operation Guides, Course Module Designs."
  },
  {
    titleZh: "展示型作品",
    titleEn: "Exhibition-oriented Work",
    zh: "將古典文獻或歷史材料轉化為沉浸式與可互動的媒介。",
    en: "Transforming classical texts or historical materials into immersive, interactive, and publicly accessible media.",
    outputsZh: "擴增實境（AR）/ 虛擬實境（VR）體驗、虛擬展覽、互動式歷史遊戲、3D 空間復原、檔案館、人工智能聊天機器人（AI Chatbot）、多模態敘事作品",
    outputsEn: "Augmented Reality (AR) / Virtual Reality (VR) Experiences, Virtual Exhibitions, Interactive Historical Games, 3D Spatial Reconstructions, Digital Archives, AI Chatbots, Multimodal Narrative Works."
  }
];

const judging = [
  ["20%", "問題界定與 Classics / Humanities 關聯", "Problem Definition and Relevance to Classics / Humanities", "是否清楚指出經典文本、古典文化或古代歷史／語言問題，並說明教育或研究上的實際需要。", "Whether the project clearly identifies a problem in classical texts, classical cultures, or premodern history/language, and explains its genuine educational or research relevance."],
  ["20%", "可行性與功能性／技術實踐", "Feasibility, Functionality and Technical Realisation", "作品是否具可操作性、技術設計是否合理；如屬工具原型，是否能有效展示其功能。", "Whether the work is workable and technically sound; for tool-based prototypes, whether core functions are demonstrated effectively."],
  ["20%", "創新與創意", "Innovation and Creativity", "AI 與人文內容的結合方式是否新穎，有否超越一般示範式使用。", "Whether the combination of AI and humanities content is original and goes beyond routine or demonstrative use."],
  ["20%", "學術質素與研究嚴謹度", "Scholarly Quality and Research Rigor", "文本、史料、譯本、概念與文獻運用是否準確，論證是否有方法、有依據。", "Whether texts, sources, translations, concepts and references are handled accurately and whether the project is methodologically grounded and well evidenced."],
  ["10%", "社會影響、可持續性與負責任 AI", "Social Impact, Sustainability and Responsible AI", "是否考慮倫理、版權、偏差、可持續性、可擴展性及教育公平等問題，並能深入反思 AI 的能力與限制。", "Whether the project addresses ethics, copyright, bias, sustainability, scalability and educational equity, and demonstrates in-depth reflection on the capabilities and limitations of AI."],
  ["10%", "展示與表達能力", "Presentation Skills", "是否能在作品介紹短片及決賽簡報中清晰、有條理地介紹作品的研究問題、AI 應用方法、研究成果及限制；並在決賽簡報中有效回應評審提問。", "Whether the team can clearly and coherently present the project's research problem, AI application methods, findings, and limitations in both the project introduction video and the final presentation, and respond effectively to questions from the judging panel during the final presentation."]
];

const timeline = [
  ["2026 年 6 月", "June 2026", "比賽網站上線、公開徵件、開始接受報名。", "Competition webpage launch, call for entries and opening of registration."],
  ["2026 年 6-9 月", "June-September 2026", "基礎培訓工作坊（如 prompt engineering、NER、文本分析、圖像分類等）。", "Foundational training workshops (e.g. prompt engineering, NER, text analysis and image classification)."],
  ["2026 年 6-9 月", "June-September 2026", "專家講座及進階工作坊（如 CBDB、GeoAI、古典文本 AI 分析等）。", "Expert talks and advanced workshops (e.g. CBDB, GeoAI and AI-based analysis of classical texts)."],
  ["2026 年 9 月 30 日", "30 September 2026", "比賽報名截止。", "Registration Deadline"],
  ["2026 年 12 月 31 日", "31 December 2026", "截止提交初賽作品。", "Deadline for first-round submission."],
  ["2027 年 1 月上旬", "Early January 2027", "公布入圍名單並安排決賽簡報。", "Announcement of shortlist and arrangement of final presentations."],
  ["2027 年 1 月中旬", "Mid January 2027", "決賽及頒獎典禮。", "Final presentation and award ceremony."]
];

const submissionStages = {
  registration: {
    titleZh: "報名階段",
    titleEn: "Registration",
    deadlineZh: "2026 年 9 月 30 日截止",
    deadlineEn: "Deadline: 30 September 2026",
    descZh: "參賽隊伍須於限期前填妥網上報名表，提交以下資料以核實參賽資格。",
    descEn: "Each team must complete the online registration form before the deadline and provide the following to verify eligibility.",
    rows: [
      ["隊伍資料", "Team information", "文件未列明", "Not specified in DOCX", "隊伍名稱、每位隊員的姓名、學生編號及就讀課程。", "Team name; each member's name, student ID number and programme of study.", "指定聯絡人及電郵。", "Designated contact person and email."],
      ["作品基本資料", "Project basics", "文件未列明", "Not specified in DOCX", "暫定作品題目、作品類型（研究／工具／教學／展示）。", "Provisional project title and submission type (Research / Tool / Education / Exhibition).", "一句作品與「AI & Classics」主題關聯的說明。", "A one-line note on the project's connection to the “AI & Classics” theme."],
      ["同意與原創確認", "Agreement and originality confirmation", "文件未列明", "Not specified in DOCX", "確認已閱讀並同意比賽規則、AI 使用、學術誠信及知識產權條款，且作品為原創。", "Confirmation that the team has read and agrees to the competition rules and the AI-use, academic-integrity and intellectual-property terms, and that the entry is original.", "此項為正式條款。", "This is a formal rule clause."]
    ],
    clauseZh: "確認已閱讀並同意比賽規則、AI 使用、學術誠信及知識產權條款，且作品為原創。",
    clauseEn: "Confirmation that the team has read and agrees to the competition rules and the AI-use, academic-integrity and intellectual-property terms, and that the entry is original."
  },
  first: {
    titleZh: "初賽提交",
    titleEn: "First-round Submission",
    deadlineZh: "2026 年 12 月 31 日提交",
    deadlineEn: "Deadline: 31 December 2026",
    descZh: "初賽提交以網上申請、摘要、簡報、AI 使用聲明、資料來源聲明與可展示原型為核心。",
    descEn: "The first-round submission centres on the online application, abstract, slide deck, AI Use Statement, Source Declaration and a demonstrable preliminary output.",
    rows: [
      ["網上報名表及作品摘要", "Online form and project abstract", "文件未列明", "Not specified in DOCX", "提交 completed online application form 及作品摘要。", "Submit a completed online application form and project abstract.", "按線上系統要求填寫。", "Follow the online system requirements."],
      ["作品介紹短片", "Project introduction video", "MP4；最長 5 分鐘；最低 720p", "MP4; maximum 5 minutes; minimum 720p", "按 markdown 指示列入初賽材料，用於介紹作品。", "Included per the markdown instructions as first-round project introduction material.", "若最終 DOCX 版本調整，以主辦單位公布為準。", "If the final DOCX changes, follow the Organising Committee's published version."],
      ["作品簡報", "Project presentation slide deck", "PDF / PPT", "PDF / PPT", "須闡述問題、簡述相關學界研究、說明 AI 應用方法、展示初步研究成果／作品進展。", "The slide deck should articulate the research problem, briefly review relevant literature, explain the method of AI application, and present preliminary research findings or project progress.", "簡報須能支撐初賽評閱。", "The deck should support first-round review."],
      ["AI 使用聲明", "AI Use Statement", "文件未列明", "Not specified in DOCX", "清楚列明所使用的生成式 AI 工具及其用途，以及使用生成式 AI 工具時的人手修改、驗證與判斷的範圍。", "Specify the generative AI tools used, the purposes for which they were used, and the scope of human revision, verification and judgement.", "附錄範本亦須填妥。", "The appendix template should also be completed."],
      ["資料來源聲明", "Source Declaration", "文件未列明", "Not specified in DOCX", "標明所有引用文本、史料、譯本、圖像、地圖、資料集或第三方模型等資料的來源或授權情況。", "Clearly indicate the source and licensing status of all referenced materials, including texts, historical documents, translations, images, maps, datasets and third-party models.", "所有來源均須可追溯。", "Every source must be traceable."],
      ["作品初步版本／原型", "Preliminary version / prototype", "可展示初步成果", "Demonstrable preliminary output", "研究型交初步資料集或分析樣本；工具型交可運行原型；教學型交教材草樣或示例單元；展示型交概念原型或局部展示。", "Research-oriented: an initial dataset or analytical sample; tool-oriented: a runnable prototype; education-oriented: a draft of the teaching materials or a sample unit; exhibition-oriented: a concept prototype or partial demonstration.", "容許初步、未完成版本，但不接受純文字描述。", "A preliminary, unfinished version is acceptable, but a text-only description is not."]
    ],
    warningZh: "容許初步、未完成版本，但不接受純文字描述。",
    warningEn: "A preliminary, unfinished version is acceptable, but a text-only description is not."
  },
  final: {
    titleZh: "入圍後最終提交",
    titleEn: "Final Submission after Shortlisting",
    deadlineZh: "入圍後",
    deadlineEn: "After shortlist announcement",
    descZh: "入圍隊伍須提交可示範的最終版本，並出席決賽簡報及示範。",
    descEn: "Shortlisted teams must submit a demonstrable final version and attend the final presentation and demonstration.",
    rows: [
      ["作品介紹短片", "Project introduction video", "MP4；最長 5 分鐘；最低 720p", "MP4; maximum 5 minutes; minimum 720p", "提交作品介紹短片。", "Submit a project introduction video.", "解析度最低 720p。", "Minimum resolution 720p."],
      ["修訂版最終簡報", "Revised final presentation slides", "文件未列明", "Not specified in DOCX", "詳細闡述問題意識、相關學界研究、AI 應用的方法、最終的研究成果，以及研究限制。", "The slides should elaborate on the research problem, relevant scholarly work, AI application methods, final research findings, and research limitations.", "此為最終評審材料。", "This is final assessment material."],
      ["示範版本或連結", "Demonstrable version or link", "示範版本／錄影示範／測試連結", "Demonstrable version / recorded demo / testing link", "須提供可示範之版本、錄影示範或測試連結。", "Must provide a demonstrable version, recorded demo, or testing link.", "測試連結至少 3 個月內對評審開放。", "The test link must remain accessible to the judges for at least 3 months."],
      ["作品報告", "Project Report", "1,000-1,500 字", "1,000-1,500 words", "研究型或教學型作品須補交，交代問題意識、方法、AI 應用、學術基礎及限制。", "Research-oriented or teaching-oriented entries must provide a project report outlining the research problem, methodology, AI applications, scholarly basis and limitations.", "僅適用於研究型或教學型作品。", "Required for research-oriented or teaching-oriented entries."],
      ["修訂版 AI 使用聲明及資料來源聲明", "Revised AI Use Statement and Source Declaration", "文件未列明", "Not specified in DOCX", "提交最終修訂版本。", "Submit revised final versions.", "須反映最終作品。", "Must reflect the final work."],
      ["出席決賽", "Final Attendance", "現場／線上示範（如適用）", "Live or online demonstration where relevant", "入圍隊伍須出席決賽簡報及現場／線上示範（如適用）。", "Shortlisted teams must attend the final presentation session and, where relevant, conduct a live or online demonstration.", "簡報和線上示範可使用英文或中文進行。", "Presentations and online demonstrations can be conducted in either English or Chinese."]
    ],
    clauseZh: "測試連結至少 3 個月內對評審開放。入圍隊伍須出席決賽簡報及現場／線上示範（如適用）。",
    clauseEn: "The test link must remain accessible to the judges for at least 3 months. Shortlisted teams must attend the final presentation session and, where relevant, conduct a live or online demonstration."
  }
};

function renderRules() {
  const exampleCards = examples.map((item, index) => `
    <article class="gallery-card">
      <div class="gallery-visual" aria-hidden="true"></div>
      <div class="gallery-body">
        <span>${String(index + 1).padStart(2, "0")}</span>
        ${lang(item.titleZh, item.titleEn, "h3")}
        ${lang(item.zh, item.en, "p")}
      </div>
    </article>
  `).join("");

  const programmeCards = programmes.map(([zh, en]) => miniCard(zh, en, zh, en)).join("");
  const teamRules = [
    miniCard("參賽身份", "Participant status", "香港理工大學（人文學院）的全日制本科生。", "Full-time undergraduate students of The Hong Kong Polytechnic University (Faculty of Humanities)."),
    miniCard("跨學科組隊", "Interdisciplinary teams", "鼓勵跨學科組隊，但所有隊員均須來自上述人文學院合資格課程。", "Interdisciplinary team formation is encouraged, but all team members must be enrolled in one of the eligible programmes listed above."),
    miniCard("隊伍人數", "Team size", "可個人參賽，亦可 2 至 4 人組隊；每隊最多 4 人。", "Entries may be submitted individually or in teams of 2 to 4; each team may have no more than 4 members."),
    miniCard("參賽限制", "Entry limits", "每名學生只可作為一隊之正式成員參賽；每隊只可提交一份作品。", "Each student may join only one team as an official member, and each team may submit only one entry.")
  ].join("");

  const formCards = forms.map((item, index) => `
    <article class="mini-card">
      <b>${String(index + 1).padStart(2, "0")} ${lang(item.titleZh, item.titleEn)}</b>
      ${lang(item.zh, item.en, "p")}
      <ul class="output-list">
        <li>${lang(item.outputsZh, item.outputsEn)}</li>
      </ul>
    </article>
  `).join("");

  const judgingCards = judging.map(([weight, zhTitle, enTitle, zhDesc, enDesc]) => `
    <article class="mini-card">
      <b>${weight} · ${lang(zhTitle, enTitle)}</b>
      ${lang(zhDesc, enDesc, "p")}
    </article>
  `).join("");

  const timelineItems = timeline.map(([timeZh, timeEn, zh, en]) => `
    <li><time>${lang(timeZh, timeEn)}</time>${lang(zh, en, "p")}</li>
  `).join("");

  const awards = [
    ["冠軍", "Champion", "總額：HK$10,000", "Total Amount: HK$10,000"],
    ["亞軍", "First Runner-up", "總額：HK$8,000", "Total Amount: HK$8,000"],
    ["季軍", "Second Runner-up", "總額：HK$5,000", "Total Amount: HK$5,000"],
    ["優異獎（5 名／隊）", "Outstanding Awards (5 awards)", "每名／隊 HK$2,000", "HK$2,000 per award"],
    ["特別嘉許獎（可選）", "Special Commendation (optional)", "如最佳創意、最佳展示、最佳學術嚴謹度等，可頒發證書。", "Certificates may be awarded for categories such as Best Creativity, Best Presentation or Best Scholarly Rigor."]
  ].map(([zhTitle, enTitle, zhPrize, enPrize]) => `<article class="award-card"><b>${lang(zhTitle, enTitle)}</b><strong>${lang(zhPrize, enPrize)}</strong></article>`).join("");

  document.querySelector("#rules-content").innerHTML = [
    storyCard("01", "比賽定位 / 宗旨 / 跨界融合", "Competition Positioning / Objectives / Cross-disciplinary Integration", `
      ${paragraphPair("「理大人工智能 × 數位人文獎 2026」是專為香港理工大學人文學院本科生舉辦的校內活動，旨在鼓勵學生運用人工智能、數位人文及相關科技，深入研習古典文獻、經典思想、歷史文化、翻譯與語言分析，從而推動人工智能與古典研究的跨界融合。", "The “PolyU AI × Digital Humanities Awards 2026” is an internal competition for undergraduate students in the Faculty of Humanities at The Hong Kong Polytechnic University. The competition highlights the intersection of artificial intelligence and classical studies, encouraging students to explore classical texts, classical thought, history, culture, translation, and linguistic analysis through innovative AI and digital humanities approaches.")}
      ${paragraphPair("本屆比賽以「人工智能與經典」（AI & Classics）為主題，鼓勵同學探索最新科技與傳統經典的結合與應用。參賽者可運用生成式人工智能（Generative AI）、數位人文研究方法及相關技術（如機器學習、空間視覺化等），重新詮釋古典材料。參賽作品須兼具紮實的學術基礎、教學價值與創新思維，並展現公眾參與的潛力。", "Under the theme “AI & Classics,” the competition invites students to explore how emerging technologies can build bridges to ancient knowledge. Participants are encouraged to use generative AI, digital humanities methods, and related technologies, such as machine learning and spatial visualization, to reinterpret classical materials and develop projects that demonstrate strong academic grounding, pedagogical value, innovative thinking, and potential for public engagement.")}
    `),
    storyCard("02", "主題說明", "Theme", `
      ${paragraphPair("本屆主題為「AI & Classics」。所謂 Classics「經典」，在比賽中可廣義理解為古典文本、經典思想、古代歷史文化、古籍圖像、經典翻譯與相關知識傳播。參賽作品可圍繞古典文獻與文化，也可延伸至古典語言、古典接受史、經典詮釋或跨文化翻譯等課題，但須清楚說明其與「經典」或「古典學習」的關聯。", "The theme of this edition is “AI & Classics.” In the context of this competition, “Classics” is understood broadly to include classical texts, canonical thought, premodern history and culture, rare-book images, translation of classics, and related forms of knowledge communication. Entries may focus on classical texts and culture, but may also extend to classical language, reception history, interpretation of canonical texts, or cross-cultural translation, provided that the connection to “classics” or “classical learning” is clearly articulated.")}
      <div class="gallery-grid">${exampleCards}</div>
    `),
    storyCard("03", "參賽資格及組隊規則", "Eligibility and Team Formation", `
      <div class="mini-grid">${programmeCards}</div>
      <div class="mini-grid">${teamRules}</div>
      ${clauseCard("主辦單位保留核實學生身份及參賽資格之權利。", "The Organising Committee reserves the right to verify student status and team eligibility.")}
    `),
    storyCard("04", "可接受的作品形式", "Accepted Forms of Submission", `
      ${paragraphPair("作品不限單一形式，可將多種形式結合於單一作品。", "Entries are not restricted to a single format; you can integrate multiple formats into the project.")}
      <div class="card-grid">${formCards}</div>
      ${clauseCard("所有作品須同時具備兩項基本要求：其一，能清楚回應「AI & Classics」主題；其二，能說明作品的教育價值、研究價值或公共傳播價值。所有參賽作品及提交材料可用中文或英文撰寫及展示。", "All entries must satisfy two basic requirements: first, they must clearly address the theme of “AI & Classics”; second, they must explain their educational value, research value or public communication value. All entries and submission materials may be written and presented entirely in either Chinese or English.")}
    `),
    storyCard("06", "評審準則", "Judging Criteria", `
      ${paragraphPair("本比賽從問題關聯、創新、技術、學術嚴謹、社會價值及表達能力六方面進行評審。", "Entries are assessed on six dimensions: problem definition and relevance to classics/humanities, feasibility and technical realisation, innovation and creativity, scholarly quality and research rigour, social impact, sustainability and responsible AI, and presentation skills.")}
      <div class="criteria-grid">${judgingCards}</div>
    `),
    storyCard("07", "評審程序", "Assessment Procedure", `
      <div class="mini-grid">
        ${miniCard("第一階段：書面及媒體材料初審", "Stage 1: Preliminary review", "所有初賽作品由評審根據公布準則評閱。", "All first-round entries will be assessed according to the published judging criteria.")}
        ${miniCard("第二階段：公布入圍名單", "Stage 2: Shortlist announcement", "入圍隊伍按評審意見修訂作品。", "Shortlisted teams will revise their projects in light of panel feedback.")}
        ${miniCard("第三階段：決賽簡報及示範", "Stage 3: Final presentation and demonstration", "入圍隊伍須進行簡報（及示範，如適用），由跨學科評審團作最後評選。", "Shortlisted teams will present their work and demonstrate it where applicable to a multidisciplinary judging panel.")}
      </div>
      ${clauseCard("每份入圍作品原則上由不少於 3 名評審審閱；評審背景將盡量涵蓋歷史、語言、文學、翻譯、語言科學、數位人文或 AI 應用。", "Each shortlisted entry will normally be reviewed by no fewer than three judges, with disciplinary backgrounds spanning history, language, literature, translation, language sciences, digital humanities and AI applications wherever possible.")}
      ${clauseCard("主辦單位可邀請校外專家參與，以加強公平性及跨學科視角。", "External experts may be invited to strengthen fairness and interdisciplinary judgement.")}
    `),
    storyCard("08", "獎項", "Awards", `
      <div class="award-grid">${awards}</div>
      ${clauseCard("所有得獎及入圍作品可獲證書；主辦單位可邀請得獎者於頒獎典禮、網站、社交媒體、展覽或教學活動中展示其成果。", "Certificates may be awarded to prize winners and shortlisted entries. Awardees may also be invited to showcase their work at the award ceremony, on the competition website, on social media, in exhibitions or in related teaching activities.")}
      ${clauseCard("參賽團隊內部若因獎金分配、貢獻度、作者署名或其他非可歸責於主辦單位之事項產生糾紛，應由團隊成員自行協商解決。主辦單位不承擔任何調解、仲裁或法律責任。", "Any internal disputes among members of a participating team, including disputes concerning the distribution of prize money, recognition of contributions, authorship, or any other matters not caused by or attributable to the Organising Committee, shall be resolved internally by the team members. The Organising Committee shall have no obligation or liability to mediate, arbitrate, or otherwise resolve such disputes.")}
    `),
    storyCard("09", "擬定時間表", "Indicative Timeline", `<ol class="timeline-list">${timelineItems}</ol>`)
  ].join("");
}

function renderStage(stageKey) {
  const stage = submissionStages[stageKey];
  const rows = stage.rows.map(([reqZh, reqEn, formatZh, formatEn, detailsZh, detailsEn, notesZh, notesEn]) => `
    <tr>
      <td>${lang(reqZh, reqEn)}</td>
      <td>${lang(formatZh, formatEn)}</td>
      <td>${lang(detailsZh, detailsEn)}</td>
      <td>${lang(notesZh, notesEn)}</td>
    </tr>
  `).join("");
  document.querySelector("#stage-content").innerHTML = `
    ${lang(stage.titleZh, stage.titleEn, "h3")}
    <p><strong>${lang(stage.deadlineZh, stage.deadlineEn)}</strong></p>
    ${paragraphPair(stage.descZh, stage.descEn)}
    <table class="requirement-table">
      <thead>
        <tr>
          <th>${lang("要求", "Requirement")}</th>
          <th>${lang("格式", "Format")}</th>
          <th>${lang("詳情", "Details")}</th>
          <th>${lang("備註", "Notes")}</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    ${stage.warningZh ? `<div class="warning-card">${paragraphPair(stage.warningZh, stage.warningEn)}</div>` : ""}
    ${stage.clauseZh ? clauseCard(stage.clauseZh, stage.clauseEn) : ""}
  `;
}

function renderSubmission() {
  document.querySelector("#submission-content").innerHTML = storyCard("Required Documents", "初賽及決賽兩階段均須提交的文件", "Documents Required at Both Submission Stages", `
    <div class="mini-grid">
      ${miniCard("作品本體／原型", "Project deliverable / prototype", "初賽為初步版本，決賽為示範版本。", "A preliminary version at the first round and a demonstrable version at the final.")}
      ${miniCard("作品簡報", "Project presentation slide deck", "兩個提交階段均須提交。", "Required at both submission stages.")}
      ${miniCard("AI 使用聲明", "AI use statement", "兩個提交階段均須提交。", "Required at both submission stages.")}
      ${miniCard("資料來源聲明", "Source Declaration", "兩個提交階段均須提交。", "Required at both submission stages.")}
    </div>
  `);
  renderStage("registration");
}

function renderTraining() {
  const topics = [
    ["用大型語言模型提示詞對經典文本進行結構化標注", "Prompting LLMs for Structured Annotation in Classical Text Processing"],
    ["運用深度學習模型從古典文本中抽取人物傳記資訊", "Biographical Information Extraction from Classical Texts Using Deep Learning Models"],
    ["大型語言模型（LLM）+ 知識圖譜 + 地理資訊系統（GIS）的多層次文本分析", "Multi-layered text analysis with LLMs, knowledge graphs and GIS"],
    ["面向語言與翻譯研究的語料工具與方法", "Corpus tools and methods for language and translation studies"]
  ].map(([zh, en]) => miniCard(zh, en, zh, en)).join("");
  document.querySelector("#training-content").innerHTML = storyCard("10", "培訓及支援安排", "Training and Support", `
    ${paragraphPair("為提高作品質素並鼓勵更多人文學生參與，比賽將提供公開培訓資源，包括工作坊、示範影片、範例作品及常見問題頁面。即使學生未具備高階編程能力，亦可先通過現成 AI 工具、文本分析與教學設計起步。", "To raise the quality of submissions and encourage broader participation from humanities students, the competition will be supported by open-access training resources including workshops, demonstration videos, exemplar projects and a frequently asked questions page. Students without advanced programming experience may still begin with effective use of existing AI tools, text analysis, and instructional design.")}
    ${paragraphPair("本比賽將圍繞以下核心專題設計培訓工作坊與案例分享。", "The training workshops and case studies will be designed around the following core themes.")}
    <div class="card-grid">${topics}</div>
  `);
}

function renderIntegrity() {
  const rules = [
    ["原創要求", "Originality requirement", "所有作品必須為參賽者原創，不得直接抄襲、委托、冒用或重複提交曾於其他比賽獲獎之作品。", "All entries must be the original work of the participants and must not plagiarise, outsource, misappropriate or re-submit work that has already won awards in other competitions."],
    ["AI 使用申報", "AI-use disclosure", "如作品使用生成式 AI，必須申報所使用的工具、提示詞、生成內容範圍及人工修訂情況。", "Where generative AI is used, participants must disclose the tools used, the prompting approach, the scope of generated content and the extent of human revision."],
    ["取消資格或撤銷獎項", "Disqualification or award revocation", "如主辦單位發現未申報之 AI 生成內容、虛假來源、捏造文獻、偽造引文或嚴重學術不當行為，可取消參賽或得獎資格。", "The Organising Committee may disqualify entries or revoke awards in cases of undisclosed AI-generated content, fabricated sources, falsified citations or serious academic misconduct."],
    ["決賽誠信核查", "Integrity check in final defence", "隊伍須能即場解釋、重現並重新運行作品的任何部分，並按評審要求即時定位任何引文的原始出處；如未能做到，可影響評分或參賽資格。", "Teams must be able to explain, reproduce and re-run any part of their work on the spot, and to locate the original source of any citation upon the judges' request; failure to do so may affect scoring or eligibility."],
    ["工作紀錄", "Working records", "入圍隊伍須保存基本工作紀錄（如提示詞紀錄／prompt log、版本對照、原始來源核查截圖等），保留至評審程序結束；紀錄毋須全部公開，但評審團可要求提交或抽查。", "Shortlisted teams must keep basic working records (e.g. prompt logs, version histories and screenshots of source verification) until the end of the assessment process; the records need not be published in full, but the panel may request them or carry out spot checks."],
    ["史料真實性與引文核驗", "Source authenticity and citation verification", "就涉及古籍、地圖、圖像或翻譯的作品，所有引用之來源均須可追溯至真實原件，凡屬 AI 生成或無法核實的「來源」概不符合要求。", "For works involving rare books, maps, images or translation, every cited source must be traceable to a genuine original, and any AI-generated or unverifiable “source” does not meet the standard."],
    ["版權、私隱與研究倫理", "Copyright, privacy and research ethics", "參賽者須遵守版權、私隱、資料保護及研究倫理要求；如使用第三方文本、圖像、地圖、資料集或模型，須確保合法授權或合理引用。", "Participants must comply with copyright, privacy, data protection and research ethics requirements; the use of third-party texts, images, maps, datasets or models must be properly licensed or fairly cited."],
    ["準確性、脈絡、偏差與 AI 限制", "Accuracy, context, bias and AI limitations", "涉及歷史人物、地理資料、古籍圖像或文化遺產材料者，須注意準確性、脈絡及潛在偏差，並鼓勵在作品中反思 AI 的限制。", "Projects involving historical figures, geospatial data, rare-book images or cultural heritage materials should attend carefully to accuracy, context and potential bias, and are encouraged to reflect critically on the limitations of AI."]
  ].map(([zhTitle, enTitle, zhBody, enBody]) => clauseCard(`<b>${zhTitle}</b><br>${zhBody}`, `<b>${enTitle}</b><br>${enBody}`)).join("");
  document.querySelector("#integrity-content").innerHTML = storyCard("11", "AI 使用、學術誠信與版權要求", "AI Use, Academic Integrity and Copyright", `<div class="story-stack">${rules}</div>`);
}

function renderIp() {
  const clauses = [
    ["作品之著作權及知識產權原則上屬參賽者所有。", "Copyright and intellectual property in the submitted work shall, in principle, remain with the participants."],
    ["參賽者同意主辦單位在註明作者／隊伍的前提下，於網站、社交媒體、教學活動、展覽、宣傳刊物及相關教育用途展示其作品。", "Participants agree that the Organising Committee may, with due attribution, display the work on webpages, social media, teaching activities, exhibitions, publicity materials and related educational platforms."],
    ["參賽者授予主辦單位非專屬（non-exclusive）的使用權，僅限於非商業之教育及宣傳用途；參賽者保留作品的完整著作權，以及日後發表、繼續開發及商業轉化的一切權利。主辦單位使用作品時必定註明作者／隊伍。", "Participants grant the Organising Committee a non-exclusive licence limited to non-commercial educational and promotional use; participants retain full copyright in the work, together with all rights to subsequent publication, further development and commercialisation. The Organising Committee will always attribute the work to the author(s)/team."],
    ["如作品包含完整程式碼、資料集或具商業化潛力的工具，參賽者可只提交示範版本（demo）或限定存取版本（limited-access version），毋須提交完整版本。", "Where a work contains complete source code, datasets or tools with commercialisation potential, participants may submit only a demonstration (demo) or limited-access version, and are not required to submit the full version."],
    ["主辦單位保留對比賽細則、時程及評審安排作出修訂、延長或解釋之權利，並可於有需要時隨時作出修訂。", "The Organising Committee reserves the right to revise, extend or interpret the competition rules, timeline and judging arrangements, and may revise them at any time as needed."]
  ].map(([zh, en]) => clauseCard(zh, en)).join("");
  document.querySelector("#ip-content").innerHTML = storyCard("12", "知識產權與公開展示", "Intellectual Property and Public Display", `<div class="story-stack">${clauses}</div>`);
}

function renderResources() {
  document.querySelector("#resources-content").innerHTML = [
    storyCard("Resources", "資源", "Resources", `
      <div class="contact-card">
        <b>Programming Historian</b>
        <a href="https://programminghistorian.org/">https://programminghistorian.org/</a>
      </div>
    `),
    storyCard("Appendix", "AI 使用聲明（範本）", "AI-Use Statement (Template)", `
      ${paragraphPair("請於兩個提交階段均填妥本聲明。核心原則：AI 可協助，但人對所有內容的準確性、原創性與誠信負全責。", "Complete this statement at both submission stages. Core principle: AI may assist, but humans remain fully accountable for the accuracy, originality and integrity of all content.")}
      <div class="appendix-grid">
        ${miniCard("1. 所使用的 AI 工具（名稱與版本）", "1. AI tools used (name & version)", "____________________", "____________________")}
        ${miniCard("2. 用途（每項工具用於甚麼）", "2. Purpose (what each tool was used for)", "____________________", "____________________")}
        ${miniCard("3. AI 生成內容的範圍（哪些部分由 AI 生成）", "3. Scope of AI-generated content", "____________________", "____________________")}
        ${miniCard("4. 人手修改、驗證與判斷（包括查證所有引文之原始出處）", "4. Human revision, verification & judgement (incl. verifying every cited source)", "____________________", "____________________")}
      </div>
      <div class="card-grid">
        ${clauseCard("可接受：使用 AI 草擬程式碼或譯文，再由隊伍自行測試、修訂，並查證所有引文之原始出處；且在本聲明中清楚申報。", "Acceptable: Using AI to draft code or translations that the team then tests, revises and verifies (incl. checking every citation against the original source), and disclosing this clearly here.")}
        ${clauseCard("不可接受（可導致取消資格）：將 AI 撰寫的分析當作原創而未申報；採用 AI 生成的引文卻未查證出處是否存在、內容是否屬實（捏造文獻／偽造引文）；或將 AI 生成的「古籍」或文物圖像當作真實歷史材料呈現。", "Unacceptable (may lead to disqualification): Passing off AI-written analysis as original without disclosure; including an AI-produced citation without verifying that the source exists and supports the claim (fabricated/falsified citations); or presenting AI-generated images of “rare books” or artefacts as authentic historical materials.")}
      </div>
    `)
  ].join("");
}

function renderRegistration() {
  document.querySelector("#registration-content").innerHTML = storyCard("Registration", "報名資料", "Registration Details", `
    <div class="contact-grid">
      <article class="contact-card"><b>${lang("報名截止日期", "Registration deadline")}</b><span class="placeholder">${lang("2026 年 9 月 30 日", "30 September 2026")}</span></article>
      <article class="contact-card"><b>${lang("報名連結", "Registration link")}</b><span class="placeholder">${lang("[待定]", "[TBC]")}</span></article>
      <article class="contact-card"><b>${lang("狀態", "Status")}</b><span class="placeholder">${lang("待確認", "To be confirmed")}</span></article>
    </div>
    ${paragraphPair("報名階段須提交隊伍名稱、每位隊員姓名、學生編號及就讀課程、指定聯絡人及電郵、暫定作品題目、作品類型，以及一句作品與「AI & Classics」主題關聯的說明。", "At registration, teams must provide the team name, each member's name, student ID and programme of study, designated contact person and email, provisional project title, submission type, and a one-line note on the project's connection to the “AI & Classics” theme.")}
    ${clauseCard("確認已閱讀並同意比賽規則、AI 使用、學術誠信及知識產權條款，且作品為原創。", "Confirmation that the team has read and agrees to the competition rules and the AI-use, academic-integrity and intellectual-property terms, and that the entry is original.")}
    <button class="button" type="button" disabled>${lang("報名連結待定", "Registration link TBC")}</button>
  `);
}

function renderContact() {
  document.querySelector("#contact-content").innerHTML = storyCard("13", "查詢", "Enquiries", `
    <div class="contact-grid">
      <article class="contact-card"><b>${lang("官方網址", "Official website")}</b><span class="placeholder">${lang("[待定]", "[TBC]")}</span></article>
      <article class="contact-card"><b>${lang("報名連結", "Registration link")}</b><span class="placeholder">${lang("[待定]", "[TBC]")}</span></article>
      <article class="contact-card"><b>${lang("查詢電郵", "Enquiry email")}</b><span class="placeholder">${lang("[待定]", "[TBC]")}</span></article>
    </div>
  `);
}

function renderAllContent() {
  renderRules();
  renderSubmission();
  renderTraining();
  renderIntegrity();
  renderIp();
  renderResources();
  renderRegistration();
  renderContact();
}

function setLanguage(language) {
  body.dataset.language = language;
  document.documentElement.lang = language === "en" ? "en" : "zh-Hant";
  if (!languageToggle) return;

  const labels = languageToggle.querySelectorAll("span");
  labels.forEach((label) => label.classList.remove("active-lang"));
  labels[language === "en" ? 1 : 0].classList.add("active-lang");
  languageToggle.setAttribute("aria-label", language === "en" ? "Switch to Traditional Chinese" : "Switch to English");
  localStorage.setItem("chc-language", language);
}

function activateTab(tabName, options = {}) {
  const safeTab = tabs.includes(tabName) ? tabName : "home";
  document.querySelectorAll("[data-tab-panel]").forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.tabPanel === safeTab);
  });
  document.querySelectorAll("[data-tab-target]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tabTarget === safeTab);
  });
  floatingActions?.classList.toggle("is-visible", safeTab !== "home");
  siteNav?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");

  if (location.hash !== `#${safeTab}`) {
    history.replaceState(null, "", `#${safeTab}`);
  }
  if (!options.keepScroll) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function updateCountdown() {
  if (!countdown) return;
  const deadline = new Date(countdown.dataset.deadline).getTime();
  const distance = Math.max(0, deadline - Date.now());
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);

  countdown.querySelector('[data-count="days"]').textContent = String(days);
  countdown.querySelector('[data-count="hours"]').textContent = String(hours).padStart(2, "0");
  countdown.querySelector('[data-count="minutes"]').textContent = String(minutes).padStart(2, "0");
}

renderAllContent();
setLanguage(localStorage.getItem("chc-language") === "en" ? "en" : "zh");
updateCountdown();
setInterval(updateCountdown, 60 * 1000);
activateTab(location.hash.replace("#", "") || "home", { keepScroll: true });

languageToggle?.addEventListener("click", () => {
  setLanguage(body.dataset.language === "en" ? "zh" : "en");
});

menuToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-tab-target]");
  if (target) {
    activateTab(target.dataset.tabTarget);
  }

  const scrollTopTarget = event.target.closest("[data-scroll-top]");
  if (scrollTopTarget) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const stageTarget = event.target.closest("[data-stage-target]");
  if (stageTarget) {
    document.querySelectorAll("[data-stage-target]").forEach((button) => {
      const isActive = button === stageTarget;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });
    renderStage(stageTarget.dataset.stageTarget);
  }
});

window.addEventListener("hashchange", () => {
  activateTab(location.hash.replace("#", "") || "home", { keepScroll: true });
});
