const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  // 1. HTML 파일 요청
  if (url.pathname === '/' || url.pathname === '/ajaxPage.html') {
    const html = fs.readFileSync(path.join(__dirname, 'ajaxPage.html'), 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  }

  // 2. API 요청 (AJAX가 호출하는 엔드포인트)
  else if (url.pathname === '/api/map-tile') {
    const x = url.searchParams.get('x') || 0;
    const y = url.searchParams.get('y') || 0;

    console.log(`[API 요청] x=${x}, y=${y}`);

    // 좌표에 따른 지역 이름 (예시)
    const regions = {
      '0': '서울',
      '100': '경기',
      '200': '강원',
      '300': '충청',
      '400': '전라',
      '500': '경상',
    };
    const region = regions[x] || '알 수 없는 지역';

    // XML 응답 (원조 AJAX 방식!)
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<response>
  <imageUrl>/map?x=${x}&amp;y=${y}</imageUrl>
  <region>${region}</region>
  <message>${region} 지도 로드 완료!</message>
</response>`;

    res.writeHead(200, { 'Content-Type': 'application/xml' });
    res.end(xml);
  }

  // 3. 지도 이미지 요청
  else if (url.pathname === '/map') {
    const x = url.searchParams.get('x') || 0;
    const y = url.searchParams.get('y') || 0;

    // 좌표에 따른 지역 이름
    const regions = {
      '0': '서울',
      '100': '경기',
      '200': '강원',
      '300': '충청',
      '400': '전라',
      '500': '경상',
    };
    const region = regions[x] || '알 수 없는 지역';

    // 좌표에 따른 배경색
    const colors = {
      '0': '#ffcccc',
      '100': '#ccffcc',
      '200': '#ccccff',
      '300': '#ffffcc',
      '400': '#ffccff',
      '500': '#ccffff',
    };
    const bgColor = colors[x] || '#e0e0e0';

    // SVG 이미지 생성
    const svg = `
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="300" fill="${bgColor}"/>
        <text x="200" y="120" text-anchor="middle" font-size="48" fill="#333">
          ${region}
        </text>
        <text x="200" y="180" text-anchor="middle" font-size="20" fill="#666">
          좌표: x=${x}, y=${y}
        </text>
      </svg>
    `;

    res.writeHead(200, { 'Content-Type': 'image/svg+xml' });
    res.end(svg);
  }

  // 4. 그 외
  else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
  console.log(`브라우저에서 http://localhost:${PORT} 접속하세요!`);
});
