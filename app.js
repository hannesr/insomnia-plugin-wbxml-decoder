
const wbxml = require('wbxml')

// generic unnamed codepages
let genericCodepages = [];
for(let i=0; i<=5; ++i) {
  genericCodepages[i] = {};
  for(let j=0x00; j<=0xFF; ++j) {
    genericCodepages[i][j] = '0x'+j.toString(16).padStart(2, '0');
  }
}

const wbxmlDecode = async function(ctx) {
  try {
    const decoder = new wbxml.Decoder({codepages: genericCodepages, objectMode: true});
    const content = ctx.response.getBody();
    decoder.write(content);
    const parsedContent = decoder.read();
    ctx.response.setBody(Buffer.from(JSON.stringify(parsedContent), 'utf8'));
    decoder.end();
  } catch (err) {
    console.error('[wbxml-decoder]', err);
  }
}

module.exports.responseHooks = [wbxmlDecode];

console.log('[wbxml-decoder]', 'loaded');
