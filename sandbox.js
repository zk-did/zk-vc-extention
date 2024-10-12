const vc_input = {
  "root": "10272596470842989889131263666755227636877941914255694966465976469305926704328",
  "enabled_age": 1,
  "siblings_age": [
    "14318826656202632489621175044457929738341559261240066044617225719369724472557",
    "16458884667780311415931657624870651669586128768696796112923086742410855126204",
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  "oldKey_age": 0,
  "oldValue_age": 0,
  "isOld0_age": 0,
  "key_age": "2",
  "value_age": "25",
  "fnc_age": 0,
  "enabled_alumni": 1,
  "siblings_alumni": [
    "14318826656202632489621175044457929738341559261240066044617225719369724472557",
    "16191785148234670434452146708529731055900027417973611561045662530462874792865",
    "15692429824508951494465139282936636028200795395009574220384960293101538051165",
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  "oldKey_alumni": 0,
  "oldValue_alumni": 0,
  "isOld0_alumni": 0,
  "key_alumni": "4",
  "value_alumni": "13470848316145890340874722236101339397950228355143393785271900851951094073694",
  "fnc_alumni": 0,
  "enabled_name": 1,
  "siblings_name": [
    "17254404140280282472057667831761359545055308307154070229116084621257068800336",
    "3323234729009241119389734068334169148421670544066262193899138423697830053511",
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  "oldKey_name": 0,
  "oldValue_name": 0,
  "isOld0_name": 0,
  "key_name": "1",
  "value_name": "5029417642939702593447539596443758580832091925927325248535360558432489783633",
  "fnc_name": 0,
  "enabled_eddsa": 1,
  "Ax": "13277427435165878497778222415993513565335242147425444199013288855685581939618",
  "Ay": "13622229784656158136036771217484571176836296686641868549125388198837476602820",
  "R8x": "14843327923499602530760840822364653819560149483324056861844414827173045711128",
  "R8y": "16624741311753369209800270717954129820251768033844592664257222687029635194829",
  "S": "2003340101055013093731532733602979271886157286292523269931749695412007991258",
  "M": "10272596470842989889131263666755227636877941914255694966465976469305926704328"
};

function unstringifyBigInts(o) {
  if (typeof o === "string" && /^[0-9]+$/.test(o)) {
    return BigInt(o);
  } else if (typeof o === "string" && /^0x[0-9a-fA-F]+$/.test(o)) {
    return BigInt(o);
  } else if (Array.isArray(o)) {
    return o.map(unstringifyBigInts);
  } else if (typeof o === "object") {
    if (o === null) return null;
    const res = {};
    const keys = Object.keys(o);
    keys.forEach((k) => {
      res[k] = unstringifyBigInts(o[k]);
    });
    return res;
  } else {
    return o;
  }
}

function p256$2(n) {
  let nstr = n.toString(16);
  while (nstr.length < 64) nstr = "0" + nstr;
  return `0x${nstr}`;
}

async function groth16ExportSolidityCallData(_proof, _pub) {
  const proof = unstringifyBigInts(_proof);
  const pub = unstringifyBigInts(_pub);

  let inputs = "";
  for (let i = 0; i < pub.length; i++) {
    if (inputs !== "") inputs += ",";
    inputs += p256$2(pub[i]);
  }

  let S = `[${p256$2(proof.pi_a[0])}, ${p256$2(proof.pi_a[1])}],` +
    `[[${p256$2(proof.pi_b[0][1])}, ${p256$2(proof.pi_b[0][0])}],` +
    `[${p256$2(proof.pi_b[1][1])}, ${p256$2(proof.pi_b[1][0])}]],` +
    `[${p256$2(proof.pi_c[0])}, ${p256$2(proof.pi_c[1])}],` +
    `[${inputs}]`;

  return S;
}

window.addEventListener('message', async function(event) {
  if (event.data.type === 'init') {
      const { circuitWasm, zkey, vkey } = event.data;
      try {
          const circuitWasmBuffer = new Uint8Array(circuitWasm);
          const zkeyBuffer = new Uint8Array(zkey);
          const { proof, publicSignals } = await snarkjs.groth16.fullProve(vc_input, circuitWasmBuffer, zkeyBuffer);

          console.log('Proof generated:', proof);
          console.log('Public Signals:', publicSignals);

          // Solidity calldata를 생성하는 함수
          const calldata = await groth16ExportSolidityCallData(proof, publicSignals);

          console.log('Solidity calldata:', calldata);

          const res = await snarkjs.groth16.verify(vkey, publicSignals, proof);
          window.parent.postMessage({
              type: 'proofResult',
              proof: proof,
              publicSignals: publicSignals,
              calldata: calldata,
              verificationResult: res
          }, '*');
      } catch (error) {
          console.error('Proof generation or verification failed:', error.message);
          window.parent.postMessage({
              type: 'proofResult',
              error: error.message
          }, '*');
      }
  }
});