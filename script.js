// ── Search ──
const guides = [
  { title:'社保跨省转移', keywords:'社保 转移 跨省 换城市 换工作', url:'guides/shebao-zhuanyi.html', tag:'社保' },
  { title:'异地就医报销', keywords:'医保 报销 异地 就医 外地 看病 住院', url:'guides/yibao-baoxiao.html', tag:'医保' },
  { title:'公积金提取', keywords:'公积金 提取 租房 买房 还贷 离职 取钱', url:'guides/gjj-tiqu.html', tag:'公积金' },
  { title:'失业金申领', keywords:'失业金 失业 申领 被裁 裁员 离职 没工作', url:'guides/shiyejin-shenling.html', tag:'社保' },
  { title:'灵活就业社保缴纳', keywords:'灵活就业 社保 自由职业 个体户 自己交 缴费', url:'guides/shebao-jiaofei.html', tag:'社保' },
  { title:'门诊慢特病报销', keywords:'门诊 慢性病 报销 高血压 糖尿病 特殊病', url:'guides/yibao-mendao.html', tag:'医保' },
];

function doSearch() {
  const q = document.getElementById('searchInput').value.trim();
  if (!q) return;

  const results = guides.filter(g =>
    g.keywords.includes(q) || g.title.includes(q)
  );

  if (results.length === 0) {
    // Scroll to a no-result section or show alert
    const section = document.getElementById('hot');
    let box = document.getElementById('searchResults');
    if (!box) {
      box = document.createElement('div');
      box.id = 'searchResults';
      box.className = 'section';
      section.parentNode.insertBefore(box, section);
    }
    box.innerHTML = '<div class="no-results"><div class="icon"></div><p style="font-size:1.1rem;font-weight:600;">没找到「' + q + '」相关指南</p><p style="margin-top:6px;">试试换个关键词，或查看下方的热门指南</p></div>';
    box.scrollIntoView({ behavior:'smooth' });
  } else if (results.length === 1) {
    window.location.href = results[0].url;
  } else {
    let box = document.getElementById('searchResults');
    if (!box) {
      box = document.createElement('div');
      box.id = 'searchResults';
      box.className = 'section';
      const section = document.getElementById('hot');
      section.parentNode.insertBefore(box, section);
    }
    box.innerHTML = '<h2 class="section-title">搜索结果</h2><p class="section-sub">找到 ' + results.length + ' 条相关指南</p><div class="guide-grid">' +
      results.map(g => '<a href="' + g.url + '" class="guide-card"><span class="tag tag-' +
        (g.tag==='社保'?'shebao':g.tag==='医保'?'yibao':g.tag==='公积金'?'gjj':'other') +
        '">' + g.tag + '</span><h3>' + g.title + '</h3></a>').join('') +
      '</div>';
    box.scrollIntoView({ behavior:'smooth' });
  }
}

document.getElementById('searchInput').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') doSearch();
});

// ── City data ──
const cityData = {
  'beijing':   { name:'北京', shebaoUrl:'http://rsj.beijing.gov.cn/', yibaoUrl:'http://ybj.beijing.gov.cn/', gjjUrl:'http://gjj.beijing.gov.cn/' },
  'shanghai':  { name:'上海', shebaoUrl:'https://rsj.sh.gov.cn/', yibaoUrl:'https://ybj.sh.gov.cn/', gjjUrl:'https://www.shgjj.com/' },
  'guangzhou': { name:'广州', shebaoUrl:'http://rsj.gz.gov.cn/', yibaoUrl:'http://ybj.gz.gov.cn/', gjjUrl:'http://gjj.gz.gov.cn/' },
  'shenzhen':  { name:'深圳', shebaoUrl:'http://hrss.sz.gov.cn/', yibaoUrl:'http://hsa.sz.gov.cn/', gjjUrl:'http://gjj.sz.gov.cn/' },
  'hangzhou':  { name:'杭州', shebaoUrl:'http://hrss.hangzhou.gov.cn/', yibaoUrl:'http://ybj.hangzhou.gov.cn/', gjjUrl:'http://gjj.hangzhou.gov.cn/' },
  'chengdu':   { name:'成都', shebaoUrl:'http://cdhrss.chengdu.gov.cn/', yibaoUrl:'http://cdyb.chengdu.gov.cn/', gjjUrl:'http://cdzfgjj.chengdu.gov.cn/' },
  'wuhan':     { name:'武汉', shebaoUrl:'http://rsj.wuhan.gov.cn/', yibaoUrl:'http://ybj.wuhan.gov.cn/', gjjUrl:'http://gjj.wuhan.gov.cn/' },
  'nanjing':   { name:'南京', shebaoUrl:'http://rsj.nanjing.gov.cn/', yibaoUrl:'http://ybj.nanjing.gov.cn/', gjjUrl:'http://gjj.nanjing.gov.cn/' },
  'chongqing': { name:'重庆', shebaoUrl:'http://rlsbj.cq.gov.cn/', yibaoUrl:'http://ybj.cq.gov.cn/', gjjUrl:'https://www.cqgjj.cn/' },
  'default':   { name:'全国通用', shebaoUrl:'http://www.mohrss.gov.cn/', yibaoUrl:'http://www.nhsa.gov.cn/', gjjUrl:'http://www.mohurd.gov.cn/' }
};

function updateCityInfo(selectEl, type) {
  const city = cityData[selectEl.value] || cityData['default'];
  const urlMap = { shebao:'shebaoUrl', yibao:'yibaoUrl', gjj:'gjjUrl' };
  const labelMap = { shebao:'社保局', yibao:'医保局', gjj:'公积金中心' };
  const id = type + 'Link';
  const el = document.getElementById(id);
  if (el) {
    el.innerHTML = city.name + labelMap[type] + '官网：<a href="' + city[urlMap[type]] + '" target="_blank" rel="noopener">' + city[urlMap[type]] + '</a>';
  }
}

// ── FAQ toggle ──
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    item.classList.toggle('open');
  });
});
