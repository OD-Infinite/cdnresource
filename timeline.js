// extensions/time-line/public/timeline.js
console.log("timeline.js Load!!!!!!");

document.addEventListener('DOMContentLoaded', async () => {
  const root = document.getElementById('eta-timeline-root');
  if (!root) return;

  const productId = "gid://shopify/Product/"+root.dataset.productId;
  const collectionId = "gid://shopify/Product/"+root.dataset.collectionId;
  const shop = root.dataset.shop;
  console.log('productId:', productId+"; shop:"+shop+"; collection:"+collectionId);
  let datestr=new Date().toISOString().slice(0, 10);
  // 2. 请求后端 API
  fetch('https://timeline.infiopia.com/getconf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shop-Domain': shop,
      },
      body: JSON.stringify({
        product_id: productId,
        collection_id: collectionId,
        pur_date:datestr,
      }),
  })
  .then((res) => {
    if (!res.ok) throw new Error('API error');
    return res.json();
  })
  .then(({ data }) => {
    if (!data) {
      // 无配置：清空容器或隐藏
      //root.style.display = 'none';
      return;
    }
    let style;
    try {
      console.log("data:"+data);
      data = JSON.parse(data);
      style = JSON.parse(data.style_json);
    } catch (e) {
      console.error('Invalid style_json', data.style_json);
      return;
    }
    // 辅助函数：判断是否使用渐变
    const getBg = (color1, color2) => {
      if(color1===color2){ return color1;}
      else{return `linear-gradient(45deg, ${color1}, ${color2})`;} 
    };

    // 3. 构建 HTML（使用后端返回的样式变量）
    const html = `
      <div style="padding:8px 4px;background-color:#ffffff;border:1px solid #ccc;border-radius:10px;">
      <p style="margin:4px 7px;color:${escapeHtml(style.fontColor)};font-size:${style.fontSizeDate}px;">
        ${escapeHtml(data.previewDesc)}
      </p>
      <div style="margin:5px;height:130px;position:relative;padding:${style.borderWidth}px;">
        <div id="border" style="
          position:absolute;top:0;left:0;right:0;bottom:0;
          border-radius:${style.borderRadius}px;
          background:${getBg(style.borderColor, style.borderColor2)};
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
          pointer-events:none;
          z-index:0;
          padding:${style.borderWidth}px;
        "></div>
        <div style="
          position:relative;width:100%;height:100%;padding:${style.borderWidth}px;
          border-radius:${style.borderRadius}px;
          background:${getBg(style.bgColor, style.bgColor2)};
          color:${style.fontColor};
          display:flex;align-items:center;justify-content:space-between;
          z-index:1;
        ">
          <!-- 左侧：Purchased -->
          <div style="width:10px;"></div>
          <div style="display:flex;flex-direction:column;align-items:center;gap:5px;">
            ${style.iconPurchaseHtml}
            <p style="font-size:${style.fontSizeTitle}px;">${escapeHtml(data.titlePurchase)}</p>
            <p style="font-size:${style.fontSizeDate}px;">{formatDateToday(style.dateFormat)}</p>
          </div>

          <!-- 中间 timeline 分隔线 -->
          ${style.timelineHtml}

          <!-- 中间：Processing -->
          <div style="display:flex;flex-direction:column;align-items:center;gap:5px;">
            ${style.iconProcessingHtml}
            <p style="font-size:${style.fontSizeTitle}px;">${escapeHtml(data.titleProcessing)}</p>
            <p style="font-size:${style.fontSizeDate}px;">{formatDateRange(shippingEstimate, style.dateFormat)}</p>
          </div>

          <!-- 中间 timeline 分隔线 -->
          ${style.timelineHtml}

          <!-- 右侧：Delivered -->
          <div style="display:flex;flex-direction:column;align-items:center;gap:5px;">
            ${style.iconDeliveredHtml}
            <p style="font-size:${style.fontSizeTitle}px;">${escapeHtml(data.titleDelivered)}</p>
            <p style="font-size:${style.fontSizeDate}px;">{formatDateRange(deliveredEstimate, style.dateFormat)}</p>
          </div>
          <div style="width:10px;"></div>
        </div>
      </div>
    </div>
    `;

    // 4. 插入 HTML
    root.innerHTML = html;
  })
  .catch((err) => {
    console.debug('Failed to load ETA timeline', err);
    // 可选：显示错误提示或静默失败
    root.style.display = 'none';
  });
  
});


function escapeHtml(text) {
  if (typeof text !== 'string') return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}